import config from "../dbas/config.js";
import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register controller
export const register = async (req, res) => {
  const { USERNAME, USER_PASSWORD, EMAIL, FULL_NAME } = req.body;
  let hashedPassword = bcrypt.hashSync(USER_PASSWORD, 10);
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("USERNAME", sql.VarChar, USERNAME)
      .input("USER_PASSWORD", sql.VarChar, hashedPassword)
      .query(
        "SELECT * FROM USERS WHERE USERNAME=@USERNAME OR USER_PASSWORD=@USER_PASSWORD"
      );
    const user = result.recordset[0];
    if (user) {
      res.status(409).json({ message: "This person already exists" });
    } else {
      const result = await pool
        .request()
        .input("USERNAME", sql.VarChar, USERNAME)
        .input("USER_PASSWORD", sql.VarChar, hashedPassword)
        .input("EMAIL", sql.VarChar, EMAIL)
        .input("FULL_NAME", sql.VarChar, FULL_NAME)
        .query(
          "INSERT INTO USERS(USERNAME,USER_PASSWORD,EMAIL,FULL_NAME) VALUES(@USERNAME,@USER_PASSWORD,@EMAIL,@FULL_NAME)"
        );

      res.status(200).json({ message: "registration successful" });
    }
  } catch (error) {
    res.status(500).json({ error: "error while registering the user" });
  } finally {
    sql.close();
  }
};

//user logging into the system

export const login =async(req, res)=>{
    const{USERNAME,USER_PASSWORD}=req.body;
    let Usecon=await sql.connect(config.sql);
    const result =await Usecon.request()
    .input("USERNAME",sql.VarChar,USERNAME)
    .query('SELECT * FROM USERS WHERE USERNAME = @USERNAME');
    const User=result.recordset[0];
    if (!User){
        res.status(401).json({error:'Ooops..Failed to authenticate'});
    }else{
        if(!bcrypt.compareSync(USER_PASSWORD, User.USER_PASSWORD)){
            res.status(401).json({error:'Wrong credentials'})
        }else{
            const token= `JWT ${jwt.sign(
                {USERNAME:User.USERNAME}
                ,config.jwt_secret)}`;
                res.status(200).json({EMAIL:User.EMAIL,FULL_NAME:User.FULL_NAME,USERNAME:User.USERNAME,id:User.USERID,PROFILE_PIC:User.PROFILE_PIC,WEBSITE:User.WEBSITE,COVER_PIC:User.COVER_PIC,PHONE_NUMBER:User.PHONE_NUMBER, token:token});
        }
    }
};