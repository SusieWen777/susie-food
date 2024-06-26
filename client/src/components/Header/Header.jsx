import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>
          Welcome to SusieFood, your go-to for delicious chinese food delivery.
          Our menu features a variety of authentic dishes, from savory dumplings
          to hearty stews. Each meal is crafted with the finest ingredients and
          delivered right to your doorstep. Browse through our extensive menu,
          place your order, and enjoy fresh, hot meals delivered right to your
          doorstep. Your favorite dishes are just a click away!
        </p>
        <a href="#food-display">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
}

export default Header;
