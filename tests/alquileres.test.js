// allows acces to enviroment variables in proces.env
require('dotenv').config() 

// extends jest assertions
const { toBeOneOf, toBeNil } = require("jest-extended");
expect.extend({toBeOneOf, toBeNil})

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


describe("GET /api/alquileres", () => {
    it("should return some alquileres", async () => {
      const res = await request(app).get("/api/alquileres");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Estado: expect.any(String),
            FechaInicio: expect.any(String),
            FechaFin: expect.any(String),
            FechaFinReal: expect.toBeOneOf([expect.toBeNil(), expect.any(String)]),
            Monto: expect.any(Number),
            IdVehiculo: expect.any(Number),
          })
        ])
      );
    });
  }); 
  
  describe("GET /api/alquileres/:id", () => {
    it("should return a specific alquiler", async () => {
      const res = await request(app).get("/api/alquileres/4");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            Estado: expect.toBeOneOf(["En Curso", "En Mora", "Finalizado", "Finalizado Con Demora"]),
            FechaInicio: expect.any(String),
            FechaFin: expect.any(String),
            FechaFinReal: expect.toBeOneOf([expect.toBeNil(), expect.any(String)]),
            Monto: expect.any(Number),
            IdVehiculo: expect.any(Number),
          })
        ])
      );
    });
  }); 

const sampleAlquiler = {
  FechaInicio: "2022-10-05",
  FechaFin: "2022-10-15",
  FechaFinReal: "2022-10-16",
  Monto: 47400,
  IdVehiculo: 1,
}

  describe("POST /api/alquileres", () => {
    it("should return the same object we just created", async () => {
      const res = await request(app).post("/api/alquileres").send(sampleAlquiler);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
//        expect.arrayContaining([
//          expect.objectContaining({
{
            IdAlquiler: expect.any(Number),
            IdVehiculo: 1,
            FechaInicio: "2022-10-05",
            FechaFin: "2022-10-15",
            FechaFinReal: "2022-10-16",
            Monto: 47400,
            Estado: "Finalizado Con Demora",
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
}
//          })
//        ])
      );
    });
  }); 
