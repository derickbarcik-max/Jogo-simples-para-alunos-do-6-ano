// Seleção dos elementos do HTML
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');

let score = 0;
let correctAnswer = 0;

// Função para gerar uma nova pergunta matemática
function generateQuestion() {
    // Limpa o campo de entrada
    answerInput.value = '';
    
    // Lista de operações comuns no 6º ano (Adição, Subtração, Multiplicação e Divisão exata)
    const operations = ['+', '-', '*', '/'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2;

    if (randomOp === '+') {
        num1 = Math.floor(Math.random() * 100) + 10; // 10 a 109
        num2 = Math.floor(Math.random() * 100) + 10;
        correctAnswer = num1 + num2;
        questionElement.innerText = `Quanto é ${num1} + ${num2}?`;
    } 
    else if (randomOp === '-') {
        num1 = Math.floor(Math.random() * 100) + 50;
        num2 = Math.floor(Math.random() * 50) + 1;
        correctAnswer = num1 - num2; // Evita resultado negativo para simplificar
        questionElement.innerText = `Quanto é ${num1} - ${num2}?`;
    } 
    else if (randomOp === '*') {
        num1 = Math.floor(Math.random() * 12) + 2; // Tabuada um pouco mais avançada
        num2 = Math.floor(Math.random() * 11) + 2;
        correctAnswer = num1 * num2;
        questionElement.innerText = `Quanto é ${num1} x ${num2}?`;
    } 
    else if (randomOp === '/') {
        // Garante que a divisão seja exata
        num2 = Math.floor(Math.random() * 9) + 2; 
        correctAnswer = Math.floor(Math.random() * 10) + 2;
        num1 = num2 * correctAnswer; 
        questionElement.innerText = `Quanto é ${num1} ÷ ${num2}?`;
    }
}

// Função para verificar se a resposta está certa
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);

    // Valida se o usuário digitou algo
    if (isNaN(userAnswer)) {
        feedbackElement.innerText = "Por favor, digite um número!";
        feedbackElement.className = "feedback wrong";
        return;
    }

    if (userAnswer === correctAnswer) {
        score += 10;
        scoreElement.innerText = score;
        feedbackElement.innerText = "Acertou! Parabéns! 🎉";
        feedbackElement.className = "feedback correct";
        
        // Espera 1.5 segundos e gera a próxima pergunta
        setTimeout(generateQuestion, 1500);
    } else {
        feedbackElement.innerText = `Errado! A resposta era ${correctAnswer}.`;
        feedbackElement.className = "feedback wrong";
        
        // Espera 2 segundos para dar tempo de ler e gera a próxima pergunta
        setTimeout(generateQuestion, 2000);
    }
}

// Eventos de clique e tecla Enter
submitBtn.addEventListener('click', checkAnswer);

answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Inicializa o jogo ao carregar a página
generateQuestion();

