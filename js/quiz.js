function initQuiz(quiz) {
    const buttons = [
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
            ],
        },
    ];
    const answers = [];

    let step = 0;

    const _answers = quiz.querySelector('#quizlet__answers'),
        _stepWrapper = quiz.querySelector('#steps'),
        _question = quiz.querySelector('.quizlet__question'),
        _number = quiz.querySelector('.progress-bar__title');

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
        if (step + 1 < buttons.length) {
            addAnswer(answer);
            insertAnswers(buttons[++step].answers);
            insertQuestion(buttons[step].question);
            _stepWrapper.classList = `progress-bar_step-${step}`;
            _number.innerText = `Вопрос ${step + 1} из ${buttons.length}`;
        } else {
            endQuiz();
        }
    };

    const endQuiz = () => {
        dataQuiz = {
            "res": answers,
            "csrfToken": csrfToken
        }
        initPopUpById(7);
        // sendAnswers(dataQuiz);
    };

    const sendAnswers = (sendData) => {
        axios.post('/', sendData)
            .then((response) => {
                console.debug(response);
            }, (error) => {
                console.debug(error);
            });
    };

    insertAnswers(buttons[step].answers);
}

const _quiz1 = document.getElementById('quiz-1'),
    _quiz0 = document.getElementById('quiz-0');

initQuiz(_quiz1);
initQuiz(_quiz0);
