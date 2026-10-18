
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiUserPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiBookOpen,
  FiRefreshCw,
} from "react-icons/fi";
import useFetch from "../../hook/UseFetch";

const API_URL = "http://localhost:3000/students";

const emptyForm = {
  name: "",
  email: "",
  course: "",
  phone: "",
};

function ManageStudent() {
  const {
    data: fetchedStudents,
    isPending,
    error,
  } = useFetch(API_URL);

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Keep local records synchronized with the API response.
  useEffect(() => {
    if (Array.isArray(fetchedStudents)) {
      setStudents(fetchedStudents);
    }
  }, [fetchedStudents]);

  // Get unique courses for the filter dropdown.
  const courses = useMemo(() => {
    return [
      "All",
      ...new Set(
        students
          .map((student) => student.course || student.courseName)
          .filter(Boolean)
      ),
    ];
  }, [students]);

  // Search and filter the student records.
  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const name = student.name || student.fullName || "";
      const email = student.email || "";
      const course = student.course || student.courseName || "";
      const phone = student.phone || "";

      const matchesSearch = [name, email, course, phone]
        .some((value) => String(value).toLowerCase().includes(query));

      const matchesCourse =
        selectedCourse === "All" || course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, selectedCourse]);

  const openAddForm = () => {
    setEditingStudent(null);
    setFormData(emptyForm);
    setActionError("");
    setSuccessMessage("");
    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || student.fullName || "",
      email: student.email || "",
      course: student.course || student.courseName || "",
      phone: student.phone || "",
    });
    setActionError("");
    setSuccessMessage("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingStudent(null);
    setFormData(emptyForm);
    setActionError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add a new student or update an existing student.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setActionError("");
    setSuccessMessage("");

    const studentData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      phone: formData.phone.trim(),
    };

    try {
      const isEditing = Boolean(editingStudent);

      const response = await fetch(
        isEditing
          ? `${API_URL}/${editingStudent.id}`
          : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to ${isEditing ? "update" : "add"} student.`
        );
      }

      const savedStudent = await response.json();

      if (isEditing) {
        setStudents((previous) =>
          previous.map((student) =>
            String(student.id) === String(editingStudent.id)
              ? savedStudent
              : student
          )
        );
        setSuccessMessage("Student information updated successfully.");
      } else {
        setStudents((previous) => [savedStudent, ...previous]);
        setSuccessMessage("Student added successfully.");
      }

      closeForm();
    } catch (err) {
      setActionError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete a student after confirmation.
  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        student.name || student.fullName || "this student"
      }? This action cannot be undone.`
    );

    if (!confirmed) return;

    setActionError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_URL}/${student.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete this student.");
      }

      setStudents((previous) =>
        previous.filter(
          (item) => String(item.id) !== String(student.id)
        )
      );

      setSuccessMessage("Student deleted successfully.");
    } catch (err) {
      setActionError(
        err.message || "Unable to delete student. Please try again."
      );
    }
  };

  return (
    <div className="manage-students">
      <style>{`
        .manage-students {
          color: #24372c;
          min-width: 0;
        }

        .ms-heading {
          color: #193c2b;
          font-weight: 800;
          letter-spacing: -0.6px;
        }

        .ms-muted {
          color: #7c897f;
        }

        .ms-panel {
          background: #fff;
          border: 1px solid #edf0eb;
          border-radius: 19px;
          box-shadow: 0 5px 22px rgba(25, 58, 41, 0.04);
        }

        .ms-summary {
          padding: 22px;
          height: 100%;
        }

        .ms-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: #e6f4eb;
          color: #237a57;
          flex-shrink: 0;
        }

        .ms-number {
          color: #193c2b;
          font-size: 1.8rem;
          font-weight: 800;
        }

        .ms-search {
          min-height: 45px;
          border-radius: 12px;
          border-color: #e4eae3;
          box-shadow: none !important;
        }

        .ms-search:focus {
          border-color: #68a986;
        }

        .ms-table th {
          padding: 15px 18px;
          color: #7c897f;
          background: #f8faf7;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          white-space: nowrap;
          border-bottom: 1px solid #edf0eb;
        }

        .ms-table td {
          padding: 15px 18px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f2ee;
        }

        .ms-table tbody tr:hover {
          background: #fbfdfb;
        }

        .ms-avatar {
          width: 42px;
          height: 42px;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          color: #237a57;
          background: #e6f4eb;
          font-weight: 800;
        }

        .ms-action {
          width: 35px;
          height: 35px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e9eee8;
          border-radius: 10px;
          background: #fff;
          color: #54655a;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .ms-action:hover {
          background: #eaf5ed;
          border-color: #d1e7d6;
          color: #237a57;
        }

        .ms-action.delete:hover {
          background: #fff0f0;
          border-color: #ffd4d4;
          color: #c03939;
        }

        .ms-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow-y: auto;
          background: rgba(16, 35, 24, 0.58);
          backdrop-filter: blur(4px);
        }

        .ms-modal {
          width: 100%;
          max-width: 540px;
          margin: auto;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .ms-form-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #34483a;
          margin-bottom: 7px;
        }

        .ms-form-control {
          min-height: 46px;
          border: 1px solid #e0e8df;
          border-radius: 11px;
          box-shadow: none !important;
        }

        .ms-form-control:focus {
          border-color: #65a580;
        }

        @media (max-width: 575px) {
          .ms-summary {
            padding: 17px;
          }

          .ms-number {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* Page heading */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="small fw-bold text-success mb-2">
            TEACHER WORKSPACE / STUDENTS
          </div>

          <h2 className="ms-heading mb-2">Manage Students</h2>

          <p className="ms-muted mb-0">
            View, add, update, and organize student records.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success rounded-3 px-4 py-3 fw-semibold"
          style={{ backgroundColor: "#237A57", border: "none" }}
          onClick={openAddForm}
        >
          <FiUserPlus className="me-2" />
          Add Student
        </button>
      </div>

      {/* Success and error feedback */}
      {successMessage && (
        <div
          className="alert alert-success d-flex justify-content-between align-items-center rounded-3"
          role="status"
        >
          <span>{successMessage}</span>
          <button
            type="button"
            className="btn-close ms-2"
            aria-label="Dismiss message"
            onClick={() => setSuccessMessage("")}
          />
        </div>
      )}

      {actionError && !showForm && (
        <div className="alert alert-danger rounded-3" role="alert">
          {actionError}
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Dismiss error"
            onClick={() => setActionError("")}
          />
        </div>
      )}

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="ms-panel ms-summary">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="ms-muted small fw-semibold mb-2">
                  Total Students
                </p>
                <div className="ms-number">
                  {isPending ? "—" : students.length}
                </div>
                <small className="ms-muted">
                  All student records
                </small>
              </div>

              <div className="ms-icon">
                <FiUsers size={23} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="ms-panel ms-summary">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="ms-muted small fw-semibold mb-2">
                  Matching Records
                </p>
                <div className="ms-number">
                  {isPending ? "—" : filteredStudents.length}
                </div>
                <small className="ms-muted">
                  Based on your search and filter
                </small>
              </div>

              <div
                className="ms-icon"
                style={{ background: "#fff1dc", color: "#b77932" }}
              >
                <FiSearch size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="ms-panel ms-summary">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="ms-muted small fw-semibold mb-2">
                  Courses Represented
                </p>
                <div className="ms-number">
                  {isPending ? "—" : courses.length - 1}
                </div>
                <small className="ms-muted">
                  Unique courses in the records
                </small>
              </div>

              <div
                className="ms-icon"
                style={{ background: "#eeebff", color: "#6d65b5" }}
              >
                <FiBookOpen size={23} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <section className="ms-panel mb-4 p-3 p-md-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-lg-7">
            <label
              htmlFor="studentSearch"
              className="form-label fw-semibold small"
            >
              Search students
            </label>

            <div className="position-relative">
              <FiSearch
                size={19}
                className="position-absolute top-50 translate-middle-y ms-3 ms-icon-muted"
                style={{ color: "#87948a", pointerEvents: "none" }}
              />

              <input
                id="studentSearch"
                type="search"
                className="form-control ms-search ps-5"
                placeholder="Search by name, email, phone, or course..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-8 col-lg-3">
            <label
              htmlFor="courseFilter"
              className="form-label fw-semibold small"
            >
              Filter by course
            </label>

            <select
              id="courseFilter"
              className="form-select ms-search"
              value={selectedCourse}
              onChange={(event) => setSelectedCourse(event.target.value)}
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-sm-4 col-lg-2">
            <button
              type="button"
              className="btn btn-light border rounded-3 w-100"
              style={{ minHeight: 45 }}
              onClick={() => {
                setSearchTerm("");
                setSelectedCourse("All");
                setActionError("");
                setSuccessMessage("");
              }}
            >
              <FiRefreshCw className="me-2" />
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Student records table */}
      <section className="ms-panel">
        <div className="p-3 p-md-4 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <h5 className="fw-bold mb-1">Student Records</h5>
            <p className="ms-muted small mb-0">
              Student information and available actions.
            </p>
          </div>

          <span
            className="badge rounded-pill px-3 py-2"
            style={{ background: "#e6f4eb", color: "#237a57" }}
          >
            {filteredStudents.length} records
          </span>
        </div>

        {isPending ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-success mb-3"
              role="status"
              aria-label="Loading"
            />
            <p className="ms-muted mb-0">Loading student records...</p>
          </div>
        ) : error ? (
          <div className="text-center px-4 py-5">
            <FiUsers size={38} className="text-secondary mb-3" />
            <h6 className="fw-bold">Unable to load students</h6>
            <p className="ms-muted small mb-0">
              Check that your API is running at {API_URL}.
            </p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center px-4 py-5">
            <div className="ms-icon mx-auto mb-3">
              <FiUsers size={24} />
            </div>

            <h6 className="fw-bold">No students found</h6>

            <p className="ms-muted small mb-3">
              {students.length === 0
                ? "Add your first student to get started."
                : "Try changing your search or course filter."}
            </p>

            {students.length === 0 ? (
              <button
                type="button"
                className="btn btn-success rounded-3"
                onClick={openAddForm}
              >
                <FiUserPlus className="me-2" />
                Add Student
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-success rounded-3"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCourse("All");
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table ms-table mb-0">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Phone</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => {
                  const studentName =
                    student.name || student.fullName || "Unnamed Student";

                  const initials = studentName
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() || "")
                    .join("");

                  return (
                    <tr key={student.id ?? student.email ?? index}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div className="ms-avatar">
                            {initials || "S"}
                          </div>

                          <div style={{ minWidth: 0 }}>
                            <div className="fw-semibold text-dark">
                              {studentName}
                            </div>
                            <div className="small ms-muted">
                              {student.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            background: "#f0f5ee",
                            color: "#42654b",
                            fontWeight: 600,
                          }}
                        >
                          {student.course ||
                            student.courseName ||
                            "Not assigned"}
                        </span>
                      </td>

                      <td className="small text-secondary">
                        {student.phone || "—"}
                      </td>

                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <Link
                            to={`/teacher/students/${student.id}`}
                            className="ms-action"
                            title="View student details"
                            aria-label={`View ${studentName}`}
                          >
                            <FiEye size={17} />
                          </Link>

                          <button
                            type="button"
                            className="ms-action"
                            title="Edit student"
                            aria-label={`Edit ${studentName}`}
                            onClick={() => openEditForm(student)}
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            type="button"
                            className="ms-action delete"
                            title="Delete student"
                            aria-label={`Delete ${studentName}`}
                            onClick={() => handleDelete(student)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-3 px-md-4 py-3 border-top d-flex flex-wrap justify-content-between gap-2">
          <small className="ms-muted">
            Showing {filteredStudents.length} of {students.length} students
          </small>

          <small className="ms-muted">
            eduManage · Teacher Portal
          </small>
        </div>
      </section>

      {/* Add/Edit Student Modal */}
      {showForm && (
        <div
          className="ms-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              closeForm();
            }
          }}
        >
          <section
            className="ms-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="studentFormTitle"
          >
            <div
              className="p-4 d-flex justify-content-between align-items-center"
              style={{
                background: "linear-gradient(120deg, #e6f4eb, #f8f3e8)",
              }}
            >
              <div>
                <div className="small fw-bold text-success mb-1">
                  STUDENT MANAGEMENT
                </div>

                <h5 id="studentFormTitle" className="fw-bold mb-0">
                  {editingStudent ? "Edit Student" : "Add New Student"}
                </h5>

                <p className="small text-secondary mb-0 mt-1">
                  Enter the student's information below.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-light rounded-circle"
                aria-label="Close form"
                disabled={saving}
                onClick={closeForm}
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-4">
                {actionError && (
                  <div className="alert alert-danger rounded-3">
                    {actionError}
                  </div>
                )}

                <div className="mb-3">
                  <label className="ms-form-label" htmlFor="studentName">
                    Full Name *
                  </label>

                  <input
                    id="studentName"
                    name="name"
                    type="text"
                    className="form-control ms-form-control"
                    placeholder="e.g. Jane Wanjiku"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                  />
                </div>

                <div className="mb-3">
                  <label className="ms-form-label" htmlFor="studentEmail">
                    Email Address *
                  </label>

                  <input
                    id="studentEmail"
                    name="email"
                    type="email"
                    className="form-control ms-form-control"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={150}
                  />
                </div>

                <div className="mb-3">
                  <label className="ms-form-label" htmlFor="studentCourse">
                    Course *
                  </label>

                  <input
                    id="studentCourse"
                    name="course"
                    type="text"
                    className="form-control ms-form-control"
                    placeholder="e.g. Software Engineering"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                  />
                </div>

                <div className="mb-1">
                  <label className="ms-form-label" htmlFor="studentPhone">
                    Phone Number
                  </label>

                  <input
                    id="studentPhone"
                    name="phone"
                    type="tel"
                    className="form-control ms-form-control"
                    placeholder="e.g. 0712345678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={30}
                  />
                </div>
              </div>

              <div className="p-3 px-4 border-top d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-light border rounded-3 px-3"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-success rounded-3 px-4 fw-semibold"
                  style={{ backgroundColor: "#237A57", border: "none" }}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      />
                      Saving...
                    </>
                  ) : editingStudent ? (
                    "Save Changes"
                  ) : (
                    "Add Student"
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default ManageStudent;
