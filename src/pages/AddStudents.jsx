
import { useState } from "react";
import { Link } from "react-router-dom";

function AddStudent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        course: "",
    });

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the field's error once the student starts correcting it
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setShowAlert(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Please enter the student's full name.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Please enter the student's email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.age) {
            newErrors.age = "Please enter the student's age.";
        } else if (
            Number(formData.age) < 1 ||
            Number(formData.age) > 120
        ) {
            newErrors.age = "Please enter an age between 1 and 120.";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select the student's gender.";
        }

        if (!formData.course) {
            newErrors.course = "Please select a course.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setShowAlert(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setShowAlert(false);

        // Prototype only: no data is saved or sent.
        alert("All fields have been completed successfully!");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-9 col-xl-8">

                    {/* Page heading */}
                    <div className="text-center mb-4">
                        <span className="badge bg-success-subtle text-success px-3 py-2 mb-3">
                            <i className="bi bi-person-plus me-2"></i>
                            Student Management
                        </span>

                        <h1 className="fw-bold">Welcome Student</h1>

                        <p className="text-secondary">
                            Enter the student's details in the form below.
                        </p>
                    </div>

                    {/* Validation alert */}
                    {showAlert && (
                        <div
                            className="alert alert-danger d-flex align-items-start gap-2"
                            role="alert"
                        >
                            <i className="bi bi-exclamation-triangle-fill fs-5"></i>
                            <div>
                                <strong>Please complete the form.</strong>
                                <p className="mb-0">
                                    Kindly fill in all required fields correctly
                                    before proceeding.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    <div
                        className="alert alert-info d-flex align-items-start gap-2"
                        role="note"
                    >
                        <i className="bi bi-info-circle-fill fs-5"></i>
                        <div>
                            <strong>Kindly note:</strong> Please complete all
                            fields with the student's correct details before
                            proceeding.
                        </div>
                    </div>

                    {/* Form card */}
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-md-5">

                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div
                                    className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center"
                                    style={{ width: "55px", height: "55px" }}
                                >
                                    <i className="bi bi-person-vcard fs-3"></i>
                                </div>

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Student Information
                                    </h5>
                                    <p className="text-secondary small mb-0">
                                        Complete the fields below
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row g-4">

                                    {/* Full name */}
                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="studentName"
                                            className="form-label fw-semibold"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control form-control-lg ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
                                            id="studentName"
                                            placeholder="e.g. Amina Hassan"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />

                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="studentEmail"
                                            className="form-label fw-semibold"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control form-control-lg ${
                                                errors.email ? "is-invalid" : ""
                                            }`}
                                            id="studentEmail"
                                            placeholder="student@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />

                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Age */}
                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="studentAge"
                                            className="form-label fw-semibold"
                                        >
                                            Age
                                        </label>

                                        <input
                                            type="number"
                                            name="age"
                                            className={`form-control form-control-lg ${
                                                errors.age ? "is-invalid" : ""
                                            }`}
                                            id="studentAge"
                                            placeholder="Enter age"
                                            min="1"
                                            max="120"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />

                                        {errors.age && (
                                            <div className="invalid-feedback">
                                                {errors.age}
                                            </div>
                                        )}
                                    </div>

                                    {/* Gender */}
                                    <div className="col-12 col-md-6">
                                        <label
                                            htmlFor="studentGender"
                                            className="form-label fw-semibold"
                                        >
                                            Gender
                                        </label>

                                        <select
                                            name="gender"
                                            className={`form-select form-select-lg ${
                                                errors.gender ? "is-invalid" : ""
                                            }`}
                                            id="studentGender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select gender
                                            </option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Other">Other</option>
                                            <option value="Prefer not to say">
                                                Prefer not to say
                                            </option>
                                        </select>

                                        {errors.gender && (
                                            <div className="invalid-feedback">
                                                {errors.gender}
                                            </div>
                                        )}
                                    </div>

                                    {/* Course */}
                                    <div className="col-12">
                                        <label
                                            htmlFor="studentCourse"
                                            className="form-label fw-semibold"
                                        >
                                            Course
                                        </label>

                                        <select
                                            name="course"
                                            className={`form-select form-select-lg ${
                                                errors.course ? "is-invalid" : ""
                                            }`}
                                            id="studentCourse"
                                            value={formData.course}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select a course
                                            </option>
                                            <option value="Software Development">
                                                Software Development
                                            </option>
                                            <option value="Cybersecurity">
                                                Cybersecurity
                                            </option>
                                            <option value="Networking">
                                                Networking
                                            </option>
                                            <option value="Data Analytics">
                                                Data Analytics
                                            </option>
                                            <option value="Business IT">
                                                Business IT
                                            </option>
                                        </select>

                                        {errors.course && (
                                            <div className="invalid-feedback">
                                                {errors.course}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="d-flex flex-column flex-sm-row gap-3 mt-5">
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg px-4 flex-grow-1"
                                    >
                                        <i className="bi bi-check-circle me-2"></i>
                                        Submit
                                    </button>

                                    <Link
                                        to="/students"
                                        className="btn btn-outline-secondary btn-lg px-4"
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Back to Students
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    <p className="text-center text-secondary small mt-4">
                        <i className="bi bi-shield-check me-1"></i>
                        This prototype does not save or send student data.
                    </p>

                </div>
            </div>
        </div>
    );
}

export default AddStudent;
