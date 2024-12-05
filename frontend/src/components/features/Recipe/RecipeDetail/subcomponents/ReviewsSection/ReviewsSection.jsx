import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ReviewsSection.css';

const ReviewsSection = ({
  reviews,
  rating,
  comment,
  handleRatingSubmit,
  setRating,
  setComment,
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const handleStarClick = (star) => {
    setRating(star);
  };

  const onSubmit = (e) => {
    e.preventDefault(); // Ensure form submission does not reload the page
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide a rating and a comment!');
      return;
    }
    handleRatingSubmit();
  };

  return (
    <div className="recipe-reviews">
      <h2>Rate and Review</h2>
      <div className="review-summary">
        <p>
          <strong>Average Rating:</strong> {averageRating} / 5 (
          {reviews.length} Reviews)
        </p>
      </div>
      <form className="review-form" onSubmit={handleRatingSubmit}>
        <div className="star-rating">
          <label>Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hoveredStar || rating) ? 'active' : ''
                }`}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => handleStarClick(star)}
                role="button"
                aria-label={`${star} star`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
        />
        <button type="submit">Submit Review</button>
      </form>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <p>
                <strong>Rating:</strong>{' '}
                {'★'.repeat(review.rating).padEnd(5, '☆')}
              </p>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
        {reviews.length === 0 && (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
};

ReviewsSection.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  handleRatingSubmit: PropTypes.func.isRequired,
  setRating: PropTypes.func.isRequired,
  setComment: PropTypes.func.isRequired,
};

export default ReviewsSection;
