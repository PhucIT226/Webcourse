import "../../../styles/user/home/home.scss";
import Courses from "./Content/Coures";
import Categories from "./Content/Categories";
import Slider from "./Content/Slider";
import "../../../styles/user/home/home.scss";
import DetailPanel from "./Content/DetailPanel";
import Testimonials from "./Content/Testimonials";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <>
      <div className="header-container">
          <Header />
        </div>
      <div className="swiper-container mb-5">
        <Slider />
      </div>
      <div className="courses-container mb-5">
        <Courses />
      </div>
      <div className="categories-container mb-5">
        <Categories />
      </div>
      <div className="detail-container">
        <DetailPanel />
      </div>
      <div className="testimonial-container">
        <Testimonials />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
};
export default Home;
