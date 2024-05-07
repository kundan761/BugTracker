import express from 'express';
import cors from 'cors';
import { connection } from './config/db';
import dotenv from 'dotenv';
import bugRouter from './routes/bugs';
import userRouter from './routes/users';
import { initWebSocket } from './websocket';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', userRouter);
app.use('/api', bugRouter);

initWebSocket();


app.get('/', (req, res) => {
    res.json({ "msg": "THIS IS THE HOME ROUTE OF MY BUGTRACKER WEBSITE" });
});

app.listen(port, async () => {
    try {
        await connection;
        console.log("server is connected to database");
        console.log(`server is running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});
