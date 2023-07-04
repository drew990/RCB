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

const featureItems = [
  'X2UQLJ4Z7Z3B3JTKQAV5NZN7',
  'RTIMESEUB77SPOKYVVZKKI7P',
  'EINDQSR3JKFG7QFG7EV4DAYV',
];

export default async function handler(req, res) {
  // GETS the data from Square
  if (req.method === 'GET') {
    let items = [];
    const data = { test: 2 };

    try {
      for (let i = 0; i < featureItems.length; i++) {
        const response = await client.catalogApi.retrieveCatalogObject(
          featureItems[i]
        );

        items.push(response.result.object);
      }

      for (let i = 0; i < featureItems.length; i++) {
        const response = await client.catalogApi.retrieveCatalogObject(
          items[i].itemData.imageIds[0]
        );
        items[i].itemData['imageIds'] = response.result.object;
        // response.result.object

        // console.log(response.result.object);
        // items.splice(i, response);
      }

      // DO NOT DELETE
      // IT IS NEEDED TO CONVERT DATA INTO A JSON
      BigInt.prototype.toJSON = function () {
        return this.toString();
      };

      res.status(200).json(items);
    } catch (err) {
      console.log(err);
    }
  }
}
