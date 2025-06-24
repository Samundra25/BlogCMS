const express = require("express"); //requiring express package
const { blogs } = require("./model/index");
// const { where } = require("sequelize");
const app = express(); //storing it in app, app variable throughout project ma use garxam
// require("./model/index");
// const db = require("./model");
// const Blog = db.blogs;
const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1719091873.jpg
  },
});
app.use("/uploads", express.static("public/uploads"));

const upload = multer({ storage: storage });

app.set("view engine", "ejs"); // ejs use gardai xu, k k env set chaiyeko xa gardey vaney ko

//form bata data aairako xa  teslai parse or handle gaar  vaneko
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  //   res.send("Hello welcome to Sky");

  // const allBlogs = await blogs.findAll();
  // console.log(allBlogs);
  const allBlogs = await blogs.findAll();

  //allBlogs.length=6
  // console.log(allBlogs);

  res.render("blogs", { blogs: allBlogs });
  // res.render("blogs", { blogs: allBlogs });
});

//createBlog
app.get("/createBlog", (req, res) => {
  res.render("createBlog");
});

//postBlog
app.post("/createBlog", upload.single("image"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.title);
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const description = req.body.content;
  const image = req.file ? req.file.filename : null;

  //database ma halna lai
  // await Blog.create({
  //   title: title,
  //   subtitle: subTitle,
  //   description: description,
  // });
  // const { title, subtitle, content } = req.body;
  // console.log(title, subTitle, description);

  await blogs.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: image,
  });

  // res.send("Form submitted successfully");
  res.redirect("/");
});

//single blog page
app.get("/single/:id", async (req, res) => {
  // res.render("singleBlog");
  // console.log(req.params.id);

  const id = req.params.id;
  const blog = await blogs.findAll({
    where: {
      id: id,
    },
  });

  // console.log(blog);
  //second approach
  // const blog = await blogs.findByPk(id);
  // res.render("singleBlog");
  res.render("singleBlog", { blog: blog });
});
//deletw page
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  blogs.destroy({
    where: {
      id: id,
    },
  });
  // res.send ("From delete page");
  res.redirect("/");
});

//edit blog
app.get("/edit/:id", async (req, res) => {
  // console.log(req.params.id);
  // res.render("editBlog");

  const id = req.params.id;
  const blog = await blogs.findAll({
    where: {
      id: id,
    },
  });
  res.render("editBlog", { blog: blog });
});
app.post("/editBlog/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const description = req.body.content;

  await blogs.update(
    {
      title: title,
      subtitle: subtitle,
      description: description,
    },
    {
      where: {
        id: id,
      },
    }
  );
  res.redirect("/single/" + id);
});

app.listen(3000, function () {
  console.log("NodeJS has started on port 3000");
});
