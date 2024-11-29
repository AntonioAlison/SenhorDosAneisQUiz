const dadosQuiz = [
    {
        pergunta: "Quem escreveu a trilogia Senhor dos Anéis?",
        opcoes: ["Jonh Grogan", "J.R.R Tolkien", "J.A.R Tolkien", "Morgan Freeman"],
        correto: 1
    },
    {
        pergunta: "Como Isildur pegou o anel de Sauron?",
        opcoes: ["Pedindo", "Cortando a mão dele", "Roubando", "Encontrou na roupa dele"],
        correto: 1
    },
    {
        pergunta: "Qual o nome da montanha que Smaug dominou, e os anões querem de volta?",
        opcoes: ["Montanha Sombria", "Montanha da Névoa", 'Condado', 'Erebor'],
        correto: 3
    },
    {
        pergunta: "O que Bilbo Bolseiro encontra na Montanha da Névoa?",
        opcoes: ["Sua espada", "Uma bússola", 'Um anel', 'Uma capa'],
        correto: 2
    },
    {
        pergunta: "Quantas raças de Hobbit existiam?",
        opcoes: ["1", "2", '3', '4'],
        correto: 2
    },
    {
        pergunta: "Para onde Gandalf, Galadriel, Elrond, Frodo e Bilbo foram no final do filme 'O Retorno do Rei'?",
        opcoes: ["Para Mordor", "Para o Condado", 'Para Minas Tirith', 'Para a Terra dos Elfos'],
        correto: 3
    },
    {
        pergunta: "Qual é a palavra élfica para “amigo” que abre a porta para as Minas de Moria?",
        opcoes: ["Mellon", "Mithrandir", 'Naur', 'Elen síla lúmenn’ omentielvo'],
        correto: 0
    },
    {
        pergunta: "Que criatura morde o dedo de Frodo?",
        opcoes: ["Gollum", "Saruman", 'Shelob', ' Balrog'],
        correto: 0
    },
    {
        pergunta: "Quem é Tom Bombadil?",
        opcoes: ["Um elfo sábio", "Um mago poderoso", 'Um ent antigo', ' Um enigma misterioso'],
        correto: 3
    },
    {
        pergunta: "Qual é melhor?",
        opcoes: ["Harry Potter", "O Senhor dos Anéis", 'Star Wars', 'Star Trek'],
        correto: 1
    }
];

let perguntaAtual = 0, pontuacaoJogador1 = 0, pontuacaoJogador2 = 0;
let tempoInicio, tempoFim;

// Inicia o quiz
function iniciarQuiz() {
    tempoInicio = Date.now();
    trocarVisibilidade('container-inicial', 'none');
    trocarVisibilidade('container-quiz', 'flex');

    // Altera a imagem de fundo ao iniciar o quiz
    document.body.style.backgroundImage = `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
    url('https://c.wallhere.com/photos/ca/af/3840x2160_px_digital_art_Fan_Art_fantasy_Art_Photoshop_Ruin_The_Lord_Of_The_Rings-1259267.jpg!d')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    carregarPergunta();
}

// Carrega a pergunta atual
function carregarPergunta() {
    const { pergunta, opcoes } = dadosQuiz[perguntaAtual];
    document.getElementById('pergunta').textContent = pergunta;

    Array.from(document.getElementsByClassName('opcao')).forEach((botao, i) => {
        botao.textContent = opcoes[i];
        botao.style.backgroundColor = '';
        botao.disabled = false;
    });

    desativarBotao('botao-proxima', true);
    atualizarVezJogador();
}

// Atualiza a vez do jogador
function atualizarVezJogador() {
    const vezJogador = perguntaAtual % 2 === 0 ? "Vez do Jogador 1" : "Vez do Jogador 2";
    document.getElementById('vez-jogador').textContent = vezJogador;
}

// Seleciona a resposta
function selecionarResposta(selecionado) {
    const elementosOpcoes = document.getElementsByClassName('opcao');
    const respostaCorreta = dadosQuiz[perguntaAtual].correto;

    Array.from(elementosOpcoes).forEach((botao, i) => {
        botao.style.backgroundColor = i === respostaCorreta ? 'green' : (i === selecionado ? 'red' : '');
        botao.disabled = true;
    });

    if (selecionado === respostaCorreta) {
        if (perguntaAtual % 2 === 0) { // Jogador 1 responde perguntas pares
            pontuacaoJogador1++;
        } else { // Jogador 2 responde perguntas ímpares
            pontuacaoJogador2++;
        }
    }

    desativarBotao('botao-proxima', false);
}

// Próxima pergunta ou resultado
function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < dadosQuiz.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

// Mostra o resultado final
function mostrarResultado() {
    tempoFim = Date.now();
    const tempoTotal = Math.floor((tempoFim - tempoInicio) / 1000);

    trocarVisibilidade('container-quiz', 'none');
    trocarVisibilidade('container-resultado', 'block');

    document.getElementById('pontuacao-jogador1').textContent = "Acertos P1: "+ pontuacaoJogador1;
    document.getElementById('pontuacao-jogador2').textContent = "Acertos P2: "+ pontuacaoJogador2;

    let vencedor;
    if (pontuacaoJogador1 > pontuacaoJogador2) {
        vencedor = "Jogador 1 venceu!";
    } else if (pontuacaoJogador2 > pontuacaoJogador1) {
        vencedor = "Jogador 2 venceu!";
    } else {
        vencedor = "Empate!";
    }

    document.getElementById('vencedor').textContent = vencedor;
    document.getElementById('tempo').textContent = `Tempo gasto: ${tempoTotal} segundos`;
}



function reiniciarQuiz() {
    // Reseta as variáveis de controle
    perguntaAtual = 0;
    pontuacaoJogador1 = 0;
    pontuacaoJogador2 = 0;
    tempoInicio = 0;
    
    // Troca a visibilidade das telas
    trocarVisibilidade('container-resultado', 'none');
    trocarVisibilidade('container-inicial', 'flex');
    
    // Reseta a imagem de fundo para a tela inicial
    document.body.style.backgroundImage = "url('https://wallpapercave.com/wp/wp5252110.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // Garante a centralização do container inicial
    const containerInicial = document.getElementById('container-inicial');
    containerInicial.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
    
    document.getElementById('vez-jogador').textContent = ''; 
    document.getElementById('pontuacao-jogador1').textContent = 'Acertos P1: 0';
    document.getElementById('pontuacao-jogador2').textContent = 'Acertos P2: 0';
}

// Utilitários
function trocarVisibilidade(id, display) {
    document.getElementById(id).style.display = display;
}

function desativarBotao(id, estado) {
    document.getElementById(id).disabled = estado;
}