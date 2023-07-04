const { Client, Environment } = require('square');
const client = new Client({
  // NOTE:
  // IF you put in a new token, the server must be
  // restarted in order for the new token to work

  // Sandbox Mode
  // accessToken: process.env.SANDBOX_ACCESS_TOKEN,
  // environment: Environment.Sandbox,

  // Production Mode
  accessToken: process.env.ACCESS_TOKEN,
  environment: Environment.Production,
});

async function getOrderInfo(orderIDs) {
  let orderInfo = [];

  // console.log("IN GETORDERINFO (ORDERIDS):", orderIDs);

  // Loops through ID and return the needed info
  for (const [key, value] of Object.entries(orderIDs)) {
    const response = await client.catalogApi.retrieveCatalogObject(key);

    // Sets the Order
    let orderDic = {
      name: response.result.object.itemData.name,
      quantity: value.Quantity.toString(),
      basePriceMoney: {
        amount: Number(
          response.result.object.itemData.variations[0].itemVariationData
            .priceMoney.amount
        ),
        currency: 'USD',
      },
    };

    orderInfo.push(orderDic);
  }

  // console.log(orderInfo);
  return orderInfo;
}

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'POST') {
    try {
      // VARIABLES
      // ===============
      // Gets Shipping Info and saves into a var
      const shippingInfo = req.body;
      // console.log("REQ BODY", req.body);
      // Creates var for orders
      var orderInfo = null;
      // ===============

      // Gets location ID and enter into shipping var
      const response = await client.locationsApi.listLocations();
      shippingInfo['locationId'] = response.result.locations[0].id;

      try {
        // Gets Orders Name, quantity, and price

        var orderInfo = await getOrderInfo(shippingInfo['orderIds']);
        console.log('OrderInfo After then: ', orderInfo);

        const checkoutLink = await client.checkoutApi.createPaymentLink({
          // idempotencyKey
          idempotencyKey: shippingInfo['idempotency'],
          // Customer Order
          order: {
            locationId: shippingInfo['locationId'],
            // Customer Order Details
            lineItems: orderInfo,
            taxes: [
              {
                name: 'Sales Tax',
                percentage: '9.5',
                scope: 'ORDER',
              },
            ],
          },
          checkoutOptions: {
            merchantSupportEmail: 'rcbrilliance@gmail.com',
            askForShippingAddress: true,
            shippingFee: {
              name: 'Shipping Fee',
              charge: {
                amount: 700,
                currency: 'USD',
              },
            },
          },
        });

        res.status(201).json(checkoutLink.result);
        // res.redirect(checkoutLink.result.paymentLink.url);

        // console.log(checkoutLink.result.paymentLink.url);
      } catch (err) {
        console.log(err);
      }

      // Sends Order then receives PaymentLink
    } catch (err) {
      console.log(err);
    }
  }
}
