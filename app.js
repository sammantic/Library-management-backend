const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const logger = require("./middlewares/logger");
const {notFound, errorHandler} = require("./middlewares/error");

const booksRoute = require("./routes/books");
const authorsRoute = require("./routes/authors");
const authorRoute = require("./routes/auth");
const userRoute = require("./routes/users");

// Reading config file .env
dotenv.config();

// Connection to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDb..."))
    .catch((error) => console.log("Connection Failed to MongoDB", error));

// Init App
const app = express();

// Apply Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", booksRoute);
app.use("/api/authors", authorsRoute);
app.use("/api/auth", authorRoute);
app.use("/api/user", userRoute);

// Error handler Middlewares
app.use(notFound);
app.use(errorHandler);

// Running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} enviroment on port ${PORT}`));