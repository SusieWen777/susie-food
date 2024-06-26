import "./ExploreMenu.scss";
import { menu_list } from "../../assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Discover our diverse menu, featuring savory Dumplings, vibrant
        Vegetables, hearty Rice dishes, flavorful Noodles, refreshing Drinks,
        delightful Desserts, nourishing Soups, tasty Appetizers, comforting
        Stews, and delicious Stir-fried dishes. Enjoy a culinary journey with
        SusieFood, where every dish is crafted with care.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="explore-menu-list-item"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt=""
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
