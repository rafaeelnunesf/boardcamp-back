import { connection } from "../db.js";
import dayjs from "dayjs";

export async function getCustomers(req, res) {
  let query = "";
  if (req.query.cpf) {
    query = `WHERE cpf LIKE  '${req.query.cpf}%'`;
  }
  let offset = "";
  if (req.query.offset) {
    offset = `OFFSET ${req.query.offset}`;
  }

  let limit = "";
  if (req.query.limit) {
    limit = `LIMIT ${req.query.limit}`;
  }
  const orderByFilter = {
    id: 1,
    name: 2,
    phone: 3,
    cpf: 4,
    birthday: 5,
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
        customers
      ${query}
      ${offset}
      ${limit}
      ${orderBy}
    `,
    rowMode: "array",
  });

  res.send(
    result.rows.map((row) => {
      let [id, name, phone, cpf, birthday] = row;
      birthday = dayjs(birthday).format("YYYY-MM-DD");
      return { id, name, phone, cpf, birthday };
    })
  );
}
export async function getCustomersById(req, res) {
  const { id } = req.params;
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

  res.send(result.rows[0]);
}
export async function postCustomers(req, res) {
  let { name, phone, cpf, birthday } = req.body;
  try {
    const cpfResult = await connection.query(
      "SELECT * FROM customers WHERE cpf=$1",
      [cpf]
    );
    if (cpfResult.rows.length !== 0) return res.sendStatus(409);

    await connection.query(
      `
      INSERT INTO
        customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function putCustomersById(req, res) {
  let { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  try {
    const cpfResult = await connection.query(
      "SELECT * FROM customers WHERE cpf=$1",
      [cpf]
    );
    if (cpfResult.rows.length !== 0) return res.sendStatus(409);

    await connection.query(
      `
      UPDATE 
        customers
      SET 
        name=$1, phone=$2, cpf=$3, birthday=$4
      WHERE 
        id=$5`,
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
