import { useNavigate } from "react-router";
import videoSource from "../assets/istockphoto-2114486363-640_adpp_is.mp4";

const Intro = () => {
  const navigate = useNavigate();
  const changeSite = () => {
    navigate("/courses");
  };
  return (
    <>
      <div className="homepage-container">
        <video autoPlay loop muted>
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>
      <div className="homepage-content">
        <div className="title-1">
          Học code từ cơ bản đến nâng cao cùng mentor
        </div>
        <div className="title-2">
          <button className="btn btn-primary" onClick={() => changeSite()}>
            Let's get started
          </button>
        </div>
      </div>
    </>
  );
};
export default Intro;
