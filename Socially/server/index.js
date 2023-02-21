const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
//config
dotenv.config({path:"config/config.env"});

//connect to the database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((data)=>{
    console.log(`Mongodb connected with server ${data.connection.host}`)
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
}) 