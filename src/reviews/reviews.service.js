const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//READ FOR PUT USAGE
function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

//UPDATE
function update(updatedReviews) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReviews.review_id })
    .update(updatedReviews, "*");
}

function addCritics(criticId) {
  return knex("critics").where({ "critics.critic_id": criticId }).first();
}

//DELETE
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  destroy,
  update,
  addCritics,
};
