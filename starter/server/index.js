require("dotenv").config();
const { sequelize } = require("./util/database");

const express = require("express");
const cors = require("cors");

const { PORT } = process.env;
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./models/posts");
const { register, login } = require("./controller/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const { sequelize } = require("sequelize/types");

const { User } = require("./models/user");
const { Post } = require("./controller/posts");

User.hasMany(Post);
Post.belongsTo(User);

const app = express();

app.use(express.json());
app.use(cors());

app.post("./register", register);
app.post("./login", login);
// app.post('./logout', logout)

app.get("./posts", getAllPosts);

app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => console.log(err));
