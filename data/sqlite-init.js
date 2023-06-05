const db = require("aa-sqlite");

async function CrearBasesSiNoExiste() {
    await db.open("./data/data.db");
    CrearBaseMarcas();
    CrearBaseClientes();
    CrearBaseEstadoVehiculos();
    CrearBaseVehiculos();
    CrearBaseVentas();
    CrearBaseAlquileres()
    db.close();
}

async function CrearBaseVehiculos() {
    // checks for table existence
    let existe = false;
    let res = null;
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Vehiculos'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;

    // creates table if it doesn't exists
    if (!existe) {
        await db.run(
            `CREATE table Vehiculos( 
                IdVehiculo INTEGER PRIMARY KEY AUTOINCREMENT
              , Marca INTEGER
              , Modelo text NOT NULL
              , Patente text NOT NULL UNIQUE 
              , Valor real
              , FechaIngreso text
              , Estado INTEGER 
              , FOREIGN KEY (Marca) REFERENCES Marcas(id)
              , FOREIGN KEY (Estado) REFERENCES EstadoVehiculo(id)
              );`
        );
        console.log("tabla Vehiculos creada!");

        // populates table with mock data
        await db.run(
            `insert into Vehiculos values
            (1, 5,"Punto 1.8", 'JEQ550',10000,'2010-01-19', 1 ),
            (2, 10 ,"GOL 1.6", 'AA212XC',15000,'2016-02-10', 1 ),
            (3, 6 ,"FOCUS 1.8", 'HWE340',12000,'2013-02-28', 1 ),
            (4, 5 ,"Punto 1.4", 'JPQ450',10000,'2015-01-11', 1 ),
            (5, 6 ,"FIESTA", 'PLE145',10000,'2014-07-10', 1 ),
            (6, 5 ,"SIENA", 'AE323RE',10000,'2022-03-12', 1 ),
            (7, 1 ,"A3", 'AH434SE',10000,'2023-06-13', 1 ),
            (8, 6 ,"RANGER", 'JTR852',10000,'2021-05-23', 1 ),
            (9, 5 ,"KANGOO", 'OVY213',10000,'2020-03-07', 1 ),
            (10, 10 ,"BORA 1.8", 'JIJ090',12000,'2015-02-01', 1 )
      ;`
        );
    }
}

async function CrearBaseEstadoVehiculos() {
    // checks for table existence
    let existe = false;
    let res = null;
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'EstadoVehiculo'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    
    // creates table if it doesn't exists
    if (!existe) {
        await db.run(
            `CREATE table EstadoVehiculo( 
                id INTEGER PRIMARY KEY AUTOINCREMENT
              , Nombre text NOT NULL 
              );`
        );
        console.log("tabla EstadoVehiculo creada!");

        // populates table with mock data
        await db.run(
            `insert into EstadoVehiculo values
            (0, "Borrado"),
            (1, "Disponible"),
            (2, "Alquilado"),
            (3, "Vendido"),
            (4, "En Reparacion")
      ;`
        );
    }

}

async function CrearBaseMarcas() {
    // checks for table existence
    let existe = false;
    let res = null;
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Marcas'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;

    // creates table if it doesn't exists
    if (!existe) {
        await db.run(
            `CREATE table Marcas( 
                id INTEGER PRIMARY KEY AUTOINCREMENT
              , Nombre text NOT NULL 
              );`
        );
        console.log("tabla Marcas creada!");

        // populates table with mock data
        await db.run(
            `insert into Marcas values
            (1, "Audi"),
            (2, "Alfa Romero"),
            (3, "Bentley"),
            (4, "Chevrolet"),
            (5, "Daiatsu"),
            (6, "Fiat"),
            (7, "Ford"),
            (8, "Honda"),
            (9, "Hyundai"),
            (10, "VW")
      ;`
        );
    }

}

