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
  if (req.method === 'POST') {
    console.log('POST FUNCTION CALL');
    // Product Var
    console.log('BODY', req.body);

    // const productID = req.body.id;

    // console.log('ID IN API', productID);

    // try {
    //   const response = await client.catalogApi.retrieveCatalogObject({
    //     productID,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
