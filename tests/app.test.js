// allows acces to enviroment variables in proces.env
require('dotenv').config() 

const request = require("supertest");
const app = require("../app");

// Levanta el servidor antes de empezar a testear
beforeAll(()=>{
  server = app.listen(4020)
});

// Cierra el servidor despues de testear
afterAll(()=>{
  server.close()
});


describe("GET /", () => {
    it("should return a welcome message", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.text.length).toBeGreaterThan(10);
      expect(res.text.includes("prueba"));
      expect(res.text.includes("bienvenida"));
    });
  }); 
  