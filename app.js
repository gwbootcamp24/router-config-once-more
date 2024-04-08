import express from 'express';
import cors from 'cors';
import{
  getAllUsers, getUserWithId, insertNewUser, updateUser, deleteUser
} from './controllers/userController.js'
import{
  checkUserPost, checkUserId, checkUserPut, checkUserDelete
} from './middlewares/middleWares.js'

const app = express();
const PORT = process.env.PORT || 8200
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/users', getAllUsers);
app.get('/users/:id', checkUserId, getUserWithId);
app.post('/users', checkUserPost, insertNewUser);
app.put('/users/:id', checkUserPut, updateUser);
app.delete('/users/:id', checkUserDelete, deleteUser);


app.get('*', (req,res) => {
  res.status(404).send(`
  <!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>404</h1>
</body>
</html>
  
  `);

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

