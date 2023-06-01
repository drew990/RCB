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
    //
    const orderIds = req.body.orders;
    // data for holding the API
    const dataIDs = [];
    const data = [];
    let productImageId = null;
    console.log(orderIds);

    // Fetches Product ID from Square
    try {
      // Counts how many duplicate IDs there are
      const counts = {};
      orderIds.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      // console.log("COUNT", counts);

      for (const [key, value] of Object.entries(counts)) {
        dataIDs.push(key);
      }

      // Gets API variable and saves into data
      for (let i = 0; i < dataIDs.length; i++) {
        const response = await client.catalogApi.retrieveCatalogObject(
          dataIDs[i]
        );

        // Pushes it into Data
        data.push(response.result.object);
      }

      // Gets Image ID then save into data
      for (let i = 0; i < data.length; i++) {
        productImageId = data[i].itemData.imageIds[0];
        const response = await client.catalogApi.retrieveCatalogObject(
          productImageId
        );

        data[i] = [data[i], response.result.object];
      }

      // Adds Quantity in data
      for (let i = 0; i < data.length; i++) {
        data[i] = [data[i], counts[data[i][0].id]];
      }
      // console.log(data);

      // console.log(data[1]);
    } catch (err) {
      console.log(err);
    }

    // Gets Image ID API
    // for (let i = 0; i < data.length; i++) {
    //   productImageId = data[i].itemData.imageIds[0];
    //   const response = await client.catalogApi.retrieveCatalogObject(
    //     productImageId
    //   );

    //   data.push(response.result.object);
    // items.splice(i, 1, data);
    // }catch (err) {
    //   console.log(err);
    // }

    //console.log("DATA", data);

    // DO NOT DELETE
    // IT IS NEEDED TO CONVERT DATA INTO A JSON
    BigInt.prototype.toJSON = function () {
      return this.toString();
    };

    res.status(201).json(data);
  }
}
