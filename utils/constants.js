const INTERNAL_SERVER_ERROR = 500;

const SERVER_ERROR_MESSAGE = "An error has occurred on the server.";
const AUTH_REQUIRED_MESSAGE = "Authorization required";
const INVALID_CREDENTIALS_MESSAGE = "Incorrect email or password";
const EMAIL_EXISTS_MESSAGE = "A user with this email already exists";
const USER_NOT_FOUND_MESSAGE = "User not found";
const ARTICLE_NOT_FOUND_MESSAGE = "Article not found";
const FORBIDDEN_DELETE_MESSAGE = "You can only delete your own articles";
const INVALID_ID_MESSAGE = "Invalid ID";
const ROUTE_NOT_FOUND_MESSAGE = "Requested resource not found";

module.exports = {
  INTERNAL_SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  AUTH_REQUIRED_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
  EMAIL_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  ARTICLE_NOT_FOUND_MESSAGE,
  FORBIDDEN_DELETE_MESSAGE,
  INVALID_ID_MESSAGE,
  ROUTE_NOT_FOUND_MESSAGE,
};
