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
      const getRres = await request(app).get("/api/alquileres");
      const firstObject = getRres.body[0]
      const res = await request(app).get("/api/alquileres/"+firstObject.IdAlquiler);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
          expect.objectContaining({
            Estado: expect.toBeOneOf(["En Curso", "En Mora", "Finalizado", "Finalizado Con Demora"]),
            FechaInicio: expect.any(String),
            FechaFin: expect.any(String),
            FechaFinReal: expect.toBeOneOf([expect.toBeNil(), expect.any(String)]),
            Monto: expect.any(Number),
            IdVehiculo: expect.any(Number),
          })
      );
    });
  }); 


  describe("GET /api/alquileres/:id", () => {
    it("should return 404 when there is no object with specified Id", async () => {
      const res = await request(app).get("/api/alquileres/-1");
      expect(res.statusCode).toBe(404);
    });
  }); 


  describe("POST /api/alquileres", () => {
    it("should return the same object we just created", async () => {
      const samplePostBody = {
        FechaInicio: "2022-10-05",
        FechaFin: "2022-10-15",
        FechaFinReal: "2022-10-16",
        Monto: 47400,
        IdVehiculo: 1,
      }
      const res = await request(app).post("/api/alquileres").send(samplePostBody);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        IdAlquiler: expect.any(Number),
        IdVehiculo: 1,
        FechaInicio: "2022-10-05",
        FechaFin: "2022-10-15",
        FechaFinReal: "2022-10-16",
        Monto: 47400,
        Estado: "Finalizado Con Demora",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  }); 


  describe("POST /api/alquileres", () => {
    it("should return 500 when there is a validation error", async () => {
      const samplePostBody = {
        FechaInicio: "2022-10-05",
        FechaFin: "2022-10-15",
        FechaFinReal: "2022-10-16",
        Monto: 47400,
        IdVehiculo: -1,
      }
      const res = await request(app).post("/api/alquileres").send(samplePostBody);
      expect(res.statusCode).toBe(500);
    });
  }); 


describe("PUT /api/alquileres", () => {
  it("should return the  object with specified modifications", async () => {
    const getRres = await request(app).get("/api/alquileres");
    const firstObjectId = getRres.body[0].IdAlquiler 
    const samplePutBody =   {
      Estado: "Que te importa",
      IdAlquiler: firstObjectId,
      FechaInicio: "2022-10-05",
      FechaFin: "2022-10-15",
      FechaFinReal: "2022-10-18",
      Monto: 50000,
      IdVehiculo: 1
  }
    const res = await request(app).put("/api/alquileres").send(samplePutBody);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      Estado: "Finalizado Con Demora",
      IdAlquiler: firstObjectId,
      FechaInicio: "2022-10-05",
      FechaFin: "2022-10-15",
      FechaFinReal: "2022-10-18",
      Monto: 50000,
      IdVehiculo: 1,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
}); 



describe("PUT /api/alquileres", () => {
  it("should return 404 when there is no object with specified Id", async () => {
    const samplePutBody =   {
      Estado: "Que te importa",
      IdAlquiler: -1,
      FechaInicio: "2022-10-05",
      FechaFin: "2022-10-15",
      FechaFinReal: "2022-10-18",
      Monto: 50000,
      IdVehiculo: 1
  }
    const res = await request(app).put("/api/alquileres").send(samplePutBody);
    expect(res.statusCode).toBe(404);
  });
}); 


describe("PUT /api/alquileres", () => {
  it("should return 500 when there is a validation error", async () => {
    const getRres = await request(app).get("/api/alquileres");
    const firstObjectId = getRres.body[0].IdAlquiler 
    const samplePutBody =   {
      Estado: "Que te importa",
      IdAlquiler: firstObjectId,
      FechaInicio: "2022-10-05",
      FechaFin: "2022-10-15",
      FechaFinReal: "2022-10-18",
      Monto: 50000,
      IdVehiculo: -1
  }
    const res = await request(app).put("/api/alquileres").send(samplePutBody);
    expect(res.statusCode).toBe(500);
  });
}); 



describe("DELETE /api/alquileres/:id", () => {
  it("should return the deleted object", async () => {
    const getRres = await request(app).get("/api/alquileres");
    const firstObject = getRres.body[0]
    const res = await request(app).delete("/api/alquileres/"+firstObject.IdAlquiler);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(firstObject);
  });
}); 

describe("DELETE /api/alquileres/:id", () => {
  it("should return 404 when there is no object with specified Id", async () => {
    const getRres = await request(app).get("/api/alquileres");
    const res = await request(app).delete("/api/alquileres/-1");
    expect(res.statusCode).toBe(404);
  });
}); 