const knex = require("../db/connection");

// GET MOVIES
function list() {
  return knex("movies").select("*");
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
    .distinct();
}

// READ MOVIES
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

// Read with theaters
function readWithTheaters(movieId) {
  return knex("movies_theaters as mt")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("mt.*", "t.*")
    .where({ "mt.movie_id": movieId })
    .where({ "mt.is_showing": true });
}

// Read with reviews
async function readWithReviews(movieId) {
  const reviews = await knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.movie_id",
      "c.critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name"
    )
    .where({ "r.movie_id": movieId });

  return reviews.map((review) => ({
    review_id: review.review_id,
    content: review.content,
    score: review.score,
    created_at: review.created_at,
    updated_at: review.updated_at,
    movie_id: review.movie_id,
    critic: {
      critic_id: review.critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
    },
  }));
}

module.exports = {
  list,
  listShowing,
  read,
  readWithTheaters,
  readWithReviews,
};
