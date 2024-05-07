import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.mongoURL as string;

const connection = mongoose.connect(mongoURL);

export { connection };
