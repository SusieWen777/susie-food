import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function RatingStars({ rating = 5, color = "#ffc107", size = "12px" }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return (
    <div>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} color={color} size={size} />
      ))}
      {halfStar ? <FaStarHalfAlt color={color} size={size} /> : null}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} color={color} size={size} />
      ))}
    </div>
  );
}

export default RatingStars;
