import config from "../dbas/config.js";
import moment from "moment";
import sql from "mssql";
//fetch stories
export const fetchstories = async (req, res) => {
    const {STORYID,STORY_IMAGE,USERID}=req.body;
    const DATE_POSTED=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    try {
        const pool = await sql.connect(config.sql);
        await pool
        .request()
        .input("STORYID", sql.Int, STORYID)
        .input("DATE_POSTED", sql.VarChar, DATE_POSTED)
        .input("STORY_IMAGE", sql.VarChar, STORY_IMAGE)
        .input("USERID", sql.Int, USERID)
        .query(
            "INSERT INTO STORIES (STORYID,DATE_POSTED,STORY_IMAGE,USERID) VALUES (@STORYID,@DATE_POSTED,@STORY_IMAGE,@USERID)"
        );
        res.status(200).json({ message: "story added successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "error while adding the story" });
    }
    finally {
        sql.close();
    }
};
//delete story
export const deletestory = async (req, res) => {
    const {STORY_IMAGE,USERID,} = req.body;
    const DATE_POSTED=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    try {
        const pool = await sql.connect(config.sql);
        await pool
        .request()
        .input("STORY_IMAGE", sql.VarChar, STORY_IMAGE)
        .input("DATE_POSTED", sql.VarChar, DATE_POSTED)
        .input("USERID", sql.Int, USERID)
        .query("SELECT * FROM STORIES WHERE STORY_IMAGE=@STORY_IMAGE AND DATE_POSTED=@DATE_POSTED AND USERID=@USERID");
        const story = result.recordset[0];
        if (!story) {
            res.status(404).json({ error: "No stories" });
        }
        else {
            const result = await pool
            .request()
            .input("STORY_IMAGE", sql.VarChar, STORY_IMAGE)
            .input("DATE_POSTED", sql.VarChar, DATE_POSTED)
            .input("USERID", sql.Int, USERID)
            .query("DELETE FROM STORIES WHERE STORY_IMAGE=@STORY_IMAGE AND DATE_POSTED=@DATE_POSTED AND USERID=@USERID");
            res.status(200).json({ message: "story deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: "error while deleting the story" });
    }
    finally {
        sql.close();
    }
};
//add story
export const addstory = async (req, res) => {
    const {STORY_IMAGE,USERID}=req.body;
    const DATE_POSTED=moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    try {
        const pool = await sql.connect(config.sql);
        const result = await pool
        .request()
        .input("STORY_IMAGE", sql.VarChar, STORY_IMAGE)
        .input("DATE_POSTED", sql.VarChar, DATE_POSTED)
        .input("USERID", sql.Int, USERID)
        .query(
            "INSERT INTO STORIES (STORY_IMAGE,DATE_POSTED,USERID) VALUES (@STORY_IMAGE,@DATE_POSTED,@USERID)"
        );
        res.status(200).json({ message: "story added successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "error while adding the story" });
    }
    finally {
        sql.close();
    }
};
