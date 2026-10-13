const questions = [
    {
        question: 'Dái đất có hình gi?',
        answers: ['Hình tròn', 'Hình Vuông', 'Hình cầu', 'Hình như cô ấy thích mình'],
        correct: 2
    },
    {
        question: 'Bạn nào trong lốp 8B3 ngầu nhất?',
        answers: ['Nhật Khiêm', 'Duy Thiên', 'Trung Quân', 'Tôi'],
        correct: 1
    },
    {
        question: 'Thầy Thanh dễ thương không?',
        answers: ['Có', 'Đáp án A', 'Đáp án B', 'Cả ba đều chính xác'],
        correct: 3
    },
    {
        question: 'Ai là lốp trưởng của 8B3?',
        answers: ['Ngọc Hiên', 'Gia Tường', 'Thiên Phú', 'Thiên Phú (Nhiều aura hơn)'],
        correct: 0
    },
    {
        question: 'Sĩ số lốp 8B3 là',
        answers: ['36', '67', '44', '86'],
        correct: 2
    }
];

const questionElement = document.querySelector('#question');
const answersElement = document.querySelector('#answers');
const countElement = document.querySelector('#question-count');
const progressElement = document.querySelector('#progress-bar');
const feedbackElement = document.querySelector('#feedback');
const nextButton = document.querySelector('#next-button');

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
    const item = questions[currentQuestion];
    answered = false;
    countElement.textContent = `Câu ${currentQuestion + 1} / ${questions.length}`;
    progressElement.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    questionElement.textContent = item.question;
    answersElement.replaceChildren();
    feedbackElement.textContent = 'Chúc bạn chơi vui!';
    feedbackElement.className = 'feedback';
    nextButton.disabled = true;

    item.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-button';
        button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
        button.addEventListener('click', () => chooseAnswer(index));
        answersElement.append(button);
    });
}

function chooseAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const item = questions[currentQuestion];
    const buttons = [...answersElement.children];
    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === item.correct) button.classList.add('correct');
        if (index === selectedIndex && index !== item.correct) button.classList.add('incorrect');
    });

    if (selectedIndex === item.correct) {
        score += 1;
        feedbackElement.textContent = '+999 aura 🎉';
        feedbackElement.classList.add('success');
    } else {
        feedbackElement.textContent = 'Khôn lên dùm cái đi';
        feedbackElement.classList.add('error');
    }

    nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        renderQuestion();
        return;
    }

    countElement.textContent = 'Hoàn thành';
    progressElement.style.width = '100%';
    questionElement.textContent = `Bạn trả lời đúng ${score} / ${questions.length} câu!`;
    answersElement.replaceChildren();
    feedbackElement.textContent = 'Bạn có chút bá khí!';
    feedbackElement.className = 'feedback success';
    nextButton.textContent = 'Chơi lại ↻';
    nextButton.disabled = false;
    nextButton.onclick = () => {
        currentQuestion = 0;
        score = 0;
        nextButton.textContent = 'Câu tiếp theo →';
        nextButton.onclick = null;
        renderQuestion();
    };
});

renderQuestion();
