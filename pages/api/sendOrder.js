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

async function getOrderInfo(orderIds) {
  const orderInfo = [];

  const objectIds = Object.keys(orderIds);
  const objectsResponse = await client.catalogApi.batchRetrieveCatalogObjects({
    objectIds: objectIds,
  });
  const objects = objectsResponse.result.objects ?? [];

  objects.forEach((object) => {
    orderInfo.push({
      name: object.itemData?.name,
      quantity: orderIds[object.id].toString(),
      basePriceMoney: {
        amount: Number(
          object.itemData.variations[0].itemVariationData.priceMoney.amount
        ),
        currency: 'USD',
      },
    });
  });

  return orderInfo;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { orderIds = {}, idempotency = '' } = req.body ?? {};

      // Gets location ID and enter into shipping var
      const response = await client.locationsApi.listLocations();
      const locationId = response.result.locations?.[0].id;

      // Gets Orders Name, quantity, and price

      const orderInfo = await getOrderInfo(orderIds);
      console.log('OrderInfo After then: ', orderInfo);

      const checkoutLink = await client.checkoutApi.createPaymentLink({
        // idempotencyKey
        idempotencyKey: idempotency,
        // Customer Order
        order: {
          locationId: locationId,
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

      // DO NOT DELETE
      // IT IS NEEDED TO CONVERT DATA INTO A JSON
      BigInt.prototype.toJSON = function () {
        return this.toString();
      };

      res.status(201).json(checkoutLink.result);
    } catch (err) {
      console.log(err);
    }
  }
}
