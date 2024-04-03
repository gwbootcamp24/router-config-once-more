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
