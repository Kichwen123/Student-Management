
import { NavLink } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";

const Sidebar = ({ links, title = "Administration" }) => {
  return (
    <aside
      className="d-flex flex-column h-100"
      style={{ color: "#E8F0E9" }}
    >
      {/* Brand */}
      <div className="d-flex align-items-center gap-3 px-2 pb-4 mb-3 border-bottom border-secondary">
        <div
          className="d-flex align-items-center justify-content-center rounded-3"
          style={{
            width: 46,
            height: 46,
            backgroundColor: "#198754",
            color: "#fff",
            fontSize: 23,
          }}
        >
          <FaGraduationCap />
        </div>

        <div>
          <h4 className="mb-0 fw-bold text-white">
            edu<span style={{ color: "#65D6A0" }}>Manage</span>
          </h4>
          <small style={{ color: "#A8C1B1" }}>School management</small>
        </div>
      </div>

      {/* Section title */}
      <p
        className="text-uppercase fw-semibold px-3 mb-3"
        style={{
          color: "#91AB9D",
          fontSize: 11,
          letterSpacing: 1.5,
        }}
      >
        {title}
      </p>

      {/* Navigation links */}
      <nav className="d-flex flex-column gap-2 flex-grow-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className="text-decoration-none"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 10,
              color: isActive ? "#FFFFFF" : "#C4D5CB",
              background: isActive
                ? "linear-gradient(90deg, #198754, #157347)"
                : "transparent",
              borderLeft: isActive
                ? "3px solid #76E3A8"
                : "3px solid transparent",
              transition: "all 0.2s ease",
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span className="d-flex align-items-center gap-3">
              <span style={{ fontSize: 19, display: "flex" }}>
                {link.icon}
              </span>
              <span>{link.name}</span>
            </span>

            {link.badge && (
              <span className="badge rounded-pill bg-light text-success">
                {link.badge}
              </span>
            )}

            {!link.badge && (
              <span style={{ opacity: 0.65, display: "flex" }}>
                <FiChevronRight size={16} />
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom information */}
      <div
        className="mt-4 p-3 rounded-3"
        style={{
          backgroundColor: "#203C30",
          border: "1px solid #345545",
        }}
      >
        <div className="d-flex align-items-center gap-2 mb-2">
          <span
            className="rounded-circle"
            style={{
              width: 8,
              height: 8,
              backgroundColor: "#65D6A0",
            }}
          />
          <small className="fw-semibold text-white">
            System active
          </small>
        </div>

        <small style={{ color: "#A8C1B1" }}>
          Manage your school from one place.
        </small>
      </div>
    </aside>
  );
};

export default Sidebar;
