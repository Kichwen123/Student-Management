
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StudentDetails = () => {
    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudent = async () => {
            setLoading(true);
            setError("");
            setStudent(null);

            try {
                // Fetch only the student whose ID matches the URL
                const response = await fetch(
                    `http://localhost:3000/students/${encodeURIComponent(id)}`
                );

                // JSON Server may return 404 for a missing student
                if (response.status === 404) {
                    setError("not-found");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch student details.");
                }

                const data = await response.json();

                // Also handle APIs that return no student record
                if (!data || data.id == null) {
                    setError("not-found");
                    return;
                }

                setStudent(data);
            } catch (err) {
                setError("Unable to load student details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    return (
        <div
            className="min-vh-100 py-5"
            style={{ backgroundColor: "#f1f8f2" }}
        >
            <div className="container">

                {/* Back Button */}
                <div className="mb-4">
                    <Link
                        to="/students"
                        className="btn btn-outline-success"
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Students
                    </Link>
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
                        Loading student details...
                    </div>
                )}

                {/* Error State */}
                {!loading && error && error !== "not-found" && (
                    <div className="alert alert-danger" role="alert">
                        <h5 className="alert-heading">
                            Something went wrong
                        </h5>
                        <p className="mb-3">{error}</p>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Student Not Found */}
                {!loading && error === "not-found" && (
                    <div className="card border-0 shadow-sm rounded-4 text-center p-5">
                        <div className="mb-3">
                            <i
                                className="bi bi-person-x text-secondary"
                                style={{ fontSize: "4rem" }}
                            ></i>
                        </div>

                        <h3 className="fw-bold">Student not found</h3>

                        <p className="text-muted">
                            We couldn't find a student with ID {id}.
                            The record may not exist or may have been removed.
                        </p>

                        <div>
                            <Link
                                to="/students"
                                className="btn btn-success"
                            >
                                Return to Students
                            </Link>
                        </div>
                    </div>
                )}

                {/* Student Details */}
                {!loading && !error && student && (
                    <>
                        <div className="mb-4">
                            <h2 className="fw-bold">
                                Student <span className="text-success">Details</span>
                            </h2>
                            <p className="text-muted">
                                View the complete student profile in eduManage.
                            </p>
                        </div>

                        <div className="card border-0 shadow rounded-4 overflow-hidden">

                            {/* Green Profile Header */}
                            <div
                                className="text-white p-4 p-md-5"
                                style={{ backgroundColor: "#198754" }}
                            >
                                <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                                    <div
                                        className="rounded-circle bg-white text-success d-flex align-items-center justify-content-center fw-bold"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            fontSize: "36px",
                                            flexShrink: 0
                                        }}
                                    >
                                        {student.name
                                            ? student.name
                                                  .split(" ")
                                                  .map((part) => part[0])
                                                  .join("")
                                                  .slice(0, 2)
                                                  .toUpperCase()
                                            : "ST"}
                                    </div>

                                    <div className="text-center text-md-start">
                                        <h2 className="fw-bold mb-2">
                                            {student.name || "Name not provided"}
                                        </h2>

                                        <p className="mb-2">
                                            <i className="bi bi-envelope me-2"></i>
                                            {student.email || "Email not provided"}
                                        </p>

                                        <span className="badge bg-light text-success px-3 py-2">
                                            Student ID: {student.id}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Details Body */}
                            <div className="card-body p-4 p-md-5">
                                <h4 className="fw-bold mb-4">
                                    Personal and Academic Information
                                </h4>

                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <div className="bg-light rounded-3 p-3 h-100">
                                            <div className="text-muted small mb-2">
                                                <i className="bi bi-person-fill text-success me-2"></i>
                                                Full Name
                                            </div>
                                            <h6 className="fw-bold mb-0">
                                                {student.name || "Not provided"}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="bg-light rounded-3 p-3 h-100">
                                            <div className="text-muted small mb-2">
                                                <i className="bi bi-envelope-fill text-success me-2"></i>
                                                Email Address
                                            </div>
                                            <h6 className="fw-bold mb-0 text-break">
                                                {student.email || "Not provided"}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="bg-light rounded-3 p-3 h-100">
                                            <div className="text-muted small mb-2">
                                                <i className="bi bi-calendar3 text-success me-2"></i>
                                                Age
                                            </div>
                                            <h6 className="fw-bold mb-0">
                                                {student.age != null
                                                    ? `${student.age} years`
                                                    : "Not provided"}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="bg-light rounded-3 p-3 h-100">
                                            <div className="text-muted small mb-2">
                                                <i className="bi bi-gender-ambiguous text-success me-2"></i>
                                                Gender
                                            </div>
                                            <h6 className="fw-bold mb-0">
                                                {student.gender || "Not provided"}
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="bg-light rounded-3 p-3 h-100">
                                            <div className="text-muted small mb-2">
                                                <i className="bi bi-book-fill text-success me-2"></i>
                                                Course
                                            </div>
                                            <h6 className="fw-bold mb-0">
                                                {student.course || "Not provided"}
                                            </h6>
                                        </div>
                                    </div>

                                    {/* Display any additional fields in the API */}
                                    {Object.entries(student)
                                        .filter(
                                            ([key]) =>
                                                ![
                                                    "id",
                                                    "name",
                                                    "email",
                                                    "age",
                                                    "gender",
                                                    "course"
                                                ].includes(key)
                                        )
                                        .map(([key, value]) => (
                                            <div
                                                className="col-md-6"
                                                key={key}
                                            >
                                                <div className="bg-light rounded-3 p-3 h-100">
                                                    <div className="text-muted small mb-2">
                                                        <i className="bi bi-info-circle text-success me-2"></i>
                                                        {key
                                                            .replace(/([A-Z])/g, " $1")
                                                            .replace(/^./, (char) =>
                                                                char.toUpperCase()
                                                            )}
                                                    </div>

                                                    <h6 className="fw-bold mb-0 text-break">
                                                        {typeof value === "object" && value !== null
                                                            ? JSON.stringify(value)
                                                            : String(value ?? "Not provided")}
                                                    </h6>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <div className="mt-5">
                                    <Link
                                        to="/students"
                                        className="btn btn-success px-4"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back to Students List
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default StudentDetails;
