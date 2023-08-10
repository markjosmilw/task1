require("dotenv").config();

const Koa = require("koa");
const app = new Koa();
const PORT = process.env.APP_PORT;

const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");

const userRoute = require("./routes/userRoute");
const infoRoute = require("./routes/infoRoute");

const user = require('./resources/user/route')
const profile = require('./resources/profile/route')
const admin = require('./resources/admin/route')

const test = require('./resources/test/route')

app.use(cors());
app.use(bodyParser());
// app.use(infoRoute.routes());

app.use(user.routes());
app.use(profile.routes());
app.use(admin.routes())

app.use(test)

app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));
