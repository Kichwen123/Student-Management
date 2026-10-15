
import { Link } from "react-router-dom";

const StudentSignup = () => {
    return (
        <div
            className="container my-5"
            style={{ minHeight: "80vh" }}
        >
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-9">

                    <div className="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="row g-0">

                            {/* Left Side */}
                            <div
                                className="col-md-5 text-white d-flex align-items-center"
                                style={{ backgroundColor: "#198754" }}
                            >
                                <div className="p-4 p-lg-5">
                                    <div className="mb-4">
                                        <i className="bi bi-mortarboard-fill display-3"></i>
                                    </div>

                                    <h2 className="fw-bold mb-3">
                                        Welcome to eduManage
                                    </h2>

                                    <p className="mb-3">
                                        Create your student account and take
                                        control of your academic journey.
                                    </p>

                                    <p className="mb-3">
                                        Access your student information, keep
                                        track of your studies, and stay
                                        organized throughout your course.
                                    </p>

                                    <div className="mt-4">
                                        <p className="mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Manage your academic profile
                                        </p>
                                        <p className="mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Access your academic records
                                        </p>
                                        <p className="mb-0">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Stay connected with your school
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Student Registration Form */}
                            <div className="col-md-7 p-4 p-lg-5">

                                <div className="mb-4">
                                    <h3 className="fw-bold">
                                        Student Registration
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Fill in your details to create your account.
                                    </p>
                                </div>

                                <form>
                                    {/* Full Name */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="studentName"
                                            className="form-label fw-semibold"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            id="studentName"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            className="form-control"
                                            autoComplete="name"
                                            required
                                        />
                                    </div>

                                    {/* Student ID */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="studentId"
                                            className="form-label fw-semibold"
                                        >
                                            Student ID
                                        </label>

                                        <input
                                            type="text"
                                            id="studentId"
                                            name="studentId"
                                            placeholder="Enter your student ID"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="studentEmail"
                                            className="form-label fw-semibold"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            id="studentEmail"
                                            name="email"
                                            placeholder="student@example.com"
                                            className="form-control"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="studentPhone"
                                            className="form-label fw-semibold"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            id="studentPhone"
                                            name="phone"
                                            placeholder="e.g. 0712345678"
                                            className="form-control"
                                            autoComplete="tel"
                                            required
                                        />
                                    </div>

                                    {/* Course */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="studentCourse"
                                            className="form-label fw-semibold"
                                        >
                                            Course
                                        </label>

                                        <select
                                            id="studentCourse"
                                            name="course"
                                            className="form-select"
                                            defaultValue=""
                                            required
                                        >
                                            <option value="" disabled>
                                                Select your course
                                            </option>
                                            <option value="Software Engineering">
                                                Software Engineering
                                            </option>
                                            <option value="Computer Science">
                                                Computer Science
                                            </option>
                                            <option value="Data Science">
                                                Data Science
                                            </option>
                                            <option value="Information Technology">
                                                Information Technology
                                            </option>
                                            <option value="Business Management">
                                                Business Management
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="studentPassword"
                                            className="form-label fw-semibold"
                                        >
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            id="studentPassword"
                                            name="password"
                                            placeholder="Create a password"
                                            className="form-control"
                                            autoComplete="new-password"
                                            minLength={8}
                                            required
                                        />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="confirmStudentPassword"
                                            className="form-label fw-semibold"
                                        >
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            id="confirmStudentPassword"
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            className="form-control"
                                            autoComplete="new-password"
                                            minLength={8}
                                            required
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2 fw-semibold"
                                    >
                                        <i className="bi bi-person-plus-fill me-2"></i>
                                        Create Student Account
                                    </button>

                                    {/* Login Link */}
                                    <div className="text-center mt-4">
                                        <span className="text-muted">
                                            Already have an account?
                                        </span>

                                        <Link
                                            to="/login"
                                            className="ms-2 text-success text-decoration-none fw-semibold"
                                        >
                                            Login
                                        </Link>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentSignup;
