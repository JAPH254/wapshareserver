import {fetchlikes,addlike,deletelike,updatelike,fetchlike} from "../controllers/likes.js";
//likes routes
const Likesroutes = (app)=>{
    app.route("/likes")
    .get(fetchlikes)
    .post(addlike);
    app.route("/likes/:id")
    .delete(deletelike);
    .put(updatelike);
    .get(fetchlike);
    
};
export default Likesroutes;