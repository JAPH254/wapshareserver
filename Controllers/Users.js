//users controllers
import sql from "mssql";
import config from "../dbas/config.js";

//add user
export const adduser = async (req, res) => {
  // const {USERNAME}=req.body;
  // try {
  //     const pool = await sql.connect(config.sql);
  //     const result = await pool.request()
  //     .input('USERNAME',sql.VarChar,USERNAME)
  //     .query('SELECT * FROM USERS WHERE USERNAME=@USERNAME');
  //     const user = result.recordset[0];
  //     if (user) {
  //         res.status(200) .json({message:'following'});
  //       }
  //         else{
  //             res.status(404).json({message:'Search not found'});
  //         }
  //     } catch (error) {
  //         res.status(500).json({error:'error. Please try again later'});
  //     } finally {
  //         sql.close();
  //     }
};

export const fetchuser = async (req, res) => {};
export const fetchusers = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM USERS");
    const user = result.recordset;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "error. Please try again later" });
  } finally {
    sql.close();
  }
};
export const deleteuser = async (req, res) => {
    const { id } = req.params;
    //checking whether the user with the supplied id exists in the database
    const pool = await sql.connect(config.sql);
    const result = await pool
        .request()
        .input("USERID", sql.Int, id)
        .query("SELECT * FROM USERS WHERE USERID=@USERID");
    const user = result.recordset[0];
    if (!user) {
        res.status(404).json({ message: "User not found" });
    }
    else {
        try {
            const pool = await sql.connect(config.sql);
            const result = await pool
                .request()
                .input("USERID", sql.Int, id)
                .query("DELETE FROM USERS WHERE USERID=@USERID");
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "error. Please try again later" });
        } finally {
            sql.close();
        }
    }
};
export const updateuser = async (req, res) => {
  //updating the user information in the database
  const { id } = req.params;
  const {
    USERNAME,
    EMAIL,
    FULL_NAME,
    PHONE_NUMBER,
    WEBSITE,
    PROFILE_PIC,
    COVER_PIC,
    COUNTRY,
  } = req.body;
  const pool = await sql.connect(config.sql);
  const result = await pool
    .request()
    //checking whether the user with the supplied id exists in the database
    .input("USERID", sql.Int, id)
    .query("SELECT * FROM USERS WHERE USERID=@USERID");
  const user = result.recordset[0];
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    try {
      const pool = await sql.connect(config.sql);
      const result = await pool
        .request()
        .input("USERID", sql.Int, id)
        .input("USERNAME", sql.VarChar, USERNAME)
        .input("EMAIL", sql.VarChar, EMAIL)
        .input("FULL_NAME", sql.VarChar, FULL_NAME)
        .input("PHONE_NUMBER", sql.VarChar, PHONE_NUMBER)
        .input("WEBSITE", sql.VarChar, WEBSITE)
        .input("PROFILE_PIC", sql.VarChar, PROFILE_PIC)
        .input("COVER_PIC", sql.VarChar, COVER_PIC)
        .input("COUNTRY", sql.VarChar, COUNTRY)
        .query(
          "UPDATE USERS SET USERNAME=@USERNAME,EMAIL=@EMAIL,FULL_NAME=@FULL_NAME,PHONE_NUMBER=@PHONE_NUMBER,WEBSITE=@WEBSITE,PROFILE_PIC=@PROFILE_PIC,COVER_PIC=@COVER_PIC,COUNTRY=@COUNTRY WHERE USERID=@USERID"
        );
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "error. Please try again" });
    } finally {
      sql.close();
    }
  }
};
