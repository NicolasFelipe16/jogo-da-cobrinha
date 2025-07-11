let cobra = [{x: 30, y: 15}];
let comida = gerarComida();
let direcao = 'DIREITA';
let velocidade = 150;
let pontos = 0;
let intervalo;

function iniciar() {
    criarTabuleiro();
    document.addEventListener('keydown', mudarDirecao);
    intervalo = setInterval(moverCobra, velocidade);
}

function criarTabuleiro() {
    const tabuleiro = document.getElementById('game-board');
    tabuleiro.innerHTML = '';

    cobra.forEach((segmento, index) => {
        const elemento = document.createElement('div');
        elemento.style.gridRowStart = segmento.y;
        elemento.style.gridColumnStart = segmento.x;
        
        if (index === 0) {
            elemento.classList.add('snake', 'head');
        } else if (index === cobra.length - 1) {
            elemento.classList.add('snake', 'final-tail');
        } else if (index === cobra.length - 2) {
            elemento.classList.add('snake', 'final-tail-2');
        } else if (index === cobra.length - 3) {
            elemento.classList.add('snake', 'final-tail-3');
        } else {
            elemento.classList.add('snake');
        }

        tabuleiro.appendChild(elemento);
    });
    const elementoComida = document.createElement('div');
    elementoComida.style.gridRowStart = comida.y;
    elementoComida.style.gridColumnStart = comida.x;
    elementoComida.classList.add('food');
    tabuleiro.appendChild(elementoComida);
}
function gerarComida() {
    let novaComida;
    while (!novaComida || posicaoOcupada(novaComida)) {
        novaComida = {
            x: Math.floor(Math.random() * 58) + 2,
            y: Math.floor(Math.random() * 28) + 2
        }
    }
    return novaComida;
}
function posicaoOcupada(posicao) {
    return cobra.some(segmento => segmento.x === posicao.x && segmento.y === posicao.y);
}
function mudarDirecao(event) {
    const tecla = event.key;
    if (tecla === 'ArrowUp' && direcao !== 'BAIXO') { direcao = 'CIMA'; } else
        if (tecla === 'ArrowDown' && direcao !== 'CIMA') { direcao = 'BAIXO'; } else
            if (tecla === 'ArrowLeft' && direcao !== 'DIREITA') { direcao = 'ESQUERDA'; } else
                if (tecla === 'ArrowRight' && direcao !== 'ESQUERDA') { direcao = 'DIREITA'; }
}

function moverCobra() {
    const cabeca = { ...cobra[0] };

    switch (direcao) {
        case 'CIMA':
            cabeca.y--;
            break;
        case 'BAIXO':
            cabeca.y++;
            break;
        case 'ESQUERDA':
            cabeca.x--;
            break;
        case 'DIREITA':
            cabeca.x++;
            break;
    }

    if (verificaColisao(cabeca)) {
        clearInterval(intervalo);
        alert(`Game Over! Pontos: ${pontos}`);
        return;
    }

    cobra.unshift(cabeca);

    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        pontos ++;
        velocidade -= 5;
        document.getElementById('score').textContent = `${pontos}`;
        comida = gerarComida();
    } else {
        cobra.pop();
    }

    criarTabuleiro();
}

function verificaColisao(cabeca) {
    if (cabeca.x < 1 || cabeca.x > 60 || cabeca.y < 1 || cabeca.y > 30) {
        return true;
    }

    for (let i = 1; i < cobra.length; i++) {
        if (cobra[i].x === cabeca.x && cobra[i].y === cabeca.y) {
            return true;
        }
    }
    return false;
} 

iniciar();