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
                'Для защиты диссертации и/или получения получение учёного звания и защита учёной степени',
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

    const insertAnswers = (activeAnswers) => {
        _answers.innerHTML = '';
        activeAnswers.forEach((element) => {
            const button = document.createElement('button');
            button.classList = 'quizlet__option button button--quiz';
            button.innerText = element;
            button.addEventListener('click', () => nextStep(element));
            _answers.append(button);
        });
    };

    const insertQuestion = (activeQuestion) => {
        _question.innerHTML = activeQuestion;
    };

    const addAnswer = (answer) => {
        answers.push(answer);
    };

    const nextStep = (answer) => {
        if (step + 1 < buttonsTitle.length) {
            addAnswer(answer);
            insertAnswers(buttonsTitle[++step].answers);
            insertQuestion(buttonsTitle[step].question);
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
            endQuiz();
        }
    };

    const endQuiz = () => {
        answersQuizlet = answers;
        initPopUpById(7);
    };

    insertAnswers(buttonsTitle[step].answers);
}

const _quiz1 = document.getElementById('quiz-1'),
    _quiz0 = document.getElementById('quiz-0');

quizInner0 = initQuiz(_quiz0);
quizInner1 = initQuiz(_quiz1);
