import {fetchusers,adduser,deleteuser,updateuser,fetchuser} from './../Controllers/Users.js'
//user routes
const Usersroutes = (app)=>{
    app.route("/users")
    .get(fetchusers)
    .post(adduser);
    app.route("/users/:id")
    .delete(deleteuser)
    .put(updateuser)
    .get(fetchuser);
    
}
export default Usersroutes;