
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div
            className="min-vh-100 d-flex align-items-center py-5"
            style={{ backgroundColor: "#f1f8f2" }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-md-7 col-lg-5">

                        <div className="text-center mb-4">
                            <h2 className="fw-bold">
                                <span style={{ color: "#198754" }}>edu</span>
                                Manage
                            </h2>
                            <p className="text-muted">
                                Welcome back! Continue your academic journey.
                            </p>
                        </div>

                        <div className="card border-0 shadow rounded-4 p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div
                                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        backgroundColor: "#d1e7dd",
                                        color: "#198754",
                                        fontSize: "36px"
                                    }}
                                >
                                    <i className="bi bi-person-fill"></i>
                                </div>

                                <h3 className="fw-bold">Student Login</h3>
                                <p className="text-muted">
                                    Sign in to access your student dashboard.
                                </p>
                            </div>

                            <form>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Email Address or Student ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Enter email or student ID"
                                        autoComplete="username"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="rememberMe"
                                        />
                                        <label
                                            className="form-check-label text-muted"
                                            htmlFor="rememberMe"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <Link
                                        to="/forgot-password"
                                        className="text-success text-decoration-none small fw-semibold"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg w-100 rounded-3"
                                >
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <p className="text-muted mb-0">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className="text-success fw-bold text-decoration-none"
                                    >
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <Link
                                to="/"
                                className="text-muted text-decoration-none"
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Home
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
