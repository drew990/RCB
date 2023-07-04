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

export default async function handler(req, res) {
  //Gets req Method type
  if (req.method === 'POST') {
    // Setting variables up for fetching IDS
    const orderIds = req.body.orders;
    // data for holding the API
    const data = [];

    // Fetches Product ID from Square
    try {
      // Gets API variable and saves into data
      for (const [key, value] of Object.entries(orderIds)) {
        const response = await client.catalogApi.retrieveCatalogObject(key);
        // Pushes it into Data
        data.push(response.result.object);
      }

      // Gets Image ID then save into data
      for (let i = 0; i < data.length; i++) {
        const response = await client.catalogApi.retrieveCatalogObject(
          data[i].itemData.imageIds[0]
        );

        data[i].itemData['imageIds'] = response.result.object;
      }

      // console.log(data[0].itemData.imageIds);

      // data[i] = [data[i], response.result.object];
      // // Adds Quantity in data
      // for (let i = 0; i < data.length; i++) {
      //   data[i] = [data[i], counts[data[i][0].id]];
      // }
    } catch (err) {
      if (err instanceof TypeError) {
        // console.log('I AM A TYPE ERROR');
        res.status(204);
      }

      // console.log('Error In CUSTOMER CART', err);
    }

    // DO NOT DELETE
    // IT IS NEEDED TO CONVERT DATA INTO A JSON
    BigInt.prototype.toJSON = function () {
      return this.toString();
    };

    res.status(201).json(data);
  }
}
