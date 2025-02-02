import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
import { Star } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleReviewSubmit: (rating: number, reviewText: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  closeModal,
  handleReviewSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (rating && reviewText) {
      handleReviewSubmit(rating, reviewText);
      closeModal();
    } else {
      alert("Please provide both a rating and a review text.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-6 w-6 cursor-pointer ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(index)}
              />
            ))}
          </div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Write your review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
