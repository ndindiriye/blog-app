


const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new this.sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.model.js')(sequelize, Sequelize);
db.posts = require('../models/post.model.js')(sequelize, Sequelize);
db.comments = require('../models/comment.model.js')(sequelize, Sequelize);

db.users.hasMany(db.posts, { as: 'posts' });
db.posts.belongsTo(db.users, {
  foreignKey: 'authorId',
  as: 'author'
});

db.posts.hasMany(db.comments, { as: 'comments' });
db.comments.belongsTo(db.posts, {
  foreignKey: 'postId',
  as: 'post'
});

module.exports = db;
