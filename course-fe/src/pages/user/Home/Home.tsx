import "../../../styles/user/home/home.scss";
import Courses from "./Content/Coures";
import Categories from "./Content/Categories";
import "../../../styles/user/home/home.scss";
import DetailPanel from "./Content/DetailPanel";
import Testimonials from "./Content/Testimonials";

const Home = () => {
  return (
    <>
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
    </>
  );
};
export default Home;