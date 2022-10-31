require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");
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
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: "http://localhost:3600",
  })
);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// API ROUTES
app.use("/", require("./routes/root"));
// Handle Login Route
app.use("/auth", require("./routes/auth"));

// app.use(verifyJWT);
app.use("/api/users", require("./routes/api/usersRoute"));
app.use("/api/employees", require("./routes/api/employeesRoute"));
app.use("/api/students", require("./routes/api/studentsRoute"));
app.use("/api/grades", require("./routes/api/gradesRoute"));
app.use("/api/subjects", require("./routes/api/subjectsRoute"));

app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "page", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
