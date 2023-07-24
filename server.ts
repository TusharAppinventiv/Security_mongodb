import express from 'express';
import { connectToDatabase } from './database/database';
// import userRoutes from './routes/users.routes';
import postsController from './controllers/posts.controller';
import authMiddleware from './middlewares/auth.middleware';
// import followRoutes from './routes/follow.routes';
import action from './routes/action.routes'
import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './swagger';

const app = express();

app.use(express.json())

connectToDatabase();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/user', userRoutes);
app.use('/posts', authMiddleware, postsController.createPost);
app.use('/action', action)
// app.use('/api', followRoutes);

const port = 3000;
app.listen(port,async()=>{
    console.log('listening on 3000');
  
});
