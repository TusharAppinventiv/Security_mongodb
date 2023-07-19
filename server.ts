import express from 'express';
import { connectToDatabase } from './database/database';
import userRoutes from './routes/users.routes';

const app = express();
app.use(express.json())

connectToDatabase();

app.use('/user', userRoutes);

const port = 3000;
app.listen(port,async()=>{
    console.log('listening on 3000');
  
});
