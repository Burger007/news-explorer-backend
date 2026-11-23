const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./articles");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const { validateSignup, validateSignin } = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");
const { ROUTE_NOT_FOUND_MESSAGE } = require("../utils/constants");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use(auth);

router.use("/users", userRouter);
router.use("/articles", articleRouter);

router.use((req, res, next) => {
  next(new NotFoundError(ROUTE_NOT_FOUND_MESSAGE));
});

module.exports = router;
