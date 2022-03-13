require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const app = express();

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Now live at http://localhost:${PORT}/`))
  )
  .catch(() => console.log(`Unable to connect to MongoDB Atlas`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Set node environment to production."));
}

app.use(errorMiddleware);
