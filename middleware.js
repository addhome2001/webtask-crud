const mongoose = require("mongoose");

module.exports.db = (req, res, next) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(req.webtaskContext.secrets.MONGO_URL);
  mongoose.connection
    .once("open", () => console.log("Connected to MongoDB instance."))
    .on("error", error => console.log("Error connecting to MongoDB:", error));

  req.on("close", () => {
    mongoose.connection.close();
  });
  next();
};

module.exports.errorHandler = (req, res) => {
  res.status(500).send("fetch failure");
};
