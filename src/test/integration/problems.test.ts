import * as request from 'supertest-as-promised';

import app from 'server';
import Problem from '../../app/models/Problem';
import { aBetterProblemMock, createProblemMock, expressionMock, otherUserMock, userMock } from './__mocks__/problems';

describe('Problems (Integration)', () => {
    describe('API', () => {
        it('is protected by Basic Auth', async () => {
            await request(app)
                .get('/api/problems')
                .send(createProblemMock)
                .expect(401)
                .then(({ headers }: any) => {
                    expect(headers).toHaveProperty('www-authenticate');
                    expect(headers['www-authenticate']).toStartWith('Basic');
                });

            await request(app)
                .get('/api/problems')
                .auth(userMock.username, userMock.password)
                .then(({ status }: any) => {
                    expect(status)
                        .toBeGreaterThanOrEqual(200)
                        .toBeLessThanOrEqual(299);
                });
        });
    });

    describe('User can', () => {
        let tempRiddle: Problem;
        let tempExpression: Problem;

        it('create a riddle Problem', () => {
            return request(app)
                .post('/api/problems')
                .auth(userMock.username, userMock.password)
                .send(createProblemMock)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toMatchSnapshot();
                    tempRiddle = body;
                });
        });

        it('create an expression Problem', () => {
            return request(app)
                .post('/api/problems')
                .auth(userMock.username, userMock.password)
                .send(expressionMock)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toMatchSnapshot();
                    tempExpression = body;
                });
        });

        it('list Problems', () => {
            return request(app)
                .get('/api/problems')
                .auth(userMock.username, userMock.password)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toMatchSnapshot();
                });
        });

        it('list Problems filtered by type', () => {
            return request(app)
                .get('/api/problems')
                .query({ type: 'riddle' })
                .auth(userMock.username, userMock.password)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toMatchSnapshot();
                });
        });

        it('read Problem', () => {
            return request(app)
                .get(`/api/problems/${tempRiddle.id}`)
                .auth(userMock.username, userMock.password)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toEqual(tempRiddle);
                });
        });

        it('update Problem', async () => {
            await request(app)
                .put(`/api/problems/${tempRiddle.id}`)
                .auth(userMock.username, userMock.password)
                .send(aBetterProblemMock)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body.query).toEqual(aBetterProblemMock.query);
                    expect(body.id).toEqual(tempRiddle.id);
                });

            await request(app)
                .put(`/api/problems/${tempRiddle.id}`)
                .auth(userMock.username, userMock.password)
                .send(aBetterProblemMock)
                .expect(304);
        });

        it('not modify Problem created by other user', async () => {
            await request(app)
                .put(`/api/problems/${tempRiddle.id}`)
                .auth(otherUserMock.username, otherUserMock.password)
                .send(createProblemMock)
                .expect(403);
        });

        it('not delete Problem created by other user', async () => {
            await request(app)
                .delete(`/api/problems/${tempRiddle.id}`)
                .auth(otherUserMock.username, otherUserMock.password)
                .send(createProblemMock)
                .expect(403);
        });

        it('delete Problems', async () => {
            await request(app)
                .delete(`/api/problems/${tempRiddle.id}`)
                .auth(userMock.username, userMock.password)
                .expect(204);

            await request(app)
                .delete(`/api/problems/${tempExpression.id}`)
                .auth(userMock.username, userMock.password)
                .expect(204);

            return await request(app)
                .get('/api/problems')
                .auth(userMock.username, userMock.password)
                .expect(204)
                .then(({ body }: any) => {
                    expect(body).toBeEmpty();
                });
        });
    });
});
