const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { isLoggedIn, requireAuth } = require("../Middleware/authmiddleware");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

router.get("/add-new", (req, res) => {
  if (!req.user) return res.redirect("/user/signin");
  return res.render("addBlog", { user: req.user });
});

// GET: Blog Detail Page
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, as: "created", attributes: ["fullname", "profileImageURL"] }
      ]
    });

    if (!blog) return res.status(404).send("Blog not found");

    const comments = await Comment.findAll({
      where: { blogId: req.params.id },
      include: [
        { model: User, as: "creator", attributes: ["fullname", "profileImageURL"] }
      ]
    });

    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (err) {
    console.error("Error loading blog:", err);
    res.status(500).send("Error loading blog page.");
  }
});

// POST: Add New Blog
router.post("/", requireAuth, upload.single("coverImage"), async (req, res) => {
  try {
    console.log(req.user);
    const { title, body } = req.body;

    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id, //
      coverImageURL: `/uploads/${req.file.filename}`,
    });

    return res.redirect(`/blog/${blog.id}`);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).send("Failed to create blog.");
  }
});


// POST: Add Comment
router.post("/comment/:blogId", requireAuth, async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id, // Will exist because requireAuth guarantees it
    });

    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).send("Comment failed.");
  }
});


module.exports = router;
