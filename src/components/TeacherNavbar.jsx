
import { useNavigate } from "react-router-dom";
import {
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPersonCircleOutline,
  IoChevronDownOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import toast from "react-hot-toast";

function TeacherNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Connect your authentication logout logic here.
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-white border-bottom shadow-sm px-3 px-lg-4 py-3">
      <div className="container-fluid">
        {/* Brand and portal title */}
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 bg-success bg-opacity-10"
            style={{ width: "46px", height: "46px" }}
          >
            <IoSchoolOutline size={27} className="text-success" />
          </div>

          <div>
            <h5 className="mb-0 fw-bold">
              <span className="text-success">edu</span>
              <span className="text-dark">Manage</span>
            </h5>
            <small className="text-muted">Teacher Portal</small>
          </div>
        </div>

        {/* Right-side actions */}
        <div className="d-flex align-items-center gap-2 gap-md-3">
          {/* Welcome message */}
          <div className="d-none d-lg-block text-end me-1">
            <div className="fw-semibold text-dark">
              Welcome, Teacher!
            </div>
            <small className="text-muted">
              Manage your classroom
            </small>
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="btn btn-light rounded-circle position-relative d-flex align-items-center justify-content-center"
            style={{ width: "42px", height: "42px" }}
            aria-label="Notifications"
            title="Notifications"
            onClick={() =>
              toast("You are all caught up!", { icon: "🔔" })
            }
          >
            <IoNotificationsOutline size={22} />

            <span
              className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "9px" }}
            >
              0
            </span>
          </button>

          {/* Teacher profile */}
          <div className="d-flex align-items-center gap-2 border-start ps-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-success text-white"
              style={{ width: "42px", height: "42px" }}
            >
              <IoPersonCircleOutline size={29} />
            </div>

            <div className="d-none d-md-block">
              <div className="fw-semibold text-dark small">
                Teacher
              </div>
              <small className="text-muted">
                Educator
              </small>
            </div>

            <IoChevronDownOutline
              className="text-muted d-none d-md-block"
              size={16}
            />
          </div>

          {/* Logout */}
          <button
            type="button"
            className="btn btn-outline-danger d-flex align-items-center gap-1 rounded-3 px-2 px-md-3"
            onClick={handleLogout}
            title="Logout"
          >
            <IoLogOutOutline size={20} />
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default TeacherNavbar;
