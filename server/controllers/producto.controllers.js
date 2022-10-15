import { Router } from 'express';
import { pool } from '../db.js';

// Consulta por todos los equipos informaticos
/*
export const getProductos = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM PRODUCTO');
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
*/
// Obtiene todos los productos
export const getProductos = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT p.idProducto, p.nombreProducto, p.stock, date_format(p.fecha, "%d-%m-%Y") as fecha , m.nombreMarca, c.nombreCategoria FROM producto p INNER JOIN marca m ON p.marca = m.idMarca INNER JOIN categoria c ON p.categoria = c.idCategoria'
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Consulta por id un producto 

export const getProducto = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT p.idProducto, p.nombreProducto, p.stock, date_format(p.fecha, "%d-%m-%Y") as fecha , m.nombreMarca, c.nombreCategoria FROM producto p INNER JOIN marca m ON p.marca = m.idMarca INNER JOIN categoria c ON p.categoria = c.idCategoria WHERE p.idProducto = ?',
      [req.params.id]
    );
    if (result.length == 0)
      return res.status(404).json({ messagge: 'Producto no encontrado' });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crea un equipo informatico

export const createProducto = async (req, res) => {
  try {
    const { nombreProducto, stock, fecha, marca, categoria } = req.body;
    const [result] = await pool.query(
      'INSERT INTO PRODUCTO (nombreProducto , stock ,fecha, marca,  categoria ) VALUES (?,?,?,?,?)',
      [nombreProducto, stock, fecha, marca, categoria]
    );

    res.json({
      idProducto: result.insertId,
      nombreProducto,
      stock,
      fecha,
      marca,
      categoria,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualiza un atributo de un equipo informatico

export const updateProducto = async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE PRODUCTO SET ? WHERE idProducto = ?',
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina un equipo informatico por id
export const deleteProducto = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM PRODUCTO WHERE idProducto = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Producto no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
