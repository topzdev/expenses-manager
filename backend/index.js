const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const transactionRoute = require("./routes/transaction");
const auth = require("./auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/transaction", transactionRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`API is now online on port ${process.env.PORT || 4000}`);
});

mongoose.connection.once("open", () => {
  console.log("Now connected to MongoDB Atlas");
});
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.tcytv.mongodb.net/restbooking?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
