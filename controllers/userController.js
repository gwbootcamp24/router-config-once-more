import { pool } from '../db.js';


export async function getAllUsers(req, res) {
  try {
      const { rows: users } = await pool.query('SELECT * FROM users');
      console.log("hi users", users);
      res.send(users);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}


export async function getUserWithId(req, res) {
  const { id } = req.params;
  console.log("id",Number(id))
  try {
      const { rows: user } = await pool.query(
          'SELECT * FROM users WHERE id = $1',
          [Number(id)]
      );
      if (!user.length > 0) {
        return res.sendStatus(404);
      }
      res.json(user[0]);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}

 
export async function insertNewUser(req, res) {
  const { first_name, last_name, age } = req.body;
  try {
      const { rows: user } = await pool.query(
          'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
          [first_name, last_name, age]
      );
      res.json(user);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}

export async function updateUser(req, res) {
  const {id} = req.params;
  const { first_name, last_name, age } = req.body;
  const numAge = Number(age);
  console.log()
  try {

    const {rows: userCheck} = await pool.query(
      `SELECT * from users WHERE id = $1`,
      [id]
  );
  if (!userCheck.length > 0) {
      return res.send('Not found');
  }

      const { rows: user } = await pool.query(
        `
        
        UPDATE users SET 
        
        first_name = COALESCE(NULLIF($2, ''), first_name),
        last_name = COALESCE(NULLIF($3, ''), last_name),
        age = COALESCE(NULLIF($4, ''), age::text)::smallint
        WHERE id=$1 RETURNING *;

        `,
        [id, first_name, last_name, age]
      );
      res.json(user);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
}

export async function deleteUser(req, res) {
  const {id} = req.params;
  try {
      const {rows: user} = await pool.query(
          `SELECT * from users WHERE id = $1`,
          [id]
      );
      if (!user.length > 0) {
          return res.send('Not found');
      }

      const {rows} = await pool.query(
          `DELETE FROM users WHERE id = $1 RETURNING *`,
          [id]
      );
      res.json({message: 'user deleted', user});
  } catch (error) {
      console.log(error);
      res.status(500);
  }
}

