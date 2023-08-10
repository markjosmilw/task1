require("dotenv").config();

const Koa = require("koa");
const app = new Koa();
const PORT = process.env.APP_PORT;

const Router = require("koa-router");
const router = new Router();

const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const userRoute = require("./resources/user/route");
const profileRoute = require("./resources/profile/route");
const adminRoute = require("./resources/admin/route");
const testRoute = require("./resources/test/route");

testRoute({ router });
userRoute({ router });
profileRoute({ router });
adminRoute({ router });

app.use(cors());
app.use(bodyParser());

app.use(router.routes());

app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));
