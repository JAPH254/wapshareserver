//posts controller
import sql from "mssql";
import config from "../dbas/config.js";
import moment from "moment";
 
const addpost = async (req, res) => {
  const { CONTENT, POSTIMAGE, USERID, POSTMAKER } = req.body;
  const POSTDATE = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("CONTENT", sql.VarChar, CONTENT)
      .input("POSTIMAGE", sql.VarChar, POSTIMAGE)
      .input("POSTDATE", sql.VarChar, POSTDATE)
      .input("USERID", sql.Int, USERID)
      .input("POSTMAKER", sql.VarChar, POSTMAKER)
      .query(
        "INSERT INTO POSTS (CONTENT,POSTIMAGE,POSTDATE,USERID,POSTMAKER) VALUES (@CONTENT,@POSTIMAGE,@POSTDATE,@USERID,@POSTMAKER)"
      );
    res.status(200).json({ message: "post added successfully" });
  } catch (error) {
    res.status(500).json(error.message);
    // res.status(500).json({ error: "error while adding the post" });
  } finally {
    sql.close();
  }
};

//delete post
const deletepost = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      //check whether the post exists. If it does, delete it. If it doesn't, return an error message
      .request()
      .input("POSTID", sql.Int, id)
      .query(`SELECT * FROM POSTS WHERE POSTID = ${id}`);
    const post = result.recordset[0];
    if (!post) {
      res.status(404).json({ error: "post not found" });
    } else {
      const result = await pool
        .request()
        .input("POSTID", sql.Int, id)
        .query(`DELETE FROM POSTS WHERE POSTID= ${id}`);
      res.status(200).json({ message: "post deleted successfully" });
    }
  } catch (error) {
    // res.status(500).json({ error: "error while deleting the post" });
    res.status(500).json(error);
  } finally {
    sql.close();
  }
};
//fetch posts
const fetchposts = async (req, res) => {
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query(`SELECT   
    P.CONTENT,
    P.POSTID,
    P.POSTMAKER,
    P.USERID,
    P.POSTIMAGE,
    P.POSTDATE
    FROM POSTS as P
    ORDER BY POSTID DESC`);
    const posts = result.recordset;
    if (!posts[0]) {
      res.status(404).json({ error: "No post" });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: "error while fetching the posts" });
  } finally {
    // sql.close();
  }
};
const fetchpost = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().input("POSTID", sql.Int, id)
      .query(`SELECT * FROM POSTS WHERE POSTID=${id} ORDER BY POSTDATE DESC`);
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "error while fetching the post" });
  } finally {
    sql.close();
  }
};
export { addpost, fetchposts, deletepost, fetchpost };
