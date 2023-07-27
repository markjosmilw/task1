require("dotenv").config();

const Koa = require("koa");
const app = new Koa();
const PORT = process.env.APP_PORT;

const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const userRoute = require("./routes/userRoute");
const infoRoute = require("./routes/infoRoute");

app.use(cors());
app.use(bodyParser());
app.use(userRoute.routes());
app.use(infoRoute.routes());

app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));
