const { Client, Environment, ApiError } = require("square");

const client = new Client({
  // NOTE:
  // IF you put in a new token, the server must be
  // restarted in order for the new token to work

  // Sandbox Mode
  // accessToken: process.env.ACCESS_TOKEN,
  // environment: Environment.Sandbox,

  // Production Mode
  accessToken: process.env.ACCESS_TOKEN,
  environment: Environment.Production,
});

export default async function handler(req, res) {
  //Gets req Method type
  if (req.method === "POST") {
    // Setting variables up for fetching IDS
    const orderIds = req.body.orders;
    const data = [];

    // Tries to push req body
    try {
      // Fetches Orders Info
      for (let index = 0; index < orderIds.length; index++) {
        const response = await client.catalogApi.retrieveCatalogObject(
          orderIds[index]
        );

        data.push(response.result.object);
      }

      // DO NOT DELETE
      // IT IS NEEDED TO CONVERT DATA INTO A JSON
      BigInt.prototype.toJSON = function () {
        return this.toString();
      };

      res.status(201).json(data);
    } catch (err) {
      console.log(err);
    }
  }
}
