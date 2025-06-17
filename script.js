let cobra = [{x: 10, y: 10}];
let comida = makeFood();
let direcao = 'DIREITA';
let velocidade = 150;
let pontos = 0;
let intervalo;

function init() {
    criarTabuleiro();
    document.addEventListener('keydown', mudarDirecao);
    intervalo = setInterval(moverCobra, velocidade);
}

function criarTabuleiro() {
    const tabuleiro = document.getElementById('game-board');
    tabuleiro.innerHTML = '';

    cobra.forEach(segmento => {
        const elemento = document.createElement('div');
        elemento.style.gridRowStart = segmento.y;
        elemento.style.gridColumnStart = segmento.x;
        elemento.classList.add('snake');
        tabuleiro.appendChild(elemento);
    });
    
    function gerarComida() {
        let novaComida;
        while (!novaComida || posicaoOcupada(novaComida)) {
            novaComida = {
                x: Math.floor(Math.random()*18)+2,
                y: Math.floor(Math.random()*18)+2   
            }
        }
    }
}