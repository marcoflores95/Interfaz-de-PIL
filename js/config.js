/**
 * ================================================================================
 * Módulo de Configuración (config.js) - Versión Definitiva y Corregida
 * --------------------------------------------------------------------------------
 * Contiene la base de datos exhaustiva de los 46 municipios y sus respectivos
 * sets de 5 juegos temáticos. SE HA CORREGIDO UN ERROR DE SINTAXIS en la
 * definición de juegos para el municipio 22 (Ocampo).
 * ================================================================================
 */

export const PLAYER_DATA_KEY = 'guanajuatoKidsPlayerData_v2';

export const AVATARS = [
   
    { id: 'player-avatar', url: 'img/Botones/LogoUsuario.png', name: 'gender', cost: 0, unlocked: true },
    { id: 'profile-menu-avatar', url: 'img/Botones/LogoUsuario.png', name: 'gender', cost: 0, unlocked: true },

    /*    
    { id: 'avatar01', url: 'https://placehold.co/128x128/3b82f6/ffffff?text=B1', name: 'Explorador Azul', cost: 0, unlocked: true }
    { id: 'avatar02', url: 'https://placehold.co/128x128/ec4899/ffffff?text=G1', name: 'Aventurera Rosa', cost: 100 },
    { id: 'avatar03', url: 'https://placehold.co/128x128/f59e0b/ffffff?text=C1', name: 'Capitán Naranja', cost: 150 },
    { id: 'avatar04', url: 'https://placehold.co/128x128/22c55e/ffffff?text=N1', name: 'Ninja Verde', cost: 200 },
    { id: 'avatar05', url: 'https://placehold.co/128x128/8b5cf6/ffffff?text=M1', name: 'Mago Morado', cost: 250 },
    { id: 'avatar06', url: 'https://placehold.co/128x128/ef4444/ffffff?text=R1', name: 'Robot Rojo', cost: 300 },
    { id: 'avatar07', url: 'https://placehold.co/128x128/14b8a6/ffffff?text=A2', name: 'Astronauta Teal', cost: 400 },
    { id: 'avatar08', url: 'https://placehold.co/128x128/d946ef/ffffff?text=F1', name: 'Hada Fucsia', cost: 400 },
    { id: 'avatar09', url: 'https://placehold.co/128x128/fde047/ffffff?text=S1', name: 'Superestrella Dorada', cost: 500 },
    { id: 'avatar10', url: 'https://placehold.co/128x128/0f172a/ffffff?text=D1', name: 'Detective Nocturno', cost: 600 },
    // Nuevos Avatares
    { id: 'avatar11', url: 'https://placehold.co/128x128/78716c/ffffff?text=G2', name: 'Guerrero Jaguar', cost: 750 },
    { id: 'avatar12', url: 'https://placehold.co/128x128/be123c/ffffff?text=A3', name: 'Adelita Revolucionaria', cost: 750 },
    { id: 'avatar13', url: 'https://placehold.co/128x128/166534/ffffff?text=P1', name: 'Piloto de Rally', cost: 800 },
    { id: 'avatar14', url: 'https://placehold.co/128x128/9a3412/ffffff?text=M2', name: 'Minero del Bajío', cost: 850 },
    { id: 'avatar15', url: 'https://placehold.co/128x128/a21caf/ffffff?text=C2', name: 'Científica del Bajío', cost: 900 },
    { id: 'avatar16', url: 'https://placehold.co/128x128/fbbf24/ffffff?text=E1', name: 'Estudiantina Alegre', cost: 950 },
    { id: 'avatar17', url: 'https://placehold.co/128x128/4d7c0f/ffffff?text=A4', name: 'Agricultor de Fresas', cost: 1000 },
    { id: 'avatar18', url: 'https://placehold.co/128x128/1e3a8a/ffffff?text=M3', name: 'Momia Amistosa', cost: 1100 },
    { id: 'avatar19', url: 'https://placehold.co/128x128/b91c1c/ffffff?text=C3', name: 'Charro Elegante', cost: 1200 },
    { id: 'avatar20', url: 'https://placehold.co/128x128/065f46/ffffff?text=A5', name: 'Artesana de Cerámica', cost: 1300 },
    { id: 'avatar21', url: 'https://placehold.co/128x128/facc15/ffffff?text=P2', name: 'El Pípila Valiente', cost: 1500 },
    { id: 'avatar22', url: 'https://placehold.co/128x128/7e22ce/ffffff?text=H1', name: 'Huapanguero Poeta', cost: 1600 },
    { id: 'avatar23', url: 'https://placehold.co/128x128/4a044e/ffffff?text=L1', name: 'Luchador Enmascarado', cost: 1800 },
    { id: 'avatar24', url: 'https://placehold.co/128x128/ea580c/ffffff?text=F2', name: 'Globo Aerostático', cost: 2000 },
    { id: 'avatar25', url: 'https://placehold.co/128x128/ca8a04/ffffff?text=L2', name: 'Leyenda Dorada', cost: 2500 }, */

];

