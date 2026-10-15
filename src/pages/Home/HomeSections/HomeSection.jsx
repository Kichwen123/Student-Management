const HomeSection = () => {
    return (
        <section className="py-5 bg-light">
            <div className="container py-4">

                <div className="row align-items-center g-5">

                    {/* Left Side */}
                    <div className="col-lg-6">

                        {/* Small Badge */}
                        <div className="mb-3">
                            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                                <i className="bi bi-mortarboard-fill me-2"></i>
                                Education Management System
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="display-4 fw-bold lh-sm mb-4">
                            Manage your
                            <span className="text-success"> academic journey </span>
                            with ease.
                        </h1>

                        {/* Description */}
                        <p className="fs-5 text-muted mb-4">
                            A simple and powerful platform designed to help students
                            manage their courses, track attendance, view results,
                            and stay organized throughout their academic journey.
                        </p>

                        {/* Buttons */}
                        <div className="d-flex flex-wrap gap-3 mb-4">

                            <a
                                href="/signup"
                                className="btn btn-success btn-lg px-4 fw-semibold"
                            >
                                Get Started
                                <i className="bi bi-arrow-right ms-2"></i>
                            </a>

                            <a
                                href="/about-us"
                                className="btn btn-outline-dark btn-lg px-4 fw-semibold"
                            >
                                Learn More
                            </a>

                        </div>

                        {/* Features */}
                        <div className="row g-3 mt-3">

                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="bg-success-subtle rounded-circle p-2 me-3">
                                        <i className="bi bi-journal-check text-success fs-5"></i>
                                    </div>

                                    <div>
                                        <h6 className="mb-0 fw-bold">
                                            Manage Courses
                                        </h6>

                                        <small className="text-muted">
                                            Keep track of your subjects
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="bg-success-subtle rounded-circle p-2 me-3">
                                        <i className="bi bi-bar-chart-fill text-success fs-5"></i>
                                    </div>

                                    <div>
                                        <h6 className="mb-0 fw-bold">
                                            Track Results
                                        </h6>

                                        <small className="text-muted">
                                            Monitor your performance
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="bg-success-subtle rounded-circle p-2 me-3">
                                        <i className="bi bi-calendar-check text-success fs-5"></i>
                                    </div>

                                    <div>
                                        <h6 className="mb-0 fw-bold">
                                            Attendance
                                        </h6>

                                        <small className="text-muted">
                                            Stay updated with attendance
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="d-flex align-items-center">
                                    <div className="bg-success-subtle rounded-circle p-2 me-3">
                                        <i className="bi bi-person-check-fill text-success fs-5"></i>
                                    </div>

                                    <div>
                                        <h6 className="mb-0 fw-bold">
                                            Student Profile
                                        </h6>

                                        <small className="text-muted">
                                            Manage your information
                                        </small>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="col-lg-6">

                        <div className="position-relative">

                            {/* Main Image */}
                            <img
                                src="images/HomeSection.jpg"
                                alt="Students using a student management system"
                                className="img-fluid rounded-4 shadow"
                                style={{
                                    width: "100%",
                                    height: "480px",
                                    objectFit: "cover"
                                }}
                            />

                            {/* Floating Student Card */}
                            <div
                                className="position-absolute bg-white rounded-4 shadow p-3"
                                style={{
                                    bottom: "25px",
                                    left: "-25px",
                                    minWidth: "220px"
                                }}
                            >
                                <div className="d-flex align-items-center">

                                    <div className="bg-success-subtle rounded-circle p-3 me-3">
                                        <i className="bi bi-mortarboard-fill text-success fs-4"></i>
                                    </div>

                                    <div>
                                        <small className="text-muted">
                                            Academic Progress
                                        </small>

                                        <h5 className="fw-bold mb-0">
                                            85%
                                        </h5>

                                        <small className="text-success">
                                            <i className="bi bi-arrow-up"></i>
                                            Great progress
                                        </small>
                                    </div>

                                </div>
                            </div>

                            {/* Floating Attendance Card */}
                            <div
                                className="position-absolute bg-success text-white rounded-4 shadow p-3"
                                style={{
                                    top: "25px",
                                    right: "-20px",
                                    minWidth: "180px"
                                }}
                            >
                                <div className="d-flex align-items-center">

                                    <i className="bi bi-calendar-check fs-3 me-3"></i>

                                    <div>
                                        <small className="opacity-75">
                                            Attendance
                                        </small>

                                        <h5 className="fw-bold mb-0">
                                            92%
                                        </h5>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default HomeSection;

