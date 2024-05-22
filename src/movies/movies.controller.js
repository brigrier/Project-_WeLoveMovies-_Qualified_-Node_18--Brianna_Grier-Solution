const service = require("./movies.service");

// GET MOVIES
async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

async function listShowing(req, res) {
    const data = await service.listShowing();
    res.json({ data });
}

// READ
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

// READ W THEATERS
async function readWithTheaters(req, res, next) {
    const { movieId } = req.params;
    const data = await service.readWithTheaters(movieId);
    if (data.length > 0) {
        res.json({ data });
    } else {
        next({ status: 404, message: "Movie not found" });
    }
}

// READ W REVIEWS
async function readWithReviews(req, res, next) {
    const { movieId } = req.params;
    const data = await service.readWithReviews(movieId);
    if (data.length > 0) {
        res.json({ data });
    } else {
        next({ status: 404, message: "Movie not found" });
    }
}

module.exports = {
    list,
    listShowing,
    read: [movieExists, read],
    readWithTheaters,
    readWithReviews,
};
