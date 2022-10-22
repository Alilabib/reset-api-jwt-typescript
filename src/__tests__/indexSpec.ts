
import supertest from "supertest";
import server from '../index';

const request = supertest(server.app);

describe('main server endpoint ',()=>{
    it('Get the / ', async()=>{
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});