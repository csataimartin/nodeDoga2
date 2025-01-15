import { rejects } from "assert";
import { resolve } from "path";
import sqlite from "sqlite3";

const db = new sqlite.Database ("./data/database.sqlite");

async function initialize(){
    await dbRun("DROP TABLE IF EXISTS products");
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, brand STRING, description STRING, price INTEGER)")
    await dbRun('INSERT INTO products (name, brand, description, price ) VALUES ("Start Wars Millennium Falcon", "Lego", "LEGO - for adults, recommended for ages 18 and up, LEGO® Star Wars series, release year 2024, pack of 921 building blocks", 23760)');}
    
async function dbRun(sql, params = []){
        return new Promise((resolve, reject) =>{
            db.run(sql,params, function (err){
                if(err){
                    reject(err);
                }else{
                    resolve(this);
                }
            })
        })
    }

async function dbGet(sql, params = []){
        return new Promise((resolve, reject) =>{
            db.run(sql,params, function (err){
                if(err){
                    reject(err);
                }else{
                    resolve(this);
                }
            })
        })
    }

async function dbAll(sql, params = []){
        return new Promise((resolve, reject) =>{
            db.all(sql, params, (err, row) =>{
                if (err){
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
    }

export{db, dbRun, dbAll, dbGet, initialize};