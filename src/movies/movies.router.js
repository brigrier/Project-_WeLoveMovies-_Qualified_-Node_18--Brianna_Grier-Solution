const router = require("express").Router();
const controller = require("./movies.controller")

router.route("/")
  .get(controller.list)

router.route("/?is_showing=true")
  .get(controller.listShowing)

router.route("/:movieId")  
  .get(controller.read)

module.exports = router