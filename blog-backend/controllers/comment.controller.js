const db = require('../models');
const Comment = db.comments;
const Post = db.posts;

exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const comment = await Comment.create({ postId, content });
    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
