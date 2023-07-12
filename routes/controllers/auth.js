//authentication Routes
import {register, login} from '../controllers/auth.js';
//auth routes
const Routes = (app) => {
    app.post('/auth/register', register);
    app.post('/auth/login', login);
}
export default Routes;