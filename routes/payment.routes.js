const { Router } = require("express");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentRouter = Router();

paymentRouter.post('/create-intent', async (req, res, next)=>{
    try{
        const {amount, currency} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({amount, currency, automatic_payment_methods:{enabled: true}});
        res.status(200).send({paymentIntent})
    }catch(err){
        console.log(err)
        next(err)
    }
})

paymentRouter.post('/capture-intent/:id', async(req, res, next)=>{
    try{
        const {id} = req.params;
        console.log(id);
        const paymentIntent = await stripe.paymentIntents.capture(id);
        res.status(200).send({paymentIntent})
    }catch(err){
        console.log(err);
        next(err)
    }
})

paymentRouter.post('/create-refund', async(req, res, next)=>{
    try{
        const {id} = req.params;
        const refund = await stripe.refunds.create({paymentIntent: id})
        res.status(200).send({refund});
    }catch(err){
        console.log(err);
        next(err);
    }
})

paymentRouter.get('/list-intent', async(req, res,next)=>{
    try{
        const paymentIntents = await stripe.paymentIntents.list();
        res.status(200).send({paymentIntents});
    }catch(err){
        console.log(err);
        next(err);
    }
})

module.exports = paymentRouter;