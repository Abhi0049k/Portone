const { Router } = require("express");
const { createPaymentIntent, capturePaymentIntent, createRefund, listingPaymentIntent } = require("../controllers/payment.controllers");

const paymentRouter = Router();

paymentRouter.post('/create-payment_intent', createPaymentIntent)                   // Creating a payment intent

paymentRouter.post('/capture-payment_intent/:id', capturePaymentIntent)             // Capturing a payment intent

paymentRouter.post('/create-refund/:id', createRefund)                      // Creating a refund

paymentRouter.get('/list-payment_intent', listingPaymentIntent)                     // Listing all the payment intents

module.exports = paymentRouter;