const knex = require("../db/connection");
/*
async function update(updatedReview) {
    const { review_id, ...reviewData } = updatedReview;

    await knex("reviews")
        .where({ review_id })
        .update(reviewData);

   
}
*/

function destroy(review_id) {
    return knex("reviews")
    .where({review_id}).del()
}

module.exports = {
    update,
    destroy
};
