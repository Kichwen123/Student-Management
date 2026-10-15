
import { Link } from "react-router-dom";

const TeacherSignup = () => {
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
                                        <i className="bi bi-person-workspace display-3"></i>
                                    </div>

                                    <h2 className="fw-bold mb-3">
                                        Teach Smarter with eduManage
                                    </h2>

                                    <p className="mb-3">
                                        Create your teacher account and
                                        simplify the way you manage your
                                        students and academic responsibilities.
                                    </p>

                                    <p className="mb-3">
                                        Keep student information organized
                                        and support a better learning
                                        experience.
                                    </p>

                                    <div className="mt-4">
                                        <p className="mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Manage student records
                                        </p>
                                        <p className="mb-2">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Organize academic information
                                        </p>
                                        <p className="mb-0">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Support student progress
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Teacher Registration Form */}
                            <div className="col-md-7 p-4 p-lg-5">

                                <div className="mb-4">
                                    <h3 className="fw-bold">
                                        Teacher Registration
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Enter your professional details
                                        to get started.
                                    </p>
                                </div>

                                <form>
                                    {/* Full Name */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="teacherName"
                                            className="form-label fw-semibold"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            id="teacherName"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            className="form-control"
                                            autoComplete="name"
                                            required
                                        />
                                    </div>

                                    {/* Staff ID */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="staffId"
                                            className="form-label fw-semibold"
                                        >
                                            Staff ID
                                        </label>

                                        <input
                                            type="text"
                                            id="staffId"
                                            name="staffId"
                                            placeholder="Enter your staff ID"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="teacherEmail"
                                            className="form-label fw-semibold"
                                        >
                                            Official Email Address
                                        </label>

                                        <input
                                            type="email"
                                            id="teacherEmail"
                                            name="email"
                                            placeholder="teacher@school.ac.ke"
                                            className="form-control"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="teacherPhone"
                                            className="form-label fw-semibold"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            id="teacherPhone"
                                            name="phone"
                                            placeholder="e.g. 0712345678"
                                            className="form-control"
                                            autoComplete="tel"
                                            required
                                        />
                                    </div>

                                    {/* Department */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="department"
                                            className="form-label fw-semibold"
                                        >
                                            Department
                                        </label>

                                        <select
                                            id="department"
                                            name="department"
                                            className="form-select"
                                            defaultValue=""
                                            required
                                        >
                                            <option value="" disabled>
                                                Select your department
                                            </option>
                                            <option value="Computing and IT">
                                                Computing and IT
                                            </option>
                                            <option value="Mathematics">
                                                Mathematics
                                            </option>
                                            <option value="Sciences">
                                                Sciences
                                            </option>
                                            <option value="Languages">
                                                Languages
                                            </option>
                                            <option value="Business">
                                                Business
                                            </option>
                                            <option value="Humanities">
                                                Humanities
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    {/* Specialization */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="specialization"
                                            className="form-label fw-semibold"
                                        >
                                            Subject / Specialization
                                        </label>

                                        <input
                                            type="text"
                                            id="specialization"
                                            name="specialization"
                                            placeholder="e.g. Software Engineering"
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="teacherPassword"
                                            className="form-label fw-semibold"
                                        >
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            id="teacherPassword"
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
                                            htmlFor="confirmTeacherPassword"
                                            className="form-label fw-semibold"
                                        >
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            id="confirmTeacherPassword"
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
                                        <i className="bi bi-person-check-fill me-2"></i>
                                        Create Teacher Account
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

export default TeacherSignup;
