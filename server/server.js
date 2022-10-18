require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3600;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// handle options credentials check - before CORS!
// and fetch cookies credentials  requirements
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// API ROUTES
app.use("/api/users", require("./routes/api/usersRoute"));
app.use("/api/students", require("./routes/api/studentsRoute"));

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
