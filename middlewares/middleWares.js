import { pool } from '../db.js';


export function checkUserPost(req, res, next) {
  const {first_name, last_name, age} = req.body;
  if (!first_name||!last_name||!age||first_name.length<1||last_name.length<1) {
    res.sendStatus(400);
  } else {
    next();
  }
}
export function checkUserPut(req, res, next) {
  const {id} = req.params;
  const {first_name, last_name, age} = req.body;



  
  if (!first_name&&!last_name&&!age||age&&isNaN(Number(age))||Number(age)>10000) {
    res.sendStatus(400);
  } else {
    next();
  }
}

export function checkUserDelete(req, res, next) {
  const {id} = req.params;
  const {first_name, last_name, age} = req.body;
  if (!first_name&&!last_name&&!age||age&&isNaN(Number(age))||Number(age)>10000) {
    res.sendStatus(400);
  } else {
    next();
  }
}


export function checkUserId(req, res, next) {
  const {id} = req.params;

  if (!id||isNaN(Number(id))||id<1) {
    res.sendStatus(400);
  } else {
    next();
  }
}


// export async function createPost(req, res) {
//   const {title, content, user_id} = req.body;
//   try {
//       const {rows: post} = await pool.query(
//           'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;',
//           [title, content, user_id]
//       );
//       res.json(post);
//   } catch (error) {
//       console.log(error);
//       res.sendStatus(500);
//   }
// }
// app.post('/users', async (req, res) => {
//   console.log("hi there");
//     const {firstname, lastname} = req.body;
//     try {
//         const {rows} = await pool.query(
//             'INSERT INTO users (firstname, lastname) VALUES ($1, $2) RETURNING * ;',
//             [firstname, lastname]
//         );
//         res.json(rows);
//         // res.json(rows);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

