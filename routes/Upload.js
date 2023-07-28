//image upload routes



const UploadRoute=(app)=>{
    app.post("/upload", (req,res)=>{
        res.send("image uploaded");
    });
}
export default UploadRoute