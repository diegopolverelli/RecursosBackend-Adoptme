import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {engine} from 'express-handlebars';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
// console.log(process.env.PRUEBA_PORT)
const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());

app.engine('handlebars', engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');
    
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
