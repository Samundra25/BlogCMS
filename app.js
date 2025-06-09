const express = require("express"); //requiring express package
const app = express(); //storing it in app, app variable throughout project ma use garxam

app.set("view engine", "ejs"); // ejs use gardai xu, k k env set chaiyeko xa gardey vaney ko

//form bata data aairako xa  teslai parse or handle gaar  vaneko
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   res.send("Hello welcome to Sky");
  res.render("blogs");
});

//createBlog
app.get("/createBlog", (req, res) => {
  res.render("createBlog");
});

//postBlog
app.post("/createBlog", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully");
});

app.listen(3000, function () {
  console.log("NodeJS has started on port 3000");
});
