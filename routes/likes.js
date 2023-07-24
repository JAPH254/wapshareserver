import {fetchlikes,addlike,deletelike} from "../controllers/likes.js";
//likes routes
const Likesroutes = (app)=>{
    app.route("/likes")
    .get(fetchlikes)
    .post(addlike);
    app.route("/likes/:id")
    .delete(deletelike);
};
export default Likesroutes;