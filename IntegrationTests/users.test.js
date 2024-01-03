const request = require('supertest');
const server = require('../src/app'); 


describe("User Tests" , () => {
    describe("Login Tests" , () => {
        it("should login a user" , async() =>{
            const res = await request(server)
            .post("/api/auth/login")
            .send({
                email: "temp3@gmail.com",
                password : "qwerty"
            })

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('accessToken');
            expect(res.body).toHaveProperty('refreshToken');
        })
    })
    describe("Signup Tests" , () => {
        it("should create a user" , async() =>{
            const res = await request(server)
            .post("/api/auth/signup")
            .send({
                name : "nishant",
                email: "test4@gmail.com", // Make sure the email is unique 
                password : "qwerty"
            })
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('userId');
            
        })
    })

})

afterAll(async () => {
    // Close database connection
    server.close();
  });