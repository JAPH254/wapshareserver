import sql from 'mssql';
import config from '../dbas/config.js';

//comments controllers
export const addcomment = async (req, res) => {
//     const {CONTENT} = req.body;
//     const DATE_CREATED= new Date();
// try {
//     const pool = await sql.connect(config);
//     const result = await pool.request()
//     .input('CONTENT', sql.Text, CONTENT)
//     .input('DATE_CREATED', sql.DateTime, DATE_CREATED)
//     .query('INSERT INTO COMMENTS (CONTENT, DATE_CREATED) VALUES (@CONTENT, @DATE_CREATED)');
//     //return the success message
//     res.status(200).json({message: 'Commented'});
// } catch (error) {
//     res.status(500).json({message: error.message}); 
// }
// finally {
//     sql.close();
    
// };

};
export const fetchcomment = async (req, res) => {
    //fetching comments
    const {id} = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('POSTID', sql.Int, id)
        .query('SELECT * FROM COMMENTS WHERE POSTID = @POSTID');
        const comments = result.recordset;
        res.status(200).json(comments);
    }   
    catch (error) {
        res.status(500).json({message: error.message});
    }
    finally {
        sql.close();
    }

};
export const  fetchcomments= async (req, res) => {
    //fetching comments
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .query('SELECT * FROM COMMENTS');
        const comments = result.recordset;
        res.status(200).json(comments);
    }   
    catch (error) {
        res.status(500).json({message: error.message});
    }
    finally {
        sql.close();
    }
};
export const deletecomment = async (req, res) => {
    //deleting comment
    const {id} = req.params;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('COMMENTID', sql.Int, id)
        .query('SELECT * FROM COMMENTS WHERE COMMENTID = @COMMENTID');
        const comment = result.recordset[0];
        if (!comment) {
            res.status(404).json({message: 'Comment not found'});
        }
        else {
            const result = await pool.request()
            .input('COMMENTID', sql.Int, id)
            .query('DELETE FROM COMMENTS WHERE COMMENTID = @COMMENTID');
            res.status(200).json({message: 'Comment deleted successfully'});
        }
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
    finally {
        sql.close();
    }


};
export const updatecomment = async (req, res) => {
    //updating comment
    const {id} = req.params;
    const {CONTENT} = req.body;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('COMMENTID', sql.Int, id)
        .query('SELECT * FROM COMMENTS WHERE COMMENTID = @COMMENTID');
        const comment = result.recordset[0];
        if (!comment) {
            res.status(404).json({message: 'Comment not found'});
        }
        else {
            const result = await pool.request()
            .input('COMMENTID', sql.Int, id)
            .input('CONTENT', sql.Text, CONTENT)
            .query('UPDATE COMMENTS SET CONTENT = @CONTENT WHERE COMMENTID = @COMMENTID');
            res.status(200).json({message: 'Comment updated successfully'});
        }
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
    finally {
        sql.close();
    }
};
