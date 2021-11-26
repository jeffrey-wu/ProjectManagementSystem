import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import DBConnection from "../server/DB_Connect.js";
import route from "../server/routers/router.js"


const app = express()

const corsOptions = {
  origin: "http://localhost:4200"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(route)


app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
// https://www.robinwieruch.de/node-express-server-rest-api
// https://www.robinwieruch.de/mongodb-express-setup-tutorial
// https://bezkoder.com/node-express-mongodb-crud-rest-api/
// https://www.youtube.com/watch?v=W1Kttu53qTg
// https://www.youtube.com/watch?v=YXfixWQApDA&t=423s