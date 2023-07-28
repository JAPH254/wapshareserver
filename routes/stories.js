//stories routes
import {fetchstories,deletestory,addstory} from "../Controllers/stories.js";


const Storiesroutes = (app)=>{
    app.route("/stories")
    .get(fetchstories)
    .post(addstory);
    app.route("/stories/:id")
    .delete(deletestory)
};
export default Storiesroutes;