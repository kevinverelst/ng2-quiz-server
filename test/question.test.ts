import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const apiEndPoint: string = '/api/v1/questions';

describe('GET api/v1/questions', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get(apiEndPoint)
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

    it('responds with single JSON object', () => {
        return chai.request(app).get(`${apiEndPoint}/1`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
            });
    });

    it('responds with a not found error', () => {
        return chai.request(app).get(`${apiEndPoint}/99999`)
            .catch(error => {
                expect(error.status).to.be.equal(404);
            });
    });
});