export const MUNICIPIOS = [
    { 
        id: 1, nombre: "Abasolo", 
        descripcion: "Conocido por sus balnearios de aguas termales y su producción agrícola, especialmente de trigo.", 
        //imagen: "https://placehold.co/800x600/3b82f6/ffffff?text=Abasolo", 
        imagen: "../img/Municipios/01_Abasolo.jpg", 
        datos: ["Naturaleza: Famoso por los balnearios La Caldera y Los Pinos, con aguas termales curativas.", "Historia: Lugar de nacimiento de Miguel Hidalgo según algunas fuentes, aunque Pénjamo es el sitio oficial.", "Gastronomía: Prueba el pan de Abasolo, una delicia local.", "Economía: Importante productor de trigo y sorgo en la región del Bajío."],
        fullInfo: {
            text: "Abasolo es un destino ideal para la relajación y el bienestar gracias a sus famosas aguas termales. La ciudad cuenta con varios parques acuáticos y balnearios que son perfectos para un día en familia. Además de su vocación turística, Abasolo es un pilar en la agricultura del estado, con vastos campos de trigo que ondean dorados bajo el sol del Bajío. Su historia también es rica, siendo uno de los lugares que se disputa la cuna del Padre de la Patria, Don Miguel Hidalgo y Costilla.",
            images: ["https://placehold.co/400x300/3b82f6/ffffff?text=Balneario", "https://placehold.co/400x300/3b82f6/ffffff?text=Campo+de+Trigo", "https://placehold.co/400x300/3b82f6/ffffff?text=Centro+Histórico"]
        }
    },
    { 
        id: 2, nombre: "Acámbaro", 
        descripcion: "Famoso por su delicioso pan, su acueducto colonial y las misteriosas figurillas prehispánicas.", 
        //imagen: "https://placehold.co/800x600/6366f1/ffffff?text=Acámbaro", 
        imagen: "../img/Municipios/02_Acambaro.jpg", 
        datos: ["Gastronomía: El pan de Acámbaro, en especial las 'acambaritas', es famoso en todo México.", "Arquitectura: El Acueducto de Acámbaro, del siglo XVI, es un ícono de la ciudad.", "Misterio: Las Figurillas de Waldemar Julsrud, que supuestamente representan dinosaurios, son un enigma local.", "Historia: Fue un importante centro ferroviario durante el siglo XX."],
        fullInfo: {
            text: "Acámbaro es una ciudad que deleita los sentidos, especialmente el del gusto con su mundialmente famoso pan. Las 'acambaritas' y el pan de tallo son solo el comienzo. Su paisaje urbano está dominado por el majestuoso acueducto colonial, una obra de ingeniería impresionante. Pero Acámbaro también guarda un misterio: la colección de más de 30,000 figurillas de cerámica encontradas por Waldemar Julsrud, que representan animales y humanos, incluyendo figuras que se asemejan a dinosaurios, desafiando la historia como la conocemos.",
            images: ["https://placehold.co/400x300/6366f1/ffffff?text=Pan+de+Acámbaro", "https://placehold.co/400x300/6366f1/ffffff?text=Acueducto", "https://placehold.co/400x300/6366f1/ffffff?text=Figurillas"]
        }
    },
    { 
        id: 3, nombre: "San Miguel de Allende", 
        descripcion: "Ciudad Patrimonio de la Humanidad, famosa por su parroquia neogótica, su ambiente artístico y sus calles coloniales.", 
        //imagen: "https://placehold.co/800x600/ef4444/ffffff?text=San+Miguel", 
        imagen: "../img/Municipios/03_SanMigueldeAllende.jpg",
        datos: ["Arquitectura: La Parroquia de San Miguel Arcángel es su ícono, con un estilo único en México.", "Arte: Es un centro para artistas de todo el mundo, con numerosas galerías y estudios.", "Cultura: Famosa por sus coloridas festividades, como la Alborada y el Día de los Locos.", "Reconocimiento: Nombrada 'La Mejor Ciudad del Mundo' por varias publicaciones internacionales."],
        fullInfo: {
            text: "San Miguel de Allende es una joya colonial que enamora a visitantes de todo el mundo. Sus calles empedradas, sus patios floridos y su vibrante escena artística la convierten en un lugar mágico. El corazón de la ciudad es la Parroquia de San Miguel Arcángel, una iglesia de cantera rosa que parece sacada de un cuento de hadas. Es un lugar donde la historia se encuentra con la modernidad, ofreciendo desde galerías de arte de vanguardia hasta tranquilas plazas donde el tiempo parece detenerse.",
            images: ["https://placehold.co/400x300/ef4444/ffffff?text=Parroquia", "https://placehold.co/400x300/ef4444/ffffff?text=Calle+Colonial", "https://placehold.co/400x300/ef4444/ffffff?text=Artesanías"]
        }
    },
    {
        id: 4, nombre: "Apaseo el Alto",
        descripcion: "Conocido como la capital de la artesanía en madera tallada, creando impresionantes muebles y esculturas.",
        //imagen: "https://placehold.co/800x600/f97316/ffffff?text=Apaseo+el+Alto", 
        imagen: "../img/Municipios/04_ApaseoelAlto.jpg",
        datos: ["Artesanía: Capital de la madera tallada. Los artesanos locales son maestros en la creación de obras de arte.", "Historia: Región con vestigios de culturas prehispánicas como la Chupícuaro.", "Dato Curioso: Su nombre proviene del náhuatl 'Apatzeo', que significa 'lugar de comadrejas'.", "Tradición: La fiesta patronal en honor a San Andrés Apóstol es la más importante."],
        fullInfo: {
            text: "En Apaseo el Alto, la madera cobra vida. Este municipio es célebre por el talento de sus artesanos, quienes transforman simples trozos de madera en detalladas esculturas, muebles ornamentados y juguetes tradicionales. Visitar sus talleres es adentrarse en un mundo de creatividad y herencia familiar. Además del arte, el municipio tiene una profunda historia que se remonta a asentamientos prehispánicos, cuyos vestigios aún pueden ser explorados por los más aventureros.",
            images: ["https://placehold.co/400x300/f97316/ffffff?text=Madera+Tallada", "https://placehold.co/400x300/f97316/ffffff?text=Taller+Artesanal", "https://placehold.co/400x300/f97316/ffffff?text=Iglesia+Principal"]
        }
    },
    {
        id: 5, nombre: "Apaseo el Grande",
        descripcion: "Municipio histórico con imponentes haciendas antiguas y una rica tradición charra.",
        //imagen: "https://placehold.co/800x600/eab308/ffffff?text=Apaseo+el+Grande",
        imagen: "../img/Municipios/05_ApaseoelGrande.jpg",
        datos: ["Arquitectura: Conserva cascos de haciendas coloniales como la Hacienda El Tunal.", "Tradición: Fuerte arraigo de la charrería, el deporte nacional de México.", "Gastronomía: Prueba las 'vacas echadas', un dulce típico de la región.", "Ubicación: Parte del corredor industrial del Bajío, con importante actividad económica."],
        fullInfo: {
            text: "Apaseo el Grande es un viaje al pasado glorioso de Guanajuato. Sus tierras están salpicadas de antiguas haciendas que narran historias de prosperidad y tradición. Es un lugar donde la charrería no es solo un deporte, sino un estilo de vida que se celebra con orgullo. El centro histórico, con su parroquia franciscana, invita a caminar y descubrir los detalles de su arquitectura virreinal. Su gastronomía local, con platillos y dulces únicos, es otro de sus grandes tesoros.",
            images: ["https://placehold.co/400x300/eab308/ffffff?text=Hacienda+Colonial", "https://placehold.co/400x300/eab308/ffffff?text=Lienzo+Charro", "https://placehold.co/400x300/eab308/ffffff?text=Parroquia"]
        }
    },
    {
        id: 6, nombre: "Atarjea",
        descripcion: "El municipio más recóndito y montañoso de Guanajuato, un paraíso para el ecoturismo en la Sierra Gorda.",
        //imagen: "https://placehold.co/800x600/22c55e/ffffff?text=Atarjea",
        imagen: "../img/Municipios/06_Atarjea.jpg",
        datos: ["Naturaleza: Ofrece paisajes espectaculares, ríos y grutas en la Reserva de la Biósfera de la Sierra Gorda.", "Aventura: Ideal para el senderismo, campismo y la exploración de la naturaleza virgen.", "Cultura: Hogar de comunidades con tradiciones muy arraigadas.", "Aislamiento: Es el municipio con menor densidad de población del estado."],
        fullInfo: {
            text: "Atarjea es la joya escondida de Guanajuato, un santuario de naturaleza virgen en el corazón de la Sierra Gorda. Es el destino perfecto para quienes buscan aventura y desconexión. Sus ríos cristalinos, sus profundos cañones y sus misteriosas cuevas son un llamado a la exploración. Aquí, las comunidades locales conservan un estilo de vida en armonía con el entorno, manteniendo vivas tradiciones ancestrales y ofreciendo una hospitalidad que te hace sentir en casa, lejos de todo.",
            images: ["https://placehold.co/400x300/22c55e/ffffff?text=Sierra+Gorda", "https://placehold.co/400x300/22c55e/ffffff?text=Río+Atarjea", "https://placehold.co/400x300/22c55e/ffffff?text=Cueva"]
        }
    },
    {
        id: 7, nombre: "Celaya",
        descripcion: "Conocida como la 'Puerta de Oro del Bajío', es famosa por su cajeta y su arquitectura neoclásica.",
        //imagen: "https://placehold.co/800x600/ec4899/ffffff?text=Celaya",
        imagen: "../img/Municipios/07_Celaya.jpg",
        datos: ["Gastronomía: La cajeta de Celaya tiene denominación de origen y es su producto más famoso.", "Historia: Fue escenario de importantes batallas durante la Revolución Mexicana.", "Arquitectura: El Templo del Carmen, diseñado por Francisco Eduardo Tresguerras, es una joya del neoclásico.", "Dato Curioso: La 'Bola de Agua' es un icónico tanque de agua elevado, único en México."],
        fullInfo: {
            text: "Celaya es una ciudad dulce y monumental. Es imposible hablar de Celaya sin mencionar su exquisita cajeta, un manjar de leche de cabra que ha conquistado paladares en todo el mundo. Pero más allá de su gastronomía, la ciudad es un museo de arquitectura al aire libre, con las obras maestras neoclásicas del arquitecto Francisco Eduardo Tresguerras. Su centro histórico, con la icónica Bola de Agua, es un testimonio de su importancia histórica y económica como la 'Puerta de Oro del Bajío'.",
            images: ["https://placehold.co/400x300/ec4899/ffffff?text=Cajeta", "https://placehold.co/400x300/ec4899/ffffff?text=Templo+del+Carmen", "https://placehold.co/400x300/ec4899/ffffff?text=Bola+de+Agua"]
        }
    },
    {
        id: 8, nombre: "Manuel Doblado",
        descripcion: "Municipio agrícola con una rica historia, antes conocido como 'Piedra Gorda'.",
        //imagen: "https://placehold.co/800x600/84cc16/ffffff?text=Manuel+Doblado",
        imagen: "../img/Municipios/08_ManuelDoblado.jpg",
        datos: ["Historia: Nombrado en honor a un gobernador liberal del siglo XIX.", "Naturaleza: La presa de la Soledad es un lugar importante para la comunidad y la recreación.", "Cultura: Conserva tradiciones y fiestas patronales con gran fervor.", "Arqueología: Cerca se encuentra la zona arqueológica de Plazuelas."],
        fullInfo: {
            text: "Manuel Doblado, antiguamente llamado San Pedro Piedra Gorda, es un municipio con un fuerte carácter agrícola y un profundo sentido de la historia. Nombrado en honor al ilustre general y gobernador liberal, este lugar es un reflejo del Guanajuato trabajador. Sus campos fértiles producen granos que alimentan a la región, mientras que la Presa de la Soledad ofrece un espacio de esparcimiento para las familias. Su cercanía a importantes zonas arqueológicas lo convierte en un punto de partida para explorar el pasado prehispánico del estado.",
            images: ["https://placehold.co/400x300/84cc16/ffffff?text=Plaza+Principal", "https://placehold.co/400x300/84cc16/ffffff?text=Presa+la+Soledad", "https://placehold.co/400x300/84cc16/ffffff?text=Campo+Agrícola"]
        }
    },
    {
        id: 9, nombre: "Comonfort",
        descripcion: "Pueblo Mágico famoso por sus molcajetes de piedra volcánica y sus tortillas ceremoniales.",
        //imagen: "https://placehold.co/800x600/14b8a6/ffffff?text=Comonfort",
        imagen: "../img/Municipios/09_Comonfort.jpg",
        datos: ["Artesanía: Los artesanos locales son maestros en tallar la piedra volcánica para crear molcajetes.", "Gastronomía: Prueba la 'tortilla ceremonial', estampada con sellos de madera.", "Historia: Originalmente llamado 'Chamacuero', cambió su nombre en honor al presidente Ignacio Comonfort.", "Turismo: Es uno de los Pueblos Mágicos de Guanajuato."],
        fullInfo: {
            text: "Comonfort es un Pueblo Mágico donde las tradiciones ancestrales se sienten en el aire y se saborean en la comida. Es la cuna del molcajete, el utensilio prehispánico que da un sabor inigualable a las salsas. Aquí, los artesanos dominan el arte de tallar la dura piedra volcánica. Otro tesoro son las tortillas ceremoniales, lienzos comestibles estampados con sellos de madera que cuentan historias de fe y comunidad. Recorrer sus calles es descubrir la esencia del México más auténtico.",
            images: ["https://placehold.co/400x300/14b8a6/ffffff?text=Molcajete", "https://placehold.co/400x300/14b8a6/ffffff?text=Tortilla+Ceremonial", "https://placehold.co/400x300/14b8a6/ffffff?text=Parroquia+de+San+Francisco"]
        }
    },
    {
        id: 10, nombre: "Coroneo",
        descripcion: "Pequeño municipio en la frontera con Michoacán, conocido por su producción de lana y textiles.",
        //imagen: "https://placehold.co/800x600/f43f5e/ffffff?text=Coroneo",
        imagen: "../img/Municipios/10_Coroneo.jpg",
        datos: ["Artesanía: Famoso por sus sarapes y cobijas de lana, tejidos en telares tradicionales.", "Naturaleza: Rodeado de bosques de encino y pino.", "Tranquilidad: Un lugar ideal para escapar del bullicio y disfrutar de la vida rural.", "Límites: Es uno de los municipios fronterizos con el estado de Michoacán."],
        fullInfo: {
            text: "Coroneo es un refugio de paz y tradición en las alturas de Guanajuato. Este municipio es sinónimo de calidez, no solo por su gente, sino también por los hermosos sarapes y cobijas de lana que se tejen en telares de pedal, una técnica heredada por generaciones. Rodeado de paisajes boscosos, Coroneo invita a disfrutar de la naturaleza y de un ritmo de vida más pausado. Es el lugar perfecto para quienes aprecian el valor de lo hecho a mano y la belleza de lo simple.",
            images: ["https://placehold.co/400x300/f43f5e/ffffff?text=Sarape+de+Lana", "https://placehold.co/400x300/f43f5e/ffffff?text=Paisaje+Boscoso", "https://placehold.co/400x300/f43f5e/ffffff?text=Iglesia+de+Santiago+Apóstol"]
        }
    },
    {
        id: 11, nombre: "Cortazar",
        descripcion: "Corazón del Bajío, fue escenario de la primera batalla de la Independencia y hoy es un importante centro industrial.",
        //imagen: "https://placehold.co/800x600/e11d48/ffffff?text=Cortazar",
        imagen: "../img/Municipios/11_Cortazar.jpg",
        datos: ["Historia: Fue el sitio de la primera batalla formal de la guerra de Independencia.", "Industria: Parte del corredor industrial del Bajío, con importante actividad manufacturera.", "Cultura: El Centro Cultural Cortazar es un espacio vital para las artes locales.", "Personaje: Nombrado en honor a Luis Cortázar y Rábago, héroe insurgente."],
        fullInfo: {
            text: "Cortazar es un municipio de contrastes, donde la historia heroica se fusiona con el dinamismo industrial. Aquí se libró la primera batalla organizada del movimiento de Independencia, un hecho que marcó el destino de la nación. Hoy, Cortazar es un motor económico en el corredor industrial del Bajío, pero no olvida sus raíces. Su centro histórico y su activo centro cultural demuestran que el progreso y la preservación de la identidad pueden ir de la mano.",
            images: ["https://placehold.co/400x300/e11d48/ffffff?text=Monumento+a+la+Batalla", "https://placehold.co/400x300/e11d48/ffffff?text=Centro+Cultural", "https://placehold.co/400x300/e11d48/ffffff?text=Parque+Industrial"]
        }
    },
    {
        id: 12, nombre: "Cuerámaro",
        descripcion: "Tierra de manantiales y leyendas, rodeado de cerros y con una importante producción agrícola.",
        //imagen: "https://placehold.co/800x600/0ea5e9/ffffff?text=Cuerámaro",
        imagen: "../img/Municipios/12_Cuerámaro.jpg",
        datos: ["Naturaleza: El Cerro del Fuerte y sus manantiales son parte de su identidad.", "Agricultura: Gran productor de granos como sorgo y maíz.", "Leyenda: Se cuentan historias de tesoros escondidos en sus cerros.", "Personaje: Cuna del cantautor y actor José Alfredo Jiménez (aunque se registró en Dolores Hidalgo)."],
        fullInfo: {
            text: "Cuerámaro es tierra de aguas cristalinas y de historias que se susurran entre sus cerros. Su nombre purépecha significa 'guarida de cuervos', y su entorno natural es tan rico como sus leyendas. Famoso por sus manantiales, es un lugar que valora sus recursos hídricos. La agricultura es el pilar de su economía, pero el espíritu del lugar está en sus leyendas de tesoros y en ser la cuna no oficial de uno de los más grandes compositores de México, José Alfredo Jiménez.",
            images: ["https://placehold.co/400x300/0ea5e9/ffffff?text=Manantial", "https://placehold.co/400x300/0ea5e9/ffffff?text=Cerro+del+Fuerte", "https://placehold.co/400x300/0ea5e9/ffffff?text=Plaza+Principal"]
        }
    },
    {
        id: 13, nombre: "Doctor Mora",
        descripcion: "Municipio del noreste, conocido por su clima semidesértico y la calidez de su gente.",
        //imagen: "https://placehold.co/800x600/a855f7/ffffff?text=Doctor+Mora",
        imagen: "../img/Municipios/13_DoctorMora.jpg",
        datos: ["Cultura: Hogar de la 'Danza de los Concheros', una tradición llena de sincretismo.", "Historia: Nombrado en honor a José María Luis Mora, uno de los padres del liberalismo mexicano.", "Naturaleza: Paisajes semidesérticos con una flora y fauna únicas.", "Gastronomía: Prueba el 'atole de aguamiel', una bebida tradicional."],
        fullInfo: {
            text: "Doctor Mora es la puerta al semidesierto de Guanajuato, un lugar donde la vida florece con resiliencia y belleza. Nombrado en honor a una de las mentes más brillantes del liberalismo mexicano, este municipio es rico en tradiciones. La Danza de los Concheros es una de sus expresiones culturales más vibrantes. Sus paisajes, dominados por cactáceas y matorrales, ofrecen una belleza distinta y serena, ideal para quienes buscan conocer el otro rostro de Guanajuato.",
            images: ["https://placehold.co/400x300/a855f7/ffffff?text=Danza+Concheros", "https://placehold.co/400x300/a855f7/ffffff?text=Paisaje+Semidesértico", "https://placehold.co/400x300/a855f7/ffffff?text=Parroquia"]
        }
    },
    {
        id: 14, nombre: "Dolores Hidalgo C.I.N.",
        descripcion: "Cuna de la Independencia de México, donde el cura Miguel Hidalgo dio el famoso 'Grito de Dolores' en 1810.",
        //imagen: "https://placehold.co/800x600/16a34a/ffffff?text=Dolores+Hidalgo",
        imagen: "../img/Municipios/14_DoloresHidalgo.jpg",
        datos: ["Historia: Aquí inició la lucha por la Independencia de México.", "Gastronomía: Famosa por sus nieves de sabores exóticos, como aguacate, chicharrón y camarón.", "Artesanía: Importante centro de producción de cerámica mayólica.", "Personaje: Cuna del gran compositor José Alfredo Jiménez."],
        fullInfo: {
            text: "En Dolores Hidalgo Cuna de la Independencia Nacional (C.I.N.), cada calle y cada plaza resuenan con la historia de México. Fue aquí, desde el atrio de su parroquia, donde el cura Miguel Hidalgo llamó al pueblo a levantarse en armas, iniciando la lucha por la libertad. Hoy, además de ser un santuario cívico, Dolores es un lugar vibrante, famoso por su colorida cerámica mayólica y sus audaces nieves de sabores que no encontrarás en ningún otro lugar. También es la tierra que vio nacer y que inspira las canciones de José Alfredo Jiménez.",
            images: ["https://placehold.co/400x300/16a34a/ffffff?text=Parroquia+de+Dolores", "https://placehold.co/400x300/16a34a/ffffff?text=Nieves+Exóticas", "https://placehold.co/400x300/16a34a/ffffff?text=Cerámica+Mayólica"]
        }
    },
    { 
        id: 15, nombre: "Guanajuato", 
        descripcion: "Capital del estado, ciudad Patrimonio de la Humanidad, famosa por sus callejones, túneles y momias.", 
        //imagen: "https://placehold.co/800x600/0284c7/ffffff?text=Guanajuato", 
        imagen: "../img/Municipios/15_Guanajuato.jpg",
        datos: ["Cultura: Sede del Festival Internacional Cervantino.", "Arquitectura: Sus túneles subterráneos son únicos en el mundo.", "Leyenda: El Callejón del Beso es una parada obligatoria.", "Atracción: El Museo de las Momias es famoso internacionalmente."],
        fullInfo: {
            text: "Guanajuato es una ciudad mágica y vibrante. Sus calles subterráneas, sus coloridas fachadas y su ambiente bohemio la convierten en un destino inolvidable. Cuna de grandes artistas como Diego Rivera, la ciudad respira arte y cultura en cada rincón. No te pierdas un recorrido con una estudiantina para conocer sus leyendas.",
            images: ["https://placehold.co/400x300/0284c7/ffffff?text=Teatro+Juárez", "https://placehold.co/400x300/0284c7/ffffff?text=Callejón+del+Beso", "https://placehold.co/400x300/0284c7/ffffff?text=Universidad"]
        }
    },
    {
        id: 16, nombre: "Huanímaro",
        descripcion: "Municipio con una fuerte tradición agrícola y famoso por su producción de tequila.",
        //imagen: "https://placehold.co/800x600/c026d3/ffffff?text=Huanímaro",
        imagen: "../img/Municipios/16_Huanímaro.jpg",
        datos: ["Industria: Hogar de destilerías de tequila que aprovechan el agave de la región.", "Gastronomía: Prueba la 'sopa de fiesta', un platillo tradicional de la zona.", "Historia: Su nombre purépecha significa 'lugar de trueque'.", "Naturaleza: Paisajes dominados por campos de agave azul."],
        fullInfo: {
            text: "Huanímaro es tierra de agave y tequila. Este municipio forma parte de la denominación de origen del tequila, y sus campos azules son un espectáculo digno de verse. Aquí se puede aprender sobre el proceso de elaboración de esta icónica bebida mexicana, desde la jima hasta la destilación. La vida en Huanímaro gira en torno a la agricultura y sus tradiciones, como la 'sopa de fiesta', un platillo que une a la comunidad en celebraciones especiales. Su nombre, 'lugar de trueque', habla de su histórica vocación comercial.",
            images: ["https://placehold.co/400x300/c026d3/ffffff?text=Campo+de+Agave", "https://placehold.co/400x300/c026d3/ffffff?text=Destilería", "https://placehold.co/400x300/c026d3/ffffff?text=Plaza+Principal"]
        }
    },
    {
        id: 17, nombre: "Irapuato",
        descripcion: "Conocida como la 'Capital Mundial de la Fresa' por su alta producción de esta deliciosa fruta.",
        //imagen: "https://placehold.co/800x600/8b5cf6/ffffff?text=Irapuato",
        imagen: "../img/Municipios/17_Irapuato.jpg",
        datos: ["Agricultura: Principal productor de fresas en México.", "Gastronomía: Prueba la 'cristalita', una fresa cubierta de chile, y la mermelada local.", "Cultura: El Festival de la Fresa celebra la cosecha con eventos y comida.", "Arquitectura: La Fuente de las Aguas Danzarinas es un punto de encuentro popular."],
        fullInfo: {
            text: "Irapuato huele y sabe a fresa. Esta dinámica ciudad es el corazón de la producción fresera de México, y su identidad está ligada a esta fruta roja y jugosa. Aquí puedes encontrar fresas en todas sus formas: frescas, cristalizadas, con crema, en mermelada o incluso en platillos salados. Pero Irapuato es más que fresas; es un importante centro económico con un centro histórico que vale la pena explorar, destacando sus plazas y la impresionante Fuente de las Aguas Danzarinas.",
            images: ["https://placehold.co/400x300/8b5cf6/ffffff?text=Fresas", "https://placehold.co/400x300/8b5cf6/ffffff?text=Fuente+Danzarina", "https://placehold.co/400x300/8b5cf6/ffffff?text=Catedral"]
        }
    },
    {
        id: 18, nombre: "Jaral del Progreso",
        descripcion: "Famoso por su producción de hortalizas y por sus numerosos parques acuáticos y balnearios.",
        //imagen: "https://placehold.co/800x600/f43f5e/ffffff?text=Jaral+del+Progreso",
        imagen: "../img/Municipios/18_JaraldelProgreso.jpg",
        datos: ["Agricultura: Gran productor de brócoli, ajo y zanahoria.", "Turismo: Cuenta con numerosos parques acuáticos y balnearios.", "Gastronomía: Las 'frutas de horno' son galletas tradicionales de la región.", "Historia: Fue escenario de importantes eventos durante la Revolución Mexicana."],
        fullInfo: {
            text: "Jaral del Progreso es un oasis de diversión y productividad en el Bajío. Por un lado, sus tierras fértiles lo convierten en un gigante de la producción de hortalizas, exportando brócoli y ajo a todo el mundo. Por otro, es un destino turístico popular gracias a su corredor de balnearios y parques acuáticos, que ofrecen un respiro refrescante del calor. Su historia revolucionaria y sus tradiciones culinarias, como las deliciosas 'frutas de horno', completan el atractivo de este progresista municipio.",
            images: ["https://placehold.co/400x300/f43f5e/ffffff?text=Balneario", "https://placehold.co/400x300/f43f5e/ffffff?text=Campo+de+Brócoli", "https://placehold.co/400x300/f43f5e/ffffff?text=Plaza+Principal"]
        }
    },
    {
        id: 19, nombre: "Jerécuaro",
        descripcion: "Rodeado de montañas y bosques, es un lugar con una rica historia y tradiciones religiosas.",
        //imagen: "https://placehold.co/800x600/fbbf24/ffffff?text=Jerécuaro",
        imagen: "../img/Municipios/19_Jerécuaro.jpg",
        datos: ["Naturaleza: Bellos paisajes boscosos ideales para el ecoturismo.", "Historia: Importante centro religioso con un imponente santuario.", "Cultura: Sus fiestas patronales son de las más vistosas de la región.", "Etimología: Su nombre significa 'lugar como nido' en purépecha."],
        fullInfo: {
            text: "Jerécuaro es un municipio de fe y naturaleza. Su nombre, que significa 'lugar como nido', describe perfectamente su ubicación, acunado entre montañas y bosques. Es un destino ideal para los amantes del ecoturismo, con paisajes que invitan a la caminata y la contemplación. El corazón espiritual de Jerécuaro es su santuario, un importante centro de peregrinación. Las fiestas patronales transforman el pueblo con danzas, música y color, mostrando la devoción y alegría de su gente.",
            images: ["https://placehold.co/400x300/fbbf24/ffffff?text=Santuario", "https://placehold.co/400x300/fbbf24/ffffff?text=Paisaje+Montañoso", "https://placehold.co/400x300/fbbf24/ffffff?text=Fiesta+Patronal"]
        }
    },
    {
        id: 20, nombre: "León",
        descripcion: "La ciudad más grande del estado, 'Capital Mundial del Calzado' y un importante centro de negocios.",
        //imagen: "https://placehold.co/800x600/f59e0b/ffffff?text=León",
        imagen: "../img/Municipios/20_León.jpg",
        datos: ["Industria: Líder mundial en producción de calzado y artículos de piel.", "Cultura: Alberga el Festival Internacional del Globo y la Feria Estatal de León.", "Gastronomía: No te vayas sin probar una 'guacamaya', un bolillo relleno de chicharrón.", "Deporte: Sede del Club León, uno de los equipos de fútbol más importantes de México."],
        fullInfo: {
            text: "León es la metrópoli vibrante de Guanajuato, una ciudad que nunca se detiene. Mundialmente reconocida por su industria del calzado y la piel, aquí encontrarás productos de la más alta calidad. Pero León es mucho más: es la sede del espectacular Festival Internacional del Globo, que llena el cielo de colores, y de una de las ferias más importantes del país. Su gastronomía callejera, con la crujiente 'guacamaya' como estandarte, y la pasión por su equipo de fútbol, hacen de León una ciudad con una energía contagiosa.",
            images: ["https://placehold.co/400x300/f59e0b/ffffff?text=Festival+del+Globo", "https://placehold.co/400x300/f59e0b/ffffff?text=Arco+de+la+Calzada", "https://placehold.co/400x300/f59e0b/ffffff?text=Zapatos+de+Piel"]
        }
    },
    {
        id: 21, nombre: "Moroleón",
        descripcion: "Importante centro textil y comercial, famoso por su ropa y su gigantesco tianguis.",
        //imagen: "https://placehold.co/800x600/d946ef/ffffff?text=Moroleón",
        imagen: "../img/Municipios/21_Moroleón.jpg",
        datos: ["Comercio: Junto con Uriangato, forma un corredor textil de gran importancia nacional.", "Industria: Miles de talleres y fábricas se dedican a la confección de ropa.", "Dato Curioso: Su nombre es un compuesto de 'Moro', su antiguo nombre, y 'León', en honor al general insurgente.", "Turismo: Atrae a miles de compradores de todo el país cada semana."],
        fullInfo: {
            text: "Moroleón es el paraíso de las compras textiles en el centro de México. Esta ciudad, junto con su vecina Uriangato, forma un dinámico corredor comercial donde se puede encontrar ropa de todo tipo a precios increíbles. Sus calles se transforman en un gigantesco tianguis, especialmente los fines de semana, atrayendo a comerciantes y familias en busca de las mejores ofertas. La ciudad es un hervidero de actividad, un testimonio del espíritu emprendedor de su gente.",
            images: ["https://placehold.co/400x300/d946ef/ffffff?text=Tianguis+Textil", "https://placehold.co/400x300/d946ef/ffffff?text=Fábrica+de+Ropa", "https://placehold.co/400x300/d946ef/ffffff?text=Jardín+Principal"]
        }
    },
    {
        id: 22, nombre: "Ocampo",
        descripcion: "Municipio del norte, puerta a paisajes semidesérticos y con una historia ligada a la minería.",
        //imagen: "https://placehold.co/800x600/10b981/ffffff?text=Ocampo",
        imagen: "../img/Municipios/22_Ocampo.jpg",
        datos: ["Naturaleza: Paisajes áridos de gran belleza, con cactáceas y formaciones rocosas.", "Historia: Antiguas minas de plata y oro forman parte de su pasado.", "Cultura: Conserva la sencillez y tradiciones de los pueblos del norte.", "Arqueología: Cerca se encuentra la zona arqueológica de El Cóporo."],
        fullInfo: {
            text: "Ocampo ofrece una ventana al Guanajuato más norteño y semidesértico. Sus paisajes, salpicados de cactus y gobernados por un cielo inmenso, tienen una belleza austera y cautivadora. La historia de Ocampo está grabada en sus antiguas minas, que recuerdan un pasado de bonanza y trabajo duro. Es un lugar que invita a la tranquilidad y a la exploración de sitios arqueológicos cercanos como El Cóporo, que revelan la presencia de culturas antiguas en esta tierra resiliente.",
            images: ["https://placehold.co/400x300/10b981/ffffff?text=Paisaje+Semidesértico", "https://placehold.co/400x300/10b981/ffffff?text=Mina+Antigua", "https://placehold.co/400x300/10b981/ffffff?text=Parroquia+de+Ocampo"]
        }
    },
    {
        id: 23, nombre: "Pénjamo",
        descripcion: "Cuna de Miguel Hidalgo y Costilla, el 'Padre de la Patria', y tierra de tequila.",
        //imagen: "https://placehold.co/800x600/0ea5e9/ffffff?text=Pénjamo",
        imagen: "../img/Municipios/23_Pénjamo.jpg",
        datos: ["Historia: La Ex-Hacienda de Corralejo es el lugar exacto donde nació Miguel Hidalgo.", "Industria: Importante zona de producción de tequila, con varias destilerías.", "Naturaleza: La zona arqueológica de Plazuelas revela vestigios de una antigua ciudad.", "Turismo: El Tequil-Tour es una experiencia popular para los visitantes."],
        fullInfo: {
            text: "Pénjamo es tierra de héroes y de la bebida más emblemática de México. Aquí, en la Ex-Hacienda de Corralejo, nació el hombre que iniciaría la lucha por la Independencia: Miguel Hidalgo. Este legado histórico se combina con el aroma del agave cocido, ya que Pénjamo es una importante región productora de tequila. Los visitantes pueden recorrer las destilerías, descubrir el proceso de elaboración y, por supuesto, degustar el tequila. Además, la zona arqueológica de Plazuelas añade una capa más de profundidad histórica a este fascinante municipio.",
            images: ["https://placehold.co/400x300/0ea5e9/ffffff?text=Hacienda+Corralejo", "https://placehold.co/400x300/0ea5e9/ffffff?text=Tequila", "https://placehold.co/400x300/0ea5e9/ffffff?text=Zona+Arqueológica+Plazuelas"]
        }
    },
    {
        id: 24, nombre: "Pueblo Nuevo",
        descripcion: "Pequeño y tranquilo municipio en el corazón del Bajío, dedicado a la agricultura.",
        //imagen: "https://placehold.co/800x600/84cc16/ffffff?text=Pueblo+Nuevo",
        imagen: "../img/Municipios/24_PuebloNuevo.jpg",
        datos: ["Agricultura: Destaca por el cultivo de sorgo, maíz y trigo.", "Tranquilidad: Un lugar apacible que conserva el encanto de la vida rural.", "Historia: Fundado en el siglo XVII, es uno de los municipios más jóvenes.", "Gastronomía: Famoso por sus 'cajetas de leche' caseras."],
        fullInfo: {
            text: "Pueblo Nuevo es un remanso de paz en el fértil Bajío guanajuatense. La vida aquí transcurre a un ritmo tranquilo, marcada por los ciclos de la siembra y la cosecha. Es uno de los municipios más pequeños y jóvenes del estado, y ha conservado un auténtico ambiente de pueblo. Sus campos producen granos de alta calidad, y sus familias mantienen vivas tradiciones culinarias, como la elaboración de deliciosas cajetas y dulces de leche de manera artesanal. Es el lugar ideal para experimentar la vida rural de Guanajuato.",
            images: ["https://placehold.co/400x300/84cc16/ffffff?text=Campo+de+Sorgo", "https://placehold.co/400x300/84cc16/ffffff?text=Parroquia+de+la+Candelaria", "https://placehold.co/400x300/84cc16/ffffff?text=Vida+Rural"]
        }
    },
    {
        id: 25, nombre: "Purísima del Rincón",
        descripcion: "Hogar de la 'Judea', una de las tradiciones de Semana Santa más famosas, y cuna del pintor Hermenegildo Bustos.",
        //imagen: "https://placehold.co/800x600/65a30d/ffffff?text=Purísima+del+Rincón",
        imagen: "../img/Municipios/25_PurísimadelRincón.jpg",
        datos: ["Tradición: La Judea es una representación teatral popular con máscaras coloridas y más de 300 actores.", "Arte: Tierra del pintor Hermenegildo Bustos, uno de los más grandes retratistas de México.", "Naturaleza: El Parque Cañada de los Negros es un área natural protegida.", "Dato Curioso: Las máscaras de la Judea son hechas por artesanos locales y son piezas de arte."],
        fullInfo: {
            text: "Purísima del Rincón es un escenario de arte y fe. Cada Semana Santa, sus calles se transforman para dar vida a La Judea, una de las representaciones de la Pasión de Cristo más espectaculares y antiguas de México. Las coloridas máscaras, hechas por artesanos locales, son su sello distintivo. Este municipio es también la cuna de Hermenegildo Bustos, un pintor extraordinario del siglo XIX cuyos retratos capturaron el alma de su gente. Purísima es un lugar donde el arte popular y el arte culto se dan la mano.",
            images: ["https://placehold.co/400x300/65a30d/ffffff?text=Máscara+de+la+Judea", "https://placehold.co/400x300/65a30d/ffffff?text=Retrato+de+Bustos", "https://placehold.co/400x300/65a30d/ffffff?text=Cañada+de+los+Negros"]
        }
    },
    {
        id: 26, nombre: "Romita",
        descripcion: "Municipio agrícola con una rica historia que se remonta a la época prehispánica.",
        //imagen: "https://placehold.co/800x600/fbbf24/ffffff?text=Romita",
        imagen: "../img/Municipios/26_Romita.jpg",
        datos: ["Historia: En su territorio se encuentra la zona arqueológica de 'El Cóporo'.", "Agricultura: Importante productor de sorgo y ajo.", "Cultura: La Parroquia de Santa María de Guadalupe es el corazón de la ciudad.", "Personaje: Nombrado en honor a la esposa del presidente Manuel González, Carmen Romero Rubio de Díaz."],
        fullInfo: {
            text: "Romita es una tierra de raíces profundas. Su historia es palpable en la imponente zona arqueológica de El Cóporo, un asentamiento prehispánico que dominaba la región. Hoy, Romita es un municipio próspero, con una fuerte vocación agrícola, destacando por la calidad de su ajo. Su centro histórico, con la bella Parroquia de Santa María de Guadalupe, es el punto de encuentro de una comunidad trabajadora y orgullosa de su herencia, que abarca desde los antiguos chichimecas hasta el México moderno.",
            images: ["https://placehold.co/400x300/fbbf24/ffffff?text=El+Cóporo", "https://placehold.co/400x300/fbbf24/ffffff?text=Cultivo+de+Ajo", "https://placehold.co/400x300/fbbf24/ffffff?text=Parroquia+de+Romita"]
        }
    },
    {
        id: 27, nombre: "Salamanca",
        descripcion: "Importante centro industrial, hogar de una de las refinerías más grandes de México y un bello centro histórico.",
        //imagen: "https://placehold.co/800x600/10b981/ffffff?text=Salamanca",
        imagen: "../img/Municipios/27_Salamanca.jpg",
        datos: ["Industria: La refinería 'Ing. Antonio M. Amor' es un pilar de la economía.", "Cultura: El ex convento de San Agustín es una impresionante muestra de arte barroco.", "Tradición: Se celebra la procesión del 'Cristo Negro', una figura muy venerada.", "Naturaleza: A pesar de ser industrial, cuenta con áreas verdes como el Ecoparque."],
        fullInfo: {
            text: "Salamanca es la potencia industrial de Guanajuato. Su horizonte está definido por la impresionante estructura de la refinería de PEMEX, un motor para la economía de todo el país. Sin embargo, Salamanca tiene un corazón histórico y cultural que sorprende. El Ex Convento de San Agustín, con sus retablos barrocos bañados en oro, es una de las joyas artísticas del estado. La devoción al Cristo Negro y la vida cultural que florece en su centro demuestran que la industria y el alma pueden coexistir.",
            images: ["https://placehold.co/400x300/10b981/ffffff?text=Refinería", "https://placehold.co/400x300/10b981/ffffff?text=Ex+Convento+de+San+Agustín", "https://placehold.co/400x300/10b981/ffffff?text=Cristo+Negro"]
        }
    },
    {
        id: 28, nombre: "Salvatierra",
        descripcion: "Pueblo Mágico que destaca por su arquitectura colonial, haciendas y el imponente Puente de Batanes.",
        //imagen: "https://placehold.co/800x600/d946ef/ffffff?text=Salvatierra",
        imagen: "../img/Municipios/28_Salvatierra.jpg",
        datos: ["Arquitectura: El Puente de Batanes, del siglo XVII, es una maravilla de la ingeniería.", "Historia: Fue la primera localidad elevada al rango de ciudad en Guanajuato, en 1644.", "Gastronomía: Prueba las 'largas', unas tortillas grandes y delgadas con diversos guisados.", "Turismo: Es uno de los Pueblos Mágicos de Guanajuato."],
        fullInfo: {
            text: "Salvatierra es un tesoro colonial a orillas del río Lerma. Como la primera ciudad de Guanajuato, su traza urbana y sus edificios reflejan una gran riqueza histórica. El Puente de Batanes es su símbolo, una obra monumental que ha resistido el paso de los siglos. Pasear por su plaza principal, rodeada de conventos, casonas e iglesias, es como retroceder en el tiempo. Sus tradiciones, como la 'Marquesada', y su gastronomía única, como las 'largas', hacen de este Pueblo Mágico una experiencia inolvidable.",
            images: ["https://placehold.co/400x300/d946ef/ffffff?text=Puente+de+Batanes", "https://placehold.co/400x300/d946ef/ffffff?text=Plaza+Principal", "https://placehold.co/400x300/d946ef/ffffff?text=Hacienda"]
        }
    },
    {
        id: 29, nombre: "San Diego de la Unión",
        descripcion: "Municipio del norte, conocido por sus paisajes semidesérticos y su tradición minera.",
        //imagen: "https://placehold.co/800x600/0284c7/ffffff?text=San+Diego+de+la+Unión",
        imagen: "../img/Municipios/29_SanDiegodelaUnión.jpg",
        datos: ["Historia: Formó parte del Camino Real de Tierra Adentro, ruta de la plata.", "Naturaleza: Sus paisajes son representativos del altiplano mexicano.", "Cultura: Conserva un ambiente tranquilo y tradicional.", "Economía: Producción de hortalizas como el chile y el tomate."],
        fullInfo: {
            text: "San Diego de la Unión es un guardián de la historia en el norte de Guanajuato. Por aquí pasaba el Camino Real de Tierra Adentro, la famosa ruta por la que viajaba la plata y la cultura durante el virreinato. El municipio conserva la atmósfera tranquila de los pueblos del altiplano, con su parroquia como centro de la vida comunitaria. Sus paisajes semidesérticos tienen una belleza particular, y sus tierras son fértiles para el cultivo de hortalizas que se distribuyen por todo el país.",
            images: ["https://placehold.co/400x300/0284c7/ffffff?text=Camino+Real", "https://placehold.co/400x300/0284c7/ffffff?text=Parroquia", "https://placehold.co/400x300/0284c7/ffffff?text=Paisaje+del+Altiplano"]
        }
    },
    {
        id: 30, nombre: "San Felipe",
        descripcion: "Conocido como 'San Felipe Torres Mochas' por sus torres de iglesia inconclusas. Cuna del pulque y el mezcal.",
        //imagen: "https://placehold.co/800x600/f97316/ffffff?text=San+Felipe",
        imagen: "../img/Municipios/30_SanFelipe.jpg",
        datos: ["Gastronomía: Importante productor artesanal de pulque y mezcal.", "Historia: Sus torres parroquiales 'mochas' son su principal seña de identidad.", "Artesanía: Elaboración de piezas de alfarería y cerámica.", "Aventura: Ideal para el ciclismo de montaña y la exploración de minas antiguas."],
        fullInfo: {
            text: "San Felipe, apodado cariñosamente 'Torres Mochas', es un municipio con una identidad única. Su parroquia, con sus torres inacabadas, es un símbolo de la tenacidad de su gente. Esta es tierra de magueyes, donde se produce pulque y mezcal de manera artesanal, conservando sabores ancestrales. Sus alrededores montañosos, llenos de vestigios mineros, son un paraíso para los aventureros. San Felipe ofrece una mezcla de historia peculiar, sabores fuertes y paisajes desafiantes.",
            images: ["https://placehold.co/400x300/f97316/ffffff?text=Torres+Mochas", "https://placehold.co/400x300/f97316/ffffff?text=Maguey+y+Mezcal", "https://placehold.co/400x300/f97316/ffffff?text=Alfarería"]
        }
    },
    {
        id: 31, nombre: "San Francisco del Rincón",
        descripcion: "Vecino de León, es conocido como la 'Capital del Sombrero' y un gran productor de calzado deportivo.",
        //imagen: "https://placehold.co/800x600/65a30d/ffffff?text=San+Fco+del+Rincón",
        imagen: "../img/Municipios/31_SanFranciscodelRincón.jpg",
        datos: ["Industria: Conocido como la 'Capital del Sombrero' y un gran productor de tenis.", "Tradición: La 'Quema de Judas' es una de las representaciones de la Pasión de Cristo más importantes y coloridas de México.", "Dato Curioso: Cada año se queman miles de máscaras de Judas durante la Judea.", "Personaje: Cuna de la familia del ex-presidente de México, Vicente Fox Quesada."],
        fullInfo: {
            text: "San Francisco del Rincón es un municipio de gente trabajadora y creativa. Es la capital indiscutible del sombrero en México, produciendo millones de ellos cada año. Pero su habilidad no se detiene ahí; también es un gigante en la fabricación de calzado deportivo. Su tradición más explosiva es la 'Quema de Judas', un evento de Semana Santa lleno de sátira y pirotecnia. 'San Pancho', como se le conoce, es un ejemplo de cómo la industria y la tradición popular pueden crear una identidad vibrante.",
            images: ["https://placehold.co/400x300/65a30d/ffffff?text=Sombreros", "https://placehold.co/400x300/65a30d/ffffff?text=Tenis", "https://placehold.co/400x300/65a30d/ffffff?text=Quema+de+Judas"]
        }
    },
    {
        id: 32, nombre: "San José Iturbide",
        descripcion: "La puerta del noreste de Guanajuato, un municipio dinámico con creciente actividad industrial.",
        //imagen: "https://placehold.co/800x600/ec4899/ffffff?text=San+José+Iturbide",
        imagen: "../img/Municipios/32_SanJoséIturbide.jpg",
        datos: ["Industria: Importante desarrollo de parques industriales en los últimos años.", "Naturaleza: El cerro del Pinal es un buen lugar para el senderismo y rapel.", "Cultura: El Templo del Señor del Santo Entierro es un punto de referencia local.", "Ubicación: Estratégicamente ubicado en la carretera 57, una de las más importantes del país."],
        fullInfo: {
            text: "San José Iturbide es el rostro moderno y dinámico del noreste de Guanajuato. Gracias a su ubicación estratégica, se ha convertido en un imán para la inversión y el desarrollo industrial, con modernos parques que albergan empresas de todo el mundo. A pesar de su modernidad, no pierde su encanto provincial, con un centro tranquilo y su imponente parroquia. Para los amantes de la naturaleza, el Cerro del Pinal ofrece vistas espectaculares y la oportunidad de practicar deportes de aventura.",
            images: ["https://placehold.co/400x300/ec4899/ffffff?text=Parque+Industrial", "https://placehold.co/400x300/ec4899/ffffff?text=Cerro+del+Pinal", "https://placehold.co/400x300/ec4899/ffffff?text=Parroquia+Principal"]
        }
    },
    {
        id: 33, nombre: "San Luis de la Paz",
        descripcion: "Puerta de entrada a la Sierra Gorda y hogar de la comunidad Chichimeca-Jonaz en la Misión de Chichimecas.",
        //imagen: "https://placehold.co/800x600/0284c7/ffffff?text=San+Luis+de+la+Paz",
        imagen: "../img/Municipios/33_SanLuisdelaPaz.jpg",
        datos: ["Cultura: Fuerte presencia de la cultura Chichimeca-Jonaz y Otomí.", "Turismo: El Mineral de Pozos, un pueblo fantasma cercano, es un gran atractivo turístico.", "Historia: Fue un punto estratégico en el Camino Real de Tierra Adentro.", "Naturaleza: La Sierra Gorda ofrece paisajes impresionantes y biodiversidad."],
        fullInfo: {
            text: "San Luis de la Paz es un cruce de caminos cultural e histórico. Es la puerta de entrada a la majestuosa Sierra Gorda y el hogar de la Misión de Chichimecas, el último asentamiento de la nación Chichimeca-Jonaz. Su historia está ligada a la plata y a la defensa de la frontera durante el virreinato. Muy cerca se encuentra Mineral de Pozos, un fascinante Pueblo Mágico con ruinas mineras que parecen un escenario de película. San Luis de la Paz es un destino para quienes buscan historia, cultura viva y aventura.",
            images: ["https://placehold.co/400x300/0284c7/ffffff?text=Mineral+de+Pozos", "https://placehold.co/400x300/0284c7/ffffff?text=Misión+Chichimeca", "https://placehold.co/400x300/0284c7/ffffff?text=Centro+de+San+Luis"]
        }
    },
    {
        id: 34, nombre: "Santa Catarina",
        descripcion: "Enclavado en la Sierra Gorda, es un municipio de gran belleza natural y tradiciones otomíes.",
        //imagen: "https://placehold.co/800x600/16a34a/ffffff?text=Santa+Catarina",
        imagen: "../img/Municipios/34_SantaCatarina.jpg",
        datos: ["Naturaleza: Bosques, cañones y ríos forman parte de su geografía.", "Cultura: Fuerte presencia de la comunidad Otomí, que conserva su lengua y tradiciones.", "Artesanía: Elaboración de textiles y piezas de ixtle.", "Aventura: Ideal para el turismo rural y la exploración de la sierra."],
        fullInfo: {
            text: "Santa Catarina es un municipio que vive en profunda conexión con la naturaleza y sus raíces otomíes. Ubicado en la Sierra Gorda, ofrece paisajes de una belleza sobrecogedora, con bosques de pino y encino, y cañones por donde corren ríos de agua fresca. Las comunidades otomíes de la región mantienen vivas su lengua, su vestimenta y sus tradiciones, ofreciendo una ventana a una cultura ancestral. Es un destino perfecto para el turismo rural, para aprender de la herbolaria local y para disfrutar de la paz de la montaña.",
            images: ["https://placehold.co/400x300/16a34a/ffffff?text=Paisaje+Serrano", "https://placehold.co/400x300/16a34a/ffffff?text=Comunidad+Otomí", "https://placehold.co/400x300/16a34a/ffffff?text=Artesanía+Textil"]
        }
    },
    {
        id: 35, nombre: "Santa Cruz de Juventino Rosas",
        descripcion: "Cuna del compositor Juventino Rosas, autor del mundialmente famoso vals 'Sobre las Olas'.",
        //imagen: "https://placehold.co/800x600/c026d3/ffffff?text=Juventino+Rosas",
        imagen: "../img/Municipios/35_SantaCruzdeJuventinoRosas.jpg",
        datos: ["Música: Lugar de nacimiento de Juventino Rosas, uno de los músicos más importantes de México.", "Historia: Originalmente llamada Santa Cruz de Galeana.", "Cultura: El Museo Juventino Rosas honra la vida y obra del compositor.", "Economía: Importante actividad agrícola e industrial."],
        fullInfo: {
            text: "Santa Cruz de Juventino Rosas es un municipio que suena a vals. Es el orgulloso lugar de nacimiento de Juventino Rosas, el genio musical que compuso 'Sobre las Olas', una melodía reconocida en todo el planeta. La ciudad rinde homenaje a su hijo pródigo con un museo y monumentos. Más allá de su legado musical, es un municipio trabajador, con una economía diversificada que abarca desde la agricultura hasta la industria, mostrando el carácter progresista del Bajío.",
            images: ["https://placehold.co/400x300/c026d3/ffffff?text=Monumento+a+Juventino+Rosas", "https://placehold.co/400x300/c026d3/ffffff?text=Partitura+Sobre+las+Olas", "https://placehold.co/400x300/c026d3/ffffff?text=Jardín+Principal"]
        }
    },
    {
        id: 36, nombre: "Santiago Maravatío",
        descripcion: "El municipio más pequeño de Guanajuato, conocido por sus balnearios y su ambiente tranquilo.",
        //imagen: "https://placehold.co/800x600/f59e0b/ffffff?text=Santiago+Maravatío",
        imagen: "../img/Municipios/36_SantiagoMaravatío.jpg",
        datos: ["Naturaleza: Famoso por sus aguas termales y parques acuáticos.", "Tranquilidad: Un lugar ideal para el descanso y la relajación.", "Gastronomía: Prueba los dulces y conservas de frutas locales.", "Dato Curioso: A pesar de su tamaño, tiene una gran oferta turística de balnearios."],
        fullInfo: {
            text: "Santiago Maravatío demuestra que las mejores esencias vienen en frascos pequeños. Siendo el municipio más pequeño en extensión de Guanajuato, ha sabido aprovechar su mayor tesoro: las aguas termales. Es un destino popular para quienes buscan un fin de semana de relajación en sus numerosos balnearios. Su ambiente es apacible y acogedor, y su gente es experta en la elaboración de deliciosos dulces y conservas de las frutas que crecen en sus fértiles tierras.",
            images: ["https://placehold.co/400x300/f59e0b/ffffff?text=Balneario", "https://placehold.co/400x300/f59e0b/ffffff?text=Parroquia+de+Santiago+Apóstol", "https://placehold.co/400x300/f59e0b/ffffff?text=Dulces+Típicos"]
        }
    },
    {
        id: 37, nombre: "Silao de la Victoria",
        descripcion: "Sede del Aeropuerto Internacional del Bajío y del Cerro del Cubilete, coronado por el monumental Cristo Rey.",
        //imagen: "https://placehold.co/800x600/f97316/ffffff?text=Silao",
        imagen: "../img/Municipios/37_SilaodelaVictoria.jpg",
        datos: ["Religión: El monumento a Cristo Rey en el Cerro del Cubilete es uno de los santuarios más visitados de México.", "Industria: Importante centro logístico y automotriz.", "Dato Curioso: Se considera el centro geográfico de México.", "Conectividad: Alberga el principal aeropuerto del estado, conectando a Guanajuato con el mundo."],
        fullInfo: {
            text: "Silao es el corazón logístico y espiritual de Guanajuato. Por un lado, es un moderno centro industrial, sede de importantes plantas automotrices y del Aeropuerto Internacional del Bajío. Por otro, es el guardián del Cerro del Cubilete, sobre el cual se erige el impresionante monumento a Cristo Rey, un símbolo de fe para millones de mexicanos. Esta dualidad entre industria y devoción, modernidad y tradición, define el carácter único de Silao.",
            images: ["https://placehold.co/400x300/f97316/ffffff?text=Cristo+Rey", "https://placehold.co/400x300/f97316/ffffff?text=Parque+Industrial", "https://placehold.co/400x300/f97316/ffffff?text=Aeropuerto+del+Bajío"]
        }
    },
    {
        id: 38, nombre: "Tarandacuao",
        descripcion: "Municipio fronterizo con Michoacán, famoso por su alfarería de alta temperatura.",
        //imagen: "https://placehold.co/800x600/14b8a6/ffffff?text=Tarandacuao",
        imagen: "../img/Municipios/38_Tarandacuao.jpg",
        datos: ["Artesanía: Sus artesanos son expertos en cerámica de alta temperatura, creando piezas únicas y resistentes.", "Naturaleza: El río Lerma cruza el municipio, creando bellos paisajes.", "Historia: Su nombre purépecha significa 'lugar donde nace el agua'.", "Cultura: Fiestas patronales en honor a Santiago Apóstol en julio."],
        fullInfo: {
            text: "Tarandacuao es un lugar donde la tierra se transforma en arte. Este municipio es reconocido por la excepcional calidad de su cerámica de alta temperatura, piezas que combinan belleza y durabilidad, y que son el sustento y orgullo de muchas familias. Ubicado a orillas del río Lerma, sus paisajes son verdes y fértiles. El nombre 'lugar donde nace el agua' hace honor a su entorno. Visitar Tarandacuao es una oportunidad para adquirir artesanía única y disfrutar de la serenidad de la ribera.",
            images: ["https://placehold.co/400x300/14b8a6/ffffff?text=Alfarería", "https://placehold.co/400x300/14b8a6/ffffff?text=Río+Lerma", "https://placehold.co/400x300/14b8a6/ffffff?text=Taller+de+Cerámica"]
        }
    },
    {
        id: 39, nombre: "Tarimoro",
        descripcion: "Conocido por su producción de cacahuate y por la calidez de su gente.",
        //imagen: "https://placehold.co/800x600/eab308/ffffff?text=Tarimoro",
        imagen: "../img/Municipios/39_Tarimoro.jpg",
        datos: ["Agricultura: Es el principal productor de cacahuate en el estado.", "Gastronomía: Prueba los cacahuates garapiñados y las palanquetas locales.", "Cultura: La fiesta en honor al Señor de la Piedad es la más importante del año.", "Historia: Fundado en el siglo XVI, tiene una rica historia virreinal."],
        fullInfo: {
            text: "Tarimoro es el municipio con sabor a cacahuate. Sus campos se dedican al cultivo de esta legumbre, que se convierte en deliciosos dulces como garapiñados y palanquetas, una visita obligada para los golosos. Pero Tarimoro es más que su producto estrella; es una comunidad unida por la fe, que celebra con gran pompa a su santo patrono, el Señor de la Piedad. Su centro histórico, con su quiosco y su parroquia, es un lugar tranquilo para disfrutar de la hospitalidad de su gente.",
            images: ["https://placehold.co/400x300/eab308/ffffff?text=Cacahuates", "https://placehold.co/400x300/eab308/ffffff?text=Fiesta+Patronal", "https://placehold.co/400x300/eab308/ffffff?text=Jardín+Principal"]
        }
    },
    {
        id: 40, nombre: "Tierra Blanca",
        descripcion: "Municipio enclavado en la Sierra Gorda, con una rica herencia cultural de la nación Chichimeca-Jonaz.",
        //imagen: "https://placehold.co/800x600/22c55e/ffffff?text=Tierra+Blanca",
        imagen: "../img/Municipios/40_TierraBlanca.jpg",
        datos: ["Cultura: Conserva con fuerza las tradiciones, lengua y cosmovisión del pueblo Úza' (Chichimeca-Jonaz).", "Naturaleza: Paisajes montañosos y cañones espectaculares.", "Artesanía: Elaboración de artesanías con fibras vegetales de la región.", "Aventura: Ideal para el turismo ecológico y cultural."],
        fullInfo: {
            text: "Tierra Blanca es un bastión de la cultura Chichimeca-Jonaz en Guanajuato. Este municipio serrano es un lugar para aprender y respetar una de las culturas originarias más resilientes del país. Aquí, la lengua Úza' y las tradiciones ancestrales se mantienen vivas. El paisaje es espectacular, con cañones y montañas que invitan a la aventura. El turismo en Tierra Blanca es una experiencia profunda, una oportunidad para conectar con la naturaleza y con una visión del mundo diferente y enriquecedora.",
            images: ["https://placehold.co/400x300/22c55e/ffffff?text=Paisaje+Sierra+Gorda", "https://placehold.co/400x300/22c55e/ffffff?text=Comunidad+Chichimeca", "https://placehold.co/400x300/22c55e/ffffff?text=Artesanía+de+Ixtle"]
        }
    },
    {
        id: 41, nombre: "Uriangato",
        descripcion: "Junto con Moroleón, es uno de los centros textiles más importantes de México. Famoso por sus tapetes de aserrín.",
        //imagen: "https://placehold.co/800x600/d946ef/ffffff?text=Uriangato",
        imagen: "../img/Municipios/41_Uriangato.jpg",
        datos: ["Tradición: 'La Octava Noche' es una festividad donde las calles se cubren con espectaculares tapetes de aserrín de colores.", "Comercio: Famoso por su tianguis de ropa y textiles.", "Dato Curioso: Su nombre significa 'lugar donde el sol se pone'.", "Arte: La elaboración de los tapetes es considerada un arte efímero."],
        fullInfo: {
            text: "Uriangato es una ciudad de fe, comercio y arte efímero. Comparte con Moroleón la capitalidad textil, atrayendo a miles de compradores. Pero su evento más espectacular es 'La Octava Noche', durante las fiestas de San Miguel Arcángel. Esa noche, las calles se transforman en lienzos gigantes sobre los que los habitantes crean coloridos y detallados tapetes de aserrín, una ofrenda de arte que dura solo unas horas pero que deja un recuerdo imborrable. Es una muestra de devoción y creatividad comunitaria sin igual.",
            images: ["https://placehold.co/400x300/d946ef/ffffff?text=Tapetes+de+Aserrín", "https://placehold.co/400x300/d946ef/ffffff?text=Comercio+Textil", "https://placehold.co/400x300/d946ef/ffffff?text=Iglesia+de+San+Miguel"]
        }
    },
    {
        id: 42, nombre: "Valle de Santiago",
        descripcion: "Conocido como el 'País de las Siete Luminarias' por su conjunto de cráteres volcánicos inactivos.",
        //imagen: "https://placehold.co/800x600/581c87/ffffff?text=Valle+de+Santiago",
        imagen: "../img/Municipios/42_ValledeSantiago.jpg",
        datos: ["Naturaleza: Sus siete cráteres volcánicos (Las Siete Luminarias) son un fenómeno geológico único.", "Misterio: Existen leyendas sobre OVNIs y fenómenos extraños en los cráteres.", "Agricultura: Tierra fértil para el cultivo de hortalizas y granos.", "Dato Curioso: Dentro de algunos cráteres hay lagos y ecosistemas propios."],
        fullInfo: {
            text: "Valle de Santiago es un lugar de poder y misterio. Su paisaje está salpicado por siete impresionantes cráteres volcánicos, conocidos como Las Siete Luminarias. Cada cráter tiene su propia leyenda y características, algunos con lagos en su interior. Este paisaje casi lunar ha inspirado innumerables historias sobre OVNIs y energías especiales. Más allá del misterio, los cráteres forman un ecosistema único y sus tierras son increíblemente fértiles, haciendo de Valle de Santiago un importante centro agrícola.",
            images: ["https://placehold.co/400x300/581c87/ffffff?text=Cráter+Volcánico", "https://placehold.co/400x300/581c87/ffffff?text=Vista+Aérea", "https://placehold.co/400x300/581c87/ffffff?text=Hortalizas"]
        }
    },
    {
        id: 43, nombre: "Victoria",
        descripcion: "Municipio del noreste, rodeado de paisajes semidesérticos y con una historia ligada a la minería y a los chichimecas.",
        //imagen: "https://placehold.co/800x600/f43f5e/ffffff?text=Victoria",
        imagen: "../img/Municipios/43_Victoria.jpg",
        datos: ["Historia: Antiguo asentamiento chichimeca y posterior zona minera.", "Naturaleza: Hogar del 'árbol del tule' más grande del estado.", "Cultura: Conserva un ambiente tranquilo y tradicional del noreste de Guanajuato.", "Aventura: Ideal para la exploración de cañones y la observación de la flora local."],
        fullInfo: {
            text: "Victoria es un municipio que representa la historia y la naturaleza del noreste de Guanajuato. Fue un importante asentamiento chichimeca y después una zona minera. Hoy, es un lugar tranquilo que invita a explorar sus alrededores. Aquí se encuentra un impresionante árbol del tule, un gigante de la naturaleza que es un orgullo local. Sus cañones y paisajes semidesérticos son perfectos para el senderismo y para descubrir la flora y fauna adaptada a este clima extremo.",
            images: ["https://placehold.co/400x300/f43f5e/ffffff?text=Árbol+del+Tule", "https://placehold.co/400x300/f43f5e/ffffff?text=Paisaje+Noreste", "https://placehold.co/400x300/f43f5e/ffffff?text=Parroquia+de+Victoria"]
        }
    },
    {
        id: 44, nombre: "Villagrán",
        descripcion: "Municipio del corredor industrial, conocido por su producción de productos lácteos y su cercanía a Celaya.",
        //imagen: "https://placehold.co/800x600/84cc16/ffffff?text=Villagrán",
        imagen: "../img/Municipios/44_Villagrán.jpg",
        datos: ["Industria: Importante actividad industrial y agrícola.", "Gastronomía: Famoso por sus quesos y cremas de alta calidad.", "Historia: Nombrado en honor a un héroe de la independencia, Julián Villagrán.", "Ubicación: Parte del próspero corredor industrial del Bajío."],
        fullInfo: {
            text: "Villagrán es un municipio de sabor y progreso. Es reconocido en toda la región por la excelente calidad de sus productos lácteos; sus quesos, cremas y dulces de leche son imperdibles. Su ubicación estratégica en el corredor industrial del Bajío le ha permitido un importante desarrollo económico, complementando su tradicional vocación agrícola. Nombrado en honor a un valiente insurgente, Villagrán es un ejemplo de cómo el trabajo del campo y la industria moderna pueden crear una comunidad próspera.",
            images: ["https://placehold.co/400x300/84cc16/ffffff?text=Quesos+y+Lácteos", "https://placehold.co/400x300/84cc16/ffffff?text=Industria", "https://placehold.co/400x300/84cc16/ffffff?text=Jardín+Principal"]
        }
    },
    {
        id: 45, nombre: "Xichú",
        descripcion: "El corazón de la Sierra Gorda, famoso por el Festival del Huapango Arribeño, una joya de la música tradicional mexicana.",
        //imagen: "https://placehold.co/800x600/10b981/ffffff?text=Xichú",
        imagen: "../img/Municipios/45_Xichú.jpg",
        datos: ["Música: Capital del Huapango Arribeño. Su festival anual atrae a músicos de toda la región.", "Naturaleza: Rodeado de una biodiversidad impresionante, con ríos y montañas.", "Aventura: Ideal para el ecoturismo, la exploración y el contacto con la naturaleza.", "Historia: Fue una importante zona minera en la época colonial."],
        fullInfo: {
            text: "Xichú es música, poesía y naturaleza en su estado más puro. Es la capital del Huapango Arribeño, una tradición musical donde dos poetas (trovadores) se enfrentan en un duelo de versos improvisados que puede durar toda la noche. Su festival de fin de año es un evento cultural de primer nivel. Enclavado en lo más profundo de la Sierra Gorda, Xichú está rodeado de una naturaleza exuberante, con un río que atraviesa el pueblo y montañas que invitan a la aventura. Es un destino para los amantes de la cultura auténtica y los paisajes sobrecogedores.",
            images: ["https://placehold.co/400x300/10b981/ffffff?text=Huapango+Arribeño", "https://placehold.co/400x300/10b981/ffffff?text=Río+Xichú", "https://placehold.co/400x300/10b981/ffffff?text=Paisaje+Serrano"]
        }
    },
    { 
        id: 46, nombre: "Yuriria", 
        descripcion: "Pueblo Mágico cuyo nombre significa 'Lago de Sangre'. Famoso por su laguna artificial y su convento-fortaleza agustino.", 
        //imagen: "https://placehold.co/800x600/a855f7/ffffff?text=Yuriria", 
        imagen: "../img/Municipios/46_Yuriria.jpg",
        datos: ["Naturaleza: La Laguna de Yuriria fue la primera obra hidráulica de gran magnitud en América Latina.", "Arquitectura: El Ex-Convento Agustino de San Pablo es una impresionante fortaleza del siglo XVI.", "Fauna: La laguna es un santuario para aves migratorias, como pelícanos borregones.", "Etimología: Su nombre purépecha, Yuririapúndaro, significa 'Lago de sangre'."],
        fullInfo: {
            text: "Yuriria es un Pueblo Mágico que combina la majestuosidad de la naturaleza con la imponencia de la historia. Su enorme laguna, creada en el siglo XVI, no solo es un espectáculo visual, sino también un ecosistema vital para miles de aves. A sus orillas se levanta el Ex-Convento de San Pablo, una construcción que parece más una fortaleza medieval que un recinto religioso, y que cuenta historias de fe y conquista. Pasear por su malecón al atardecer es una experiencia única.",
            images: ["https://placehold.co/400x300/a855f7/ffffff?text=Ex-Convento", "https://placehold.co/400x300/a855f7/ffffff?text=Laguna", "https://placehold.co/400x300/a855f7/ffffff?text=Pelícanos"]
        }
    }
];

