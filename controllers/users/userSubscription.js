const { HttpError } = require("../../helpers/httpError");
const { User } = require("../../models");

const userSubscription = async (req, res, next) => {
  const { subscription } = req.query;
  const { _id } = req.user;
  if (!subscription) {
    throw HttpError(400);
  }

  if (!_id) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(_id, { subscription });

  res.status(200).json({
    message: "Subscription updated",
  });
};

module.exports = userSubscription;
