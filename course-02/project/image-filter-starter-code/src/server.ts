import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { promises } from 'dns';
import { Request, Response } from 'express';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  const { check, validationResult } = require('express-validator');

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });

  // filteredimage - End Point and validationrule - To make sure URL point is not empty string
  app.get("/filteredimage",
    check('image_url').isURL()
    , async (req : Request,  res : Response) => {
      // take input parameter
      const errors = validationResult(req);
      const urlparam = req.query.image_url;
      const urlvalue = "" + urlparam;
      // check if any errors return by 
      if (!errors.isEmpty()) {
        return res.status(422).send("Empty URL ->  GET /filteredimage?image_url={{}}");
      }

      //validate image url parameter
      if (!urlparam) {
        return res.status(422).send(` image_url is required`);
      }
      // check image file extension .must be .jpg/gif/png
      if ((urlvalue.indexOf(".jpg", 0) == -1) &&
        (urlvalue.indexOf(".gif", 0) == -1) &&
        (urlvalue.indexOf(".png", 0) == -1)
      ) {
        return res.status(422).send(` image file required jpg/gif/png`);
      }
      // call filterImageFromURL(image_url) to filter the image
      var filePath = await filterImageFromURL(urlvalue);
      //  send the resulting file in the response
      //  deletes any files on the server on finish of the response
      res.status(200).sendFile(filePath, function () {
        var myData = [];
        myData.push(filePath);
        deleteLocalFiles(myData);
      });
    });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();