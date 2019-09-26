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

describe('Problems (Integration)', () => {
    describe('User can', () => {
        let tempProblem: Problem;

        it('create a Problem', () => {
            return request(app)
                .post('/api/problems')
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
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toMatchSnapshot();
                });
        });

        it('read Problem', () => {
            return request(app)
                .get(`/api/problems/${tempProblem.id}`)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body).toEqual(tempProblem);
                });
        });

        it('update Problem', async () => {
            await request(app)
                .put(`/api/problems/${tempProblem.id}`)
                .send(aBetterProblemMock)
                .expect(200)
                .then(({ body }: any) => {
                    expect(body.query).toEqual(aBetterProblemMock.query);
                    expect(body.id).toEqual(tempProblem.id);
                });

            await request(app)
                .put(`/api/problems/${tempProblem.id}`)
                .send(aBetterProblemMock)
                .expect(304);
        });

        it('delete Problem', async () => {
            await request(app)
                .delete(`/api/problems/${tempProblem.id}`)
                .expect(204);

            return await request(app)
                .get('/api/problems')
                .expect(204)
                .then(({ body }: any) => {
                    expect(body).toBeEmpty();
                });
        });
    });
});
