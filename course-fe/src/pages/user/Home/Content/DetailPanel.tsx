import { useState } from "react";
import "../../../../styles/user/home/Detail.scss";
import {
  FaHandsHelping,
  FaCertificate,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";

const DetailPanel = () => {
  const items = [
    {
      id: 1,
      title: "Hands-on training",
      desc: "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
      icon: <FaHandsHelping />,
    },
    {
      id: 2,
      title: "Certification prep",
      desc: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
      icon: <FaCertificate />,
    },
    {
      id: 3,
      title: "Insights and analytics",
      desc: "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
      icon: <FaChartLine />,
    },
    {
      id: 4,
      title: "Customizable content",
      desc: "Create tailored learning paths for team and organization goals and even host your own content and resources.",
      icon: <FaCogs />,
    },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="container">
        <div className="title mb-5">
          <h2>Learning focused on your goals</h2>
        </div>
        <div className="d-flex justify-content-between">
          <div className="sidebar d-flex flex-column gap-4">
            {items.map((item) => (
              <button
                key={item.id}
                className={`menu-btn ${active === item.id ? "active" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <span className="icon">{item.icon}</span>
                {item.title}
              </button>
            ))}
          </div>
          <div className="content">
            {active ? (
              <div className="info">
                <h2>{items.find((i) => i.id === active)?.title}</h2>
                <p>{items.find((i) => i.id === active)?.desc}</p>
              </div>
            ) : (
              <p>👉 Bấm vào menu bên trái để xem chi tiết</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailPanel;
