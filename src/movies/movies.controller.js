const service = require("./movies.service");

//GET MOVIES
async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}
async function listShowing(req, res) {
  const data = await service.listShowing();
  res.json({ data });
}

//READ
async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    } else {
        next({ status: 404, message: "Movie not found" });
    }
}

async function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data });
}

module.exports = {
  list,
  listShowing,
  read: [movieExists, read],
};