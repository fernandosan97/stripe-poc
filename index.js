const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Hl5fGLkS6aJQBjdTPLbjtHoI6xeWyOY1WNM1m8BTIyjg9HmEJ5PiOOl6bxVgIdIFXdBN1n8RSvVtVPo48EeAua500x6GcEf0I');

// Devuelve el balance de la cuenta maesstra de Stripe
async function getBalance() {
  try {
    const balance = await stripe.balance.retrieve();
    console.log(balance.available);
  } catch (error) {
    console.log(error);
  }
}

// getBalance();

// Asocia el token de plaid con el usuario de connect
async function createAccountBankToken() {
  try {
    // const token = await stripe.tokens.create({
    //   bank_account: {
    //     country: 'US',
    //     currency: 'usd',
    //     account_holder_name: 'Jenny Rosen',
    //     account_holder_type: 'individual',
    //     routing_number: '110000000',
    //     account_number: '000123456789',
    //   },
    // });
    // console.log('BANK TOKEN: ', token);

    // const bankAccount = await stripe.customers.createSource(
    //   'cus_NH0hEBs7r4D3go',
    //   { source: token.id }
    // );

    const bankAccount = await stripe.accounts.createExternalAccount(
      'acct_1MXnC1RSyUFGvbU8',
      {
        external_account: 'btok_1MXnetI9s2zQKR6LVGBgbzsY',
        default_for_currency: true
      },
    );

    console.log('USER BANK ACCOUNT: ', bankAccount);
  } catch (error) {
    console.log(error);
  }
}

// createAccountBankToken();


// Devuelve la informacion de la un customer
async function customerDetail() {
  try {
    const customer = await stripe.customers.retrieve(
      'cus_NGxfeeqXPyRfUO'
    );

    console.log(customer);
  } catch (error) {
    console.log(error);
  }
}

// customerDetail();

// Asocia un token de plaid a un customer
async function createCustomerBankAccount() {
  try {
    const bankAccount = await stripe.customers.createSource(
      'cus_N94RhVuqmclDGV',
      { source: 'btok_1MWNgILkS6aJQBjd47BPICvB' }
    );

    console.log('USER BANK ACCOUNT: ', bankAccount);

    console.log(customer);
  } catch (error) {
    console.log(error);
  }
}

// createCustomerBankAccount();


// Crea un payout de la cuenta master de stripe a su banco
async function createPayout() {
  try {
    const payout = await stripe.payouts.create({
      amount: 500,
      currency: 'usd',
      source_type: 'bank_account',
    }, { stripeAccount: 'acct_1MXX1MIxZX6iBzhv' });

    console.log('PAYOUT: ', payout);
  } catch (error) {
    console.log(error);
  }
}

// createPayout();

// Crea un usuario en Account Connect
async function createAccount() {
  try {
    const account = await stripe.accounts.create({
      type: 'custom',
      country: 'US',
      email: 'fs_sanchez97@outlook.es',
      capabilities: {
        transfers: { requested: true },
        // card_payments: { requested: true },
      },
      business_type: 'individual',
      business_profile: { product_description: 'Retiro de dinero con Vyou' },
      individual: {
        first_name: 'Fernando',
        last_name: 'Sanchez',
      },
      tos_acceptance: {
        date: Math.floor(new Date().getTime() / 1000),
        ip: '190.242.24.233',
      }
    });

    console.log(account);
  } catch (error) {
    console.log(error);
  }
}

// createAccount();


// Crea un link para verificar ciertos datos del usuario
async function createLinkAccount() {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: 'acct_1MXAlcC1Bn6YUUav',
      refresh_url: 'https://example.com/reauth',
      return_url: 'https://example.com/return',
      type: 'account_onboarding',
    });

    console.log(accountLink);
  } catch (error) {
    console.log(error);
  }
}

// createLinkAccount();

// Envia dinero desde la cuenta master de Stripe a un usuario en account connect
async function sendMoneyToUser() {
  // 0.25 = 0.25 * 100 = 25
  //  2500 = 25.00
  // 1000 = 10.00
  // 50 = 0.50 
  try {
    const transfer = await stripe.transfers.create({
      amount: 25,
      currency: "usd",
      destination: "acct_1MXCobQ52lOPF51Q",
    });


    console.log(transfer);
  } catch (error) {
    console.log(error);
  }
}

// sendMoneyToUser();

async function retrieveTransfer() {
  try {
    const transfer = await stripe.transfers.retrieve(
      'tr_1MWPrcLkS6aJQBjd6XntvhWp'
    );

    console.log(transfer);
  } catch (error) {
    console.log(error);
  }
}

// retrieveTransfer();

// Crea un payout instant
async function instantPayout() {
  try {
    const balance = await stripe.balance.retrieve();
    console.log(balance);
    const payout = await stripe.payouts.create(
      { amount: 500, currency: 'usd', method: 'standard', source_type: 'card' },
      { stripeAccount: 'acct_1MXX1MIxZX6iBzhv' }
    );

    console.log(payout);
  } catch (error) {
    console.log(error);
  }
}

// instantPayout();


// Muestra el detalle de un usuario en account connect
async function accountDetail() {
  try {
    const account = await stripe.accounts.retrieve(
      'acct_1MXCobQ52lOPF51Q'
    );

    console.log(account);
  } catch (error) {
    console.log(error);
  }
}

// accountDetail();

// Crear un pago desde el usuario a stripe
async function createCharge() {
  try {
    const charge = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      source: 'acct_1MXCobQ52lOPF51Q',
      description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
    });

    console.log(charge);
  } catch (error) {
    console.log(error);
  }
}

// createCharge();

