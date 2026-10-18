
import { useMemo, useState } from "react";
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
  FiMail,
  FiPhone,
  FiFilter,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import useFetch from "../../hook/UseFetch";

const API_URL = "http://localhost:3000/students";

const emptyStudent = {
  name: "",
  email: "",
  course: "",
  phone: "",
};

const ManageStudents = () => {
  const {
    data: students,
    isPending,
    error,
  } = useFetch(API_URL);

  const studentList = Array.isArray(students) ? students : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState(emptyStudent);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const courses = useMemo(() => {
    return [
      ...new Set(
        studentList
          .map((student) => student.course?.trim())
          .filter(Boolean)
      ),
    ].sort();
  }, [studentList]);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return studentList.filter((student) => {
      const matchesSearch = [
        student.name,
        student.email,
        student.course,
        student.phone,
        student.id,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );

      const matchesCourse =
        courseFilter === "all" ||
        student.course === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [studentList, searchTerm, courseFilter]);

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 4000);
  };

  const openAddForm = () => {
    setEditingStudent(null);
    setFormData(emptyStudent);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || "",
      email: student.email || "",
      course: student.course || "",
      phone: student.phone || "",
    });
    setFormError("");
    setSelectedStudent(null);
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingStudent(null);
    setFormData(emptyStudent);
    setFormError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const studentData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      phone: formData.phone.trim(),
    };

    if (
      !studentData.name ||
      !studentData.email ||
      !studentData.course
    ) {
      setFormError(
        "Please fill in the student's name, email, and course."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentData.email)
    ) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setSaving(true);

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
          `Unable to save student. Server returned ${response.status}.`
        );
      }

      setShowForm(false);
      setEditingStudent(null);
      setFormData(emptyStudent);

      showNotice(
        "success",
        isEditing
          ? "Student information updated successfully."
          : "New student added successfully."
      );

      // Refresh the records after a successful API request.
      window.location.reload();
    } catch (err) {
      setFormError(
        err.message ||
          "Something went wrong. Check that your API is running."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        student.name || "this student"
      }? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/${student.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to delete student. Server returned ${response.status}.`
        );
      }

      if (selectedStudent?.id === student.id) {
        setSelectedStudent(null);
      }

      showNotice("success", "Student record deleted successfully.");

      window.location.reload();
    } catch (err) {
      showNotice(
        "error",
        err.message || "Unable to delete this student."
      );
    }
  };

  const getInitials = (name) =>
    (name || "Student")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <div className="admin-manage-students">
      <style>{`
        .ams-page {
          min-width: 0;
          color: #26372c;
        }

        .ams-heading {
          color: #193c2b;
          font-weight: 800;
          letter-spacing: -.5px;
        }

        .ams-muted {
          color: #7c897f;
        }

        .ams-card {
          background: #fff;
          border: 1px solid #edf0eb;
          border-radius: 18px;
          box-shadow: 0 5px 20px rgba(25,58,41,.035);
        }

        .ams-stat {
          padding: 20px;
          height: 100%;
        }

        .ams-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 14px;
        }

        .ams-input {
          min-height: 45px;
          border: 1px solid #e3e9e1;
          border-radius: 11px;
        }

        .ams-input:focus {
          border-color: #65a581;
          box-shadow: 0 0 0 3px rgba(35,122,87,.1);
        }

        .ams-table th {
          padding: 15px 13px;
          background: #f7faf6;
          color: #718075;
          border-bottom: 1px solid #e9eee7;
          text-transform: uppercase;
          font-size: .73rem;
          letter-spacing: .5px;
          white-space: nowrap;
        }

        .ams-table td {
          padding: 15px 13px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f2ee;
        }

        .ams-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .ams-table tbody tr:hover td {
          background: #fbfdfb;
        }

        .ams-avatar {
          width: 41px;
          height: 41px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 13px;
          background: #e6f4eb;
          color: #237a57;
          font-size: .8rem;
          font-weight: 800;
        }

        .ams-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border: 1px solid #e9eee7;
          border-radius: 10px;
          background: white;
          color: #526458;
          cursor: pointer;
        }

        .ams-action:hover {
          background: #edf6ef;
          color: #237a57;
          border-color: #cfe3d3;
        }

        .ams-delete:hover {
          color: #b93838;
          background: #fff0f0;
          border-color: #f2cccc;
        }

        .ams-overlay {
          position: fixed;
          inset: 0;
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(15,35,24,.55);
          overflow-y: auto;
        }

        .ams-modal {
          width: 100%;
          max-width: 560px;
          max-height: 92vh;
          overflow-y: auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 24px 80px rgba(0,0,0,.2);
        }

        .ams-modal-header {
          padding: 23px;
          border-bottom: 1px solid #edf0eb;
        }

        .ams-modal-body {
          padding: 23px;
        }

        .ams-label {
          display: block;
          font-size: .86rem;
          font-weight: 700;
          margin-bottom: 7px;
          color: #35493b;
        }

        @media (max-width: 575px) {
          .ams-stat { padding: 16px; }
          .ams-modal-header, .ams-modal-body { padding: 18px; }
        }
      `}</style>

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="small fw-bold text-success mb-2">
            EDUMANAGE / STUDENT ADMINISTRATION
          </div>
          <h2 className="ams-heading mb-2">Manage Students</h2>
          <p className="ams-muted mb-0">
            View, register, update, search, and manage student records.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success rounded-3 px-3 py-2 fw-semibold"
          style={{ background: "#237A57", borderColor: "#237A57" }}
          onClick={openAddForm}
        >
          <FiUserPlus className="me-2" />
          Add New Student
        </button>
      </div>

      {/* Notifications */}
      {notice && (
        <div
          className={`alert ${
            notice.type === "success" ? "alert-success" : "alert-danger"
          } rounded-3 d-flex align-items-center gap-2`}
          role="status"
        >
          {notice.type === "success" ? (
            <FiCheckCircle size={20} />
          ) : (
            <FiAlertCircle size={20} />
          )}
          {notice.message}
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="Dismiss message"
            onClick={() => setNotice(null)}
          />
        </div>
      )}

      {/* Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="ams-card ams-stat">
            <div className="d-flex align-items-center gap-3">
              <div
                className="ams-icon"
                style={{ background: "#E6F4EB", color: "#237A57" }}
              >
                <FiUsers size={23} />
              </div>
              <div>
                <div className="small ams-muted mb-1">Total Students</div>
                <div className="fs-3 fw-bold ams-heading">
                  {isPending ? "..." : studentList.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="ams-card ams-stat">
            <div className="d-flex align-items-center gap-3">
              <div
                className="ams-icon"
                style={{ background: "#FFF1DC", color: "#B77932" }}
              >
                <FiBookOpen size={23} />
              </div>
              <div>
                <div className="small ams-muted mb-1">Courses</div>
                <div className="fs-3 fw-bold ams-heading">
                  {courses.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="ams-card ams-stat">
            <div className="d-flex align-items-center gap-3">
              <div
                className="ams-icon"
                style={{ background: "#E6F2FA", color: "#2876A5" }}
              >
                <FiFilter size={23} />
              </div>
              <div>
                <div className="small ams-muted mb-1">Matching Records</div>
                <div className="fs-3 fw-bold ams-heading">
                  {filteredStudents.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <section className="ams-card p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-lg-7">
            <label className="ams-label" htmlFor="studentSearch">
              Search Student Records
            </label>
            <div className="position-relative">
              <FiSearch
                size={19}
                className="position-absolute top-50 translate-middle-y ms-3 ams-muted"
              />
              <input
                id="studentSearch"
                type="search"
                className="form-control ams-input ps-5"
                placeholder="Search by name, email, course, phone, or ID..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-7 col-lg-3">
            <label className="ams-label" htmlFor="courseFilter">
              Filter by Course
            </label>
            <select
              id="courseFilter"
              className="form-select ams-input"
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option value={course} key={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-5 col-lg-2">
            <button
              type="button"
              className="btn btn-light border rounded-3 w-100 py-2"
              onClick={() => {
                setSearchTerm("");
                setCourseFilter("all");
              }}
            >
              <FiRefreshCw className="me-2" />
              Reset
            </button>
          </div>
        </div>

        <div className="small ams-muted mt-3">
          Showing {filteredStudents.length} of {studentList.length} student records
        </div>
      </section>

      {/* Records table */}
      <section className="ams-card overflow-hidden mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 p-3 p-md-4 border-bottom">
          <div>
            <h5 className="ams-heading mb-1">Student Records</h5>
            <p className="small ams-muted mb-0">
              Select an action to view, edit, or delete a record.
            </p>
          </div>
          <span className="badge rounded-pill bg-light text-success border px-3 py-2">
            {filteredStudents.length} records
          </span>
        </div>

        {isPending ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status" />
            <p className="ams-muted mt-3 mb-0">Loading student records...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5 px-3">
            <FiAlertCircle size={35} className="text-danger mb-3" />
            <h6 className="fw-bold">Unable to load student records</h6>
            <p className="ams-muted small mb-2">{error}</p>
            <p className="ams-muted small mb-0">
              Check that JSON Server is running at localhost:3000.
            </p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-5 px-3">
            <FiUsers size={38} className="ams-muted mb-3" />
            <h6 className="fw-bold">No students found</h6>
            <p className="ams-muted small mb-3">
              Try a different search or add a new student record.
            </p>
            <button
              type="button"
              className="btn btn-success rounded-3"
              onClick={openAddForm}
            >
              <FiUserPlus className="me-2" />
              Add Student
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table ams-table mb-0">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="ams-avatar">
                          {getInitials(student.name)}
                        </div>
                        <div>
                          <div className="fw-semibold small">
                            {student.name || "Unnamed Student"}
                          </div>
                          <div className="small ams-muted">
                            {student.email || "No email"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge rounded-pill bg-light text-success border px-3 py-2">
                        {student.course || "Not specified"}
                      </span>
                    </td>

                    <td className="small ams-muted">
                      {student.phone || "Not provided"}
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="ams-action"
                          title="View student details"
                          aria-label={`View ${student.name}`}
                          onClick={() => setSelectedStudent(student)}
                        >
                          <FiEye size={17} />
                        </button>

                        <button
                          type="button"
                          className="ams-action"
                          title="Edit student"
                          aria-label={`Edit ${student.name}`}
                          onClick={() => openEditForm(student)}
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          type="button"
                          className="ams-action ams-delete"
                          title="Delete student"
                          aria-label={`Delete ${student.name}`}
                          onClick={() => handleDelete(student)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Individual student details modal */}
      {selectedStudent && (
        <div
          className="ams-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedStudent(null);
            }
          }}
        >
          <section
            className="ams-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="studentDetailsTitle"
          >
            <div className="ams-modal-header d-flex justify-content-between align-items-center gap-3">
              <div>
                <div className="small text-success fw-bold mb-1">
                  STUDENT PROFILE
                </div>
                <h5
                  id="studentDetailsTitle"
                  className="ams-heading mb-0"
                >
                  Student Details
                </h5>
              </div>
              <button
                type="button"
                className="btn btn-light rounded-3"
                aria-label="Close details"
                onClick={() => setSelectedStudent(null)}
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="ams-modal-body">
              <div className="text-center mb-4">
                <div
                  className="ams-avatar mx-auto mb-3"
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 22,
                    fontSize: "1.3rem",
                  }}
                >
                  {getInitials(selectedStudent.name)}
                </div>
                <h5 className="fw-bold mb-1">
                  {selectedStudent.name || "Unnamed Student"}
                </h5>
                <span className="badge rounded-pill bg-light text-success border">
                  {selectedStudent.course || "Course not specified"}
                </span>
              </div>

              <div className="rounded-4 border p-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3">
                  <FiMail className="text-success mt-1" size={19} />
                  <div>
                    <div className="small ams-muted">Email Address</div>
                    <div className="fw-semibold text-break">
                      {selectedStudent.email || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <FiPhone className="text-success mt-1" size={19} />
                  <div>
                    <div className="small ams-muted">Phone Number</div>
                    <div className="fw-semibold">
                      {selectedStudent.phone || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <FiBookOpen className="text-success mt-1" size={19} />
                  <div>
                    <div className="small ams-muted">Course</div>
                    <div className="fw-semibold">
                      {selectedStudent.course || "Not specified"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <FiUsers className="text-success mt-1" size={19} />
                  <div>
                    <div className="small ams-muted">Student ID</div>
                    <div className="fw-semibold">
                      {selectedStudent.id}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-success rounded-3 flex-grow-1"
                  onClick={() => openEditForm(selectedStudent)}
                >
                  <FiEdit2 className="me-2" />
                  Edit Student
                </button>

                <button
                  type="button"
                  className="btn btn-light border rounded-3"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </button>
              </div>

              <div className="small ams-muted mt-3">
                For the full details page, use the student profile route
                configured in your application.
              </div>

              <Link
                className="small text-success"
                to={`/admin/students/${selectedStudent.id}`}
              >
                Open full student page
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* Add/Edit student modal */}
      {showForm && (
        <div
          className="ams-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !saving
            ) {
              closeForm();
            }
          }}
        >
          <section
            className="ams-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="studentFormTitle"
          >
            <div className="ams-modal-header d-flex justify-content-between align-items-center gap-3">
              <div>
                <div className="small text-success fw-bold mb-1">
                  STUDENT MANAGEMENT
                </div>
                <h5 id="studentFormTitle" className="ams-heading mb-0">
                  {editingStudent ? "Edit Student" : "Add New Student"}
                </h5>
                <p className="small ams-muted mb-0 mt-2">
                  Enter accurate student information below.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-light rounded-3"
                aria-label="Close form"
                disabled={saving}
                onClick={closeForm}
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ams-modal-body">
                {formError && (
                  <div className="alert alert-danger rounded-3 small">
                    {formError}
                  </div>
                )}

                <div className="mb-3">
                  <label className="ams-label" htmlFor="studentName">
                    Full Name *
                  </label>
                  <input
                    id="studentName"
                    name="name"
                    type="text"
                    className="form-control ams-input"
                    placeholder="e.g. Jane Wanjiku"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="ams-label" htmlFor="studentEmail">
                    Email Address *
                  </label>
                  <input
                    id="studentEmail"
                    name="email"
                    type="email"
                    className="form-control ams-input"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="ams-label" htmlFor="studentCourse">
                    Course *
                  </label>
                  <input
                    id="studentCourse"
                    name="course"
                    type="text"
                    className="form-control ams-input"
                    placeholder="e.g. Software Engineering"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    list="existingCourses"
                  />
                  <datalist id="existingCourses">
                    {courses.map((course) => (
                      <option value={course} key={course} />
                    ))}
                  </datalist>
                </div>

                <div className="mb-2">
                  <label className="ams-label" htmlFor="studentPhone">
                    Phone Number
                  </label>
                  <input
                    id="studentPhone"
                    name="phone"
                    type="tel"
                    className="form-control ams-input"
                    placeholder="e.g. 0712345678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <p className="small ams-muted mt-3 mb-0">
                  * Required fields
                </p>
              </div>

              <div className="d-flex justify-content-end gap-2 px-4 pb-4">
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
                  className="btn btn-success rounded-3 px-4"
                  style={{
                    background: "#237A57",
                    borderColor: "#237A57",
                  }}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingStudent ? (
                        <FiCheckCircle className="me-2" />
                      ) : (
                        <FiUserPlus className="me-2" />
                      )}
                      {editingStudent ? "Save Changes" : "Add Student"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
