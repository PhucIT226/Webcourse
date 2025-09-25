import { MdOutlineStar } from "react-icons/md";
import Fullstack from "../../../../assets/fullstack.png";
import Digital from "../../../../assets/digital.jpg";
import DataScience from "../../../../assets/datascience.jpg";

const Courses = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="course_section mb-3">
          <h2 className="course-section__title ">
            Ready to reimagine your career?
          </h2>
          <p className="course-section__subtitle">
            Get the skills and real-world experience employers want with Career
            Accelerators.
          </p>
        </div>
        <a href="">
          <div className="course-card mt-3 col col-lg-4">
            <div className="course-card_image mb-3">
              <img src={Fullstack} />
            </div>
            <div className="course-card_title mb-3">
              Fullstack Web Developer
            </div>
            <div className="course-stats">
              <div className="course-card_star">
                <MdOutlineStar className="star-color" />
                <span>4.7</span>
              </div>
              <div className="course-card_rating">458k Rating</div>
              <div className="vid_length">
                <span>87,8 total hours</span>
              </div>
            </div>
          </div>
        </a>
        <a href="">
          <div className="course-card mt-3 col col-lg-4">
            <div className="course-card_image mb-3">
              <img src={Digital} />
            </div>
            <div className="course-card_title mb-3">Digital Marketer</div>
            <div className="course-stats">
              <div className="course-card_star">
                <MdOutlineStar className="star-color" />
                <span>4.7</span>
              </div>
              <div className="course-card_rating">458k Rating</div>
              <div className="vid_length">
                <span>87,8 total hours</span>
              </div>
            </div>
          </div>
        </a>
        <a href="">
          <div className="course-card mt-3 col col-lg-4">
            <div className="course-card_image mb-3">
              <img src={DataScience} />
            </div>
            <div className="course-card_title mb-3">Data Scientist</div>
            <div className="course-stats">
              <div className="course-card_star">
                <MdOutlineStar className="star-color" />
                <span>4.7</span>
              </div>
              <div className="course-card_rating">458k Rating</div>
              <div className="vid_length">
                <span>87,8 total hours</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
export default Courses;
