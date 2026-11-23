const Article = require("../models/article");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const {
  ARTICLE_NOT_FOUND_MESSAGE,
  FORBIDDEN_DELETE_MESSAGE,
  INVALID_ID_MESSAGE,
} = require("../utils/constants");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      const { owner, ...articleData } = article.toObject();
      res.status(201).send(articleData);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .select("+owner")
    .orFail(() => new NotFoundError(ARTICLE_NOT_FOUND_MESSAGE))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MESSAGE);
      }
      return article.deleteOne().then(() => res.send({ _id: article._id }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError(INVALID_ID_MESSAGE));
      }
      return next(err);
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
