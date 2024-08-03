const db = require('../models');
const Post = db.posts;
const User = db.users;

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'author' }]
    });
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id, {
      include: [
        { model: User, as: 'author' },
        { model: db.comments, as: 'comments' }
      ]
    });
    if (!post) return res.status(404).send({ message: "Post not found" });
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await Post.create({ title, content, authorId });
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const [updated] = await Post.update({ title, content }, { where: { id } });
    if (updated) {
      const updatedPost = await Post.findByPk(id);
      res.status(200).send(updatedPost);
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Post.destroy({ where: { id } });
    if (deleted) {
      res.status(200).send({ message: "Post deleted successfully" });
    } else {
      res.status(404).send({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
