/**
 * ================================================================================
 * Módulo de Lógica de Juegos (game-logic.js)
 * --------------------------------------------------------------------------------
 * SE HA CORREGIDO EL BUG en la Sopa de Letras para que la selección de
 * palabras se detenga correctamente al soltar el clic del ratón.
 * ================================================================================
 */

export function renderTrivia(questions, container, onWinCallback) {
    let currentQuestionIndex = 0;

    function showQuestion(index) {
        const q = questions[index];
        container.innerHTML = `
            <div class="text-center p-4 h-full flex flex-col justify-center">
                <p class="text-slate-500 mb-2">Pregunta ${index + 1} de ${questions.length}</p>
                <h3 class="font-title text-2xl md:text-3xl text-slate-800 mb-8">${q.question}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
                    ${q.options.map(opt => `<button data-answer="${opt}" class="answer-btn btn-3d interactive-cursor bg-blue-500 text-white border-blue-700 p-4 text-lg">${opt}</button>`).join('')}
                </div>
            </div>
        `;
        
        container.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.answer === q.answer) {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        showQuestion(currentQuestionIndex);
                    } else {
                        container.innerHTML = `<div class="text-center flex items-center justify-center h-full"><h2 class="font-title text-4xl text-green-500">¡Todas correctas!</h2></div>`;
                        onWinCallback();
                    }
                } else {
                    btn.classList.remove('bg-blue-500', 'border-blue-700');
                    btn.classList.add('bg-red-500', 'border-red-700');
                    btn.disabled = true;
                }
            });
        });
    }

    showQuestion(0);
}

export function renderGato(container, onWinCallback) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameOver = false;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'Tie';
    }

    function aiMove() {
        if (isGameOver) return;
        const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[move] = 'O';
            currentPlayer = 'X';
            render();
            handleGameOver();
        }
    }
    
    function handleGameOver() {
        const winner = checkWinner();
        if (winner) {
            isGameOver = true;
            setTimeout(() => {
                if (winner === 'X') {
                    container.innerHTML = `<div class="text-center flex items-center justify-center h-full"><h2 class="font-title text-4xl text-green-500">¡Ganaste!</h2></div>`;
                    onWinCallback();
                } else if (winner === 'O') {
                    container.innerHTML = `<div class="text-center flex items-center justify-center h-full"><h2 class="font-title text-4xl text-red-500">¡La computadora gana!</h2><button id="retry-btn" class="btn-3d interactive-cursor bg-blue-500 text-white border-blue-700 ml-4 px-4 py-2">Reintentar</button></div>`;
                    container.querySelector('#retry-btn').addEventListener('click', () => renderGato(container, onWinCallback));
                } else {
                    container.innerHTML = `<div class="text-center flex items-center justify-center h-full"><h2 class="font-title text-4xl text-amber-500">¡Es un empate!</h2><button id="retry-btn" class="btn-3d interactive-cursor bg-blue-500 text-white border-blue-700 ml-4 px-4 py-2">Reintentar</button></div>`;
                    container.querySelector('#retry-btn').addEventListener('click', () => renderGato(container, onWinCallback));
                }
            }, 500);
        }
    }

    function render() {
        container.innerHTML = `
            <div class="text-center p-4 h-full flex flex-col justify-center items-center">
                <h3 class="font-title text-3xl text-slate-800 mb-4">Juego del Gato</h3>
                <div class="grid grid-cols-3 gap-2 w-64 h-64 md:w-80 md:h-80">
                    ${board.map((cell, index) => `
                        <div data-index="${index}" class="cell bg-blue-100 rounded-lg flex items-center justify-center text-5xl font-bold ${cell === '' ? 'interactive-cursor' : ''}">
                            ${cell === 'X' ? '<span class="text-blue-600">X</span>' : ''}
                            ${cell === 'O' ? '<span class="text-red-600">O</span>' : ''}
                        </div>
                    `).join('')}
                </div>
                 <p class="mt-4 text-slate-500">Es el turno de: <span class="font-bold">${currentPlayer}</span></p>
            </div>
        `;
        container.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', () => {
                if (isGameOver || board[cell.dataset.index] !== '' || currentPlayer !== 'X') return;
                board[cell.dataset.index] = 'X';
                currentPlayer = 'O';
                render();
                handleGameOver();
                if (!isGameOver) {
                    setTimeout(aiMove, 500);
                }
            });
        });
    }
    
    render();
}

