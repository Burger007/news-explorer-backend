# News Explorer — Back End

REST API for the News Explorer app: user registration and login with JWT,
and saving / deleting news articles for each user.

**API:** https://api.newsexplorer.coreytech.com

## Tech
Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, celebrate/Joi validation,
winston logging, helmet, express-rate-limit, pm2 + nginx on Google Cloud.

## Routes
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /signup | – | Create a user (email, password, name) |
| POST | /signin | – | Log in, returns a JWT |
| GET | /users/me | ✔ | Current user's email and name |
| GET | /articles | ✔ | Articles saved by the user |
| POST | /articles | ✔ | Save an article |
| DELETE | /articles/:articleId | ✔ | Delete your own saved article |

## Run locally
npm install
npm run dev   # http://localhost:3000 (hot reload)
npm run start # production mode