async function CrearBaseClientes() {
    // checks for table existence
    let existe = false;
    let res = null;
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Clientes'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    
    // creates table if it doesn't exists
    if (!existe) {
        await db.run(
            `CREATE table Clientes( 
                id INTEGER PRIMARY KEY AUTOINCREMENT
              , NombreApellido TEXT NOT NULL 
              , Documento TEXT NOT NULL UNIQUE
              );`
        );
        console.log("tabla Clientes creada!");
        
        // populates table with mock data
        await db.run(
            `insert into Clientes values
            (1, "SOFÍA MARTÍNEZ", "42123450"),
            (2, "MATEO GONZÁLEZ", "42123451"),
            (3, "VALENTINA RODRÍGUEZ", "42123452"),
            (4, "BENJAMÍN LÓPEZ", "42123453"),
            (5, "ISABELLA SILVA", "42123454"),
            (6, "SANTIAGO FERNÁNDEZ", "42123455"),
            (7, "EMMA PÉREZ", "42123456"),
            (8, "THIAGO RAMÍREZ", "42123457"),
            (9, "MIA GARCÍA", "42123458"),
            (10, "LUCAS TORRES", "42123459")
      ;`
        );
    }

}

async function CrearBaseVentas() {
    // checks for table existence
    let existe = false;
    let res = null;
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Venta'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    
    // creates table if it doesn't exists
    if (!existe) {
        await db.run(
            `CREATE table Venta( 
                id INTEGER PRIMARY KEY AUTOINCREMENT
              , Vehiculo INTEGER NOT NULL 
              , Fecha text NOT NULL
              , Cliente INTEGER NOT NULL
              , Estado INTEGER 
              , FOREIGN KEY (Cliente) REFERENCES Clientes(id)
              , FOREIGN KEY (Vehiculo) REFERENCES Vehiculos(IdVehiculo)
              );`
        );
        console.log("tabla Venta creada!");

        // populates table with mock data
        await db.run(
            `insert into Venta values
            (1, 1, "12-05-2023", 1, 1),
            (2, 2, "12-05-2023", 2, 1),
            (3, 3, "12-05-2023", 3, 1),
            (4, 4, "12-05-2023", 4, 1),
            (5, 5, "12-05-2023", 5, 1),
            (6, 6, "12-05-2023", 6, 1),
            (7, 7, "12-05-2023", 7, 1),
            (8, 8, "12-05-2023", 8, 1),
            (9, 9, "12-05-2023", 9, 1),
            (10, 10, "12-05-2023", 10, 1)
      ;`
        );
    }

}

async function CrearBaseAlquileres() {
    // checks for table existence
    let existe = false;
    let res = null;
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Alquileres'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    
    // creates table if it doesn't exists
    if (!existe) {
        try {
        await db.run(
            `CREATE table Alquileres( 
                IdAlquiler INTEGER PRIMARY KEY AUTOINCREMENT
              , IdVehiculo INTEGER NOT NULL 
              , FechaInicio text NOT NULL
              , FechaFin text NOT NULL
              , FechaFinReal text
              , Monto INTEGER 
              , FOREIGN KEY (IdVehiculo) REFERENCES Vehiculos(IdVehiculo)
              );`
        );
        console.log("tabla Alquileres creada!");
        
        // populates table with mock data
        await db.run(
            `insert into Alquileres (IdVehiculo, FechaInicio, FechaFin, FechaFinReal, Monto) values
            (1, "2023-05-02", "3023-05-02", NULL,          93300),
            (2, "2023-05-03", "3023-05-03", NULL,         124100),
            (3, "2023-05-04", "3023-05-04", NULL,          43000),
            (4, "2023-05-01", "2023-05-21", NULL,          86100),
            (5, "2023-05-02", "2023-05-22", NULL,          53000),
            (6, "2023-05-03", "2023-05-23", NULL,          49900),
            (7, "2008-05-08", "2008-05-18", "2008-05-17",  62600),
            (8, "2014-09-04", "2014-09-09", "2014-09-09",  74700),
            (9, "2022-05-06", "2022-05-16", "2022-05-16",  76500),
            (1, "2003-07-07", "2003-08-07", "2003-08-08", 113500),
            (2, "2022-05-06", "2022-05-16", "2023-05-16",  76500),
            (3, "2023-05-01", "2023-06-05", "2023-07-05",  85800)
      ;`
        ); } catch (err) {
            console.log(err)}
    }

}


CrearBasesSiNoExiste();

module.exports = CrearBasesSiNoExiste;

