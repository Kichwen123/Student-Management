
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the logged-in session
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm px-3 px-md-4 py-3">
      <div className="container-fluid">

        {/* Brand */}
        <Link
          to="/admin"
          className="navbar-brand fw-bold fs-4 me-4"
          style={{ letterSpacing: '-1px' }}
        >
          <span style={{ color: '#198754' }}>edu</span>
          <span style={{ color: '#343a40' }}>Manage</span>
        </Link>

        {/* Dashboard title */}
        <div className="d-none d-md-block border-start ps-3">
          <h5 className="mb-0 fw-bold text-dark">
            Admin Dashboard
          </h5>
          <small className="text-secondary">
            Manage your school efficiently
          </small>
        </div>

        {/* Right section */}
        <div className="ms-auto d-flex align-items-center gap-3">

          {/* Admin profile */}
          <div className="d-none d-sm-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: '42px',
                height: '42px',
                backgroundColor: '#e8f5e9',
                color: '#198754',
                fontSize: '16px',
              }}
            >
              A
            </div>

            <div className="d-none d-lg-block">
              <div className="fw-semibold text-dark">
                Administrator
              </div>
              <small className="text-secondary">
                System Admin
              </small>
            </div>
          </div>

          {/* Logout button */}
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-outline-danger d-flex align-items-center gap-2 px-3 py-2"
            style={{
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