export function renderRellenar(text, answers, container, onWinCallback) {
    const inputsCount = (text.match(/{/g) || []).length;
    let html = text.replace(/{(\d+)}/g, (match, number) => {
        return `<input type="text" class="rellenar-input inline-block w-32 mx-1 px-2 py-1 border-b-2 border-slate-400 focus:border-blue-500 outline-none bg-transparent" data-index="${number - 1}">`;
    });

    container.innerHTML = `
        <div class="text-center p-4 h-full flex flex-col justify-center">
            <h3 class="font-title text-2xl text-slate-800 mb-4">Completa la Frase</h3>
            <p class="text-xl text-slate-600 leading-loose">${html}</p>
            <button id="check-rellenar" class="btn-3d interactive-cursor bg-green-500 text-white border-green-700 mt-8 mx-auto px-8 py-3">Revisar</button>
        </div>
    `;

    document.getElementById('check-rellenar').addEventListener('click', () => {
        const userInputs = container.querySelectorAll('.rellenar-input');
        let allCorrect = true;
        userInputs.forEach(input => {
            const index = parseInt(input.dataset.index);
            if (input.value.trim().toLowerCase() !== answers[index].toLowerCase()) {
                allCorrect = false;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
                input.classList.add('border-green-500');
            }
        });

        if (allCorrect) {
            onWinCallback();
        }
    });
}

export function renderMemorama(data, container, onWinCallback) {
    const items = data.split(',').concat(data.split(','));
    items.sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;

    container.innerHTML = `
        <div class="p-4 h-full flex flex-col justify-center items-center">
            <h3 class="font-title text-3xl text-slate-800 mb-4">Memorama</h3>
            <div class="grid grid-cols-4 gap-3">
                ${items.map((item, index) => `
                    <div class="card-container h-20 w-20 interactive-cursor">
                        <div class="card relative w-full h-full" data-item="${item}" data-index="${index}">
                            <div class="card-face card-back absolute w-full h-full bg-blue-500 rounded-lg flex items-center justify-center text-3xl text-white">?</div>
                            <div class="card-face card-front absolute w-full h-full bg-amber-300 rounded-lg flex items-center justify-center text-4xl" style="transform: rotateY(180deg); backface-visibility: hidden;">${item}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('is-flipped') && !card.classList.contains('is-matched')) {
                card.classList.add('is-flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    const [card1, card2] = flippedCards;
                    if (card1.dataset.item === card2.dataset.item) {
                        card1.classList.add('is-matched');
                        card2.classList.add('is-matched');
                        matchedPairs++;
                        if (matchedPairs === items.length / 2) {
                            onWinCallback();
                        }
                        flippedCards = [];
                    } else {
                        setTimeout(() => {
                            card1.classList.remove('is-flipped');
                            card2.classList.remove('is-flipped');
                            flippedCards = [];
                        }, 1000);
                    }
                }
            }
        });
    });
    
    const style = document.createElement('style');
    style.innerHTML = `
        .card-container { perspective: 1000px; }
        .card { transform-style: preserve-3d; transition: transform 0.6s; }
        .card.is-flipped { transform: rotateY(180deg); }
        .card-face { backface-visibility: hidden; }
    `;
    container.appendChild(style);
}

