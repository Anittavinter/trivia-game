// Global variables for accessing DOM elements
const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const feedbackDiv = document.getElementById('feedback');
let currentQuestion = null; // Store the current trivia question

// Function to fetch a random trivia question
function getTriviaQuestion() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = Math.floor(Math.random() * questions.length);
            const question = questions[index];
            if (question) {
                resolve(question);
            } else {
                reject('Error fetching trivia question.');
            }
        }, 1000); // Simulate a 1-second delay
    });
}

// Function to display a trivia question
function displayQuestion(triviaQuestion) {
    questionDiv.textContent = triviaQuestion.question;
    answerDiv.value = ''; // Clear previous answer
    feedbackDiv.textContent = ''; // Clear previous feedback
}

// Event listener for "New Question" button
document.getElementById('questionBtn').addEventListener('click', () => {
    getTriviaQuestion()
        .then((question) => {
            currentQuestion = question; // Store the current question
            displayQuestion(question); // Display the question
        })
        .catch((error) => {
            feedbackDiv.textContent = error; // Display any error
        });
});

// Event listener for "Submit Answer" button
document.getElementById('answerBtn').addEventListener('click', () => {
    const userAnswer = answerDiv.value.trim().toLowerCase();
    const correctAnswer = currentQuestion.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        feedbackDiv.textContent = "Correct! 🎉";
        feedbackDiv.style.color = "green";
    } else {
        feedbackDiv.textContent = `Incorrect. The correct answer is: ${currentQuestion.answer}`;
        feedbackDiv.style.color = "red";
    }
});
