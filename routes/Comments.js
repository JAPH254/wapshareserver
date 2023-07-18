import {fetchcomments,addcomment,deletecomment,updatecomment,fetchcomment} from "../controllers/Comments.js";
//comments routes
const Commentsroutes = (app)=>{
    app.route ("/comments")
    .get(fetchcomments)
    .post(addcomment);
    app.route("/comments/:id")
    .delete(deletecomment);
    .put(updatecomment);
    .get(fetchcomment);
    
};
export default Commentsroutes;
