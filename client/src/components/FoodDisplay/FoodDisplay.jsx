import { useContext } from "react";
import "./FoodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div>
      {
        <div className="food-display" id="food-display">
          <h2>Top dishes near you</h2>
          <div className="food-display-list">
            {food_list.map((item, index) => {
              if (category === "All" || item.category === category) {
                return <FoodItem key={index} item={item} />;
              } else return null;
            })}
          </div>
        </div>
      }
    </div>
  );
}

export default FoodDisplay;
