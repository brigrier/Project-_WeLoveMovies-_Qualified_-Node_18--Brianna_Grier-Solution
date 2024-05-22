const knex = require("../db/connection")

//GET MOVIES
function list() {
    return knex("movies").select("*")
}

function listShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true})
}

module.exports = {
    list,
    listShowing,
}