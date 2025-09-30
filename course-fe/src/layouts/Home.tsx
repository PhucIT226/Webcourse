import "../../../styles/user/home/home.scss";
import Courses from "../pages/user/Home/Content/Coures";
import Categories from "../pages/user/Home/Content/Categories";
import Slider from "../pages/user/Home/Content/Slider";
import "../../../styles/user/home/home.scss";
import DetailPanel from "../pages/user/Home/Content/DetailPanel";
import Testimonials from "../pages/user/Home/Content/Testimonials";
import Header from "../pages/user/Home/Header/Header";
import Footer from "../pages/user/Home/Footer/Footer";

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
