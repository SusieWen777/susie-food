import { assets } from "../../assets/assets";
import "./Footer.scss";
import {
  FaSquareFacebook,
  FaSquareTwitter,
  FaInstagram,
} from "react-icons/fa6";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            SusieFood is your trusted partner for delicious and convenient food
            delivery. Whether you&apos;re craving traditional tastes or modern
            twists, SusieFood delivers the best meals right to your doorstep,
            making every meal special.
          </p>
          <div className="footer-social-icons">
            <FaSquareFacebook color="#1877F2" size="32px" />
            <FaSquareTwitter color="#1DA1F2" size="32px" />
            <FaInstagram color="#C13584" size="32px" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+61-123-456-7890</li>
            <li>info@susiefood.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 &copy; SusieFood.com - All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
