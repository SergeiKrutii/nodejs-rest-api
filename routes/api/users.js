const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/users/index");
const { schemas } = require("../../models/users");
const { validateBody, isValidToken } = require("../../middlewares");

router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", isValidToken, ctrl.logout);
router.get("/current", isValidToken, ctrl.getCurrentUser);
router.patch("/", isValidToken, ctrl.userSubscription);

module.exports = router;
