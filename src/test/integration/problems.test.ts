import * as request from 'supertest-as-promised';

import app from 'server';
import Problem from '../../app/models/Problem';

const createProblemMock = {
    type: 'riddle',
    query: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
};

const aBetterProblemMock = {
    type: 'riddle',
    query: 'Where’s the peck of pickled peppers Peter Piper picked?',
};

const userMock = {
    username: 'user1',
    password: 'pass',
};

const otherUserMock = {
    username: 'user2',
    password: 'pass',
};

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
        let tempProblem: Problem;

        it('create a Problem', () => {
            return request(app)
                .post('/api/problems')
                .auth(userMock.username, userMock.password)
                .send(createProblemMock)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toMatchSnapshot();
                    tempProblem = body;
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

        it('read Problem', () => {
            return request(app)
                .get(`/api/problems/${tempProblem.id}`)
                .auth(userMock.username, userMock.password)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toEqual(tempProblem);
                });
        });

        it('update Problem', async () => {
            await request(app)
                .put(`/api/problems/${tempProblem.id}`)
                .auth(userMock.username, userMock.password)
                .send(aBetterProblemMock)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body.query).toEqual(aBetterProblemMock.query);
                    expect(body.id).toEqual(tempProblem.id);
                });

            await request(app)
                .put(`/api/problems/${tempProblem.id}`)
                .auth(userMock.username, userMock.password)
                .send(aBetterProblemMock)
                .expect(304);
        });

        it('not modify Problem created by other user', async () => {
            await request(app)
                .put(`/api/problems/${tempProblem.id}`)
                .auth(otherUserMock.username, otherUserMock.password)
                .send(createProblemMock)
                .expect(403);
        });

        it('not delete Problem created by other user', async () => {
            await request(app)
                .delete(`/api/problems/${tempProblem.id}`)
                .auth(otherUserMock.username, otherUserMock.password)
                .send(createProblemMock)
                .expect(403);
        });

        it('delete Problem', async () => {
            await request(app)
                .delete(`/api/problems/${tempProblem.id}`)
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
