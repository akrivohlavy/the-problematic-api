interface IProblemTestCollection {
    create: {
        type: string;
        query: string;
    };
    correctAnswer: {
        answer: string;
    };
    wrongAnswer: {
        answer: string;
    };
}

export const riddleMock = {
    create: {
        type: 'riddle',
        query: 'What is The Answer to Life, the Universe, and Everything?',
    },
    correctAnswer: {
        answer: 'It is 42.',
    },
    wrongAnswer: {
        answer: "I dont't know.",
    },
} as IProblemTestCollection;

export const expressionMock = {
    create: {
        type: 'expression',
        query: '1- (10/5)* 2 +7',
    },
    correctAnswer: {
        answer: '4',
    },
    wrongAnswer: {
        answer: '1337',
    },
} as IProblemTestCollection;
