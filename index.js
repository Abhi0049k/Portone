const express = require('express');
const paymentRouter = require('./routes/payment.routes');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to Portone Assignment' })
})

app.use('/payment-api', paymentRouter);

app.use('/*', (req, res) => {
    res.status(404).send({ Error: 'Page not found' })
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500).send({Error: err.message || 'Internal Server Error'})
})

app.listen(PORT, () => {
    console.log(`App is running on PORT: ${PORT}`)
})