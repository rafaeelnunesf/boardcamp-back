import { connection } from "../db.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

export async function getRentals(req, res) {
  let customerIdquery = "";
  if (req.query.customerId) {
    customerIdquery = `WHERE "customerId"=${req.query.customerId}`;
  }
  let gameIdquery = "";
  if (req.query.gameId) {
    gameIdquery = `WHERE "gameId"=${req.query.gameId}`;
  }

  const result = await connection.query({
    text: `
    SELECT 
      rentals.*,
      customers.name AS "customerName",
      games.name AS "gameName",
      games."categoryId",
      categories.name AS "categoryName"
    FROM 
      rentals
    JOIN 
      customers
    ON 
      rentals."customerId"=customers.id
    JOIN 
      games
    ON
      rentals."gameId"=games.id
    JOIN
      categories
    ON
      games."categoryId"=categories.id
    ${customerIdquery}
    ${gameIdquery}`,
    rowMode: "array",
  });
  res.send(
    result.rows.map((row) => {
      let [
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customerName,
        gameName,
        categoryId,
        categoryName,
      ] = row;
      rentDate = dayjs(rentDate).format("YYYY-MM-DD");
      returnDate = dayjs(returnDate).format("YYYY-MM-DD");
      return {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer: { id: customerId, name: customerName },
        game: { id: gameId, name: gameName, categoryId, categoryName },
      };
    })
  );
}
export async function postRentals(req, res) {
  let { customerId, gameId, daysRented } = req.body;
  try {
    const customerIdResult = await connection.query(
      "SELECT * FROM customers WHERE id=$1",
      [customerId]
    );
    if (customerIdResult.rows.length === 0)
      return res.status(400).send("customer error");

    const gamesResult = await connection.query("SELECT * FROM games");
    if (gamesResult.rows.length === 0)
      return res.status(400).send("games error");

    const gameIdResult = await connection.query(
      "SELECT * FROM games WHERE id=$1",
      [gameId]
    );
    if (gameIdResult.rows.length === 0)
      return res.status(400).send("gameId error");
    const rentDate = dayjs().format("YYYY-MM-DD");
    const originalPrice = gameIdResult.rows[0].pricePerDay * daysRented;

    await connection.query(
      `
      INSERT INTO
        rentals ("customerId", "gameId", "rentDate","daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function postRentalsById(req, res) {
  const { id } = req.params;
  try {
    const idResult = await connection.query(
      `SELECT 
        rentals.*,
        games."pricePerDay" 
      FROM 
        rentals 
      JOIN 
        games
      ON
        rentals."gameId"=games.id
      WHERE rentals.id=$1
     `,
      [id]
    );
    if (idResult.rows.length === 0) return res.sendStatus(404);

    let { delayFee, returnDate, rentDate, daysRented } = idResult.rows[0];
    if (returnDate) return res.sendStatus(400);

    returnDate = dayjs().format("YYYY-MM-DD");
    rentDate = dayjs(rentDate).format("YYYY-MM-DD");

    if (dayjs(returnDate).diff(rentDate, "day") > daysRented) {
      const daysOfDelay = dayjs(returnDate).diff(rentDate, "day") - daysRented;
      delayFee = idResult.rows[0].pricePerDay * daysOfDelay;
    }

    await connection.query(
      `
      UPDATE 
        rentals
      SET 
        "returnDate"=$1, 
        "delayFee"=$2
      WHERE 
        id=$3`,
      [returnDate, delayFee, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function getRentalsById(req, res) {
  /* const { id } = req.params;
  const result = await connection.query(
    `
      SELECT 
        * 
      FROM 
        customers
      WHERE
        id=$1`,
    [id]
  );

  if (result.rows.length === 0) return res.sendStatus(404);

  res.send(result.rows); */
}
