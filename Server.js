import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import router from "./SRC/Routes/IndexRoute.js"
import connectDB from "./SRC/Config/Db.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api", router)

const startServer = async () => {
    const PORT = process.env.PORT || 2323;
    connectDB();
    try{
        app.listen(PORT, () => {console.log (`SAFETY APP IS RUNNING ON PORT ${PORT}`);})
    } catch (error) {
        console.log(error);
    }
};

startServer();
app.get("/", (req, res) => {
    res.send('API IS RUNNING')
})