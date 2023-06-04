const request = require("supertest");
const app = require("../app.js");

function getRandomArbitrary(min, max) {
    return  Math.floor(Math.random()*(max-min+1)+min);
};

function getFechaActual(){
    let date = new Date()
    mes = date.getMonth() + 1;
    fecha = date.getDate() + "-"+ mes + "-" +date.getFullYear();
    return fecha;
  }

const VehiculoAlta = {
    FechaIngreso: getFechaActual(),
  Marca: getRandomArbitrary(1,10),
  Modelo: "Vehiculo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  Patente: "AA" + (getRandomArbitrary(100,999)).toString() + "AA",
  Valor: 100345,
};
const vehiculoModificado = {
    Modelo: "Vehiculo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    Marca: getRandomArbitrary(1,10),
  // Genera un nombre aleatorio
  Patente: "AA" + (getRandomArbitrary(100,999)).toString() + "AA",
  Valor: 100345,
  FechaIngreso: getFechaActual(),
};


// test route/vehiculos GET
describe("GET /api/vehiculos", () => {
  it("Deberia devolver todos los Vehiculos", async () => {
    const res = await request(app).get("/api/vehiculos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
     expect.objectContaining({
      Items: 
      expect.arrayContaining([
        expect.objectContaining({
            Estado: expect.any(Number),
            FechaIngreso: expect.any(String),
            IdVehiculo: expect.any(Number),
          Marca: expect.any(Number),
          Modelo: expect.any(String),
          Patente: expect.any(String),
          Valor: expect.any(Number),
        })
      ]),
      RegistrosTotal:  expect.any(Number) 
     })
    );
  });
});

// test route/vehiculos/:id GET
describe("GET /api/vehiculos/:id", () => {
  it("Deberia devolver el vehiculo con el id 1", async () => {
    const res = await request(app).get("/api/vehiculos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Estado: expect.any(Number),
            FechaIngreso: expect.any(String),
            IdVehiculo: expect.any(Number),
          Marca: expect.any(Number),
          Modelo: expect.any(String),
          Patente: expect.any(String),
          Valor: expect.any(Number),
      })
    );
  });
});

// test route/vehiculos POST
describe("POST /api/vehiculos", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/vehiculos").send(VehiculoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
            FechaIngreso: expect.any(String),
            Marca: expect.any(Number),
          Modelo: expect.any(String),
          Patente: expect.any(String),
          Valor: expect.any(Number),
      })
    );
  });
});

// test route/vehiculos/:id PUT 
// No se puede modificar el vehiculo dado que hay ventas relacionadas con el vehiculo
describe("PUT /api/vehiculos/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/vehiculos/1").send(vehiculoModificado);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/vehiculos/:id DELETE
describe("DELETE /api/vehiculos/:id", () => {
  it("Deberia devolver el vehiculos con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/vehiculos/1");
    expect(res.statusCode).toEqual(200);
   // baja logica, no se borra realmente
  });
});