export const JUEGOS = {
    1: [
        { type: "trivia", data: [{ question: "¿Qué actividad económica es famosa en Abasolo?", options: ["Aguas termales", "Minería", "Textiles", "Pesca"], answer: "Aguas termales" }, { question: "¿Qué importante producto agrícola se cultiva en Abasolo?", options: ["Trigo", "Fresa", "Agave", "Brócoli"], answer: "Trigo" }, { question: "¿Qué significa 'Abasolo'?", options: ["Lugar de comadrejas", "Lugar de agua", "Lugar de flores", "No tiene significado"], answer: "Lugar de agua" }, { question: "¿Qué personaje histórico nació en Abasolo?", options: ["Miguel Hidalgo", "José María Morelos", "Benito Juárez", "Pancho Villa"], answer: "Miguel Hidalgo" }, { question: "¿Cuál es el platillo típico de Abasolo?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "Abasolo es conocido por sus {1} de aguas termales y su producción de {2}.", answers: ["balnearios", "trigo"] },
        { type: "sopa", data: { words: ["ABASOLO", "HIDALGO", "TRIGO", "AGUA", "CALDERA", "BALNEARIO", "FIESTA", "PAN", "CALDO", "OSO"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/3b82f6/ffffff?text=Balneario", answers: ["balneario", "aguas termales", "alberca"] },
        { type: "puzzle", data: "https://placehold.co/400x400/3b82f6/ffffff?text=Campo+de+Trigo" }
    ],
    2: [
        { type: "trivia", data: [{ question: "¿Por qué tipo de pan es famoso Acámbaro?", options: ["Acambaritas", "Conchas", "Bolillos", "Orejas"], answer: "Acambaritas" }, { question: "¿Qué construcción antigua para llevar agua es un ícono de Acámbaro?", options: ["Acueducto", "Puente", "Presa", "Canal"], answer: "Acueducto" }, { question: "¿Qué cultura prehispánica se asentó en Acámbaro?", options: ["Chupícuaro", "Olmeca", "Maya", "Azteca"], answer: "Chupícuaro" }, { question: "¿Qué significa 'Acámbaro'?", options: ["Lugar de magueyes", "Lugar de agua", "Lugar de flores", "No tiene significado"], answer: "Lugar de magueyes" }, { question: "¿Cuál es el platillo típico de Acámbaro?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "memorama", data: "🍞,🦕,🚂,⛪,💧,🏺,🗿,🥖" },
        { type: "rellenar", data: "Las misteriosas figurillas de Acámbaro parecen representar {1} y fueron encontradas por {2}.", answers: ["dinosaurios", "Waldemar Julsrud"] },
        { type: "adivina", data: "https://placehold.co/800x600/6366f1/ffffff?text=Acueducto", answers: ["acueducto"] },
        { type: "puzzle", data: "https://placehold.co/400x400/6366f1/ffffff?text=Pan+de+Acámbaro" }
    ],
    3: [
        { type: "trivia", data: [{ question: "¿Cómo se llama la icónica iglesia rosa de San Miguel?", options: ["Parroquia de San Miguel Arcángel", "Templo de San Francisco", "Catedral de Guanajuato", "Iglesia de la Valenciana"], answer: "Parroquia de San Miguel Arcángel" }, { question: "El 'Día de los Locos' es una famosa festividad de...", options: ["San Miguel de Allende", "Dolores Hidalgo", "Celaya", "León"], answer: "San Miguel de Allende" }, { question: "¿Qué estilo arquitectónico tiene la Parroquia de San Miguel Arcángel?", options: ["Neogótico", "Barroco", "Neoclásico", "Moderno"], answer: "Neogótico" }, { question: "¿Qué personaje histórico nació en San Miguel de Allende?", options: ["Ignacio Allende", "Miguel Hidalgo", "José María Morelos", "Benito Juárez"], answer: "Ignacio Allende" }, { question: "¿Cuál es el platillo típico de San Miguel de Allende?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Enchiladas mineras" }] },
        { type: "rellenar", data: "La iglesia principal de San Miguel de Allende tiene un famoso estilo {1} y fue diseñada por {2}.", answers: ["neogótico", "Zeferino Gutiérrez"] },
        { type: "sopa", data: { words: ["ALLENDE", "PARROQUIA", "ARTE", "LOCOS", "CALLE", "NEOGOTICO", "FESTIVAL", "TURISMO", "PATRIMONIO", "MUNDO"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/ef4444/ffffff?text=Parroquia+de+San+Miguel", answers: ["parroquia de san miguel arcangel", "parroquia san miguel"] },
        { type: "puzzle", data: "https://placehold.co/400x400/ef4444/ffffff?text=Calle+Colonial" }
    ],
    4: [
        { type: "trivia", data: [{ question: "¿Cuál es la principal artesanía de Apaseo el Alto?", options: ["Madera tallada", "Alfarería", "Textiles", "Cestería"], answer: "Madera tallada" }, { question: "¿Qué significa 'Apatzeo' en náhuatl?", options: ["Lugar de comadrejas", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de comadrejas" }, { question: "¿Qué cultura prehispánica se asentó en Apaseo el Alto?", options: ["Chupícuaro", "Olmeca", "Maya", "Azteca"], answer: "Chupícuaro" }, { question: "¿Cuál es el platillo típico de Apaseo el Alto?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Carnitas" }, { question: "¿Qué fiesta patronal se celebra en Apaseo el Alto?", options: ["San Andrés Apóstol", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Andrés Apóstol" }] },
        { type: "rellenar", data: "Apaseo el Alto es la capital de la artesanía en {1} tallada y su nombre significa lugar de {2}.", answers: ["madera", "comadrejas"] },
        { type: "sopa", data: { words: ["MADERA", "TALLADO", "ALTO", "ARTE", "MUEBLE", "ARTESANIA", "CHUPICUARO", "FIESTA", "SAN ANDRES", "COMADREJAS"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/f97316/ffffff?text=Mueble+de+Madera", answers: ["mueble", "madera tallada"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f97316/ffffff?text=Artesanía" }
    ],
    5: [
        { type: "trivia", data: [{ question: "¿Qué deporte tradicional mexicano tiene fuerte arraigo en Apaseo el Grande?", options: ["Charrería", "Fútbol", "Lucha Libre", "Boxeo"], answer: "Charrería" }, { question: "¿Qué tipo de construcciones antiguas son famosas en este municipio?", options: ["Haciendas", "Pirámides", "Acueductos", "Castillos"], answer: "Haciendas" }, { question: "¿Qué significa 'Apaseo'?", options: ["Lugar de comadrejas", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de agua" }, { question: "¿Cuál es el platillo típico de Apaseo el Grande?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Carnitas" }, { question: "¿Qué fiesta patronal se celebra en Apaseo el Grande?", options: ["San Juan Bautista", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Juan Bautista" }] },
        { type: "rellenar", data: "En Apaseo el Grande se practica mucho la {1}, el deporte nacional, y es famoso por sus {2} coloniales.", answers: ["charrería", "haciendas"] },
        { type: "sopa", data: { words: ["APASEO", "CHARRO", "HACIENDA", "CABALLO", "TRAJE", "GRANDE", "FIESTA", "SAN JUAN", "AGUA", "DULCE"], size: 11 } },
        { type: "adivina", data: "https://placehold.co/800x600/eab308/ffffff?text=Charro+a+Caballo", answers: ["charro", "charreria", "caballo"] },
        { type: "puzzle", data: "https://placehold.co/400x400/eab308/ffffff?text=Hacienda+Colonial" }
    ],
    6: [
        { type: "trivia", data: [{ question: "¿En qué importante reserva natural se encuentra Atarjea?", options: ["Sierra Gorda", "Sierra de Lobos", "Nevado de Toluca", "Selva Lacandona"], answer: "Sierra Gorda" }, { question: "¿Qué tipo de turismo es el principal en Atarjea?", options: ["Ecoturismo", "De playa", "De negocios", "Religioso"], answer: "Ecoturismo" }, { question: "¿Qué significa 'Atarjea'?", options: ["Lugar de atarjeas", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de atarjeas" }, { question: "¿Cuál es el platillo típico de Atarjea?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Atarjea?", options: ["San José", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San José" }] },
        { type: "rellenar", data: "Atarjea es un paraíso para el {1} en la Sierra {2} y su nombre significa lugar de {3}.", answers: ["ecoturismo", "Gorda", "atarjeas"] },
        { type: "sopa", data: { words: ["ATARJEA", "SIERRA", "RIO", "CUEVA", "MONTAÑA", "ECOTURISMO", "GORDA", "FIESTA", "SAN JOSE", "NATURALEZA"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/22c55e/ffffff?text=Río+en+la+Sierra", answers: ["rio", "sierra gorda"] },
        { type: "puzzle", data: "https://placehold.co/400x400/22c55e/ffffff?text=Paisaje+Serrano" }
    ],
    7: [
        { type: "trivia", data: [{ question: "¿Qué dulce de leche de cabra es famoso en Celaya?", options: ["Cajeta", "Rompope", "Glorias", "Chongos"], answer: "Cajeta" }, { question: "¿Qué arquitecto famoso diseñó el Templo del Carmen en Celaya?", options: ["Francisco Eduardo Tresguerras", "Luis Barragán", "Pedro Ramírez Vázquez", "Teodoro González"], answer: "Francisco Eduardo Tresguerras" }, { question: "¿Qué significa 'Celaya'?", options: ["Lugar llano", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar llano" }, { question: "¿Cuál es el platillo típico de Celaya?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Gorditas de Tierras Negras" }, { question: "¿Qué fiesta patronal se celebra en Celaya?", options: ["La Purísima Concepción", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "La Purísima Concepción" }] },
        { type: "rellenar", data: "La icónica 'Bola de {1}' es un símbolo de Celaya y su dulce más famoso es la {2}.", answers: ["Agua", "cajeta"] },
        { type: "sopa", data: { words: ["CELAYA", "CAJETA", "BOLA", "TRESGUERRAS", "BAJIO", "PUERTA", "ORO", "FIESTA", "CONCEPCION", "GORDITAS"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/ec4899/ffffff?text=Bola+de+Agua", answers: ["bola de agua"] },
        { type: "puzzle", data: "https://placehold.co/400x400/ec4899/ffffff?text=Templo+del+Carmen" }
    ],
    8: [
        { type: "trivia", data: [{ question: "¿Cómo se llamaba antes el municipio de Manuel Doblado?", options: ["Piedra Gorda", "Roca Alta", "Cerro Azul", "Monte Grande"], answer: "Piedra Gorda" }, { question: "¿Qué presa es un importante lugar de recreo en el municipio?", options: ["Presa de la Soledad", "Presa de la Olla", "Presa Allende", "Laguna de Yuriria"], answer: "Presa de la Soledad" }, { question: "¿Qué personaje histórico da nombre al municipio?", options: ["Manuel Doblado", "Miguel Hidalgo", "José María Morelos", "Benito Juárez"], answer: "Manuel Doblado" }, { question: "¿Cuál es el platillo típico de Manuel Doblado?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Manuel Doblado?", options: ["San Pedro", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Pedro" }] },
        { type: "rellenar", data: "Manuel Doblado antes se llamaba San Pedro {1} Gorda y es famoso por su presa de la {2}.", answers: ["Piedra", "Soledad"] },
        { type: "sopa", data: { words: ["DOBLADO", "PIEDRA", "GORDA", "PRESA", "SOLEDAD", "MANUEL", "FIESTA", "SAN PEDRO", "AGRICULTURA", "HISTORIA"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/84cc16/ffffff?text=Presa", answers: ["presa", "presa de la soledad"] },
        { type: "puzzle", data: "https://placehold.co/400x400/84cc16/ffffff?text=Jardín+Principal" }
    ],
    9: [
        { type: "trivia", data: [{ question: "¿Qué utensilio de cocina de piedra es la artesanía principal de Comonfort?", options: ["Molcajete", "Metate", "Comal", "Olla"], answer: "Molcajete" }, { question: "¿Cómo se llamaba antes Comonfort?", options: ["Chamacuero", "Piedra Gorda", "Acámbaro", "Yuriria"], answer: "Chamacuero" }, { question: "¿Qué significa 'Chamacuero'?", options: ["Lugar de ruinas", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de ruinas" }, { question: "¿Cuál es el platillo típico de Comonfort?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Comonfort?", options: ["San Francisco de Asís", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Francisco de Asís" }] },
        { type: "memorama", data: "🗿,🌽,🌶️,🥑,⛪,🏺,🎨,🌮" },
        { type: "rellenar", data: "En Comonfort son expertos en hacer {1} de piedra volcánica y antes se llamaba {2}.", answers: ["molcajetes", "Chamacuero"] },
        { type: "adivina", data: "https://placehold.co/800x600/14b8a6/ffffff?text=Molcajete", answers: ["molcajete"] },
        { type: "puzzle", data: "https://placehold.co/400x400/14b8a6/ffffff?text=Tortilla+Ceremonial" }
    ],
    10: [
        { type: "trivia", data: [{ question: "¿De qué material son los famosos sarapes de Coroneo?", options: ["Lana", "Algodón", "Seda", "Ixtle"], answer: "Lana" }, { question: "¿Con qué estado colinda Coroneo?", options: ["Michoacán", "Jalisco", "Querétaro", "San Luis Potosí"], answer: "Michoacán" }, { question: "¿Qué significa 'Coroneo'?", options: ["Lugar de coronas", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de coronas" }, { question: "¿Cuál es el platillo típico de Coroneo?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Coroneo?", options: ["Santiago Apóstol", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "Santiago Apóstol" }] },
        { type: "rellenar", data: "En Coroneo son famosos los sarapes y cobijas de {1} y colinda con el estado de {2}.", answers: ["lana", "Michoacán"] },
        { type: "sopa", data: { words: ["LANA", "CORONEO", "SARAPE", "TEJIDO", "FRIO", "BOSQUE", "FIESTA", "SANTIAGO", "MICHOACAN", "FRONTERA"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/f43f5e/ffffff?text=Sarape+de+Lana", answers: ["sarape", "cobija", "lana"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f43f5e/ffffff?text=Paisaje+Boscoso" }
    ],
    11: [
        { type: "trivia", data: [{ question: "¿Qué evento histórico importante ocurrió en Cortazar?", options: ["La primera batalla de la Independencia", "La firma de la Constitución", "La última batalla de la Revolución", "La fundación de Guanajuato"], answer: "La primera batalla de la Independencia" }, { question: "¿A qué héroe insurgente debe su nombre el municipio?", options: ["Luis Cortázar y Rábago", "Miguel Hidalgo", "José María Morelos", "Ignacio Allende"], answer: "Luis Cortázar y Rábago" }, { question: "¿Qué significa 'Cortazar'?", options: ["Lugar de culebras", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de culebras" }, { question: "¿Cuál es el platillo típico de Cortazar?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Cortazar?", options: ["San José", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San José" }] },
        { type: "rellenar", data: "En Cortazar ocurrió la primera {1} formal de la Independencia y su nombre significa lugar de {2}.", answers: ["batalla", "culebras"] },
        { type: "sopa", data: { words: ["CORTAZAR", "BATALLA", "INSURGENTE", "BAJIO", "CULTURA", "CULEBRAS", "FIESTA", "SAN JOSE", "INDUSTRIA", "HISTORIA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/e11d48/ffffff?text=Monumento+a+la+Independencia", answers: ["monumento", "independencia"] },
        { type: "puzzle", data: "https://placehold.co/400x400/e11d48/ffffff?text=Centro+Cultural" }
    ],
    12: [
        { type: "trivia", data: [{ question: "¿Qué significa 'Cuerámaro' en purépecha?", options: ["Guarida de cuervos", "Lugar de agua", "Cerro alto", "Tierra fértil"], answer: "Guarida de cuervos" }, { question: "¿Qué famoso cantautor se dice que nació en Cuerámaro?", options: ["José Alfredo Jiménez", "Pedro Infante", "Jorge Negrete", "Javier Solís"], answer: "José Alfredo Jiménez" }, { question: "¿Qué cerro es un ícono de Cuerámaro?", options: ["Cerro del Fuerte", "Cerro del Cubilete", "Cerro de la Bufa", "Cerro de las Comadres"], answer: "Cerro del Fuerte" }, { question: "¿Cuál es el platillo típico de Cuerámaro?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Cuerámaro?", options: ["San Francisco de Asís", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Francisco de Asís" }] },
        { type: "rellenar", data: "Cuerámaro es tierra de {1} y leyendas y su nombre significa guarida de {2}.", answers: ["manantiales", "cuervos"] },
        { type: "sopa", data: { words: ["CUERAMARO", "AGUA", "MANANTIAL", "CERRO", "FUERTE", "LEYENDA", "CUERVOS", "FIESTA", "SAN FRANCISCO", "AGRICULTURA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/0ea5e9/ffffff?text=Cerro+del+Fuerte", answers: ["cerro", "cerro del fuerte"] },
        { type: "puzzle", data: "https://placehold.co/400x400/0ea5e9/ffffff?text=Manantial" }
    ],
    13: [
        { type: "trivia", data: [{ question: "¿En honor a quién fue nombrado este municipio?", options: ["José María Luis Mora", "Doctor Atl", "Doctor Ignacio Morones Prieto", "Un doctor local"], answer: "José María Luis Mora" }, { question: "¿Qué tipo de clima predomina en Doctor Mora?", options: ["Semidesértico", "Tropical", "Boscoso", "Templado"], answer: "Semidesértico" }, { question: "¿Qué danza es tradicional en Doctor Mora?", options: ["Danza de los Concheros", "Danza de los Viejitos", "Danza del Venado", "Jarabe Tapatío"], answer: "Danza de los Concheros" }, { question: "¿Cuál es el platillo típico de Doctor Mora?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Doctor Mora?", options: ["San José", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San José" }] },
        { type: "rellenar", data: "Doctor Mora es hogar de la tradicional Danza de los {1} y su clima es {2}.", answers: ["Concheros", "semidesértico"] },
        { type: "sopa", data: { words: ["DOCTOR", "MORA", "CONCHEROS", "DANZA", "NORESTE", "SECO", "FIESTA", "SAN JOSE", "HISTORIA", "CULTURA"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/a855f7/ffffff?text=Danza+Concheros", answers: ["concheros", "danza de los concheros"] },
        { type: "puzzle", data: "https://placehold.co/400x400/a855f7/ffffff?text=Paisaje+Semidesértico" }
    ],
    14: [
        { type: "trivia", data: [{ question: "¿Quién dio el Grito de Independencia?", options: ["Miguel Hidalgo", "José María Morelos", "Benito Juárez", "Pancho Villa"], answer: "Miguel Hidalgo" }, { question: "¿Qué postre helado es famoso en Dolores?", options: ["Nieves de sabores exóticos", "Paletas de hielo", "Pasteles de tres leches", "Gelatinas de mosaico"], answer: "Nieves de sabores exóticos" }, { question: "¿Qué tipo de artesanía es muy popular en Dolores Hidalgo?", options: ["Cerámica Mayólica", "Madera tallada", "Sarapes de lana", "Sombreros"], answer: "Cerámica Mayólica" }, { question: "¿Qué personaje histórico nació en Dolores Hidalgo?", options: ["José Alfredo Jiménez", "Miguel Hidalgo", "José María Morelos", "Benito Juárez"], answer: "José Alfredo Jiménez" }, { question: "¿Cuál es el platillo típico de Dolores Hidalgo?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Enchiladas mineras" }] },
        { type: "rellenar", data: "En Dolores Hidalgo, el cura Miguel Hidalgo dio el Grito de {1} y es famoso por su cerámica {2}.", answers: ["Independencia", "Mayólica"] },
        { type: "sopa", data: { words: ["DOLORES", "HIDALGO", "GRITO", "NIEVE", "CUNA", "INDEPENDENCIA", "MAYOLICA", "FIESTA", "PATRIA", "JIMENEZ"], size: 13 } },
        { type: "adivina", data: "https://placehold.co/800x600/16a34a/ffffff?text=Nieve+de+Garambullo", answers: ["nieve", "nieves"] },
        { type: "puzzle", data: "https://placehold.co/400x400/16a34a/ffffff?text=Parroquia+de+Dolores" }
    ],
    15: [
        { type: "trivia", data: [{ question: "¿Qué famoso museo de Guanajuato exhibe cuerpos momificados?", options: ["Museo de las Momias", "Museo del Quijote", "Museo del Pueblo", "Museo Diego Rivera"], answer: "Museo de las Momias" }, { question: "¿Cómo se llama el teatro principal de Guanajuato, famoso por su arquitectura?", options: ["Teatro Juárez", "Teatro Principal", "Teatro Cervantes", "Teatro Doblado"], answer: "Teatro Juárez" }, { question: "¿Qué festival internacional de artes se celebra cada año en Guanajuato?", options: ["Festival Cervantino", "Festival del Globo", "Feria de San Marcos", "Guelaguetza"], answer: "Festival Cervantino" }, { question: "El Callejón del Beso es famoso por una leyenda de...", options: ["Amor trágico", "Fantasmas mineros", "Un tesoro escondido", "Una batalla"], answer: "Amor trágico" }, { question: "¿Qué recorridos nocturnos son tradicionales en Guanajuato, llenos de música y leyendas?", options: ["Callejoneadas", "Paseos en góndola", "Tours en tranvía", "Cabalgatas"], answer: "Callejoneadas" }, { question: "¿Qué monumento importante se encuentra en la cima del cerro del Cubilete, visible desde Guanajuato?", options: ["Cristo Rey", "El Pípila", "El Ángel de la Independencia", "La Diana Cazadora"], answer: "Cristo Rey" }, { question: "Las calles subterráneas de Guanajuato eran originalmente...", options: ["Ríos y túneles de desagüe", "Túneles de minas", "Pasajes secretos", "Criptas antiguas"], answer: "Ríos y túneles de desagüe" }, { question: "¿Quién fue 'El Pípila', cuyo monumento domina la ciudad?", options: ["Un minero héroe de la Independencia", "Un famoso pintor", "Un gobernador del estado", "Un legendario músico"], answer: "Un minero héroe de la Independencia" }] },
        { type: "memorama", data: "🏛️,⛪,🐸,🎸,🎭,🎨,🎓,⚰️" },
        { type: "sopa", data: { words: ["TUNEL", "MOMIA", "CERVANTINO", "MINA", "BESO", "PIPILA", "TEATRO", "JUAEREZ", "CALLEJON", "UNIVERSIDAD"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/0284c7/ffffff?text=Teatro+Juárez", answers: ["teatro juarez"] },
        { type: "rellenar", data: "El monumento a El Pípila conmemora a un héroe de la {1} de México y el Festival {2} es el más importante de la ciudad.", answers: ["independencia", "Cervantino"] }
    ],
    16: [
        { type: "trivia", data: [{ question: "¿Qué bebida alcohólica se produce en Huanímaro?", options: ["Tequila", "Mezcal", "Pulque", "Vino"], answer: "Tequila" }, { question: "¿Qué significa 'Huanímaro' en purépecha?", options: ["Lugar de trueque", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de trueque" }, { question: "¿Cuál es el platillo típico de Huanímaro?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Huanímaro?", options: ["San Juan Bautista", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Juan Bautista" }, { question: "¿Qué cultivo es la base para la producción de tequila?", options: ["Agave", "Maíz", "Trigo", "Fresa"], answer: "Agave" }] },
        { type: "rellenar", data: "Huanímaro es famoso por su producción de {1} y su nombre significa lugar de {2}.", answers: ["tequila", "trueque"] },
        { type: "sopa", data: { words: ["HUANIMARO", "TEQUILA", "AGAVE", "TRUEQUE", "FIESTA", "SAN JUAN", "AGRICULTURA", "HISTORIA", "CULTURA", "TRADICION"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/c026d3/ffffff?text=Campo+de+Agave", answers: ["agave", "campo de agave"] },
        { type: "puzzle", data: "https://placehold.co/400x400/c026d3/ffffff?text=Destilería" }
    ],
    17: [
        { type: "trivia", data: [{ question: "¿De qué fruta es Irapuato la 'Capital Mundial'?", options: ["Fresa", "Mango", "Aguacate", "Limón"], answer: "Fresa" }, { question: "¿Cómo se llama la fuente icónica de Irapuato?", options: ["Fuente de las Aguas Danzarinas", "Fuente de los Leones", "Fuente de Neptuno", "Fuente de Cibeles"], answer: "Fuente de las Aguas Danzarinas" }, { question: "¿Qué significa 'Irapuato'?", options: ["Lugar que emerge de la llanura", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar que emerge de la llanura" }, { question: "¿Cuál es el platillo típico de Irapuato?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Guacamayas" }, { question: "¿Qué fiesta patronal se celebra en Irapuato?", options: ["Nuestra Señora de la Soledad", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "Nuestra Señora de la Soledad" }] },
        { type: "memorama", data: "🍓,🏭,🚂,⛲,🌶️,🍰,🚜,🧺" },
        { type: "sopa", data: { words: ["FRESA", "IRAPUATO", "TREN", "FUENTE", "DULCE", "CAPITAL", "MUNDIAL", "FIESTA", "SOLEDAD", "AGRICULTURA"], size: 11 } },
        { type: "adivina", data: "https://placehold.co/800x600/8b5cf6/ffffff?text=Fuente+de+Aguas+Danzarinas", answers: ["fuente de aguas danzarinas", "fuente danzarina"] },
        { type: "rellenar", data: "Irapuato es la capital mundial de la {1} y su fuente más famosa es la de las Aguas {2}.", answers: ["fresa", "Danzarinas"] }
    ],
    18: [
        { type: "trivia", data: [{ question: "¿Por qué tipo de turismo es conocido Jaral del Progreso?", options: ["Balnearios", "Montañismo", "Playas", "Museos"], answer: "Balnearios" }, { question: "¿Qué hortaliza es un producto importante de Jaral del Progreso?", options: ["Brócoli", "Lechuga", "Papa", "Calabaza"], answer: "Brócoli" }, { question: "¿Qué significa 'Jaral'?", options: ["Lugar de jaras", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar de jaras" }, { question: "¿Cuál es el platillo típico de Jaral del Progreso?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Jaral del Progreso?", options: ["San Nicolás de Tolentino", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Nicolás de Tolentino" }] },
        { type: "rellenar", data: "Jaral del Progreso es famoso por sus {1} y su producción de {2}.", answers: ["balnearios", "brócoli"] },
        { type: "sopa", data: { words: ["JARAL", "AGUA", "BALNEARIO", "BROCOLI", "AJO", "PROGRESO", "FIESTA", "SAN NICOLAS", "TURISMO", "AGRICULTURA"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/f43f5e/ffffff?text=Balneario", answers: ["balneario", "parque acuatico"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f43f5e/ffffff?text=Campo+de+Brócoli" }
    ],
    19: [
        { type: "trivia", data: [{ question: "¿Qué significa 'Jerécuaro' en purépecha?", options: ["Lugar como nido", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar como nido" }, { question: "¿Qué tipo de paisaje rodea a Jerécuaro?", options: ["Montañas y bosques", "Desierto", "Playa", "Selva"], answer: "Montañas y bosques" }, { question: "¿Cuál es el platillo típico de Jerécuaro?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Jerécuaro?", options: ["San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe", "San Bartolomé Apóstol"], answer: "San Bartolomé Apóstol" }, { question: "¿Qué actividad económica es importante en Jerécuaro?", options: ["Agricultura", "Minería", "Pesca", "Turismo"], answer: "Agricultura" }] },
        { type: "rellenar", data: "Jerécuaro significa 'lugar como {1}' y está rodeado de {2} y bosques.", answers: ["nido", "montañas"] },
        { type: "sopa", data: { words: ["JERECUARO", "NIDO", "MONTAÑA", "BOSQUE", "SANTUARIO", "FIESTA", "SAN BARTOLOME", "AGRICULTURA", "HISTORIA", "CULTURA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/fbbf24/ffffff?text=Santuario+de+Jerécuaro", answers: ["santuario", "iglesia"] },
        { type: "puzzle", data: "https://placehold.co/400x400/fbbf24/ffffff?text=Paisaje+Montañoso" }
    ],
    20: [
        { type: "trivia", data: [{ question: "¿De qué es León la 'Capital Mundial'?", options: ["Calzado", "Fresas", "Cajeta", "Tequila"], answer: "Calzado" }, { question: "¿Qué evento congrega a miles de personas para ver el cielo lleno de colores en León?", options: ["Festival del Globo", "Feria de León", "Festival del Zapato", "Rally Guanajuato"], answer: "Festival del Globo" }, { question: "¿Qué es una 'guacamaya' en la gastronomía de León?", options: ["Un bolillo con chicharrón", "Un tipo de ave", "Un dulce típico", "Una bebida"], answer: "Un bolillo con chicharrón" }, { question: "¿Cómo se llama el equipo de fútbol de León?", options: ["Club León", "Leones Negros", "Pumas", "Chivas"], answer: "Club León" }, { question: "¿Qué arco es un símbolo de la ciudad de León?", options: ["Arco de la Calzada", "Arco del Triunfo", "Arco de Hércules", "Arco de Tito"], answer: "Arco de la Calzada" }] },
        { type: "rellenar", data: "León es la capital mundial del {1} y es famosa por su industria de la {2} y su Festival del {3}.", answers: ["calzado", "piel", "Globo"] },
        { type: "sopa", data: { words: ["LEON", "CALZADO", "PIEL", "GLOBO", "GUACAMAYA", "FERIA", "ARCO", "CALZADA", "INDUSTRIA", "NEGOCIOS"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/f59e0b/ffffff?text=Arco+de+la+Calzada", answers: ["arco de la calzada", "arco"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f59e0b/ffffff?text=Festival+del+Globo" }
    ],
    21: [
        { type: "trivia", data: [{ question: "¿Qué industria es la más importante en Moroleón?", options: ["Textil", "Automotriz", "Alimentaria", "Minera"], answer: "Textil" }, { question: "¿Con qué otro municipio forma un importante corredor comercial?", options: ["Uriangato", "Celaya", "Irapuato", "León"], answer: "Uriangato" }, { question: "¿Qué significa 'Moroleón'?", options: ["Compuesto de 'Moro' y 'León'", "Lugar de moras", "Cerro del león", "Río de moras"], answer: "Compuesto de 'Moro' y 'León'" }, { question: "¿Cuál es el platillo típico de Moroleón?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Carnitas" }, { question: "¿Qué fiesta patronal se celebra en Moroleón?", options: ["Señor de Esquipulas", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "Señor de Esquipulas" }] },
        { type: "rellenar", data: "Moroleón es un importante centro {1} y comercial, y forma un corredor con {2}.", answers: ["textil", "Uriangato"] },
        { type: "sopa", data: { words: ["MOROLEON", "TEXTIL", "ROPA", "COMERCIO", "TIANGUIS", "URIANGATO", "FIESTA", "ESQUIPULAS", "INDUSTRIA", "MODA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/d946ef/ffffff?text=Tianguis+Textil", answers: ["tianguis", "ropa"] },
        { type: "puzzle", data: "https://placehold.co/400x400/d946ef/ffffff?text=Fábrica+de+Ropa" }
    ],
    22: [
        { type: "trivia", data: [{ question: "¿En qué parte de Guanajuato se encuentra Ocampo?", options: ["Norte", "Sur", "Este", "Oeste"], answer: "Norte" }, { question: "¿Qué tipo de paisajes predominan en Ocampo?", options: ["Semidesérticos", "Boscosos", "Selváticos", "Costeros"], answer: "Semidesérticos" }, { question: "¿Qué zona arqueológica se encuentra cerca de Ocampo?", options: ["El Cóporo", "Plazuelas", "Cañada de la Virgen", "Chupícuaro"], answer: "El Cóporo" }, { question: "¿Cuál es el platillo típico de Ocampo?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Ocampo?", options: ["San Juan Bautista", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Juan Bautista" }] },
        { type: "rellenar", data: "Ocampo tiene una historia ligada a la {1} de plata y oro y cerca se encuentra la zona arqueológica de El {2}.", answers: ["minería", "Cóporo"] },
        { type: "sopa", data: { words: ["OCAMPO", "NORTE", "MINERIA", "COPORO", "DESIERTO", "FIESTA", "SAN JUAN", "HISTORIA", "CULTURA", "TRADICION"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/10b981/ffffff?text=Paisaje+Semidesértico", answers: ["desierto", "semidesierto"] },
        { type: "puzzle", data: "https://placehold.co/400x400/10b981/ffffff?text=El+Cóporo" }
    ],
    23: [
        { type: "trivia", data: [{ question: "¿Quién nació en la Ex-Hacienda de Corralejo en Pénjamo?", options: ["Miguel Hidalgo", "Benito Juárez", "Vicente Fox", "Jorge Negrete"], answer: "Miguel Hidalgo" }, { question: "¿Qué bebida alcohólica se produce en Pénjamo?", options: ["Tequila", "Mezcal", "Pulque", "Vino"], answer: "Tequila" }, { question: "¿Qué zona arqueológica se encuentra en Pénjamo?", options: ["Plazuelas", "El Cóporo", "Cañada de la Virgen", "Chupícuaro"], answer: "Plazuelas" }, { question: "¿Cuál es el platillo típico de Pénjamo?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Carnitas" }, { question: "¿Qué fiesta patronal se celebra en Pénjamo?", options: ["San Francisco de Asís", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Francisco de Asís" }] },
        { type: "memorama", data: "🍾,🤠,⛪,🌽,🌶️,🐴,🎶,🎸" },
        { type: "rellenar", data: "Pénjamo es la cuna de {1} y es famoso por su producción de {2}.", answers: ["Miguel Hidalgo", "tequila"] },
        { type: "sopa", data: { words: ["PENJAMO", "HIDALGO", "TEQUILA", "CORRALEJO", "PLAZUELAS", "FIESTA", "SAN FRANCISCO", "HISTORIA", "CULTURA", "TRADICION"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/0ea5e9/ffffff?text=Hacienda+Corralejo", answers: ["hacienda corralejo", "hacienda"] },
        { type: "puzzle", data: "https://placehold.co/400x400/0ea5e9/ffffff?text=Tequila" }
    ],
    24: [
        { type: "trivia", data: [{ question: "¿Qué se cultiva principalmente en Pueblo Nuevo?", options: ["Sorgo y maíz", "Fresas", "Agave", "Uvas"], answer: "Sorgo y maíz" }, { question: "¿Qué tipo de ambiente caracteriza a Pueblo Nuevo?", options: ["Tranquilo y rural", "Urbano y ajetreado", "Turístico y concurrido", "Industrial y moderno"], answer: "Tranquilo y rural" }, { question: "¿En qué siglo fue fundado Pueblo Nuevo?", options: ["Siglo XVII", "Siglo XVI", "Siglo XVIII", "Siglo XIX"], answer: "Siglo XVII" }, { question: "¿Cuál es el platillo típico de Pueblo Nuevo?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Pueblo Nuevo?", options: ["La Candelaria", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "La Candelaria" }] },
        { type: "rellenar", data: "Pueblo Nuevo es un municipio dedicado principalmente a la {1} y es famoso por su ambiente {2}.", answers: ["agricultura", "tranquilo"] },
        { type: "sopa", data: { words: ["PUEBLO", "NUEVO", "AGRICULTURA", "SORGO", "MAIZ", "FIESTA", "CANDELARIA", "TRANQUILIDAD", "RURAL", "HISTORIA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/84cc16/ffffff?text=Campo+de+Sorgo", answers: ["sorgo", "campo de sorgo"] },
        { type: "puzzle", data: "https://placehold.co/400x400/84cc16/ffffff?text=Parroquia+de+la+Candelaria" }
    ],
    25: [
        { type: "trivia", data: [{ question: "¿Qué famosa tradición de Semana Santa se celebra en Purísima del Rincón?", options: ["La Judea", "La Procesión del Silencio", "La Quema de Judas", "Los Cristos de Caña"], answer: "La Judea" }, { question: "¿Qué famoso pintor nació en Purísima del Rincón?", options: ["Hermenegildo Bustos", "Diego Rivera", "Frida Kahlo", "José Clemente Orozco"], answer: "Hermenegildo Bustos" }, { question: "¿Qué parque natural es un área protegida en el municipio?", options: ["Parque Cañada de los Negros", "Parque Metropolitano", "Parque Bicentenario", "Parque La Olla"], answer: "Parque Cañada de los Negros" }, { question: "¿Cuál es el platillo típico de Purísima del Rincón?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Purísima del Rincón?", options: ["La Purísima Concepción", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "La Purísima Concepción" }] },
        { type: "memorama", data: "🎨,🎭,👺,✝️,🖌️,🖼️,🌿,⛪" },
        { type: "rellenar", data: "En Purísima del Rincón se celebra La {1}, una tradición con máscaras, y es cuna del pintor Hermenegildo {2}.", answers: ["Judea", "Bustos"] },
        { type: "sopa", data: { words: ["PURISIMA", "JUDEA", "MASCARA", "BUSTOS", "PINTOR", "FIESTA", "CONCEPCION", "TRADICION", "ARTE", "CULTURA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/65a30d/ffffff?text=Máscara+de+la+Judea", answers: ["judea", "mascara"] },
        { type: "puzzle", data: "https://placehold.co/400x400/65a30d/ffffff?text=Retrato+de+Bustos" }
    ],
    26: [
        { type: "trivia", data: [{ question: "¿Qué zona arqueológica se encuentra en Romita?", options: ["El Cóporo", "Plazuelas", "Cañada de la Virgen", "Chupícuaro"], answer: "El Cóporo" }, { question: "¿Qué producto agrícola es importante en Romita?", options: ["Ajo", "Fresa", "Agave", "Brócoli"], answer: "Ajo" }, { question: "¿En honor a quién fue nombrado el municipio?", options: ["Carmen Romero Rubio de Díaz", "Josefa Ortiz de Domínguez", "Leona Vicario", "Sor Juana Inés de la Cruz"], answer: "Carmen Romero Rubio de Díaz" }, { question: "¿Cuál es el platillo típico de Romita?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Romita?", options: ["Santa María de Guadalupe", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de la Candelaria"], answer: "Santa María de Guadalupe" }] },
        { type: "rellenar", data: "En Romita se encuentra la zona arqueológica de El {1} y es un importante productor de {2}.", answers: ["Cóporo", "ajo"] },
        { type: "sopa", data: { words: ["ROMITA", "COPORO", "AJO", "AGRICULTURA", "HISTORIA", "FIESTA", "GUADALUPE", "ARQUEOLOGIA", "CULTURA", "TRADICION"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/fbbf24/ffffff?text=El+Cóporo", answers: ["el coporo", "coporo"] },
        { type: "puzzle", data: "https://placehold.co/400x400/fbbf24/ffffff?text=Cultivo+de+Ajo" }
    ],
    27: [
        { type: "trivia", data: [{ question: "¿Qué importante industria se encuentra en Salamanca?", options: ["Refinería de petróleo", "Planta automotriz", "Fábrica de textiles", "Mina de plata"], answer: "Refinería de petróleo" }, { question: "¿Qué impresionante muestra de arte barroco se encuentra en Salamanca?", options: ["Ex convento de San Agustín", "Templo de la Valenciana", "Parroquia de Dolores", "Teatro Juárez"], answer: "Ex convento de San Agustín" }, { question: "¿Qué figura religiosa es muy venerada en Salamanca?", options: ["El Cristo Negro", "El Señor de la Columna", "La Virgen de Guadalupe", "San Judas Tadeo"], answer: "El Cristo Negro" }, { question: "¿Cuál es el platillo típico de Salamanca?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Salamanca?", options: ["Corpus Christi", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "Corpus Christi" }] },
        { type: "rellenar", data: "En Salamanca se encuentra una de las {1} de petróleo más grandes de México y el ex convento de {2} es una joya barroca.", answers: ["refinerías", "San Agustín"] },
        { type: "sopa", data: { words: ["SALAMANCA", "REFINERIA", "PETROLEO", "BARROCO", "CONVENTO", "CRISTO", "NEGRO", "FIESTA", "CORPUS", "INDUSTRIA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/10b981/ffffff?text=Refinería+Salamanca", answers: ["refineria", "refineria salamanca"] },
        { type: "puzzle", data: "https://placehold.co/400x400/10b981/ffffff?text=Ex+Convento+de+San+Agustín" }
    ],
    28: [
        { type: "trivia", data: [{ question: "¿Qué maravilla de la ingeniería del siglo XVII se encuentra en Salvatierra?", options: ["El Puente de Batanes", "El Acueducto de Querétaro", "El Puente de Ojuela", "El Puente de la Torre"], answer: "El Puente de Batanes" }, { question: "¿Qué distinción histórica tiene Salvatierra?", options: ["Fue la primera ciudad de Guanajuato", "Fue la capital del estado", "Fue la ciudad más grande de México", "Fue la primera ciudad de América"], answer: "Fue la primera ciudad de Guanajuato" }, { question: "¿Qué son las 'largas', platillo típico de Salvatierra?", options: ["Tortillas grandes con guisado", "Un tipo de pan dulce", "Una bebida fermentada", "Un postre de leche"], answer: "Tortillas grandes con guisado" }, { question: "¿Qué fiesta se celebra en Salvatierra?", options: ["La Marquesada", "La Guelaguetza", "El Carnaval de Veracruz", "La Feria de San Marcos"], answer: "La Marquesada" }, { question: "¿Qué título turístico ostenta Salvatierra?", options: ["Pueblo Mágico", "Ciudad Patrimonio", "Maravilla del Mundo", "Destino de Playa"], answer: "Pueblo Mágico" }] },
        { type: "rellenar", data: "Salvatierra fue la {1} ciudad de Guanajuato y es famosa por su Puente de {2} y su fiesta de La {3}.", answers: ["primera", "Batanes", "Marquesada"] },
        { type: "sopa", data: { words: ["SALVATIERRA", "PUENTE", "BATANES", "MARQUESADA", "PUEBLO", "MAGICO", "HACIENDA", "FIESTA", "CIUDAD", "PRIMERA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/d946ef/ffffff?text=Puente+de+Batanes", answers: ["puente de batanes"] },
        { type: "puzzle", data: "https://placehold.co/400x400/d946ef/ffffff?text=Hacienda" }
    ],
    29: [
        { type: "trivia", data: [{ question: "¿Qué importante ruta histórica pasaba por San Diego de la Unión?", options: ["El Camino Real de Tierra Adentro", "La Ruta de la Seda", "La Ruta de las Especias", "El Camino de Santiago"], answer: "El Camino Real de Tierra Adentro" }, { question: "¿Qué tipo de paisajes predominan en el municipio?", options: ["Semidesérticos del altiplano", "Bosques de coníferas", "Selva tropical", "Playas y costas"], answer: "Semidesérticos del altiplano" }, { question: "¿Qué actividad económica fue importante en el pasado de San Diego de la Unión?", options: ["Minería", "Pesca", "Industria textil", "Producción de café"], answer: "Minería" }, { question: "¿Cuál es el platillo típico de San Diego de la Unión?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en San Diego de la Unión?", options: ["San Diego de Alcalá", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Diego de Alcalá" }] },
        { type: "rellenar", data: "San Diego de la Unión formó parte del Camino {1} de Tierra Adentro y su paisaje es representativo del {2} mexicano.", answers: ["Real", "altiplano"] },
        { type: "sopa", data: { words: ["SAN", "DIEGO", "UNION", "NORTE", "CAMINO", "REAL", "PLATA", "FIESTA", "ALCALA", "HISTORIA"], size: 10 } },
        { type: "adivina", data: "https://placehold.co/800x600/0284c7/ffffff?text=Camino+Real", answers: ["camino real", "camino"] },
        { type: "puzzle", data: "https://placehold.co/400x400/0284c7/ffffff?text=Paisaje+del+Altiplano" }
    ],
    30: [
        { type: "trivia", data: [{ question: "¿Con qué apodo se conoce a San Felipe?", options: ["Torres Mochas", "La Perla del Bajío", "La Atenas de Guanajuato", "La Capital del Mundo"], answer: "Torres Mochas" }, { question: "¿Qué bebida fermentada del maguey es tradicional en San Felipe?", options: ["Pulque", "Tequila", "Cerveza", "Vino"], answer: "Pulque" }, { question: "¿Qué tipo de artesanía se elabora en San Felipe?", options: ["Alfarería", "Madera tallada", "Textiles", "Cestería"], answer: "Alfarería" }, { question: "¿Qué actividad de aventura es popular en los alrededores de San Felipe?", options: ["Ciclismo de montaña", "Buceo", "Surf", "Esquí"], answer: "Ciclismo de montaña" }, { question: "¿Cuál es el platillo típico de San Felipe?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "A San Felipe se le conoce como 'Torres {1}' por sus iglesias inconclusas y es productor de {2} y mezcal.", answers: ["Mochas", "pulque"] },
        { type: "sopa", data: { words: ["SAN", "FELIPE", "TORRES", "MOCHAS", "PULQUE", "MEZCAL", "ALFARERIA", "FIESTA", "AVENTURA", "CICLISMO"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/f97316/ffffff?text=Torres+Mochas", answers: ["torres mochas", "iglesia"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f97316/ffffff?text=Maguey+y+Mezcal" }
    ],
    31: [
        { type: "trivia", data: [{ question: "¿De qué es San Francisco del Rincón la 'Capital del Sombrero'?", options: ["De México", "De Guanajuato", "Del Mundo", "De América Latina"], answer: "De México" }, { question: "¿Qué tipo de calzado se produce en gran cantidad en el municipio?", options: ["Calzado deportivo (tenis)", "Botas vaqueras", "Zapatillas de ballet", "Sandalias"], answer: "Calzado deportivo (tenis)" }, { question: "¿Qué tradición de Semana Santa es famosa en San Francisco del Rincón?", options: ["La Quema de Judas", "La Procesión del Silencio", "La Judea", "Los Cristos de Caña"], answer: "La Quema de Judas" }, { question: "¿Qué ex-presidente de México tiene sus raíces familiares en este municipio?", options: ["Vicente Fox Quesada", "Felipe Calderón Hinojosa", "Enrique Peña Nieto", "Andrés Manuel López Obrador"], answer: "Vicente Fox Quesada" }, { question: "¿Cuál es el apodo del municipio?", options: ["San Pancho", "San Fran", "El Rincón", "La Capital"], answer: "San Pancho" }] },
        { type: "rellenar", data: "San Francisco del Rincón es la capital del {1} y del calzado {2}, y celebra la Quema de {3}.", answers: ["sombrero", "deportivo", "Judas"] },
        { type: "sopa", data: { words: ["SAN", "FRANCISCO", "RINCON", "SOMBRERO", "TENIS", "JUDAS", "QUEMA", "FIESTA", "INDUSTRIA", "CAPITAL"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/65a30d/ffffff?text=Sombreros+y+Tenis", answers: ["sombreros y tenis", "sombreros", "tenis"] },
        { type: "puzzle", data: "https://placehold.co/400x400/65a30d/ffffff?text=Quema+de+Judas" }
    ],
    32: [
        { type: "trivia", data: [{ question: "¿En qué importante carretera se ubica San José Iturbide?", options: ["Carretera 57 (México-Piedras Negras)", "Carretera 45 (Panamericana)", "Carretera del Sol", "Carretera Transpeninsular"], answer: "Carretera 57 (México-Piedras Negras)" }, { question: "¿Qué cerro es ideal para el senderismo en el municipio?", options: ["Cerro del Pinal", "Cerro del Cubilete", "Cerro de la Bufa", "Cerro de las Comadres"], answer: "Cerro del Pinal" }, { question: "¿Qué actividad económica ha crecido mucho en San José Iturbide recientemente?", options: ["Industria (parques industriales)", "Turismo de playa", "Producción de vino", "Pesca"], answer: "Industria (parques industriales)" }, { question: "¿En qué región de Guanajuato se encuentra?", options: ["Noreste", "Sureste", "Noroeste", "Suroeste"], answer: "Noreste" }, { question: "¿Cuál es el platillo típico de San José Iturbide?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "San José Iturbide es la puerta del {1} de Guanajuato y tiene importantes parques {2}.", answers: ["noreste", "industriales"] },
        { type: "sopa", data: { words: ["SAN", "JOSE", "ITURBIDE", "NORESTE", "INDUSTRIA", "PARQUE", "PINAL", "CARRETERA", "FIESTA", "PROGRESO"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/ec4899/ffffff?text=Parque+Industrial", answers: ["parque industrial", "fabrica"] },
        { type: "puzzle", data: "https://placehold.co/400x400/ec4899/ffffff?text=Cerro+del+Pinal" }
    ],
    33: [
        { type: "trivia", data: [{ question: "¿Qué pueblo 'fantasma' es un gran atractivo cerca de San Luis de la Paz?", options: ["Mineral de Pozos", "El Cubo", "La Valenciana", "Real de Catorce"], answer: "Mineral de Pozos" }, { question: "¿Qué comunidad indígena tiene un importante asentamiento en el municipio?", options: ["Chichimeca-Jonaz", "Tarahumaras", "Mayas", "Zapotecas"], answer: "Chichimeca-Jonaz" }, { question: "¿Qué importante ruta histórica atravesaba San Luis de la Paz?", options: ["El Camino Real de Tierra Adentro", "La Ruta de Cortés", "La Ruta de la Amistad", "La Ruta del Peregrino"], answer: "El Camino Real de Tierra Adentro" }, { question: "¿Qué tipo de música es tradicional en la región?", options: ["Música de viento", "Mariachi", "Son jarocho", "Rock"], answer: "Música de viento" }, { question: "¿Qué título turístico tiene Mineral de Pozos?", options: ["Pueblo Mágico", "Ciudad Patrimonio", "Maravilla del Mundo", "Destino de Aventura"], answer: "Pueblo Mágico" }] },
        { type: "rellenar", data: "Cerca de San Luis de la Paz se encuentra el Pueblo Mágico de Mineral de {1}, y es hogar de la comunidad {2}-Jonaz.", answers: ["Pozos", "Chichimeca"] },
        { type: "sopa", data: { words: ["SAN", "LUIS", "PAZ", "POZOS", "MINERAL", "CHICHIMECA", "MISION", "PUEBLO", "MAGICO", "FANTASMA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/0284c7/ffffff?text=Mineral+de+Pozos", answers: ["mineral de pozos", "pozos"] },
        { type: "puzzle", data: "https://placehold.co/400x400/0284c7/ffffff?text=Misión+Chichimeca" }
    ],
    34: [
        { type: "trivia", data: [{ question: "¿Qué cultura originaria tiene una fuerte presencia en Santa Catarina?", options: ["Otomí", "Náhuatl", "Purépecha", "Maya"], answer: "Otomí" }, { question: "¿En qué región montañosa se ubica el municipio?", options: ["Sierra Gorda", "Sierra Madre Occidental", "Eje Neovolcánico", "Sierra de Lobos"], answer: "Sierra Gorda" }, { question: "¿Qué tipo de artesanías se elaboran con fibras vegetales en la región?", options: ["Textiles y piezas de ixtle", "Muebles de madera", "Figuras de barro", "Joyería de plata"], answer: "Textiles y piezas de ixtle" }, { question: "¿Qué tipo de turismo es ideal para Santa Catarina?", options: ["Turismo rural y de naturaleza", "Turismo de sol y playa", "Turismo de negocios", "Turismo de lujo"], answer: "Turismo rural y de naturaleza" }, { question: "¿Cuál es el platillo típico de Santa Catarina?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "En Santa Catarina hay una fuerte presencia de la cultura {1} y se encuentra en la {2} Gorda.", answers: ["Otomí", "Sierra"] },
        { type: "sopa", data: { words: ["SANTA", "CATARINA", "OTOMI", "SIERRA", "GORDA", "BOSQUE", "CAÑON", "IXTLE", "TEXTIL", "TRADICION"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/16a34a/ffffff?text=Comunidad+Otomí", answers: ["otomi", "otomies"] },
        { type: "puzzle", data: "https://placehold.co/400x400/16a34a/ffffff?text=Paisaje+Serrano" }
    ],
    35: [
        { type: "trivia", data: [{ question: "¿Qué famoso vals fue compuesto por Juventino Rosas?", options: ["Sobre las Olas", "El Danubio Azul", "Las Mañanitas", "Cielito Lindo"], answer: "Sobre las Olas" }, { question: "¿Cómo se llamaba antes el municipio?", options: ["Santa Cruz de Galeana", "Santa Fe", "Villa de Reyes", "El Pitic"], answer: "Santa Cruz de Galeana" }, { question: "¿Qué instrumento tocaba principalmente Juventino Rosas?", options: ["Violín", "Piano", "Guitarra", "Trompeta"], answer: "Violín" }, { question: "¿En qué siglo vivió Juventino Rosas?", options: ["Siglo XIX", "Siglo XVIII", "Siglo XX", "Siglo XVII"], answer: "Siglo XIX" }, { question: "¿Cuál es el platillo típico de Juventino Rosas?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "El vals 'Sobre las {1}' fue compuesto por {2}, nacido en este municipio.", answers: ["Olas", "Juventino Rosas"] },
        { type: "sopa", data: { words: ["JUVENTINO", "ROSAS", "VALS", "OLAS", "MUSICA", "SANTA", "CRUZ", "COMPOSITOR", "VIOLIN", "MUSEO"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/c026d3/ffffff?text=Partitura+Sobre+las+Olas", answers: ["sobre las olas", "juventino rosas"] },
        { type: "puzzle", data: "https://placehold.co/400x400/c026d3/ffffff?text=Monumento+a+Juventino+Rosas" }
    ],
    36: [
        { type: "trivia", data: [{ question: "¿Qué caracteriza a Santiago Maravatío?", options: ["Ser el más pequeño de Guanajuato", "Ser el más grande", "Ser el más frío", "Ser el más alto"], answer: "Ser el más pequeño de Guanajuato" }, { question: "¿Qué atractivo natural es famoso en el municipio?", options: ["Aguas termales", "Cascadas", "Grutas", "Volcanes"], answer: "Aguas termales" }, { question: "¿Qué tipo de turismo es popular en Santiago Maravatío?", options: ["De descanso y relajación", "De aventura extrema", "Cultural", "De negocios"], answer: "De descanso y relajación" }, { question: "¿Qué se produce en la gastronomía local?", options: ["Dulces y conservas de frutas", "Quesos y vinos", "Pan y pasteles", "Cerveza artesanal"], answer: "Dulces y conservas de frutas" }, { question: "¿Cuál es el platillo típico de Santiago Maravatío?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "Santiago Maravatío es el municipio más {1} de Guanajuato y es conocido por sus {2} termales.", answers: ["pequeño", "aguas"] },
        { type: "sopa", data: { words: ["SANTIAGO", "MARAVATIO", "PEQUEÑO", "AGUAS", "TERMALES", "BALNEARIO", "DULCES", "FRUTAS", "PAZ", "DESCANSO"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/f59e0b/ffffff?text=Balneario", answers: ["balneario", "parque acuatico"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f59e0b/ffffff?text=Parroquia+de+Santiago+Apóstol" }
    ],
    37: [
        { type: "trivia", data: [{ question: "¿Qué monumento se encuentra en la cima del Cerro del Cubilete?", options: ["Cristo Rey", "El Ángel de la Independencia", "La Diana Cazadora", "El Pípila"], answer: "Cristo Rey" }, { question: "¿Qué importante infraestructura de transporte se encuentra en Silao?", options: ["El Aeropuerto Internacional del Bajío", "El puerto marítimo más grande", "La estación de tren bala", "El teleférico más alto"], answer: "El Aeropuerto Internacional del Bajío" }, { question: "¿Qué industria es muy fuerte en Silao?", options: ["Automotriz", "Textil", "Pesquera", "Maderera"], answer: "Automotriz" }, { question: "El Cerro del Cubilete es considerado el centro geográfico de...", options: ["México", "Guanajuato", "América Latina", "El Mundo"], answer: "México" }, { question: "¿Cuál es el platillo típico de Silao?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "En Silao se encuentra el cerro del {1}, con el monumento a {2}, y también el {3} Internacional del Bajío.", answers: ["Cubilete", "Cristo Rey", "Aeropuerto"] },
        { type: "sopa", data: { words: ["SILAO", "CRISTO", "REY", "CUBILETE", "AEROPUERTO", "INDUSTRIA", "AUTOMOTRIZ", "CENTRO", "GEOGRAFICO", "VICTORIA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/f97316/ffffff?text=Cristo+Rey", answers: ["cristo rey", "cubilete"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f97316/ffffff?text=Parque+Industrial" }
    ],
    38: [
        { type: "trivia", data: [{ question: "¿Por qué tipo de artesanía es famoso Tarandacuao?", options: ["Alfarería de alta temperatura", "Muebles de madera", "Sarapes de lana", "Sombreros de palma"], answer: "Alfarería de alta temperatura" }, { question: "¿Qué río importante cruza el municipio?", options: ["Río Lerma", "Río Bravo", "Río Grijalva", "Río Usumacinta"], answer: "Río Lerma" }, { question: "¿Qué significa 'Tarandacuao' en purépecha?", options: ["Lugar donde nace el agua", "Lugar de alfareros", "Tierra de peces", "Cerro de la olla"], answer: "Lugar donde nace el agua" }, { question: "¿Con qué estado colinda Tarandacuao?", options: ["Michoacán", "Jalisco", "Querétaro", "San Luis Potosí"], answer: "Michoacán" }, { question: "¿Cuál es el platillo típico de Tarandacuao?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "Tarandacuao es famoso por su alfarería de alta {1} y su nombre significa 'lugar donde nace el {2}'.", answers: ["temperatura", "agua"] },
        { type: "sopa", data: { words: ["TARANDACUAO", "ALFARERIA", "CERAMICA", "AGUA", "RIO", "LERMA", "FIESTA", "SANTIAGO", "ARTESANIA", "TEMPERATURA"], size: 13 } },
        { type: "adivina", data: "https://placehold.co/800x600/14b8a6/ffffff?text=Alfarería", answers: ["alfareria", "ceramica", "barro"] },
        { type: "puzzle", data: "https://placehold.co/400x400/14b8a6/ffffff?text=Taller+de+Cerámica" }
    ],
    39: [
        { type: "trivia", data: [{ question: "¿Qué legumbre es el principal producto agrícola de Tarimoro?", options: ["Cacahuate", "Frijol", "Lenteja", "Garbanzo"], answer: "Cacahuate" }, { question: "¿Qué tipo de dulces se elaboran con este producto?", options: ["Garapiñados y palanquetas", "Chocolates y bombones", "Gomitas y caramelos", "Pasteles y galletas"], answer: "Garapiñados y palanquetas" }, { question: "¿A qué santo patrono está dedicada la fiesta más importante de Tarimoro?", options: ["Señor de la Piedad", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "Señor de la Piedad" }, { question: "¿En qué siglo fue fundado Tarimoro?", options: ["Siglo XVI", "Siglo XVII", "Siglo XVIII", "Siglo XIX"], answer: "Siglo XVI" }, { question: "¿Cuál es el platillo típico de Tarimoro?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "Tarimoro es el principal productor de {1} en el estado y celebra al Señor de la {2}.", answers: ["cacahuate", "Piedad"] },
        { type: "sopa", data: { words: ["TARIMORO", "CACAHUATE", "DULCE", "FIESTA", "PIEDAD", "AGRICULTURA", "GARAPIÑADO", "PALANQUETA", "TRADICION", "CULTURA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/eab308/ffffff?text=Cacahuates", answers: ["cacahuates", "cacahuate"] },
        { type: "puzzle", data: "https://placehold.co/400x400/eab308/ffffff?text=Fiesta+Patronal" }
    ],
    40: [
        { type: "trivia", data: [{ question: "¿Qué cultura originaria tiene una fuerte herencia en Tierra Blanca?", options: ["Chichimeca-Jonaz", "Otomí", "Purépecha", "Náhuatl"], answer: "Chichimeca-Jonaz" }, { question: "¿En qué región montañosa se encuentra el municipio?", options: ["Sierra Gorda", "Sierra de Lobos", "Eje Neovolcánico", "Sierra Madre del Sur"], answer: "Sierra Gorda" }, { question: "¿Cómo se autodenomina el pueblo Chichimeca-Jonaz?", options: ["Úza'", "Wirrárika", "Ñañú", "Comcáac"], answer: "Úza'" }, { question: "¿Qué tipo de turismo se puede practicar en Tierra Blanca?", options: ["Ecológico y cultural", "De sol y playa", "De negocios", "Religioso"], answer: "Ecológico y cultural" }, { question: "¿Cuál es el platillo típico de Tierra Blanca?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "Tierra Blanca es un municipio con fuerte herencia de la cultura {1}-{2} y se ubica en la {3} Gorda.", answers: ["Chichimeca", "Jonaz", "Sierra"] },
        { type: "sopa", data: { words: ["TIERRA", "BLANCA", "CHICHIMECA", "JONAZ", "SIERRA", "GORDA", "CAÑON", "CULTURA", "TRADICION", "ARTESANIA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/22c55e/ffffff?text=Paisaje+Sierra+Gorda", answers: ["sierra gorda", "chichimeca"] },
        { type: "puzzle", data: "https://placehold.co/400x400/22c55e/ffffff?text=Comunidad+Chichimeca" }
    ],
    41: [
        { type: "trivia", data: [{ question: "¿De qué material son los famosos tapetes de Uriangato?", options: ["Aserrín", "Flores", "Piedras", "Telas"], answer: "Aserrín" }, { question: "¿En qué festividad se elaboran estos tapetes?", options: ["La Octava Noche de San Miguel", "El Día de Muertos", "La Navidad", "La Semana Santa"], answer: "La Octava Noche de San Miguel" }, { question: "¿Qué industria comparte Uriangato con Moroleón?", options: ["Textil", "Automotriz", "Minera", "Agrícola"], answer: "Textil" }, { question: "¿Qué significa 'Uriangato'?", options: ["Lugar donde el sol se pone", "Lugar de agua", "Cerro alto", "Valle florido"], answer: "Lugar donde el sol se pone" }, { question: "¿Cuál es el platillo típico de Uriangato?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Carnitas" }] },
        { type: "rellenar", data: "En Uriangato, las calles se cubren con tapetes de {1} de colores durante la fiesta de {2}.", answers: ["aserrín", "San Miguel"] },
        { type: "sopa", data: { words: ["URIANGATO", "TAPETES", "ASERRIN", "OCTAVA", "NOCHE", "FIESTA", "TEXTIL", "COMERCIO", "MODA", "ARTE"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/d946ef/ffffff?text=Tapetes+de+Aserrín", answers: ["tapetes de aserrin", "tapetes"] },
        { type: "puzzle", data: "https://placehold.co/400x400/d946ef/ffffff?text=Iglesia+de+San+Miguel" }
    ],
    42: [
        { type: "trivia", data: [{ question: "¿Con qué apodo se conoce a Valle de Santiago?", options: ["El País de las Siete Luminarias", "El Corazón del Bajío", "La Perla de Guanajuato", "La Ciudad de las Fresas"], answer: "El País de las Siete Luminarias" }, { question: "¿Qué son las 'Siete Luminarias'?", options: ["Cráteres volcánicos", "Estrellas muy brillantes", "Minas de oro", "Fuentes de agua"], answer: "Cráteres volcánicos" }, { question: "¿Qué tipo de historias se cuentan sobre los cráteres?", options: ["Leyendas de OVNIs", "Cuentos de hadas", "Fábulas de animales", "Mitos griegos"], answer: "Leyendas de OVNIs" }, { question: "¿Qué se cultiva en las fértiles tierras de Valle de Santiago?", options: ["Hortalizas", "Café", "Cacao", "Plátano"], answer: "Hortalizas" }, { question: "¿Cuál es el platillo típico de Valle de Santiago?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "Valle de Santiago es conocido como el País de las Siete {1}, que son {2} volcánicos.", answers: ["Luminarias", "cráteres"] },
        { type: "sopa", data: { words: ["VALLE", "SANTIAGO", "SIETE", "LUMINARIAS", "CRATER", "VOLCAN", "OVNI", "LEYENDA", "MISTERIO", "HORTALIZAS"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/581c87/ffffff?text=Cráter+Volcánico", answers: ["crater", "volcan", "siete luminarias"] },
        { type: "puzzle", data: "https://placehold.co/400x400/581c87/ffffff?text=Vista+Aérea" }
    ],
    43: [
        { type: "trivia", data: [{ question: "¿Qué árbol notable se encuentra en Victoria?", options: ["El árbol del tule más grande del estado", "El ahuehuete más antiguo del mundo", "El pino más alto de México", "El roble más ancho"], answer: "El árbol del tule más grande del estado" }, { question: "¿Qué cultura prehispánica tuvo un importante asentamiento en la zona?", options: ["Chichimeca", "Olmeca", "Maya", "Azteca"], answer: "Chichimeca" }, { question: "¿En qué región de Guanajuato se encuentra Victoria?", options: ["Noreste", "Sureste", "Noroeste", "Suroeste"], answer: "Noreste" }, { question: "¿Cuál es el platillo típico de Victoria?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }, { question: "¿Qué fiesta patronal se celebra en Victoria?", options: ["San Juan Bautista", "San Miguel Arcángel", "San Judas Tadeo", "Virgen de Guadalupe"], answer: "San Juan Bautista" }] },
        { type: "rellenar", data: "En Victoria se encuentra el árbol del {1} más grande del estado y fue un antiguo asentamiento {2}.", answers: ["tule", "chichimeca"] },
        { type: "sopa", data: { words: ["VICTORIA", "TULE", "ARBOL", "CHICHIMECA", "NORESTE", "CAÑON", "FIESTA", "SAN JUAN", "NATURALEZA", "HISTORIA"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/f43f5e/ffffff?text=Árbol+del+Tule", answers: ["arbol del tule", "tule"] },
        { type: "puzzle", data: "https://placehold.co/400x400/f43f5e/ffffff?text=Paisaje+Noreste" }
    ],
    44: [
        { type: "trivia", data: [{ question: "¿Qué productos son famosos en Villagrán?", options: ["Lácteos (quesos y cremas)", "Textiles", "Zapatos", "Fresas"], answer: "Lácteos (quesos y cremas)" }, { question: "¿En qué importante corredor económico se encuentra?", options: ["Corredor industrial del Bajío", "Corredor turístico de la Riviera Maya", "Corredor del TLCAN", "Corredor Transístmico"], answer: "Corredor industrial del Bajío" }, { question: "¿En honor a qué héroe de la independencia fue nombrado el municipio?", options: ["Julián Villagrán", "Miguel Hidalgo", "Ignacio Allende", "José María Morelos"], answer: "Julián Villagrán" }, { question: "¿Cerca de qué ciudad importante se encuentra Villagrán?", options: ["Celaya", "León", "Guanajuato", "Irapuato"], answer: "Celaya" }, { question: "¿Cuál es el platillo típico de Villagrán?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Carnitas" }] },
        { type: "rellenar", data: "Villagrán es famoso por su producción de productos {1} como quesos y cremas, y fue nombrado en honor a {2} Villagrán.", answers: ["lácteos", "Julián"] },
        { type: "sopa", data: { words: ["VILLAGRAN", "LACTEOS", "QUESO", "CREMA", "INDUSTRIA", "BAJIO", "FIESTA", "JULIAN", "HISTORIA", "PROGRESO"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/84cc16/ffffff?text=Quesos+y+Lácteos", answers: ["quesos", "lacteos"] },
        { type: "puzzle", data: "https://placehold.co/400x400/84cc16/ffffff?text=Industria" }
    ],
    45: [
        { type: "trivia", data: [{ question: "¿De qué género musical es Xichú la capital?", options: ["Huapango Arribeño", "Son Jarocho", "Mariachi", "Norteño"], answer: "Huapango Arribeño" }, { question: "¿En qué consiste el Huapango Arribeño?", options: ["Un duelo de versos improvisados", "Un baile zapateado", "Una canción romántica", "Una marcha militar"], answer: "Un duelo de versos improvisados" }, { question: "¿En qué región natural se encuentra Xichú?", options: ["Sierra Gorda", "Bajío", "Altiplano", "Costa"], answer: "Sierra Gorda" }, { question: "¿Qué actividad económica fue importante en el pasado de Xichú?", options: ["Minería", "Agricultura", "Ganadería", "Pesca"], answer: "Minería" }, { question: "¿Cuál es el platillo típico de Xichú?", options: ["Caldo de oso", "Enchiladas mineras", "Guacamayas", "Carnitas"], answer: "Caldo de oso" }] },
        { type: "rellenar", data: "Xichú es la capital del Huapango {1}, que es un duelo de {2} improvisados.", answers: ["Arribeño", "versos"] },
        { type: "sopa", data: { words: ["XICHU", "HUAPANGO", "ARRIBEÑO", "MUSICA", "POESIA", "SIERRA", "GORDA", "RIO", "FESTIVAL", "TROVADORES"], size: 12 } },
        { type: "adivina", data: "https://placehold.co/800x600/10b981/ffffff?text=Músicos+de+Huapango", answers: ["huapango", "huapango arribeño", "musicos"] },
        { type: "puzzle", data: "https://placehold.co/400x400/10b981/ffffff?text=Paisaje+Serrano" }
    ],
    46: [
        { type: "trivia", data: [{ question: "¿Qué significa 'Yuririapúndaro' en purépecha?", options: ["Lago de sangre", "Cerro de piedra", "Río de peces", "Valle de flores"], answer: "Lago de sangre" }, { question: "¿Qué tipo de aves migratorias son famosas en la Laguna de Yuriria?", options: ["Pelícanos borregones", "Flamencos rosas", "Águilas reales", "Guacamayas"], answer: "Pelícanos borregones" }, { question: "¿Qué impresionante edificio histórico se encuentra a orillas de la laguna?", options: ["El Ex-Convento Agustino de San Pablo", "El Palacio de Bellas Artes", "El Castillo de Chapultepec", "La Catedral Metropolitana"], answer: "El Ex-Convento Agustino de San Pablo" }, { question: "La Laguna de Yuriria fue una de las primeras grandes obras... de América Latina.", options: ["Hidráulicas", "Arquitectónicas", "Escultóricas", "Pictóricas"], answer: "Hidráulicas" }, { question: "¿Qué título turístico ostenta Yuriria?", options: ["Pueblo Mágico", "Ciudad Patrimonio", "Maravilla del Mundo", "Destino de Playa"], answer: "Pueblo Mágico" }] },
        { type: "puzzle", data: "https://placehold.co/400x400/a855f7/ffffff?text=Ex-convento+de+Yuriria" },
        { type: "sopa", data: { words: ["YURIRIA", "LAGUNA", "CONVENTO", "PESCA", "PELICANO", "PUEBLO", "MAGICO", "AGUSTINO", "FORTALEZA", "SANGRE"], size: 12 } },
        { type: "rellenar", data: "El Ex-Convento de Yuriria parece una {1} medieval y en su laguna habitan {2} borregones.", answers: ["fortaleza", "pelícanos"] },
        { type: "adivina", data: "https://placehold.co/800x600/a855f7/ffffff?text=Laguna+con+Pelícanos", answers: ["laguna", "laguna de yuriria", "pelicanos"] }
    ]
};
