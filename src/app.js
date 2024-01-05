import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {engine} from 'express-handlebars';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
console.log("PUERTO CONFIGURADO:",process.env.PORT)
console.log("VARIABLE MONGO_URL:", process.env.MONGO_URL)
const PORT = process.env.PORT||8080;
// console.log(process.env.PRUEBA_PORT)
try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log("DB Online")
} catch (error) {
    console.log(error.message)
}

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

app.get('/prueba',(req,res)=>{
    res.render('prueba')
})

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