export function renderAdivina(imageUrl, answers, container, onWinCallback) {
    container.innerHTML = `
        <div class="p-4 h-full flex flex-col justify-center items-center text-center">
            <h3 class="font-title text-3xl text-slate-800 mb-4">¿Qué es esto?</h3>
            <img src="${imageUrl}" alt="Adivinanza" class="max-w-sm w-full rounded-xl shadow-lg mb-6">
            <input type="text" id="adivina-input" class="text-center w-full max-w-sm px-4 py-2 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Escribe tu respuesta aquí">
            <button id="check-adivina" class="btn-3d interactive-cursor bg-green-500 text-white border-green-700 mt-4 px-8 py-3">Revisar</button>
        </div>
    `;

    document.getElementById('check-adivina').addEventListener('click', () => {
        const input = document.getElementById('adivina-input');
        const userAnswer = input.value.trim().toLowerCase();
        if (answers.includes(userAnswer)) {
            onWinCallback();
        } else {
            input.classList.add('border-red-500');
            setTimeout(() => input.classList.remove('border-red-500'), 1500);
        }
    });
}

export function renderSopa(gameData, container, onWinCallback) {
    const { words, size } = gameData;
    const grid = Array(size).fill(null).map(() => Array(size).fill(''));
    const directions = [[0, 1], [1, 0], [1, 1]]; 
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    let foundWords = new Set();

    words.forEach(word => {
        word = word.toUpperCase().replace(/\s/g, '');
        let placed = false;
        for (let i = 0; i < 100 && !placed; i++) { // Intentar 100 veces
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);
            let canPlace = true;
            for (let j = 0; j < word.length; j++) {
                const newRow = row + j * dir[0];
                const newCol = col + j * dir[1];
                if (newRow >= size || newCol >= size || (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[j])) {
                    canPlace = false;
                    break;
                }
            }
            if (canPlace) {
                for (let j = 0; j < word.length; j++) {
                    grid[row + j * dir[0]][col + j * dir[1]] = word[j];
                }
                placed = true;
            }
        }
    });

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    container.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 p-4 h-full justify-center items-center">
            <div id="sopa-grid" class="grid gap-1 bg-blue-100 p-2 rounded-lg touch-none" style="grid-template-columns: repeat(${size}, minmax(0, 1fr));">
                ${grid.map((row, r) => row.map((cell, c) => `<div class="sopa-cell w-8 h-8 md:w-10 md:h-10 bg-white rounded-md flex items-center justify-center font-bold text-slate-700 select-none interactive-cursor" data-row="${r}" data-col="${c}">${cell}</div>`).join('')).join('')}
            </div>
            <div id="sopa-words">
                <h3 class="font-title text-2xl text-slate-800 mb-2">Palabras a Encontrar</h3>
                <ul class="space-y-1">
                    ${words.map(word => `<li data-word="${word.toUpperCase().replace(/\s/g, '')}" class="text-slate-500 font-semibold transition-colors">${word}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    const gridEl = container.querySelector('#sopa-grid');
    let isSelecting = false;
    let selection = [];

    const handleMouseUp = () => {
        if (!isSelecting) return;
        isSelecting = false;
        const selectedWord = selection.map(c => c.textContent).join('');
        const reversedWord = selectedWord.split('').reverse().join('');
        
        const wordToFind = words.find(w => w.toUpperCase().replace(/\s/g, '') === selectedWord || w.toUpperCase().replace(/\s/g, '') === reversedWord);

        if (wordToFind && !foundWords.has(wordToFind.toUpperCase())) {
            foundWords.add(wordToFind.toUpperCase());
            selection.forEach(c => c.classList.add('bg-green-400', 'text-white'));
            const wordLi = container.querySelector(`li[data-word="${wordToFind.toUpperCase().replace(/\s/g, '')}"]`);
            wordLi.classList.add('line-through', 'text-green-600');
        } else {
            selection.forEach(c => c.classList.remove('bg-amber-300'));
        }
        
        selection = [];
        if (foundWords.size === words.length) {
            document.removeEventListener('mouseup', handleMouseUp);
            onWinCallback();
        }
    };

    gridEl.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('sopa-cell')) {
            isSelecting = true;
            selection = [e.target];
            e.target.classList.add('bg-amber-300');
            document.addEventListener('mouseup', handleMouseUp, { once: true });
        }
    });

    gridEl.addEventListener('mouseover', (e) => {
        if (isSelecting && e.target.classList.contains('sopa-cell') && !selection.includes(e.target)) {
            selection.push(e.target);
            e.target.classList.add('bg-amber-300');
        }
    });
}

export function renderPuzzle(imageUrl, container, onWinCallback) {
    const SIZE = 3;
    const pieceCount = SIZE * SIZE;
    let pieces = Array.from({ length: pieceCount }, (_, i) => i);
    const solvedState = [...pieces];
    const emptyIndex = pieceCount - 1;
    pieces[emptyIndex] = -1;

    function shuffle() {
        let shuffleMoves = 100;
        for (let i = 0; i < shuffleMoves; i++) {
            const emptyPos = pieces.indexOf(-1);
            const neighbors = [];
            if (emptyPos % SIZE > 0) neighbors.push(emptyPos - 1);
            if (emptyPos % SIZE < SIZE - 1) neighbors.push(emptyPos + 1);
            if (emptyPos >= SIZE) neighbors.push(emptyPos - SIZE);
            if (emptyPos < pieceCount - SIZE) neighbors.push(emptyPos + SIZE);
            
            const move = neighbors[Math.floor(Math.random() * neighbors.length)];
            [pieces[emptyPos], pieces[move]] = [pieces[move], pieces[emptyPos]];
        }
        if(JSON.stringify(pieces.map(p => p === -1 ? emptyIndex : p)) === JSON.stringify(solvedState)) {
            shuffle(); // Reshuffle if it's already solved
        }
    }
    
    shuffle();

    function render() {
        container.innerHTML = `
            <div class="p-4 h-full flex flex-col justify-center items-center">
                <h3 class="font-title text-3xl text-slate-800 mb-4">Rompecabezas</h3>
                <div id="puzzle-grid" class="grid gap-1 bg-blue-200 p-1 rounded-lg shadow-lg" style="grid-template-columns: repeat(${SIZE}, minmax(0, 1fr)); width: 300px; height: 300px;">
                    ${pieces.map((p, index) => {
                        if (p === -1) return `<div class="puzzle-piece-empty"></div>`;
                        const row = Math.floor(p / SIZE);
                        const col = p % SIZE;
                        return `
                            <div class="puzzle-piece interactive-cursor transition-transform duration-200 ease-in-out" data-index="${index}" style="
                                background-image: url(${imageUrl});
                                background-size: ${SIZE * 100}%;
                                background-position: ${col * 100 / (SIZE - 1)}% ${row * 100 / (SIZE - 1)}%;
                            "></div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        container.querySelectorAll('.puzzle-piece').forEach(piece => {
            piece.addEventListener('click', () => {
                const pieceIndex = parseInt(piece.dataset.index);
                const emptyPos = pieces.indexOf(-1);
                
                const isNeighbor = (
                    (Math.abs(pieceIndex - emptyPos) === 1 && Math.floor(pieceIndex / SIZE) === Math.floor(emptyPos / SIZE)) ||
                    (Math.abs(pieceIndex - emptyPos) === SIZE)
                );

                if (isNeighbor) {
                    [pieces[emptyPos], pieces[pieceIndex]] = [pieces[pieceIndex], pieces[emptyPos]];
                    render();
                    checkWin();
                }
            });
        });
    }
    
    function checkWin() {
        const currentState = pieces.map(p => p === -1 ? emptyIndex : p);
        if (JSON.stringify(currentState) === JSON.stringify(solvedState)) {
             setTimeout(() => {
                const gridEl = container.querySelector('#puzzle-grid');
                if (gridEl) {
                    gridEl.classList.add('border-4', 'border-green-500');
                    gridEl.innerHTML += `<div class="absolute inset-0 bg-green-500 bg-opacity-50 flex items-center justify-center font-title text-white text-4xl">¡Resuelto!</div>`;
                }
                onWinCallback();
             }, 100);
        }
    }

    render();
}


/**
 * ================================================================================
 * ¡NUEVO! Componente Reutilizable de Trivia con IA
 * --------------------------------------------------------------------------------
 * Inicia y gestiona un juego de trivia con una pregunta generada por IA
 * para un municipio específico.
 * @param {string} municipioNombre - El nombre del municipio para el tema.
 * @param {HTMLElement} container - El contenedor donde se renderizará el juego.
 * @param {Function} onWinCallback - La función a llamar cuando se gana.
 * ================================================================================
 */
export function launchAITriviaGame(municipioNombre, container, onWinCallback) {
    
    function cleanAIResponse(response) {
        const match = response.match(/{[\s\S]*}/);
        return match ? match[0] : response;
    }

    async function generateQuestion() {
        container.innerHTML = `<div class="flex items-center justify-center gap-2 text-slate-500"><div class="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-500"></div><span>La IA está pensando...</span></div>`;
        const prompt = `Crea una sola pregunta de trivia para niños sobre ${municipioNombre}, Guanajuato. Responde únicamente con un objeto JSON con claves "question", "options" (array de 4), y "answer".`;
        
        let apiResponse;
        try {
            apiResponse = await puter.ai.chat(prompt, { model: 'gemini-1.5-flash' });
            if (!apiResponse || !apiResponse.message || !apiResponse.message.content) {
                throw new Error("Respuesta de IA inválida.");
            }
            const cleanedResponse = cleanAIResponse(apiResponse.message.content);
            const triviaData = JSON.parse(cleanedResponse);
            displayQuestion(triviaData);
        } catch (error) {
            console.error("Fallo al generar trivia de IA:", error, "Respuesta recibida:", apiResponse?.message?.content);
            container.innerHTML = `<p class="text-danger">Error de la IA. <button id="retry-ia-trivia" class="underline">Reintentar</button></p>`;
            document.getElementById('retry-ia-trivia').onclick = generateQuestion;
        }
    }

    function displayQuestion(questionData) {
        const { question, options, answer } = questionData;
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

        let optionsHtml = shuffledOptions.map(option =>
            `<button class="trivia-option w-full text-left p-3 my-1 bg-slate-200 dark:bg-slate-700 hover:bg-primary hover:text-white rounded-lg transition-colors">${option}</button>`
        ).join('');

        container.innerHTML = `
            <div class="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
                <h4 class="font-bold text-slate-800 dark:text-slate-200 mb-4">${question}</h4>
                <div>${optionsHtml}</div>
                <p class="feedback-text mt-2 h-6 font-bold"></p>
            </div>
        `;

        container.querySelectorAll('.trivia-option').forEach(btn => {
            btn.onclick = (e) => handleAnswer(e, answer);
        });
    }

    function handleAnswer(e, correctAnswer) {
        const feedbackEl = container.querySelector('.feedback-text');
        
        container.querySelectorAll('.trivia-option').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('bg-success', 'text-white');
            }
        });

        if (e.target.textContent === correctAnswer) {
            e.target.classList.add('bg-success', 'text-white');
            feedbackEl.textContent = '¡Correcto!';
            feedbackEl.className = 'feedback-text mt-2 h-6 font-bold text-success';
            onWinCallback(); 
        } else {
            e.target.classList.add('bg-danger', 'text-white');
            feedbackEl.textContent = 'Incorrecto.';
            feedbackEl.className = 'feedback-text mt-2 h-6 font-bold text-danger';
        }
    }

    generateQuestion();
}
