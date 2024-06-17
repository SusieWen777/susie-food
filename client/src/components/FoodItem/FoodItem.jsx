import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.scss";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ item }) {
  const { cartItems, addToCart, subtractFromCart } = useContext(StoreContext);

  const { _id, name, price, description, image } = item;

  return (
    <div className="food-item">
      <div className="image-container">
        <img className="food-item-img" src={image} alt="" />
        {!cartItems[_id] ? (
          <div className="create-btn-icon-wrapper">
            <IoIosAdd
              onClick={() => addToCart(_id)}
              size="28px"
              color="#676767"
            />
          </div>
        ) : (
          <div className="food-item-counter">
            <div className="counter-btn-icon-wrapper remove-wrapper">
              <IoIosRemove
                onClick={() => subtractFromCart(_id)}
                size="24px"
                color="red"
              />
            </div>
            <p>{cartItems[_id]}</p>
            <div className="counter-btn-icon-wrapper add-wrapper">
              <IoIosAdd
                onClick={() => addToCart(_id)}
                size="24px"
                color="green"
              />
            </div>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
