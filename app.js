import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.js";
import {initialize} from "./data/db.js";

const PORT = 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use("/products", productsRoutes);

try{
    await initialize();
    app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)
});
}catch (err){
    console.log(err.message)
}