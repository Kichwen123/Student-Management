const About = () => {
    return (
        <div className="bg-light">

            {/* ================= HERO SECTION ================= */}
            <section className="py-5">
                <div className="container py-5">

                    <div className="row align-items-center g-5">

                        {/* Left Content */}
                        <div className="col-lg-6">

                            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                                <i className="bi bi-mortarboard-fill me-2"></i>
                                About eduManage
                            </span>

                            <h1 className="display-4 fw-bold lh-sm mb-4">
                                Making student management
                                <span className="text-success">
                                    {" "}simple and smarter.
                                </span>
                            </h1>

                            <p className="fs-5 text-muted mb-4">
                                eduManage is a modern Student Management System
                                designed to make academic management easier for
                                students, teachers, and administrators.
                            </p>

                            <p className="text-muted">
                                From managing courses and attendance to tracking
                                academic performance and student information,
                                eduManage brings important academic activities
                                together in one convenient platform.
                            </p>

                            <div className="d-flex flex-wrap gap-3 mt-4">

                                <a
                                    href="/signup"
                                    className="btn btn-success px-4 py-2 fw-semibold"
                                >
                                    Get Started
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </a>

                                <a
                                    href="/"
                                    className="btn btn-outline-dark px-4 py-2 fw-semibold"
                                >
                                    Explore Platform
                                </a>

                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="col-lg-6">

                            <div className="position-relative">

                                <img
                                    src="/images/About.jpg"
                                    alt="Students using eduManage"
                                    className="img-fluid rounded-4 shadow"
                                    style={{
                                        width: "100%",
                                        height: "430px",
                                        objectFit: "cover"
                                    }}
                                />

                                {/* Floating Card */}
                                <div
                                    className="position-absolute bg-white rounded-4 shadow p-3"
                                    style={{
                                        bottom: "25px",
                                        left: "-20px"
                                    }}
                                >

                                    <div className="d-flex align-items-center">

                                        <div className="bg-success-subtle rounded-circle p-3 me-3">
                                            <i className="bi bi-people-fill text-success fs-4"></i>
                                        </div>

                                        <div>
                                            <small className="text-muted">
                                                Student Community
                                            </small>

                                            <h5 className="fw-bold mb-0">
                                                Learn • Grow • Achieve
                                            </h5>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ================= MISSION / VISION / VALUES ================= */}
            <section className="py-5 bg-white">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                            What Drives Us
                        </span>

                        <h2 className="fw-bold display-6">
                            Our Mission, Vision & Values
                        </h2>

                        <p
                            className="text-muted mx-auto"
                            style={{ maxWidth: "680px" }}
                        >
                            We believe technology should make education simpler,
                            more accessible, and more connected for everyone.
                        </p>

                    </div>


                    <div className="row g-4">

                        {/* Mission */}
                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center about-card">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "85px",
                                            height: "85px"
                                        }}
                                    >
                                        <i className="bi bi-bullseye text-success fs-1"></i>
                                    </div>

                                </div>

                                <h3 className="fw-bold mb-3">
                                    Our Mission
                                </h3>

                                <p className="text-muted mb-0">
                                    Our mission is to simplify academic management
                                    by providing students, teachers, and
                                    administrators with a reliable platform
                                    that keeps important academic information
                                    organized and accessible.
                                </p>

                            </div>

                        </div>


                        {/* Vision */}
                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center about-card">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "85px",
                                            height: "85px"
                                        }}
                                    >
                                        <i className="bi bi-eye-fill text-success fs-1"></i>
                                    </div>

                                </div>

                                <h3 className="fw-bold mb-3">
                                    Our Vision
                                </h3>

                                <p className="text-muted mb-0">
                                    Our vision is to create a connected digital
                                    learning environment where technology
                                    empowers every student to learn, grow,
                                    and achieve their academic goals.
                                </p>

                            </div>

                        </div>


                        {/* Values */}
                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center about-card">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "85px",
                                            height: "85px"
                                        }}
                                    >
                                        <i className="bi bi-heart-fill text-success fs-1"></i>
                                    </div>

                                </div>

                                <h3 className="fw-bold mb-3">
                                    Our Values
                                </h3>

                                <p className="text-muted mb-0">
                                    We value simplicity, collaboration,
                                    accessibility, integrity, and continuous
                                    improvement in everything we do.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= WHY EDUMANAGE ================= */}
            <section className="py-5">

                <div className="container py-4">

                    <div className="row align-items-center g-5">

                        <div className="col-lg-5">

                            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                                Why eduManage?
                            </span>

                            <h2 className="fw-bold display-6 mb-3">
                                Everything students need in one place.
                            </h2>

                            <p className="text-muted">
                                eduManage helps reduce the complexity of academic
                                administration by bringing essential student
                                services into one organized platform.
                            </p>

                        </div>


                        <div className="col-lg-7">

                            <div className="row g-3">

                                {/* Course Management */}
                                <div className="col-sm-6">

                                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">

                                        <i className="bi bi-journal-bookmark-fill text-success fs-2"></i>

                                        <h5 className="fw-bold mt-3">
                                            Course Management
                                        </h5>

                                        <p className="text-muted small mb-0">
                                            Easily view and manage courses
                                            and enrolled subjects.
                                        </p>

                                    </div>

                                </div>


                                {/* Academic Results */}
                                <div className="col-sm-6">

                                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">

                                        <i className="bi bi-bar-chart-fill text-success fs-2"></i>

                                        <h5 className="fw-bold mt-3">
                                            Academic Results
                                        </h5>

                                        <p className="text-muted small mb-0">
                                            Track academic performance and
                                            examination results.
                                        </p>

                                    </div>

                                </div>


                                {/* Attendance */}
                                <div className="col-sm-6">

                                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">

                                        <i className="bi bi-calendar-check-fill text-success fs-2"></i>

                                        <h5 className="fw-bold mt-3">
                                            Attendance Tracking
                                        </h5>

                                        <p className="text-muted small mb-0">
                                            Keep track of attendance and stay
                                            informed about your participation.
                                        </p>

                                    </div>

                                </div>


                                {/* Security */}
                                <div className="col-sm-6">

                                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">

                                        <i className="bi bi-shield-check text-success fs-2"></i>

                                        <h5 className="fw-bold mt-3">
                                            Secure Information
                                        </h5>

                                        <p className="text-muted small mb-0">
                                            Keep important student information
                                            organized and protected.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= ROLES ================= */}
            <section className="py-5 bg-success text-white">

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            One platform. Different experiences.
                        </h2>

                        <p className="opacity-75">
                            eduManage is designed for everyone involved
                            in academic management.
                        </p>

                    </div>


                    <div className="row g-4">

                        {/* Student */}
                        <div className="col-md-4">

                            <div className="bg-white text-dark rounded-4 p-4 h-100 text-center shadow-sm role-card">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "85px",
                                            height: "85px"
                                        }}
                                    >
                                        <i className="bi bi-mortarboard-fill text-success fs-1"></i>
                                    </div>

                                </div>

                                <h4 className="fw-bold mb-3">
                                    Students
                                </h4>

                                <p className="text-muted mb-0">
                                    View courses, check attendance, access
                                    results, manage your profile, and stay
                                    updated with academic announcements.
                                </p>

                            </div>

                        </div>


                        {/* Teacher */}
                        <div className="col-md-4">

                            <div className="bg-white text-dark rounded-4 p-4 h-100 text-center shadow-sm role-card">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "85px",
                                            height: "85px"
                                        }}
                                    >
                                        <i className="bi bi-person-video3 text-success fs-1"></i>
                                    </div>

                                </div>

                                <h4 className="fw-bold mb-3">
                                    Teachers
                                </h4>

                                <p className="text-muted mb-0">
                                    Manage students, record attendance,
                                    enter grades, manage courses, and
                                    communicate important information.
                                </p>

                            </div>

                        </div>


                        {/* Administrator */}
                        <div className="col-md-4">

                            <div className="bg-white text-dark rounded-4 p-4 h-100 text-center shadow-sm role-card">

                                <div className="d-flex justify-content-center mb-4">

                                    <div
                                        className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "85px",
                                            height: "85px"
                                        }}
                                    >
                                        <i className="bi bi-person-gear text-success fs-1"></i>
                                    </div>

                                </div>

                                <h4 className="fw-bold mb-3">
                                    Administrators
                                </h4>

                                <p className="text-muted mb-0">
                                    Manage the institution, students,
                                    teachers, courses, academic records,
                                    and system settings.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}
            <section className="py-5 bg-white">

                <div className="container py-5">

                    <div className="text-center">

                        {/* CTA Icon */}
                        <div className="d-flex justify-content-center mb-4">

                            <div
                                className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                                style={{
                                    width: "90px",
                                    height: "90px"
                                }}
                            >
                                <i className="bi bi-mortarboard-fill text-success fs-1"></i>
                            </div>

                        </div>


                        <h2 className="fw-bold">
                            Ready to manage your academic journey?
                        </h2>

                        <p
                            className="text-muted mb-4 mx-auto"
                            style={{ maxWidth: "650px" }}
                        >
                            Join eduManage and experience a simpler way
                            to manage student information and academic
                            activities.
                        </p>


                        <a
                            href="/signup"
                            className="btn btn-success btn-lg px-5 fw-semibold"
                        >
                            Get Started
                            <i className="bi bi-arrow-right ms-2"></i>
                        </a>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default About;

