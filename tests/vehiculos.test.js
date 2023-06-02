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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
const VehiculoAlta = {
  Marca: getRandomArbitrary(1,10),
  Modelo: "Vehiculo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Patente: "AA" + (( ) => (getRandomArbitrary(100,999)).toString(36).substring(3))() + "AA",
  Valor: 100345,
  FechaIngreso: new Date().toISOString(),
  Estado: 1,
};
const vehiculoModificado = {
  IdArticulo: 1,
  Marca: getRandomArbitrary(1,10),
  Modelo: "Vehiculo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Patente: "AA" + (( ) => (getRandomArbitrary(100,999)).toString(36).substring(3))() + "AA",
  Valor: 100345,
  FechaIngreso: new Date().toISOString(),
  Estado: 1,
};


// test route/articulos GET
describe("GET /api/vehiculos", () => {
  it("Deberia devolver todos los Vehiculos", async () => {
    const res = await request(app).get("/api/vehiculos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
          idVehiculo: expect.any(Number),
          Marca: expect.any(Number),
          Modelo: expect.any(Number),
          Patente: expect.any(String),
          Valor: expect.any(Number),
          FechaAlta: expect.any(String),
          Estado: expect.any(Number),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/articulos/:id GET
describe("GET /api/vehiculos/:id", () => {
  it("Deberia devolver el vehiculo con el id 1", async () => {
    const res = await request(app).get("/api/vehiculos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idVehiculo: expect.any(Number),
          Marca: expect.any(Number),
          Modelo: expect.any(Number),
          Patente: expect.any(String),
          Valor: expect.any(Number),
          FechaAlta: expect.any(String),
          Estado: expect.any(Number),
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/vehiculos", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/vehiculos").send(VehiculoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idVehiculo: expect.any(Number),
        Marca: expect.any(Number),
        Modelo: expect.any(Number),
        Patente: expect.any(String),
        Valor: expect.any(Number),
        FechaAlta: expect.any(String),
        Estado: expect.any(Number),
      })
    );
  });
});

// test route/articulos/:id PUT
describe("PUT /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/articulos/1").send(vehiculoModificado);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/vehiculos/:id", () => {
  it("Deberia devolver el vehiculos con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/vehiculos/1");
    expect(res.statusCode).toEqual(200);
   // baja logica, no se borra realmente
     expect(res.body).toEqual(
       expect.objectContaining({
        idVehiculo: expect.any(Number),
        Marca: expect.any(Number),
        Modelo: expect.any(Number),
        Patente: expect.any(String),
        Valor: expect.any(Number),
        FechaAlta: expect.any(String),
        Estado: expect.any(Number),
       })
    );

  });
});
