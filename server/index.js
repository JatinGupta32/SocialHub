// const express = require("express")
// const app = express();
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const database = require("./config/database");
// const bodyParser = require("body-parser");
// const userRoutes = require("../server/routes/user")

// dotenv.config();  // Loading environment variables from .env file
// const PORT = process.env.PORT || 4000;
// app.use(cookieParser());
// app.use(express.json());
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

// // Connecting to database
// database.connect();

// // Connecting to cloudinary
// // cloudinaryConnect();
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173"); 
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
    
//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     }

//     next();
// });
// app.use("/api/v1", userRoutes);

// // Testing the server
// app.get("/",(req,res) => {
//     return res.json({
//         sucess: true,
//         message: "Your server is up and running ...",
//     });
// });

// // Listening to the server
// app.listen(PORT, () => {
//     console.log(`App is listening at ${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const database = require("./config/database");
const userRoutes = require("../server/routes/user");
const postRoutes = require("../server/routes/post");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// app.use(
//     cors({
        // origin: "http://localhost:5173",
        // credentials: true,
//     })
// );

app.use(cors())
// Connect to Database
database.connect();

// API Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);

// Health Check Route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
