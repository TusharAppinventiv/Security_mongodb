import express from 'express';
import { connectToDatabase } from './database/database';
import userRoutes from './routes/users.routes';
// import postsController from './controllers/posts.controller';
// import authMiddleware from './middlewares/auth.middleware';
// import followRoutes from './routes/follow.routes';
// import action from './routes/action.routes'
import swaggerUi from 'swagger-ui-express';
import {redFun} from '../src/redis/redis.client'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerDefinition} from '../src/swagger/document';


const options={
    swaggerDefinition,
    apis: ['../src/swagger/*'],
};
const swaggerSpec = swaggerJSDoc(options);

const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())

connectToDatabase();
app.use('/user', userRoutes);
// app.use('/posts', authMiddleware, postsController.createPost);
// app.use('/action', action)
// app.use('/api', followRoutes);

const port = 3000;
app.listen(port,async()=>{
    redFun();
    console.log('listening on 3000');
  
});
