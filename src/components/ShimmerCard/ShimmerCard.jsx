
import './ShimmerCard.css';

const ShimmerCard = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-thumbnail shimmer-animate"></div>
      <div className="shimmer-title shimmer-animate"></div>
      <div className="shimmer-channel shimmer-animate"></div>
      <div className="shimmer-meta shimmer-animate"></div>
    </div>
  );
};

export default ShimmerCard;
