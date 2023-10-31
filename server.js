//imports
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

//routes
import bookRoutes from './routes/booksRoutes.js';

// config 
dotenv.config();

// mongodb connection
connectDB();

// rest objects
const app = express();
app.use(express.json());


// routes
app.use('/api/v1', bookRoutes);



//port
const PORT = process.env.PORT || 8080;

//listen 
app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.DEV_MODE} mode on port ${PORT}...`);
});