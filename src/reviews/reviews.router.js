const router = require("express").Router();
const controller = require("./reviews.controller")

router.route("/:reviewId")
  .put(controller.update)
  .delete(controller.destroy)

module.exports = router