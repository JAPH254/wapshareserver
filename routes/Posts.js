import {addpost,fetchposts,deletepost,fetchpost} from "../controllers/Posts.js";
//posts routes
const Postsroutes = (app)=>{
    app.route("/posts")
    .get(fetchposts)
    .post(addpost);
    app.route("/posts/:id")
    .delete(deletepost)
    .get(fetchpost);
    
}
export default Postsroutes;