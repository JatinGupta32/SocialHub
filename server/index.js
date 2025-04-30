const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const database = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const messageRoutes = require("./routes/messageRoutes");
const Message = require("./models/Message");
const { cloudinaryConnect } = require("./config/cloudinary");
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const GroupChat = require("./models/GroupChat");
const PrivateChat = require("./models/PrivateChat");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "https://socialhub-gamma.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

const io = new Server(server, {
    cors: {
        // origin: "http://localhost:5173",
        origin: "https://socialhub-gamma.vercel.app",
        credentials: true,
    }
})

// app.use(cors())
// Connect to Database
database.connect();
cloudinaryConnect();

// API Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/v1", messageRoutes);

io.on('connection',(socket)=>{

    console.log('user connected');

    socket.on('joinRoom',(payload)=>{
        console.log('payload: ',payload.roomId)
        socket.join(payload.roomId);
        // socket.emit('message', 'Welcome to the Chat!');
    })

    socket.on('sendMessage',async(payload)=>{
        const createdMsg = await Message.create({
          sender: payload.sender._id,
          message: payload.message,
          sendAt: new Date(),
        });
        
        const msg = await Message.findById(createdMsg._id).populate({
          path: "sender",
          select: "image fullname",
        });
        console.log(msg);
        if(payload.noOfUsers>2){
            await GroupChat.findOneAndUpdate({roomId: payload.roomId},
                {
                    $push: {
                        messages: msg._id
                    }
                },
                {new: true},
            )
        }
        else{
            await PrivateChat.findOneAndUpdate({roomId: payload.roomId},
                {
                    $push: {
                        messages: msg._id
                    }
                },
                {new: true},
            )
        }

        io.in(payload.roomId).emit('sendMessage', msg);
    })


})

// Health Check Route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

// Start Server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
