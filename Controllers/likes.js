// likes controller
import sql from "mssql";
import config from "../dbas/config.js";

const fetchlikes = async (req, res) => {
    //getting likes
    const { id } = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool
            .request()
            .input("POSTID", sql.Int, id)
            .query("SELECT USERID FROM LIKES WHERE POSTID = @POSTID");
            const likes = result.recordset;
            res.status(200).json(likes);

    }
    catch (err) {
        res.status(500).send(err.message);
    }
    finally {
        sql.close();
    }


};

const addlike = async (req, res) => {
    //Adding a like to the post of the user
    const {USERID,POSTID}=req.body;
    const pool=await sql.connect(config.js);
    await pool.connect()
    input()
};
const deletelike = async (req, res) => {};
export { fetchlikes, addlike, deletelike, };