var jogador = 'x';
var tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

var jogadorXPontos = 0;
var jogadorOPontos = 0;

function jogar(celula, linha, coluna) {
    if (celula.innerHTML == "" && tabuleiro[linha][coluna] == "") {
        celula.innerHTML = jogador;
        tabuleiro[linha][coluna] = jogador;

        if (verificarVencedor()) {
            Swal.fire({
                icon: 'success',
                title: 'Vitória!',
                text: 'Jogador ' + jogador + ' venceu!'
            }).then(() => {
                if (jogador === 'x') {
                    jogadorXPontos++;
                } else {
                    jogadorOPontos++;
                }
                atualizarPlacar();
                reiniciar();
            });
        } else if (verificarEmpate()) {
            Swal.fire({
                icon: 'info',
                title: 'Empate!',
                text: 'O jogo empatou!'
            }).then(() => {
                reiniciar();
            });
        } else {
            trocarJogador();
        }
    }
}

function verificarEmpate() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (tabuleiro[i][j] == "") {
                return false; // Ainda há células vazias, o jogo não está empatado
            }
        }
    }
    return true; // Todas as células estão preenchidas, é um empate
}


function verificarVencedor() {
    // Verificar linhas, colunas e diagonais para determinar se há um vencedor

    // Verificar linhas
    for (var i = 0; i < 3; i++) {
        if (
            tabuleiro[i][0] !== "" &&
            tabuleiro[i][0] === tabuleiro[i][1] &&
            tabuleiro[i][1] === tabuleiro[i][2]
        ) {
            return true;
        }
    }

    // Verificar colunas
    for (var j = 0; j < 3; j++) {
        if (
            tabuleiro[0][j] !== "" &&
            tabuleiro[0][j] === tabuleiro[1][j] &&
            tabuleiro[1][j] === tabuleiro[2][j]
        ) {
            return true;
        }
    }

    // Verificar diagonal principal
    if (
        tabuleiro[0][0] !== "" &&
        tabuleiro[0][0] === tabuleiro[1][1] &&
        tabuleiro[1][1] === tabuleiro[2][2]
    ) {
        return true;
    }

    // Verificar diagonal secundária
    if (
        tabuleiro[0][2] !== "" &&
        tabuleiro[0][2] === tabuleiro[1][1] &&
        tabuleiro[1][1] === tabuleiro[2][0]
    ) {
        return true;
    }

    return false;
}

function trocarJogador() {
    jogador = jogador === "x" ? "o" : "x";
}

function reiniciar() {
    // Reinicie o tabuleiro e recarregue a página
    tabuleiro = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    jogador = 'x'; // Defina o jogador de volta para 'x'
    atualizarTabuleiro();
}

function atualizarTabuleiro() {
    // Atualize a exibição do tabuleiro para refletir o estado atual
    var celulas = document.querySelectorAll('.quadrado');
    celulas.forEach(function (celula) {
        celula.innerHTML = "";
    });
}

function atualizarPlacar() {
    var placarXElemento = document.getElementById('placarX');
    var placarOElemento = document.getElementById('placarO');

    placarXElemento.textContent = "Jogador X: " + jogadorXPontos;
    placarOElemento.textContent = "Jogador O: " + jogadorOPontos;
}
