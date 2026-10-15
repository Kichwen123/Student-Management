const Footer = () => {
    return (
        <footer className="bg-dark text-light mt-5">

            <div className="container py-5">
                <div className="row g-4">

                    {/* Brand */}
                    <div className="col-lg-4 col-md-6">
                        <h4 className="fw-bold mb-3">
                            edu<span className="text-success">Manage</span>
                        </h4>

                        <p className="text-secondary pe-lg-5">
                            Empowering students through efficient academic
                            management, easy access to learning resources,
                            and seamless communication with educators.
                        </p>

                        {/* Social Media */}
                        <div className="d-flex gap-3 mt-4">

                            <a href="#" className="text-light fs-5" aria-label="LinkedIn">
                                <i className="bi bi-linkedin"></i>
                            </a>

                            <a href="#" className="text-light fs-5" aria-label="Twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>

                            <a href="#" className="text-light fs-5" aria-label="Facebook">
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a href="#" className="text-light fs-5" aria-label="Instagram">
                                <i className="bi bi-instagram"></i>
                            </a>

                        </div>
                    </div>

                    {/* Student Services */}
                    <div className="col-6 col-lg-2 col-md-3">
                        <h6 className="fw-bold mb-3">Student Services</h6>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-person me-2"></i>
                                    Student Profile
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-journal-bookmark me-2"></i>
                                    My Courses
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-calendar-check me-2"></i>
                                    Attendance
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-clipboard-data me-2"></i>
                                    Academic Results
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Academic Resources */}
                    <div className="col-6 col-lg-2 col-md-3">
                        <h6 className="fw-bold mb-3">Academics</h6>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-book me-2"></i>
                                    Study Materials
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-calendar3 me-2"></i>
                                    Timetable
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-pencil-square me-2"></i>
                                    Assignments
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-mortarboard me-2"></i>
                                    Examinations
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Institution */}
                    <div className="col-6 col-lg-2 col-md-3">
                        <h6 className="fw-bold mb-3">Institution</h6>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-info-circle me-2"></i>
                                    About Us
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-envelope me-2"></i>
                                    Contact Us
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-building me-2"></i>
                                    Departments
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Administration */}
                    <div className="col-6 col-lg-2 col-md-3">
                        <h6 className="fw-bold mb-3">Administration</h6>

                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-people me-2"></i>
                                    Manage Students
                                </a>
                            </li>

                            <li className="mb-2">
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-person-badge me-2"></i>
                                    Manage Teachers
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-secondary text-decoration-none">
                                    <i className="bi bi-speedometer2 me-2"></i>
                                    Admin Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Divider */}
                <hr className="border-secondary my-4" />

                {/* Bottom Footer */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

                    <p className="text-secondary mb-0 small">
                        © {new Date().getFullYear()} eduManage. All rights reserved.
                    </p>

                    <div className="d-flex gap-3">
                        <a href="#" className="text-secondary text-decoration-none small">
                            Privacy
                        </a>

                        <a href="#" className="text-secondary text-decoration-none small">
                            Terms
                        </a>

                        <a href="#" className="text-secondary text-decoration-none small">
                            Cookies
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;