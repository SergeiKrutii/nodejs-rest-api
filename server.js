const app = require("./app");

const mongoose = require("mongoose");
/* нужно вынести секретные данные в .env */
const DB_HOST =
  "mongodb+srv://srgkrt:F0b6UV62KvmgCk8t@cluster0.n3vvgdk.mongodb.net/contacts_reader";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
