import {addcomment, deletecomment, fetchcomments} from "../controllers/Comments.js";
//comments routes
const Commentsroutes = (app)=>{
    app.route ("/comments")
    .get(fetchcomments)
    .post(addcomment);
    app.route("/comments/:id")
    .delete(deletecomment);
    
};
export default Commentsroutes;
