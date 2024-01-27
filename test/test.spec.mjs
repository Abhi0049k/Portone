import 'dotenv/config'
import * as chai from 'chai';
import supertest from 'supertest';
import app from '../index.cjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const request = supertest(app);
const expect = chai.expect;

describe('Stripe Payment', () => {

    describe('create Payment Intent', () => {
        it('should create a payment intent', async () => {
            const response = await request
                .post('/payment-api/create-payment_intent')
                .send({
                    email: 'test@test.com',
                    amount: 100
                })

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('paymentIntent')
        })
    })

    describe('should capture a payment intent', async () => {
        const createIntent = await stripe.payment.Intents.create({
            amount: 1000,
            currency: 'inr',
            payment_method: 'pm_card_visa',
            confirmation_method: 'manual',
            description: 'Payment for your order'
        })

        const response = await request
            .post(`/payment-api/capture-payment_intent/${createIntent.id}`)
            .send();
        
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('paymentIntent')
    })

    describe('should create a payment refund', async()=>{
        it('should create a refund', async()=>{
            const createIntent = await stripe.paymentIntents.create({
                amount: 1000,
                currency: 'inr',
                payment_method: 'pm_card_visa',
                confirmation_method: 'manual',
                description: 'Payment for your order'
            })

            const response = await request
            .post(`/payment-api/create-refund/${createIntent.id}`)
            .send();

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('refund');
        })
    })

    describe('should list all the payment intents', ()=>{
        it('should list all payment intent', async()=>{
            const response = await request
            .get('/payment-api/list-payment_intent')
            .send()

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('paymentIntents')
        })
    })
})