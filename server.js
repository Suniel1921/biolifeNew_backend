const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const cors = require ("cors");
const DBConnection = require('./config/DBConnection');
const authRoute = require ('./routes/authRoute');
const categoryRoute = require ('./routes/categoryRoute');
const brandRoute = require ('./routes/brandRoute');
const productRoute = require ('./routes/productRoute');
const reviewRoutes = require ('./routes/reviewRoute');


//middleware
app.use(express.json());
app.use(cors());


// Database Connection
DBConnection();

//route
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/review', reviewRoutes);



//default route
app.get('/', (req, res) => {
    res.json("Welcome to BilLife MarketPlace😊");
});

app.listen(port, () => {
    console.log(`Server is running on port no: ${port}`);
});
