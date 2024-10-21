const express = require('express');
const dotenv = require('dotenv');
const cors=require('cors');
const connectDB = require('./config/db');
const validateRoutes = require('./routes/validateRoutes');


dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.get("/",async(req,res)=>{
     res.json("WELCOME TO EVENTLINK");
})

app.use('/api/validate', validateRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
