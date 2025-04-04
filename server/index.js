const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const database = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { cloudinaryConnect } = require("./config/cloudinary");

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
cloudinaryConnect();

// API Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", profileRoutes);

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
