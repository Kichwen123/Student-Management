import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    edu<span className="text-success">Manage</span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <ul className="navbar-nav mx-auto gap-lg-2">

                        <li className="nav-item">
                            <Link
                                className="nav-link active fw-medium"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                            

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="about-us"
                            >
                                About Us
                            </Link>
                        </li>

                    </ul>

                    {/* Get Started */}
                    <div className="d-flex mt-3 mt-lg-0">
                        <Link
                            to="signup"
                            className="btn btn-primary px-4 py-2 fw-semibold get-started-btn"
                        >
                            Get Started
                            <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;