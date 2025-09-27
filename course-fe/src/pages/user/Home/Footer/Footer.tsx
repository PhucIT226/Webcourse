import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import "../../../../styles/user/home/footer.scss";

const Footer = () => {
  return (
    <>
      <div className="bg-secondary bg-gradient p-5">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="about">
                <h3>About Us</h3>
                <a href="">About us</a>
                <a href="">Contacts us</a>
                <a href="">Investor</a>
              </div>
            </div>
            <div className="col-4">
              <div className="explore">
                <h3>Explore Course</h3>
                <a href="">For chilren from 4 to 17 years old</a>
                <a href="">For student and workers</a>
              </div>
            </div>
            <div className="col-4">
              <div className="social-media">
                <h3>Our social media</h3>
                <div className="icon">
                  <div className="facebook">
                    <a href="">
                      <FaFacebook />
                    </a>
                  </div>
                  <div className="youtube">
                    <a href="">
                      <FaYoutube />
                    </a>
                  </div>
                  <div className="tiktok">
                    <a href="">
                      <FaTiktok />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="hotline pt-5">
                <h3>Hotline</h3>
                <p>Phone number: 200312312</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
