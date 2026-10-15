
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:3000/students"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch student records.");
                }

                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError(
                    "Unable to load students. Please check that JSON Server is running and try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div
            className="min-vh-100 py-5"
            style={{ backgroundColor: "#f1f8f2" }}
        >
            <div className="container">

                {/* Page Heading */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                    <div>
                        <h2 className="fw-bold mb-2">
                            <span className="text-success">Students</span>{" "}
                            Directory
                        </h2>
                        <p className="text-muted mb-0">
                            View and manage student information in eduManage.
                        </p>
                    </div>

                    <span className="badge bg-success fs-6 px-3 py-2">
                        Total Students: {students.length}
                    </span>
                </div>

                {/* Loading State */}
                {loading && (
                    <div
                        className="alert alert-info d-flex align-items-center"
                        role="status"
                    >
                        <div
                            className="spinner-border spinner-border-sm text-success me-3"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>
                        Loading student records. Please wait...
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="alert alert-danger" role="alert">
                        <h5 className="alert-heading">
                            Unable to load students
                        </h5>
                        <p>{error}</p>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && students.length === 0 && (
                    <div className="alert alert-warning" role="alert">
                        No student records were found.
                    </div>
                )}

                {/* Students Cards */}
                {!loading && !error && students.length > 0 && (
                    <div className="row g-4">
                        {students.map((student) => (
                            <div
                                className="col-sm-6 col-lg-4"
                                key={student.id}
                            >
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div
                                        className="card-header border-0 text-white p-4"
                                        style={{
                                            backgroundColor: "#198754"
                                        }}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <div
                                                className="rounded-circle bg-white text-success d-flex justify-content-center align-items-center fw-bold"
                                                style={{
                                                    width: "55px",
                                                    height: "55px",
                                                    fontSize: "22px",
                                                    flexShrink: 0
                                                }}
                                            >
                                                {student.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div>
                                                <h5 className="fw-bold mb-1">
                                                    {student.name}
                                                </h5>
                                                <small>
                                                    Student ID: {student.id}
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body p-4">
                                        <p className="mb-3 text-break">
                                            <i className="bi bi-envelope-fill text-success me-2"></i>
                                            {student.email}
                                        </p>

                                        <p className="mb-3">
                                            <i className="bi bi-book-fill text-success me-2"></i>
                                            <strong>Course:</strong>{" "}
                                            {student.course}
                                        </p>

                                        <p className="mb-3">
                                            <i className="bi bi-calendar-fill text-success me-2"></i>
                                            <strong>Age:</strong>{" "}
                                            {student.age} years
                                        </p>

                                        <p className="mb-0">
                                            <i className="bi bi-person-fill text-success me-2"></i>
                                            <strong>Gender:</strong>{" "}
                                            {student.gender}
                                        </p>
                                    </div>

                                    <div className="card-footer bg-white border-0 p-4 pt-0">
                                        <Link
                                            to={`/students/${student.id}`}
                                            className="btn btn-outline-success w-100"
                                        >
                                            <i className="bi bi-eye-fill me-2"></i>
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Students;
