//authentication routes
import {register} from "../controllers/auth.js";


//register and login routes
const Authroutes = (app)=>{
    app.route("/auth/register")
    .post(register);
    app.route("/auth/login")
    // .post(login);
}
export default Authroutes;