async function retrievePayment() {
  try {
    const charge = await stripe.charges.retrieve(
      'py_1NHCJgLkS6aJQBjdMvrapOla'
    );

    console.log(charge);
  } catch (error) {
    console.log(error);
  }
}

// retrievePayment();


// Muestra informacion sobre la cuenta de banco del usaurio en account connect
async function retrieveBankAccount() {
  try {
    const bankAccount = await stripe.accounts.retrieveExternalAccount(
      'acct_1MXnC1RSyUFGvbU8',
      'ba_1MXnD1RSyUFGvbU87oRnDqyo'
    );

    console.log(bankAccount);
  } catch (error) {
    console.log(error);
  }
}

// retrieveBankAccount();


// Elimina un usuario en account connect
async function deleteAccount() {
  try {
    await stripe.accounts.del(
      'acct_1MYIPaIdOinnEdHN'
    );

    console.log('OK')
  } catch (error) {
    console.log(error);
  }
}

// deleteAccount();

// Elimina el banco  de un usuario en account connect pero no puede quedar sin banco conectado
async function deleteBankAccount() {
  try {
    const deleted = await stripe.accounts.deleteExternalAccount(
      'acct_1MYYKMIMEQWQ2JOa',
      'ba_1MYYLUIMEQWQ2JOaULAglFNT'
    );

    console.log(deleted);
  } catch (error) {
    console.log(error);
  }
}

// deleteBankAccount();

// Devuelve los payouts de un usuario
async function accountPayouts() {
  try {
    const payout = await stripe.payouts.list({
      limit: 3,
    }, { stripeAccount: 'acct_1MXX1MIxZX6iBzhv' });

    // const payout = await stripe.payouts.retrieve(
    //   'po_1MWVHaPqwITeW2yUmq4i0AcF',
    //   {
    //     stripeAccount: 'acct_1MWRMaPqwITeW2yU',
    //   }
    // );

    // const token = await stripe.tokens.retrieve(
    //   'btok_1MWu4cCO2pC2bjwJjqtHS2Cs'
    // );

    console.log(payout);
  } catch (error) {
    console.log(error);
  }
}

// accountPayouts();

async function removeCardPayments() {
  try {
    const capability = await stripe.accounts.updateCapability(
      'acct_1MXB1BFh8xQmsXTj',
      'card_payments',
      { requested: false }
    )
  } catch (error) {
    console.log(error);
  }
}

// removeCardPayments();

async function pausePayouts() {
  try {
    const account = await stripe.accounts.update(
      'acct_1MXCobQ52lOPF51Q',
      {
        capabilities: {
          transfers: { requested: false }
        }
      }
    );


    return bankAccount;
  } catch (error) {
    console.log(error);
  }
}

// pausePayouts();

async function paymentIntent() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent);
  } catch (error) {
    console.log(error);
  }
}

// paymentIntent();

async function retrievePaymentIntent() {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      'pi_3NIc8lLkS6aJQBjd1M2C80P2'
    );

    console.log(paymentIntent);
  } catch (error) {
    console.log(error);
  }
}

// retrievePaymentIntent()

async function checkout() {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: 'https://example.com/success',
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Laptop",
            },
            currency: "usd",
            unit_amount: 2000,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: "TV",
            },
            currency: "usd",
            unit_amount: 3000,
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      customer_email: 'fernandosan97@outlook.es',
      payment_method_types: ['card'],
    });
    console.log('CHECKOUT SESSION: ', session);
    const infoCheckoutSession = await retrieveCheckout(session.id);
    console.log('INFO CHECKOUT: ', infoCheckoutSession);
  } catch (error) {
    console.log(error);
  }
}

// checkout();

async function retrieveCheckout(id) {
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    console.log(session)
    return session;
  } catch (error) {
    console.log(error);
  }
}

// retrieveCheckout('cs_live_a10s6vGTR3zbWOoYOh5JlFAmNrdx8rdh6K1EIopYARobVOJG2oBSZC3qnJ');

async function createPaymentIntent(id, quantity) {
  try {
    // Recibimos el id
    // Consultar la informacion del paquete por el id recibido
    const infoOffer = {
      id,
      price: 35,
    };

    // Se calcula el monto
    // Stripe cobra 2.9% + 0.30c (comentar con William)
    const totalAmount = infoOffer.price * quantity;
    console.log('TOTAL AMOUNT: ', parseInt(totalAmount * 100));

    // Se crea un customer en stripe
    const customer = await stripe.customers.create();

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' },
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(totalAmount * 100),
      currency: 'USD',
      customer: customer.id,
      payment_method_types: ['card'],
    });

    console.log('paymentIntent: ', paymentIntent);

    const response = {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      publishableKey: 'test',
    };

    console.log('RESPONSE: ', response);
    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      publishableKey: 'pk_test_51Hl5fGLkS6aJQBjdGXIPhi3dcN9UuXsQu6dOtXLuQHM7U6gXVTPEhTBYsQHwNjJwfQxDONQl8BKFoIroO34u1cuN008xziaP3X', // Var de entorno
    };
  } catch (error) {
    console.log(error);
  }
}

// createPaymentIntent(1, 2);

async function confirmPaymentIntent() {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4000000000000127',
        exp_month: 7,
        exp_year: 2023,
        cvc: '123',
      },
    });

    const paymentIntent = await stripe.paymentIntents.confirm(
      'pi_3NJIE4LkS6aJQBjd2yzvuVKU',
      {
        payment_method: paymentMethod.id,
      }
    );
    console.log(paymentIntent);
  } catch (error) {
    if (error.type === 'StripeCardError') {
      console.log({
        code: error.code,
        status: error.statusCode,
        message: error.message,
      });
    } else {
      console.log(error);
    }
  }
}

confirmPaymentIntent();