const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  addSchema,
  updateFavoriteSchema,
} = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
