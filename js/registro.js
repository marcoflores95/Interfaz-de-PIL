/**
 * ================================================================================
 * Módulo de Registro a SharePoint (registro.js) - v4.0.0 (Depuración Mejorada)
 * --------------------------------------------------------------------------------
 * - [DEBUG] Se añade logging detallado para la URL del Form Digest, la URL de la
 * lista y el cuerpo de la petición. Esto ayudará a diagnosticar el error 404
 * al verificar si las URLs y los datos enviados son correctos.
 * - La función sigue retornando `true` o `false` para un manejo de errores robusto.
 * ================================================================================
 */

async function getFormDigest(siteUrl) {
    const digestUrl = `${siteUrl}/_api/contextinfo`;
    console.log('[DEBUG] Obteniendo Form Digest desde:', digestUrl);
    try {
        const response = await fetch(digestUrl, {
            method: 'POST',
            headers: { "Accept": "application/json;odata=nometadata" }
        });
        if (!response.ok) {
            throw new Error(`Respuesta del servidor no fue OK. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('[DEBUG] Form Digest obtenido con éxito.');
        return data.FormDigestValue;
    } catch (error) {
        console.error("Error crítico al obtener el Form Digest de SharePoint. Verifica que la URL del sitio es correcta y accesible.", error);
        return null;
    }
}

async function generateSHA256(message) {
    try {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        console.error('Error al generar el hash SHA-256:', error);
        return null;
    }
}

function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

export async function registerStudentVisit(studentData) {
    // ATENCIÓN: Verifica que esta URL sea la correcta para tu sitio de SharePoint.
    const siteUrl = "https://www.seg.guanajuato.gob.mx/Estudiantes";
    // ATENCIÓN: Verifica que el nombre de la lista 'Visitas PIL' sea exacto.
    const listApiUrl = `${siteUrl}/_api/web/lists/getbytitle('Visitas PIL')/items`;

    const formDigestValue = await getFormDigest(siteUrl);
    if (!formDigestValue) {
        console.error("Registro abortado: No se pudo obtener el token de seguridad (Form Digest).");
        return false;
    }

    const username = (studentData.username || '').trim().substring(0, 255);
    if (!username) {
        console.error('Registro abortado: Nombre de usuario está vacío.');
        return false;
    }
    
    const requestBody = {
        Title: getFormattedDate(),
        S: studentData.gender === 'boy' ? 'Niño' : 'Niña',
        E: parseInt(studentData.age, 10) || 0,
        Mun: studentData.municipality || 'No especificado',
        Usuario: username,
        Identificador: await generateSHA256(username)
    };

    if (!requestBody.Identificador) {
        console.error('Registro abortado: No se pudo generar el identificador único.');
        return false;
    }

    console.log('[DEBUG] Intentando registrar en SharePoint...');
    console.log('[DEBUG] URL de la API:', listApiUrl);
    console.log('[DEBUG] Datos a enviar (requestBody):', JSON.stringify(requestBody, null, 2));

    try {
        const response = await fetch(listApiUrl, {
            method: 'POST',
            headers: {
                "Accept": "application/json;odata=nometadata",
                "Content-Type": "application/json;odata=nometadata",
                "X-RequestDigest": formDigestValue
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            console.log(`[registro.js] ¡Registro en SharePoint exitoso! Status: ${response.status}`);
            return true;
        } else {
            // Si el status es 404, es muy probable que la URL de la lista sea incorrecta.
            const errorText = await response.text();
            console.error(`[registro.js] Error al registrar en SharePoint. Status: ${response.status}.`, `Respuesta del servidor: ${errorText}`);
            if (response.status === 404) {
                 console.error("[POSIBLE SOLUCIÓN] Un error 404 usualmente significa que la URL de la lista es incorrecta. Por favor, verifica que la URL del sitio y el nombre de la lista 'Visitas PIL' sean correctos.");
            }
            return false;
        }
    } catch (error) {
        console.error('[registro.js] Error de red o CORS al intentar registrar en SharePoint. Verifica la conexión y la configuración de CORS en el servidor.', error);
        return false;
    }
}
