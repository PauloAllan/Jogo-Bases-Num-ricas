function startGame() {
    var difficulty = document.getElementById("difficulty").value;
    var base = document.getElementById("base").value;
    var min, max;

    if (difficulty === "easy") {
        min = 0;
        max = 100;
    } else if (difficulty === "medium") {
        min = 100;
        max = 1000;
    } else if (difficulty === "hard") {
        min = 1001;
        max = 100000;
    }

    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    var convertedNumber;
    if (base === "binary") {
        convertedNumber = randomNumber.toString(2);
    } else if (base === "octal") {
        convertedNumber = randomNumber.toString(8);
    } else if (base === "hexadecimal") {
        convertedNumber = randomNumber.toString(16);
    }

    var gameContainer = document.getElementById("gameContainer");
    var inputHtml = '';
    var hintValuesHtml = '';

    for (var i = 0; i < convertedNumber.length; i++) {
        inputHtml += `<input type="text" id="input${i}" maxlength="1">`;
        hintValuesHtml += `<div class="hint" id="hint${i}"></div>`;
    }

    gameContainer.innerHTML = `
        <p>O número aleatório gerado é: ${randomNumber}</p>
        <p>Agora, tente adivinhar o número em ${base === "binary" ? "binário" : base === "octal" ? "octal" : "hexadecimal"}:</p>
        <div id="hintValues">${hintValuesHtml}</div>
        <div id="binaryInputContainer">${inputHtml}</div>
        <button onclick="checkGuess('${convertedNumber}', '${base}')">Verificar</button>
        <button onclick="revealHint('${convertedNumber}', '${base}')">Mostrar Dica</button>
        <button onclick="revealAnswer('${convertedNumber}')">Mostrar Resposta</button>
        <div id="result"></div>
        <div id="correctAnswer" style="display: none;">A resposta correta é ${convertedNumber}.</div>
    `;
}

function checkGuess(convertedNumber, base) {
    var userGuess = '';
    for (var i = 0; i < convertedNumber.length; i++) {
        userGuess += document.getElementById(`input${i}`).value;
    }

    var resultContainer = document.getElementById("result");
    if (userGuess.toLowerCase() === convertedNumber) {
        resultContainer.innerHTML = "<p>Parabéns! Você acertou!</p>";
    } else {
        resultContainer.innerHTML = "<p>Ops! Tente novamente.</p>";
    }
}

function revealAnswer(convertedNumber) {
    var correctAnswerContainer = document.getElementById("correctAnswer");
    correctAnswerContainer.style.display = "block";
}

function revealHint(convertedNumber, base) {
    var hintValues = document.getElementById("hintValues").children;
    var hintIndices = getRandomIndices(convertedNumber.length);

    for (var i = 0; i < hintIndices.length; i++) {
        var index = hintIndices[i];
        var value;
        if (base === "binary") {
            value = Math.pow(2, convertedNumber.length - 1 - index);
        } else if (base === "octal") {
            value = Math.pow(8, convertedNumber.length - 1 - index);
        } else if (base === "hexadecimal") {
            value = Math.pow(16, convertedNumber.length - 1 - index);
        }
        hintValues[index].innerText = value;
    }
}

function getRandomIndices(length) {
    var indices = [];
    while (indices.length < Math.ceil(length / 2)) {
        var randomIndex = Math.floor(Math.random() * length);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    return indices;
}
