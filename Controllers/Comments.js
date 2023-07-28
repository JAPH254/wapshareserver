import sql from "mssql";
import config from "../dbas/config.js";
import moment from "moment";

//comments controllers
export const addcomment = async (req, res) => {
  try {
    const { CONTENT, POSTID, USERID } = req.body;
    const DATE_CREATED = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("CONTENT", sql.Text, CONTENT)
      .input("POSTID", sql.Int, POSTID)
      .input("USERID", sql.Int, USERID)
      .input("DATE_CREATED", sql.DateTime, DATE_CREATED)
      .query(
        "INSERT INTO COMMENTS (CONTENT, POSTID, USERID, DATE_CREATED) VALUES (@CONTENT, @POSTID, @USERID, @DATE_CREATED)"
      );
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const fetchcomments = async (req, res) => {
  //fetching comments
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM COMMENTS");
    const comments = result.recordset;
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};
export const deletecomment = async (req, res) => {
  //deleting comment
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("COMMENTID", sql.Int, id)
      .query("SELECT * FROM COMMENTS WHERE COMMENTID = @COMMENTID");
    const comment = result.recordset[0];
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      const result = await pool
        .request()
        .input("COMMENTID", sql.Int, id)
        .query("DELETE FROM COMMENTS WHERE COMMENTID = @COMMENTID");
      res.status(200).json({ message: "Comment deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};
