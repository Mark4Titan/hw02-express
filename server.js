const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(console.log("Database connection successful"))
  .then(() =>
    app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))
  )
  .catch((err) => {
    console.log("Error:", err.message);
    process.exit(1);
  });
