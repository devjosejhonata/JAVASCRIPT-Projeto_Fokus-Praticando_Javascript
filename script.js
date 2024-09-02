// Seleção de elementos HTML importantes para manipulação do DOM
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');

const tempoNaTela = document.querySelector('#timer');

// Carregamento dos áudios utilizados na aplicação
const musica = new Audio('sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('sons/play.wav');
const audioPausa = new Audio('sons/pause.mp3');
const audioTempoFinalizado = new Audio('sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500; // Definição do tempo inicial do timer (25 minutos)
let intervaloId = null; // Variável para armazenar o ID do intervalo

musica.loop = true; // Configuração para que a música toque em loop

// Alterna a música de fundo quando o checkbox é ativado/desativado
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play(); // Toca a música se estiver pausada
    } else {
        musica.pause(); // Pausa a música se estiver tocando
    }
});

// Configuração do botão "Foco" para definir o tempo e alterar o contexto
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500; // Define o tempo para 25 minutos
    alterarContexto('foco');
    focoBt.classList.add('active');
});

// Configuração do botão "Descanso Curto" para definir o tempo e alterar o contexto
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300; // Define o tempo para 5 minutos
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

// Configuração do botão "Descanso Longo" para definir o tempo e alterar o contexto
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900; // Define o tempo para 15 minutos
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

// Função para alterar o contexto visual da aplicação
function alterarContexto(contexto) {
    mostrarTempo(); // Atualiza o tempo na tela
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active'); // Remove a classe 'active' de todos os botões
    });
    html.setAttribute('data-contexto', contexto); // Define o contexto no atributo 'data-contexto' do HTML
    banner.setAttribute('src', `imagens/${contexto}.png`); // Altera a imagem do banner de acordo com o contexto
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `;
        default:
            break;
    }
}

// Função para controlar a contagem regressiva do timer
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        // Reproduz o áudio de tempo finalizado e alerta o usuário
        
        alert('Tempo finalizado!');
        zerar(); // Zera o timer
        return;
    }
    tempoDecorridoEmSegundos -= 1; // Decrementa o tempo em 1 segundo
    mostrarTempo(); // Atualiza o tempo na tela
}

// Configura o botão de iniciar/pausar o timer
startPauseBt.addEventListener('click', iniciarOuPausar);

// Função para iniciar ou pausar o timer
function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play(); // Reproduz o áudio de pausa
        zerar(); // Pausa o timer
        return;
    }
    audioPlay.play(); // Reproduz o áudio de início
    intervaloId = setInterval(contagemRegressiva, 1000); // Inicia o timer com contagem regressiva de 1 em 1 segundo
    iniciarOuPausarBt.textContent = "Pausar"; // Altera o texto do botão para "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `imagens/pause.png`); // Altera o ícone do botão para "Pausar"
}

// Função para zerar o timer e reiniciar o botão de controle
function zerar() {
    clearInterval(intervaloId); // Para o timer
    iniciarOuPausarBt.textContent = "Começar"; // Altera o texto do botão para "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `imagens/play_arrow.png`); // Altera o ícone do botão para "Começar"
    intervaloId = null; // Reseta o ID do intervalo
}

// Função para exibir o tempo restante na tela em formato MM:SS
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

// Exibe o tempo inicial na tela
mostrarTempo();
