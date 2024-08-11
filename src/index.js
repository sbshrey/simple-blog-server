var express = require("express"),
  bodyParser = require("body-parser"),
  authenticate = require("./middleware/auth")
  ;
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(authenticate)
app.use("/posts", require("./routes/posts"));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);