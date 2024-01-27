# Portone Assignment

## Description

This project implements backend APIs for Stripe Payment Gateway integration. It provides functionality to create payment intents, capture intents, create refunds, and get a list of all intents using the Stripe API.

## Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Abhi0049k/Portone.git
   cd your-repo
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up Stripe Sandbox Account:
   - Create an account on [Stripe Dashboard](https://dashboard.stripe.com/register).
   - Obtain your Stripe Access Keys and Secret Keys.

4. Create a \`.env\` file in the root directory:
   \`\`\`env
   STRIPE_PUBLIC_KEY=your-stripe-public-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   PORT=3000  # Set your desired port
   \`\`\`

## Usage

1. Run the application:
   \`\`\`bash
   npm start
   \`\`\`

2. Access the APIs:
   - Create Intent: \`POST /payment-api/create-payment\`
   - Capture Intent: \`POST /payment-api/capture-payment_intent/:id\`
   - Create Refund: \`POST /payment-api/create-refund/:id\`
   - Get List of Intents: \`GET /payment-api/list-payment_intent\`

## Configuration

- Configure Stripe keys in the \`.env\` file.

## Testing

1. Run unit tests:
   \`\`\`bash
   npm test
   \`\`\`

## Bonus Points

- The application has been packaged into a container using Docker for easier deployment.
- A Makefile is provided for an easier build process.

## References

- [Stripe API Docs](https://stripe.com/docs/api/payment_intents)

## Contributors

- Mangalam Kumar