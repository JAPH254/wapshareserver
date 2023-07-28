import multer from "multer";
import {
  addpost,
  fetchposts,
  deletepost,
  fetchpost,
} from "../controllers/Posts.js";
//upload post image as we create post
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.POSTIMAGE);
  },
});

const upload = multer({ storage: storage });
//posts routes
const Postsroutes = (app) => {
  app.route("/posts").get(fetchposts).post(upload.single("file"), addpost);
  app.route("/posts/:id").delete(deletepost).get(fetchpost);
};
export default Postsroutes;
