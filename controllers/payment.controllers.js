require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res, next) => {
    const { email, amount } = req.body;
    try {

        const customer = await stripe.customers.create({                // Creating a customer
            email: email,
        });

        const paymentMethod = await stripe.paymentMethods.create({      // Creating a payment method using test card token
            type: "card",
            card: {
                token: "tok_visa",
            },
        });

        await stripe.paymentMethods.attach(paymentMethod.id, {          // Attaching the payment method to teh customer
            customer: customer.id,
        });

        const paymentIntent = await stripe.paymentIntents.create({      // Creating Payment Intent
            amount: amount * 100,
            currency: 'inr',
            customer: customer.id,
            payment_method: "pm_card_visa",
            confirmation_method: "manual",
            description: "Payment for your order",
            use_stripe_sdk: true,
            confirm: false
        });
        res.status(200).send({paymentIntent});
    } catch (err) {
        next(err)
    }
}

const capturePaymentIntent = async (req, res, next) => {
    try {
        const { id } = req.params;
        await stripe.paymentIntents.confirm(id);                            // Confirming a payment
        const paymentIntent = await stripe.paymentIntents.capture(id);      // Capturing a payment intent using payment intent id
        return res.status(200).send({ paymentIntent })
    } catch (err) {
        next(err)
    }
}

const createRefund = async (req, res, next) => {
    try {
        const { id } = req.params;
        const refund = await stripe.refunds.create({ payment_intent: id })    // Creating a Refund using payment intent id
        return res.status(200).send({ refund });
    } catch (err) {
        next(err);
    }
}

const listingPaymentIntent = async (req, res, next) => {
    try {
        const paymentIntents = await stripe.paymentIntents.list();          // Getting a list of all payment intent
        res.status(200).send({ paymentIntents });
    } catch (err) {
        next(err);
    }
}

module.exports = {createPaymentIntent, capturePaymentIntent, createRefund, listingPaymentIntent}