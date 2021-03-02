let answersQuizlet = null;

function initQuiz(quiz) {
    const buttonsTitle = [
        {
            question: '1. В какие сроки Вам необходима публикация?',
            answers: [
                'До 6 месяцев',
                'От 6 до 12 месяцев',
                'Более 12 месяцев',
                'Еще не знаю',
            ],
        },
        {
            question: '2. Для каких целей Вам нужна публикация?',
            answers: [
                'Для защиты диссертации/ученой степени, получения учёного звания',
                'Для подачи заявки на стипендию и/или грант',
                'Для сдачи отчётности в вузе и/или продления контракта',
                'Для карьерного роста',
                'Для повышения личного рейтинга',
                'Для развития науки',
            ],
        },
        {
            question: '3. В какой области Вы специализируетесь?',
            answers: [
                'Социо-гуманитарные науки',
                'Науки о Земле',
                'Технические науки',
                'Медицина',
                'Биоинженерия',
                'Точные науки',
            ],
        },
        {
            question: '4. Готово ли Ваше научное исследование?',
            answers: ['Да', 'Нет', 'В работе', 'Другое'],
        },
        {
            question: '5. Какие показатели журнала Вам необходимы?',
            answers: [
                'Q1 / процентиль > 75 Scopus',
                'Q2 / процентиль > 50 Scopus',
                'Q3 / процентиль > 35  Scopus ',
                'Q3 / процентиль < 35 Scopus ',
                'Q4 / проценитль < 24 Scopus ',
                'WoS без импакт – фактора  / ESCI, AHCI',
                'WoS с импакт – фактором / SSCI, SCI',
                'Пропустить вопрос',
            ],
        },
    ];
    const answers = [];

    let step = 0;

    const _answers = quiz.querySelector('.quizlet__answers'),
        _stepWrapper = quiz.querySelector('.steps'),
        _question = quiz.querySelector('.quizlet__question'),
        _number = quiz.querySelector('.progress-bar__title'),
        _buttonNext = quiz.querySelector('.quiz__button-next');

    quiz.querySelector('.quiz__button-next').addEventListener('click', () =>
        nextStep('Пропустить')
    );

    const insertAnswers = (activeStep) => {
        const activeAnswers = buttonsTitle[activeStep].answers
        _answers.innerHTML = '';
        activeAnswers.forEach((element) => {
            const button = document.createElement('button');
            button.classList = 'quizlet__option button-quiz';
            button.innerText = element;
            button.addEventListener('click', () => nextStep(element));
            _answers.append(button);
        });
    };

    const insertQuestion = (activeStep) => {
        const activeQuestion = buttonsTitle[activeStep].question
        _question.innerHTML = activeQuestion;
    };

    const addAnswer = (stepActive, answerActive) => {
        const answer = {
            "question": buttonsTitle[stepActive].question,
            "answer": answerActive
        }
        answers.push(answer);
    };

    const nextStep = (answer) => {
        if (step + 1 < buttonsTitle.length) {
            addAnswer(step, answer);
            insertAnswers(++step);
            insertQuestion(step);

            _stepWrapper.classList = `progress-bar_step-${step}`;
            _number.innerText = `Вопрос ${step + 1} из ${buttonsTitle.length}`;

            if (_buttonNext.hasAttribute("style"))
                _buttonNext.removeAttribute("style");

            switch (step) {
                case 2:
                    _buttonNext.innerHTML = "Другое";
                    break;
                case 3:
                    _buttonNext.style.display = "none";
                    break;
                case 4:
                    _buttonNext.style.display = "none";
                    break;
                default:
                    _buttonNext.innerHTML = "Пропустить вопрос";
                    break;
            }


        } else {
            addAnswer(step, answer);
            endQuiz();
        }
    };

    const endQuiz = () => {
        answersQuizlet = answers;
        if (quiz.getAttribute('id') === 'quiz-0') {
            triggerGoal("quiz_1_1");
            initPopUpById(7, "quiz_1_");
        }
        else if (quiz.getAttribute('id') === 'quiz-1') {
            triggerGoal("quiz_2_1");
            initPopUpById(7, "quiz_2_");
        }
    };

    insertAnswers(step);
}

const _quiz1 = document.getElementById('quiz-1'),
    _quiz0 = document.getElementById('quiz-0');

quizInner0 = initQuiz(_quiz0);
quizInner1 = initQuiz(_quiz1);
