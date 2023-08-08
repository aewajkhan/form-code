const app = require("./index");

const connect = require("./config/connection");
app.listen(8000, async () => {
  await connect();
  console.log("listening port 8000.....");
});
