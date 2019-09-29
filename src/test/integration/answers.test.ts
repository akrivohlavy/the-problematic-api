import * as request from 'supertest-as-promised';

import app from 'server';
import Problem from '../../app/models/Problem';
import { expressionMock, riddleMock } from './__mocks__/answers';
import { userMock } from './__mocks__/problems';

describe('Answers (Integration)', () => {
    let tempRiddle: Problem;
    let tempExpression: Problem;

    describe('user can answer ', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/problems')
                .auth(userMock.username, userMock.password)
                .send(riddleMock.create)
                .expect(200)
                .then(({ body }: any) => {
                    tempRiddle = body;
                });
            await request(app)
                .post('/api/problems')
                .auth(userMock.username, userMock.password)
                .send(expressionMock.create)
                .expect(200)
                .then(({ body }: any) => {
                    tempExpression = body;
                });
        });

        afterEach(async () => {
            await request(app)
                .delete(`/api/problems/${tempRiddle.id}`)
                .auth(userMock.username, userMock.password)
                .expect(204);
            await request(app)
                .delete(`/api/problems/${tempExpression.id}`)
                .auth(userMock.username, userMock.password)
                .expect(204);
        });

        it('a riddle correctly', async () => {
            await request(app)
                .post(`/api/problems/${tempRiddle.id}/answers`)
                .auth(userMock.username, userMock.password)
                .send(riddleMock.correctAnswer)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body.answer).toEqual(riddleMock.correctAnswer.answer);
                    expect(body.correct).toBeTrue();
                });
        });

        it('a riddle wrongly', async () => {
            await request(app)
                .post(`/api/problems/${tempRiddle.id}/answers`)
                .auth(userMock.username, userMock.password)
                .send(riddleMock.wrongAnswer)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body.answer).toEqual(riddleMock.wrongAnswer.answer);
                    expect(body.correct).toBeFalse();
                });
        });

        it('an expression correctly', async () => {
            await request(app)
                .post(`/api/problems/${tempExpression.id}/answers`)
                .auth(userMock.username, userMock.password)
                .send(expressionMock.correctAnswer)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body.answer).toEqual(expressionMock.correctAnswer.answer);
                    expect(body.correct).toBeTrue();
                });
        });

        it('an expression wrongly', async () => {
            await request(app)
                .post(`/api/problems/${tempExpression.id}/answers`)
                .auth(userMock.username, userMock.password)
                .send(expressionMock.wrongAnswer)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body.answer).toEqual(expressionMock.wrongAnswer.answer);
                    expect(body.correct).toBeFalse();
                });
        });
    });
});
