import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import connectDB from "./SRC/Config/Db.js"
import router from "./SRC/Routes/IndexRoute.js"




const app = express()

app.use(cors({origin:"*"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/safety', router)

const startServer = async () => {
    const PORT = process.env.PORT;
    // console.log(PORT)
     connectDB();
    try {  
    app.listen(PORT, () => {console.log (`SAFETY APP IS RUNNING ON PORT ${PORT}`);})
    } catch (error) {
        console.log(error);
    }
};

startServer();
app.get("/", (req, res) => {
    res.send('API IS RUNNING')
})