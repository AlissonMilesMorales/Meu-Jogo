// Variável para guardar o tempo de início
let startTime;

// Função para inicializar o formulário
function initForm() {
    // Armazenar o tempo de início
    startTime = new Date(); // Hora de início do quiz

    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (!this.checkValidity()) {
            event.stopPropagation();
            this.classList.add('was-validated');
            return;
        }
        calculateScore();
    });
}

// Função para calcular a pontuação
function calculateScore() {
    let score = 0;

    if (checkAnswerRadio("question1", "A")) score++;
    if (checkAnswerRadio("question2", "B")) score++;
    if (checkAnswerCheckboxes("question3", ["C", "D"])) score++;
    if (checkAnswerText("question4", "peter parker")) score++;

    displayResult(score);
}

// Função para verificar a resposta de uma pergunta de múltipla escolha (radio buttons)
function checkAnswerRadio(questionName, correctAnswer) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    return selectedOption && selectedOption.value === correctAnswer;
}

// Função para verificar a resposta de uma pergunta de múltipla escolha (checkboxes)
function checkAnswerCheckboxes(questionName, correctAnswers) {
    const selectedOptions = Array.from(document.querySelectorAll(`input[name="${questionName}"]:checked`));
    const selectedValues = selectedOptions.map(option => option.value);
    return correctAnswers.length === selectedValues.length && correctAnswers.every(value => selectedValues.includes(value));
}

// Função para verificar a resposta de uma pergunta de texto
function checkAnswerText(questionName, correctAnswer) {
    const answer = document.querySelector(`input[name="${questionName}"]`).value.trim().toLowerCase();
    return answer === correctAnswer.toLowerCase();
}

// Função para exibir o resultado
function displayResult(score) {
    const endTime = new Date(); // Registro do tempo de término
    const timeTaken = (endTime - startTime) / 1000; // Tempo em segundos 
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("d-none", "alert-success", "alert-warning");
    resultDiv.classList.add(score === 4 ? "alert-success" : "alert-warning");
    resultDiv.innerHTML = score === 4
        ? `Parabéns! Você acertou todas as perguntas! Tempo: ${timeTaken} segundos.`
        : `Você acertou ${score} de 4 perguntas. Tente novamente para melhorar! Tempo: ${timeTaken} segundos.`;
}

// Inicializar o formulário quando o conteúdo da página estiver carregado
document.addEventListener('DOMContentLoaded', initForm);
