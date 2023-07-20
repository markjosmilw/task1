require("dotenv").config();

const Koa = require("koa");
const app = new Koa();
const PORT = 9000;

const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");

const info = require("./routes/info");

app.use(cors());
app.use(bodyParser());
app.use(info.routes());

app.listen(PORT, () =>
  console.log(`this app is now listening to port ${PORT}`)
);
