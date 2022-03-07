import { connection } from "../db.js";

export async function getCategories(req, res) {
  const orderByFilter = {
    id: 1,
    name: 2,
  };
  let orderBy = "";
  if (req.query.order && orderByFilter[req.query.order]) {
    if (req.query.desc)
      orderBy = `ORDER BY ${orderByFilter[req.query.order]} DESC`;
    else orderBy = `ORDER BY ${orderByFilter[req.query.order]}`;
  }
  const categories = await connection.query(`
    SELECT 
      * 
    FROM 
      categories
    ${orderBy}
    `);

  res.send(categories.rows);
}
export async function PostCategories(req, res) {
  const { name } = req.body;
  try {
    if (!name) return res.sendStatus(400);
    const result = await connection.query(
      "SELECT * FROM categories WHERE name=$1",
      [name]
    );
    if (result.rows.length !== 0) return res.sendStatus(409);

    await connection.query(
      `
      INSERT INTO
        categories (name)
        VALUES ($1)`,
      [name]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
