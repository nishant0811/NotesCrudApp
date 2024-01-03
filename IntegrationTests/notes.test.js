const request = require('supertest');
const server = require('../src/app'); 



let token;
let noteId;

beforeAll(async () => {
  const res = await request(server)
    .post('/api/auth/login')
    .send({
      email: 'temp2@gmail.com',
      password: 'qwerty'
    });
   
  token = res.body.accessToken; 
});

describe("Notes Test" , () => {
    describe("Get Notes" , () => {
        it("should get notes of a user" , async() =>{
           
            const res = await request(server)
            .get("/api/notes/")
            .set('authorization', `Bearer ${token}`)
            .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        })
    })
    describe("Create Notes" , () => {
        it("should create notes of a user" , async() =>{
            const res = await request(server)
            .post("/api/notes/")
            .set('authorization', `Bearer ${token}`)
            .send({
                title : "Hello there",
                content : "Hello there contenttt"
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('content');
            noteId = res.body.id;
        });
        
    });
    describe("Share Notes" , () => {
        it("should share notes of a user" , async() =>{
            const res = await request(server)
            .post(`/api/notes/${noteId}/share`)
            .set('authorization', `Bearer ${token}`)
            .send({
                "email" : "temp3@gmail.com"
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('acknowledged');
        });
        
    });

    describe("Get Note" , () => {
        it("should get notes of a user" , async() =>{
            const res = await request(server)
            .get(`/api/notes/${noteId}`)
            .set('authorization', `Bearer ${token}`)
            .send()

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('content');

        });
        
    });

    describe("Update Note" , () => {
        it("should update note of a user" , async() =>{
            const res = await request(server)
            .put(`/api/notes/${noteId}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                title : "New Titlett",
                content : "new contenttt"
            })

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('acknowledged');

        });
        
    });

    describe("Search Note" , () => {
        it("should search notes of a user" , async() =>{
            const res = await request(server)
            .get(`/api/search?q="contenttt"`)
            .set('authorization', `Bearer ${token}`)
            .send()

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);

        });
        
    });
    describe("Delete Note" , () => {
        it("should delete notes of a user" , async() =>{
            const res = await request(server)
            .delete(`/api/notes/${noteId}`)
            .set('authorization', `Bearer ${token}`)
            .send()

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('acknowledged');
        });
        
    });

})

afterAll(async () => {
    // Close database connection
    server.close();
  });


