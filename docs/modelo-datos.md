# Modelo de datos - FOODEXPRESS

FOODEXPRESS utilizará MongoDB como sistema de base de datos.

La base de datos tendrá cinco colecciones principales:

- categorias
- productos
- clientes
- pedidos
- usuarios

## Colección categorias

{
  "nombre": "Bebidas",
  "descripcion": "Bebidas del restaurante",
  "estado": true
}

## Colección productos

{
  "codigo": "P001",
  "nombre": "Hamburguesa clásica",
  "descripcion": "Hamburguesa con carne y queso",
  "categoria": "ID_DE_CATEGORIA",
  "precio": 25000,
  "imagen": "hamburguesa.jpg",
  "disponibilidad": true,
  "estado": true
}

## Colección clientes

{
  "documento": "123456",
  "tipoDocumento": "CC",
  "nombre": "Carlos",
  "apellidos": "Pérez",
  "correo": "carlos@email.com",
  "telefono": "3000000000",
  "direccion": "Calle 1 # 2-3",
  "password": "HASH_DE_LA_CONTRASEÑA"
}

## Colección pedidos

{
  "cliente": "ID_DEL_CLIENTE",
  "productos": [
    {
      "producto": "ID_DEL_PRODUCTO",
      "cantidad": 2,
      "precioUnitario": 25000
    }
  ],
  "total": 50000,
  "fecha": "2026-08-30",
  "estado": "Pendiente"
}

## Colección ususarios

{
  "usuario": "admin",
  "password": "HASH_DE_LA_CONTRASEÑA",
  "rol": "administrador",
  "estado": true
}



