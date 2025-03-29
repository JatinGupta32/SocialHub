const express = require("express")
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const bodyParser = require("body-parser");
const userRoutes = require("../server/routes/user")

dotenv.config();  // Loading environment variables from .env file
const PORT = process.env.PORT || 4000;
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Connecting to database
database.connect();

// Connecting to cloudinary
// cloudinaryConnect();

app.use("/api/v1", userRoutes);

// Testing the server
app.get("/",(req,res) => {
    return res.json({
        sucess: true,
        message: "Your server is up and running ...",
    });
});

// Listening to the server
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});


