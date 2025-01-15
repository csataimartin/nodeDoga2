import express from "express";
import { dbAll, dbRun, dbGet } from "../data/db.js";

const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        console.log('Get all');
        const rows = await dbAll("SELECT * FROM products");
        console.log('Rows: ' + rows);
        res.status(200).json(rows);
    } catch (err){
        console.log(`Error : ${err.message}`);
        res.status(500).json({message: err.message});
    }
})

router.post("/", async (req, res) =>{
    const{name, brand, description, price } = req.body
    if(!name && !brand && !description && !price) {
        return res. status(400).json({message: "Missing data"});
    }
    try{
        const products = await dbRun("INSERT INTO products (name, brand, description, price) VALUES (?, ?, ?, ?)", [name, brand, description, price])
        res.status(201).json({message:"Created successful"});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})
router.get("/:id", async (req, res) =>{
    try{
        console.log('Get all');
        const rows = await dbAll("SELECT * FROM products");
        console.log('Rows: ' + rows);
        res.status(200).json(rows);
    } catch (err){
        console.log(`Error : ${err.message}`);
        res.status(500).json({message: err.message});
    }
})


router.put("/:id", async (req, res) =>{
    const{name, brand, description, price } = req.body
    if(!name && !brand && !description && !price) {
        return res. status(404).json({message: "Missing data"});
    }
    try{
        const pro = await dbGet("SELECT * FROM products WHERE id=?", [req.params.id]);
        if(!pro){
            return res.status(400).json({message: "Product not found"})
        }
        await dbRun(
            "UPDATE products SET name = ?, brand = ?, description =?, price =? WHERE id=?", [name, brand, description, price, pro.id ])
            res.status(200).json({message:"Updated successful"});

    
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

router.delete("/:id", async (req, res) =>{
    try{
        const pro = await dbGet("SELECT * FROM products WHERE id = ?", [req.params.id]);
        if(!pro){
            return res.status(404).json({message: "Product not found"})
        }
        console.log(pro)
        await dbRun("DELETE FROM products WHERE id= ?", [req.params.id ])
        console.log("www")
        res.status(200).json({message:"DELETED successful"});
    
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

export default router;