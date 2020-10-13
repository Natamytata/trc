const express=require("express");
const app=express();
app.use(express.static("public"));
app.get("/",(request,response)=>{
    response.send("Hello Loha")
})
app.listen(3001, () => console.log('App listening on port 3001.'))
