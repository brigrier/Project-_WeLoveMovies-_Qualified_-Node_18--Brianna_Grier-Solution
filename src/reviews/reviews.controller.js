const service = require("./reviews.service");

// UPDATE
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.update(updatedReview);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404 });
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: reviewId,
  };
  
  const data = await service.update(updatedReview);

  res.json({ data });
}

// DELETE
async function destroy(req, res, next) {
  try {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
  } catch (error) {
    next({ status: 500, message: "Failed to delete review" });
  }
}

module.exports = {
  update: [reviewExists, update],
  destroy: [reviewExists, destroy],
};
