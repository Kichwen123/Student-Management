
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div
            className="min-vh-100 py-5"
            style={{ backgroundColor: "#f1f8f2" }}
        >
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-10 col-lg-9">

                        <div className="text-center mb-4">
                            <h2 className="fw-bold">
                                <span style={{ color: "#198754" }}>edu</span>
                                Manage
                            </h2>
                            <h3 className="fw-bold mt-3">
                                Create Your Student Account
                            </h3>
                            <p className="text-muted">
                                Join eduManage and take control of your
                                academic journey.
                            </p>
                        </div>

                        <div className="card border-0 shadow rounded-4 overflow-hidden">
                            <div className="row g-0">

                                <div
                                    className="col-md-5 text-white p-4 p-lg-5 d-flex flex-column justify-content-center"
                                    style={{ backgroundColor: "#198754" }}
                                >
                                    <div className="text-center mb-4">
                                        <div
                                            className="rounded-circle bg-white text-success d-inline-flex align-items-center justify-content-center mb-3"
                                            style={{
                                                width: "85px",
                                                height: "85px",
                                                fontSize: "40px"
                                            }}
                                        >
                                            <i className="bi bi-mortarboard-fill"></i>
                                        </div>
                                        <h3 className="fw-bold">
                                            Your Future Starts Here
                                        </h3>
                                    </div>

                                    <p>
                                        Manage your learning journey in one
                                        convenient place.
                                    </p>

                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Track your academic progress
                                        </li>
                                        <li className="mb-3">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Access your student information
                                        </li>
                                        <li className="mb-3">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Stay organized with eduManage
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-7 p-4 p-lg-5">
                                    <h4 className="fw-bold mb-4">
                                        Register as a Student
                                    </h4>

                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Student ID
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter your student ID"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                placeholder="student@example.com"
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Course
                                            </label>
                                            <select
                                                className="form-select form-select-lg"
                                                defaultValue=""
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select your course
                                                </option>
                                                <option>Software Engineering</option>
                                                <option>Computer Science</option>
                                                <option>Data Science</option>
                                                <option>Information Technology</option>
                                                <option>Business Management</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                placeholder="Create a password"
                                                minLength={8}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-semibold">
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                placeholder="Confirm your password"
                                                minLength={8}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-success btn-lg w-100 rounded-3"
                                        >
                                            Create Account
                                        </button>
                                    </form>

                                    <p className="text-center text-muted mt-4 mb-0">
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="fw-bold text-success text-decoration-none"
                                        >
                                            Login
                                        </Link>
                                    </p>
                                </div>

                            </div>
                        </div>

                        <p className="text-center text-muted small mt-4">
                            © 2026 eduManage. Empowering students to succeed.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
