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


describe("GET /api/alquileres", () => {
    it("should return some alquileres", async () => {
      const res = await request(app).get("/api/alquileres");
      expect(res.statusCode).toBe(200);
      /*
      expect(res.json).not.toContain("error");
      expect(res.json).toContain({"IdAlquiler":1})
      expect(res.json).toContain({"Estado":"En mora"})
      expect(res.json).toContain({"Estado":"En Curso"})
      */
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("Estado");
      expect(res.body[0].Estado).toBeDefined();
      expect(res.body[0]).toHaveProperty("FechaInicio");
      expect(res.body[0].FechaInicio).toBeDefined();
      expect(res.body[0]).toHaveProperty("FechaFin");
      expect(res.body[0].FechaFin).toBeDefined();
      expect(res.body[0]).toHaveProperty("FechaFinReal");
      expect(res.body[0]).toHaveProperty("IdVehiculo");
      expect(res.body[0].IdVehiculo).toBeDefined();

    });
  }); 
  
  describe("GET /api/alquileres/:id", () => {
    it("should return a specific alquiler", async () => {
      const res = await request(app).get("/api/alquileres/4");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("Estado");
      expect(res.body[0].Estado).toBe("Finalizado");
      expect(res.body[0]).toHaveProperty("FechaInicio");
      expect(res.body[0].FechaInicio).toBe("2010-04-25");
      expect(res.body[0]).toHaveProperty("FechaFin");
      expect(res.body[0].FechaFin).toBeDefined();
      expect(res.body[0]).toHaveProperty("FechaFinReal");
      expect(res.body[0]).toHaveProperty("IdVehiculo");
      expect(res.body[0].IdVehiculo).toBeDefined();

    });
  }); 