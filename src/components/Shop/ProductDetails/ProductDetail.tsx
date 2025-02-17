import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { ShoppingCart, Star, Truck, ArrowLeft } from "lucide-react";
import { GiWeightCrush } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import toast from "react-hot-toast";

import { Product, ReviewsData } from "../../../types";
import { useProductHook } from "../hooks/productHook";
import ReviewModal from "../../Modals/ReviewModal";

export default function ProductDetail() {
  const navigate = useNavigate();
  const {
    getProductById,
    getFeaturedProducts,
    postReview,
    getReviews,
    addToFavourite,
    addToCart,
  } = useProductHook();

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [prductByIdData, setPrductByIdData] = useState<Product | null>(null);

  const [activeTab, setActiveTab] = useState("description");

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewsData, setReviewsData] = useState<ReviewsData>([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      getProductById(id, setPrductByIdData);
      getFeaturedProducts(id, setFeaturedProducts);
    }
  }, [id]);

  const handleAddToCart = (quantity: number, productId: number) => {
    addToCart(quantity, productId);
    toast.success(`Item Added to cart`);
  };

  const handleReviewTabClick = (productId: number | undefined) => {
    if (productId !== undefined) {
      getReviews(productId, setReviewsData);
      setActiveTab("reviews");
    } else {
      console.error("Invalid product ID in handleReviewTabClick.");
    }
  };

  const handleReviewSubmit = (rating: number, reviewText: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to post a review.");
      navigate("/login");
      return;
    }
    const productId = id ? Number(id) : undefined;
    if (!productId) {
      toast.error("Invalid or missing Product ID.");
      return;
    }

    postReview(productId, rating, reviewText);
    toast.success("Review submitted successfully!");
  };

  const handleAddToFavourite = (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add to favourites.");
      navigate("/login");
      return;
    }
    addToFavourite(productId);
    navigator.clipboard.writeText(window.location.href);
    toast.success("Product added to favourites!");
  };

  const openReviewModal = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to post a review.");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };
  const closeReviewModal = () => {
    setIsModalOpen(false);
  };

  // Safely extract colors and images
  const colors = prductByIdData?.colors || [];
  const selectedColor = colors[selectedColorIndex] || null;
  let selectedColorImages: string[] = [];

  if (selectedColor?.image) {
    if (typeof selectedColor.image === "string") {
      selectedColorImages = selectedColor.image.split(",");
    } else if (Array.isArray(selectedColor.image)) {
      selectedColorImages = selectedColor.image;
    }
  }

  const mainImage =
    selectedColorImages.length > 0
      ? selectedColorImages[selectedImageIndex]
      : prductByIdData?.image;

  return (
    <div
      // Option 1: use a very wide container out of the box:
      // className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-10 py-10"
      // Option 2: define a custom width (max-w-8xl) in your tailwind.config.js
      // and then use it here:
      className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-10 py-10"
    >
      <Link
        to="/shop"
        className="inline-flex items-center text-[#792099] hover:text-[#792099] mb-6 transition duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Shop
      </Link>

      {/* 
        Larger gap: use something like lg:gap-16 
        for more spacing between main content & sidebar.
      */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-16">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-3">
          {/* 2-column layout for images & product info */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
            {/* Product Images Section */}
            <div className="mb-10 lg:mb-0">
              <div className="relative w-full h-[550px] overflow-hidden bg-gray-100 rounded-lg">
                <img
                  src={mainImage}
                  alt={prductByIdData?.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    object-center
                    transition-transform
                    duration-300
                    ease-in-out
                    transform
                    hover:scale-110
                  "
                />
              </div>

              {selectedColorImages.length > 1 && (
                <div className="mt-6 grid grid-cols-4 gap-4">
                  {selectedColorImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden p-2 text-center ${
                        selectedImageIndex === idx
                          ? "ring-2 ring-blue-500"
                          : "ring-1 ring-gray-200"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Color image ${idx}`}
                        className="w-full h-24 object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Tabs for description, additional info, reviews */}
              <div className="mt-12">
                <div className="flex border-b">
                  <button
                    className={`px-4 py-2 font-medium transition duration-200 ${
                      activeTab === "description"
                        ? "border-b-2 border-[#792099] text-[#792099]"
                        : "text-gray-600 hover:text-[#792099]"
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Short Description
                  </button>

                  <button
                    className={`px-4 py-2 font-medium transition duration-200 ${
                      activeTab === "additional"
                        ? "border-b-2 border-[#792099] text-[#792099]"
                        : "text-gray-600 hover:text-[#792099]"
                    }`}
                    onClick={() => setActiveTab("additional")}
                  >
                    Long Description
                  </button>

                  <button
                    className={`px-4 py-2 font-medium transition duration-200 ${
                      activeTab === "reviews"
                        ? "border-b-2 border-[#792099] text-[#792099]"
                        : "text-gray-600 hover:text-[#792099]"
                    }`}
                    onClick={() => {
                      setActiveTab("reviews");
                      const productId = id ? Number(id) : undefined;
                      if (productId !== undefined) {
                        handleReviewTabClick(productId);
                      } else {
                        console.error("Invalid product ID.");
                      }
                    }}
                  >
                    Reviews
                  </button>
                </div>

                <div className="mt-6 text-gray-700 leading-relaxed">
                  {activeTab === "description" && (
                    <p>{prductByIdData?.shortDescription}</p>
                  )}

                  {activeTab === "additional" && (
                    <div>
                      <p className="text-justify">
                        {showFullDescription
                          ? prductByIdData?.description
                          : prductByIdData?.description &&
                            prductByIdData.description.length > 300
                          ? prductByIdData.description.substring(0, 300) + "..."
                          : prductByIdData?.description}
                      </p>
                      {prductByIdData?.description &&
                        prductByIdData.description.length > 300 && (
                          <button
                            onClick={() =>
                              setShowFullDescription(!showFullDescription)
                            }
                            className="mt-3 text-blue-600 underline"
                          >
                            {showFullDescription ? "Read Less" : "Read More"}
                          </button>
                        )}
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      {reviewsData.length === 0 ? (
                        <p>No reviews yet.</p>
                      ) : (
                        reviewsData.map((review) => (
                          <div key={review.id} className="mb-6">
                            <div className="flex items-center space-x-2">
                              <h1 className="font-semibold text-lg">
                                {review.user.firstName} {review.user.lastName}
                              </h1>
                            </div>

                            <div className="mt-2 flex items-center">
                              <span className="font-medium mr-2">Rating:</span>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`${
                                      review.rating >= star
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  >
                                    {review.rating >= star ? "★" : "☆"}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <p className="mt-1">Review: {review.review}</p>
                            <p className="mt-1 text-sm text-gray-500">
                              Reviewed on:{" "}
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:pl-8 mt-10 lg:mt-0">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {prductByIdData?.name}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.floor(prductByIdData?.rating || 0)
                            ? "text-[#792099]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {prductByIdData?.rating
                      ? Number(prductByIdData.rating).toFixed(1)
                      : "No Rating"}{" "}
                    ({prductByIdData?.reviews ?? 0} reviews)
                  </span>
                </div>

                <div className="text-sm font-semibold mb-2">
                  {prductByIdData?.remainingProduct === 0 ? (
                    <span className="text-red-500">Out of Stock</span>
                  ) : (
                    <span className="text-green-600">In Stock</span>
                  )}
                </div>

                <p className="text-3xl font-bold text-gray-900 mb-4">
                  {prductByIdData?.currency}{" "}
                  {parseFloat(prductByIdData?.price?.toString() || "0").toFixed(
                    2
                  )}
                </p>

                {/* Discount Tiers */}
                <div className="mb-5 grid grid-cols-2 gap-y-2">
                  {prductByIdData?.discountTiers?.some(
                    (tier) => tier.range !== "No discount"
                  ) ? (
                    <div className="space-y-1 text-gray-700">
                      {prductByIdData?.discountTiers
                        ?.filter((tier) => tier.range !== "No discount")
                        .map((tier, index) => (
                          <div
                            key={index}
                            className="flex justify-between w-full"
                          >
                            <span className="whitespace-nowrap">
                              {tier.range} pieces:
                            </span>
                            <span className="font-bold">
                              {prductByIdData?.currency}{" "}
                              {parseFloat(tier.discountedPrice)}%
                            </span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No discount available</p>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Truck className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      {Array.isArray(prductByIdData?.deliveryCharges)
                        ? prductByIdData.deliveryCharges.length > 0
                          ? prductByIdData.deliveryCharges
                              .map((charge) => {
                                const city = charge?.destinationCity?.name
                                  ? charge.destinationCity.name
                                  : "Lahore";
                                const amount =
                                  Number(charge?.deliveryCharge) || 0;
                                return `${city}: ${
                                  amount > 0 ? `PKR${amount}` : "Free"
                                }`;
                              })
                              .join(", ")
                          : "No shipping data available"
                        : "Lahore: Free"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <RxDimensions className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      Dimension:{" "}
                      {prductByIdData?.dimension
                        ? (() => {
                            try {
                              const parsed = JSON.parse(
                                prductByIdData.dimension
                              );
                              if (Array.isArray(parsed)) {
                                return parsed.join(", ");
                              } else if (typeof parsed === "string") {
                                return parsed;
                              }
                            } catch (error) {
                              return prductByIdData.dimension;
                            }
                          })()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <GiWeightCrush className="h-5 w-5 mr-2 text-gray-500" />
                    <span>
                      Weight {prductByIdData?.weight}
                      {prductByIdData?.unit}
                    </span>
                  </div>
                </div>
              </div>

              {colors.length > 0 && (
                <div className="mt-6 flex space-x-4 text-2xl">
                  {colors.map((color, colorIdx) => {
                    const buttonColor = color.color ?? "#fff";
                    return (
                      <button
                        key={color.id}
                        className={`w-12 h-12 rounded-full ring-1 ring-gray-300 cursor-pointer transition duration-200 ${
                          selectedColorIndex === colorIdx
                            ? "ring-2 ring-[#792099]"
                            : ""
                        }`}
                        style={{ backgroundColor: buttonColor }}
                        onClick={() => {
                          setSelectedColorIndex(colorIdx);
                          setSelectedImageIndex(0);
                        }}
                      />
                    );
                  })}
                </div>
              )}

              <div className="mb-8 mt-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-[6px] bg-gray-200 border border-gray-300 rounded-md text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 mb-10">
                <button
                  onClick={() =>
                    handleAddToCart(quantity, Number(prductByIdData?.id) || 0)
                  }
                  className="cursor-pointer flex-1 bg-[#792099] text-white font-semibold shadow-md px-6 py-3 rounded-md hover:bg-[#792099] flex items-center justify-center transition duration-200"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>

                <button
                  onClick={openReviewModal}
                  className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <Star className="h-5 w-5 text-[#792099]" />
                  <span>Add Review</span>
                </button>

                <button
                  onClick={() =>
                    handleAddToFavourite(Number(prductByIdData?.id) || 0)
                  }
                  className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <MdFavoriteBorder className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURED PRODUCTS SIDEBAR */}
        <aside className="lg:col-span-1 mt-10 lg:mt-0">
          <h2 className="text-xl font-semibold mb-5">Featured Products</h2>
          {featuredProducts?.length === 0 ? (
            <p className="text-gray-600">No featured products available</p>
          ) : (
            <div className="space-y-6">
              {featuredProducts?.map((product, index) => (
                <div
                  key={product.similarProductId[0] || index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={
                      product.colors &&
                      product.colors[0] &&
                      product.colors[0].image
                        ? typeof product.colors[0].image === "string"
                          ? product.colors[0].image.split(",")[0]
                          : Array.isArray(product.colors[0].image)
                          ? product.colors[0].image[0]
                          : "https://via.placeholder.com/300"
                        : "https://via.placeholder.com/300"
                    }
                    alt={product.name || "Product"}
                    className="w-full h-36 object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-md rounded-xl"
                  />
                  <div className="mt-3">
                    <h3 className="text-md font-semibold leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {product.description || "No description available"}
                    </p>
                    <div className="mt-2 text-sm font-semibold">
                      {product.currency}
                      {product.price}
                    </div>
                    <div className="mt-3">
                      <Link to={`/product/${product.similarProductId}`}>
                        <button className="bg-[#792099] text-white w-full font-semibold shadow-md px-4 py-2 rounded-md hover:bg-[#792099] transition duration-200 cursor-pointer">
                          View Product
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* REVIEW MODAL */}
      <ReviewModal
        isOpen={isModalOpen}
        closeModal={closeReviewModal}
        handleReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
}
