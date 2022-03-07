import { connection } from "../db.js";

export async function getGames(req, res) {
  let query = "";
  if (req.query.name) {
    query = `WHERE name iLIKE  '${req.query.name}%'`;
  }
  const orderByFilter = {
    id: 1,
    name: 2,
    image: 3,
    stockTotal: 4,
    categoryId: 5,
    pricePerDay: 6,
  };
  let orderBy = "";
  if (req.query.order && orderByFilter[req.query.order]) {
    if (req.query.desc)
      orderBy = `ORDER BY ${orderByFilter[req.query.order]} DESC`;
    else orderBy = `ORDER BY ${orderByFilter[req.query.order]}`;
  }
  const result = await connection.query({
    text: `
      SELECT 
        * 
      FROM 
        games
      ${query}
      ${orderBy}
    `,
    rowMode: "array",
  });

  res.send(
    result.rows.map((row) => {
      const [
        id,
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
        categoryName,
      ] = row;
      return {
        id,
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
        categoryName,
      };
    })
  );
}
export async function PostGames(req, res) {
  let { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    stockTotal = parseFloat(stockTotal);
    pricePerDay = parseFloat(pricePerDay);
    if (!name) return res.sendStatus(400);
    if (stockTotal <= 0 || pricePerDay <= 0) return res.sendStatus(400);

    const nameResult = await connection.query(
      "SELECT * FROM games WHERE name=$1",
      [name]
    );
    if (nameResult.rows.length !== 0) return res.sendStatus(409);
    const categoryResult = await connection.query(
      `SELECT * from categories where id=$1`,
      [categoryId]
    );
    if (categoryResult.rows.length === 0) return res.sendStatus(409);

    const teste = await connection.query(`SELECT * FROM games`);
    console.log(teste.fields);
    await connection.query(
      `
      INSERT INTO
        games (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
