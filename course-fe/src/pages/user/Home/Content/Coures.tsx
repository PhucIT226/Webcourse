import { MdOutlineStar } from "react-icons/md";
import { useEffect } from "react";
import type { Course } from "../../../../types/course";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchCourses } from "../../../../redux/courseSlice";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.course.data);
  const loading = useAppSelector((state) => state.course.loading);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

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

        {loading && <p>Loading...</p>}
        {!loading &&
          courses.slice(0, 3).map((course: Course) => (
            <div
              className="cursor-pointer col col-lg-4"
              onClick={() =>
                navigate(`/course/${course.id}`, {
                  state: { id: 7, color: "green" },
                })
              }
              key={course.id}
            >
              <div className="course-card mt-3 ">
                <div className="course-card_image mb-3">
                  {course.thumbnailUrls?.[0] && (
                    <img src={course.thumbnailUrls[0].url} alt={course.title} />
                  )}
                </div>
                <div className="course-card_title mb-3">{course.title}</div>
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
            </div>
          ))}
      </div>
    </div>
  );
};
export default Courses;
