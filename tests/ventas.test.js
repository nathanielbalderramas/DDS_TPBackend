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

function getRandomArbitrary(min, max) {
    return  Math.floor(Math.random()*(max-min+1)+min);
};

function getFechaActual(){
    let date = new Date()
    mes = date.getMonth() + 1;
    fecha = date.getDate() + "-"+ mes + "-" +date.getFullYear();
    return fecha;
  }

const ventaAlta = {
    Fecha: getFechaActual(),
    Cliente: getRandomArbitrary(1,10),
};

const ventaModificada = {
    Cliente: getRandomArbitrary(1,10),
    Fecha: getFechaActual(),
};


// test route/vehiculos GET
describe("GET /api/ventas", () => {
  it("Deberia devolver todas las ventas", async () => {
    const res = await request(app).get("/api/ventas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            id: expect.any(Number),
            Vehiculo: expect.any(Number),
            Fecha: expect.any(String),
            Cliente: expect.any(Number),
            Estado: expect.any(Number),
        })
      ]),
    );
  });
});

// test route/ventas/:id GET
describe("GET /api/ventas/:id", () => {
  it("Deberia devolver una venta con el id 1", async () => {
    const res = await request(app).get("/api/ventas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        Vehiculo: expect.any(Number),
        Fecha: expect.any(String),
        Cliente: expect.any(Number),
        Estado: expect.any(Number),
      })
    );
  });
});

// test route/ventas POST
describe("POST /api/ventas", () => {
  it("Deberia devolver la venta que acabo de crear", async () => {
    const res = await request(app).post("/api/ventas").send(ventaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Vehiculo: expect.any(Number),
        Fecha: expect.any(String),
        Cliente: expect.any(Number),
        Estado: expect.any(Number),
      })
    );
  });
});

// test route/ventas/:id PUT 
describe("PUT /api/ventas/:id", () => {
  it("Deberia devolver una venta con el id 1 modificado", async () => {
    const res = await request(app).put("/api/ventas/1").send(ventaModificada);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/vehiculos/:id DELETE
describe("DELETE /api/ventas/:id", () => {
  it("Deberia devolver la venta con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/ventas/1");
    expect(res.statusCode).toEqual(200);
   // baja logica, no se borra realmente
  });
});
