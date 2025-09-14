// 問題データ
const quizData = [
    {
        question: "太陽系の惑星のうち、最も大きな惑星は？",
        answers: ["火星", "木星", "土星", "地球"],
        correct: 1
    },
    {
        question: "1光年とは、何を表す単位？",
        answers: ["時間の長さ", "光の速さ", "距離の長さ", "重さ"],
        correct: 2
    },
    {
        question: "織姫星として知られる、こと座のアルファ星の名前は？",
        answers: ["ベガ", "デネブ", "アルタイル", "シリウス"],
        correct: 0
    },
    {
        question: "太陽の表面温度は、およそ何℃？",
        answers: ["約1,000℃", "約6,000℃", "約10,000℃", "約100,000℃"],
        correct: 1
    },
    {
        question: "国際宇宙ステーション（ISS）は、地球からどのくらいの高さの軌道を周回している？",
        answers: ["約40km", "約400km", "約4,000km", "約40,000km"],
        correct: 1
    }
];

// UI要素の取得
const quizContainer = document.getElementById('quiz-container');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-button');
const questionNumberSpan = document.getElementById('question-number');
const totalQuestionsSpan = document.getElementById('total-questions');
const questionText = document.getElementById('question-text');
const answersDiv = document.getElementById('answers');
const resultText = document.getElementById('result-text');
const resultDetailsDiv = document.getElementById('result-details');
const retryButton = document.getElementById('retry-button');
const prizeMessage = document.getElementById('prize-message');

// ゲームの状態管理
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];

// 画面を切り替える関数
const showScreen = (screen) => {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    screen.classList.remove('hidden');
    screen.classList.add('active');
};

// クイズを開始する関数
const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = [];
    totalQuestionsSpan.textContent = quizData.length;
    showScreen(quizScreen);
    displayQuestion();
};

// 問題を表示する関数
const displayQuestion = () => {
    if (currentQuestionIndex < quizData.length) {
        const currentQuiz = quizData[currentQuestionIndex];
        questionNumberSpan.textContent = currentQuestionIndex + 1;
        questionText.textContent = currentQuiz.question;
        answersDiv.innerHTML = '';

        currentQuiz.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(index));
            answersDiv.appendChild(button);
        });
    } else {
        showResults();
    }
};

// 回答を選択したときの処理
const selectAnswer = (selectedIndex) => {
    const currentQuiz = quizData[currentQuestionIndex];
    const answerButtons = answersDiv.querySelectorAll('.answer-btn');
    const isCorrect = selectedIndex === currentQuiz.correct;

    answerButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === currentQuiz.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        score++;
    }

    answeredQuestions.push({
        question: currentQuiz.question,
        selectedAnswer: currentQuiz.answers[selectedIndex],
        correctAnswer: currentQuiz.answers[currentQuiz.correct],
        isCorrect: isCorrect
    });

    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1000);
};

// 結果画面を表示する関数
const showResults = () => {
    showScreen(resultScreen);
    resultText.textContent = `${quizData.length}問中、${score}問正解！`;

    resultDetailsDiv.innerHTML = '';
    answeredQuestions.forEach(item => {
        const p = document.createElement('p');
        p.textContent = `Q: ${item.question}\nあなたの回答: ${item.selectedAnswer} (${item.isCorrect ? '正解' : '不正解'})`;
        p.style.color = item.isCorrect ? 'var(--correct-color)' : 'var(--incorrect-color)';
        resultDetailsDiv.appendChild(p);
    });
    
    // 全問正解の場合のメッセージ
    if (score === quizData.length) {
        prizeMessage.classList.remove('hidden');
    } else {
        prizeMessage.classList.add('hidden');
    }
};

// イベントリスナーの設定
startButton.addEventListener('click', startQuiz);
retryButton.addEventListener('click', startQuiz);

// 初回画面表示
showScreen(startScreen);
