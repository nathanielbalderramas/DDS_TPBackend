Vamos a pensar en una "concesionaria" que hace venta y también alquiler de autos. 
Las tablas principales pueden ser...

Tabla: Vehiculos
ID - Marca - Modelo - Dominio - FechaIngreso - Valor - Estado

Tabla: Ventas
ID - Vehiculo - Fecha - Monto - Cliente

Tabla: Alquileres
ID - Vehiculo - FechaInicio - FechaFin - FechaFinReal - Monto - Cliente

Tabla: Reparaciones
ID - Vehiculo - FechaInicio - FechaFin - Prestador - Monto

Y las tablas auxiliares que seguro vamos a necesitar serían...
Marcas
Nombre 

Estados
Nombre

Clientes
ID - Nombre - Apellido - Telefono - DNI

Prestadores
ID - RazonSocial - Domicilio - Telefono - Especialidad