import config from "../dbas/config.js";
import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register controller
export const register = async (req, res) => {
    const {USERNAME,USER_PASSWORD,EMAIL,FULL_NAME} = req.body;
    let hashedPassword =bcrypt.hashSync(USER_PASSWORD,10);
    try {
        const pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input("USERNAME",sql.VarChar,USERNAME)
        .input("USER_PASSWORD",sql.VarChar,hashedPassword)
        .query("SELECT * FROM USERS WHERE USERNAME=@USERNAME OR USER_PASSWORD=@USER_PASSWORD");
        const user = result.recordset[0];
        if(user){
            res.status(409).json({message:"This person already exists"});
        }
        else{
            const result = await pool.request()
            .input("USERNAME",sql.VarChar,USERNAME)
            .input("USER_PASSWORD",sql.VarChar,hashedPassword)
            .input("EMAIL",sql.VarChar,EMAIL)
            .input("FULL_NAME",sql.VarChar,FULL_NAME)
            .query("INSERT INTO USERS(USERNAME,USER_PASSWORD,EMAIL,FULL_NAME) VALUES(@USERNAME,@USER_PASSWORD,@EMAIL,@FULL_NAME)");
           
            res.status(200).json({message:"registration successful"});
        }
    } catch (error) {
        res.status(500).json({error:"error while registering the user"});
    }
    finally{
        sql.close();
    }
};