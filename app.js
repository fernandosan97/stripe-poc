// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require('stripe')('sk_test_51Hl5fGLkS6aJQBjdTPLbjtHoI6xeWyOY1WNM1m8BTIyjg9HmEJ5PiOOl6bxVgIdIFXdBN1n8RSvVtVPo48EeAua500x6GcEf0I');
const express = require('express');
const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_2f977e9ee8474501ebac2d12e88692f54386cc2e87d26103ea548dc0fdfd0a1f";

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];
  const accountId = request.headers['stripe-account'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret, { stripeAccount: accountId });
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));