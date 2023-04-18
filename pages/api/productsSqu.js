// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

const { locationsApi, catalogApi } = client;

// Get Locations of the store
async function getLocations() {
  try {
    let listLocationsResponse = await locationsApi.listLocations();
    let locations = listLocationsResponse.result.locations;
    console.log(locations);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
}

// Get the products of the store
async function getCatalog() {}

// Get Objects

//TEST FUNCTIONS ->> getLocations();

export default async function handler(req, res) {
  // GETS the data from Square
  if (req.method === "GET") {
    console.log("IN GET METHOD");
    // getCatalog();
    // console.log(items);
    // res.status(200).json(items);

    try {
      // Create a array variable
      let items = [];

      // Gets catalog from square
      let listCatalogResponse = await catalogApi.listCatalog();
      let catalogs = listCatalogResponse.result.objects;

      //Pushes Items into the item array
      for (let i = 0; i < catalogs.length; i++) {
        if (catalogs[i].type === "ITEM") {
          items.push(catalogs[i]);
        }
      }

      // Gets Image URL if their is an ID
      for (let i = 0; i < items.length; i++) {
        // if (items[i].itemData.imageIds[0] != "") {}
        let data = [];
        data.push(items[i]);

        const response = await client.catalogApi.retrieveCatalogObject(
          items[i].itemData.imageIds[0]
        );
        // console.log("YOUR RESPONSE ", response.result.object);

        data.push(response.result.object);
        // console.log(data);
        items.splice(i, 1, data);
      }

      // Gets Item Options if an ID exist
      for (let i = 0; i < items.length; i++) {
        if (items[i][0].itemData.itemOptions[0].itemOptionId != null) {
          let data = [];

          data.push(items[i]);

          const response = await client.catalogApi.retrieveCatalogObject(
            items[i][0].itemData.itemOptions[0].itemOptionId
          );

          data[0].push(response.result.object);
          // items.splice(i, 0, data);
        }
        // console.log(items[0][0].itemData.itemOptions[0].itemOptionId);
      }

      // DO NOT DELETE
      // IT IS NEEDED TO CONVERT DATA INTO A JSON
      BigInt.prototype.toJSON = function () {
        return this.toString();
      };

      res.status(200).json(items);
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "POST") {
    try {
    } catch (err) {
      console.log(err);
    }
  }
}

// export default function handler(req, res) {
//   // res.status(200).json(getCatalog());
//   // res.status(200).json({ name: "John Doe" });

//   const requestMethod = req.method;
//   const body = JSON.parse(req.body);

//   switch (requestMethod) {
//     case "POST":
//       res
//         .status(200)
//         .json({ message: `You submitted the following data: ${body}` });
//     default:
//       res.status(200).json({ message: "Welcome to API Routes!" });
//   }
// }