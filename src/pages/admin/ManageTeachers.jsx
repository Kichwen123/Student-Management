
import { useMemo, useState } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiFilter,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";
import useFetch from "../../hook/UseFetch";

const API_URL = "http://localhost:3000/teachers";

const emptyTeacher = {
  name: "",
  email: "",
  phone: "",
  department: "",
  qualification: "",
  status: "Active",
};

const ManageTeachers = () => {
  const {
    data: teachers,
    isPending,
    error,
  } = useFetch(API_URL);

  const teacherList = Array.isArray(teachers) ? teachers : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [formData, setFormData] = useState(emptyTeacher);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const departments = useMemo(
    () =>
      [
        ...new Set(
          teacherList
            .map((teacher) => teacher.department?.trim())
            .filter(Boolean)
        ),
      ].sort(),
    [teacherList]
  );

  const filteredTeachers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return teacherList.filter((teacher) => {
      const matchesSearch = [
        teacher.name,
        teacher.email,
        teacher.phone,
        teacher.department,
        teacher.qualification,
        teacher.id,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );

      const matchesDepartment =
        departmentFilter === "all" ||
        teacher.department === departmentFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (teacher.status || "Active") === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    teacherList,
    searchTerm,
    departmentFilter,
    statusFilter,
  ]);

  const activeCount = teacherList.filter(
    (teacher) => (teacher.status || "Active") === "Active"
  ).length;

  const showNotice = (type, message) => {
    setNotice({ type, message });
  };

  const openAddForm = () => {
    setEditingTeacher(null);
    setFormData({ ...emptyTeacher });
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      department: teacher.department || "",
      qualification: teacher.qualification || "",
      status: teacher.status || "Active",
    });
    setFormError("");
    setSelectedTeacher(null);
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingTeacher(null);
    setFormData({ ...emptyTeacher });
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

    const teacherData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      department: formData.department.trim(),
      qualification: formData.qualification.trim(),
      status: formData.status,
    };

    if (
      !teacherData.name ||
      !teacherData.email ||
      !teacherData.department
    ) {
      setFormError(
        "Please provide the teacher's name, email, and department."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacherData.email)
    ) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setSaving(true);

    try {
      const isEditing = Boolean(editingTeacher);

      const response = await fetch(
        isEditing
          ? `${API_URL}/${editingTeacher.id}`
          : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to save teacher. Server returned ${response.status}.`
        );
      }

      closeForm();
      showNotice(
        "success",
        isEditing
          ? "Teacher information updated successfully."
          : "Teacher added successfully."
      );

      // Trigger useFetch to reload the teacher list.
      setRefreshKey((previous) => previous + 1);
    } catch (err) {
      setFormError(
        err.message ||
          "Unable to save teacher. Check that the API is running."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (teacher) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        teacher.name || "this teacher"
      }? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/${teacher.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(
          `Unable to delete teacher. Server returned ${response.status}.`
        );
      }

      if (selectedTeacher?.id === teacher.id) {
        setSelectedTeacher(null);
      }

      showNotice("success", "Teacher deleted successfully.");
      setRefreshKey((previous) => previous + 1);
    } catch (err) {
      showNotice(
        "error",
        err.message || "Unable to delete teacher."
      );
    }
  };

  const getInitials = (name) =>
    (name || "Teacher")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  // The key below can be used as a refresh trigger if your hook
  // accepts a URL that changes. See the note after the code.
  const apiUrl = `${API_URL}?_refresh=${refreshKey}`;

  return (
    <TeacherManager
      apiUrl={apiUrl}
      teachers={teacherList}
      isPending={isPending}
      error={error}
      filteredTeachers={filteredTeachers}
      departments={departments}
      activeCount={activeCount}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      departmentFilter={departmentFilter}
      setDepartmentFilter={setDepartmentFilter}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      showForm={showForm}
      setShowForm={setShowForm}
      editingTeacher={editingTeacher}
      selectedTeacher={selectedTeacher}
      setSelectedTeacher={setSelectedTeacher}
      formData={formData}
      formError={formError}
      saving={saving}
      notice={notice}
      setNotice={setNotice}
      openAddForm={openAddForm}
      openEditForm={openEditForm}
      closeForm={closeForm}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      getInitials={getInitials}
    />
  );
};

const TeacherManager = (props) => {
  const {
    apiUrl,
    teachers,
    isPending,
    error,
    filteredTeachers,
    departments,
    activeCount,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    showForm,
    setShowForm,
    editingTeacher,
    selectedTeacher,
    setSelectedTeacher,
    formData,
    formError,
    saving,
    notice,
    setNotice,
    openAddForm,
    openEditForm,
    closeForm,
    handleChange,
    handleSubmit,
    handleDelete,
    getInitials,
  } = props;

  // Refresh records by fetching the current endpoint.
  const {
    data: refreshedTeachers,
    isPending: refreshing,
    error: refreshError,
  } = useFetch(apiUrl);

  const records = Array.isArray(refreshedTeachers)
    ? refreshedTeachers
    : teachers;

  // Apply search and filters to the latest API data.
  const query = searchTerm.trim().toLowerCase();

  const displayedTeachers = records.filter((teacher) => {
    const matchesSearch = [
      teacher.name,
      teacher.email,
      teacher.phone,
      teacher.department,
      teacher.qualification,
      teacher.id,
    ].some((value) =>
      String(value ?? "").toLowerCase().includes(query)
    );

    const matchesDepartment =
      departmentFilter === "all" ||
      teacher.department === departmentFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (teacher.status || "Active") === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const displayedDepartments = [
    ...new Set(
      records.map((teacher) => teacher.department).filter(Boolean)
    ),
  ].sort();

  const displayedActiveCount = records.filter(
    (teacher) => (teacher.status || "Active") === "Active"
  ).length;

  const totalRecords = records.length;

  return (
    <div className="admin-teachers">
      <style>{`
        .atm-page {
          min-width: 0;
          color: #26372c;
        }

        .atm-heading {
          color: #193c2b;
          font-weight: 800;
          letter-spacing: -.5px;
        }

        .atm-muted { color: #7c897f; }

        .atm-card {
          background: #fff;
          border: 1px solid #edf0eb;
          border-radius: 18px;
          box-shadow: 0 5px 20px rgba(25,58,41,.035);
        }

        .atm-stat { padding: 20px; height: 100%; }

        .atm-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border-radius: 14px;
        }

        .atm-input {
          min-height: 45px;
          border: 1px solid #e3e9e1;
          border-radius: 11px;
        }

        .atm-input:focus {
          border-color: #65a581;
          box-shadow: 0 0 0 3px rgba(35,122,87,.1);
        }

        .atm-table th {
          padding: 15px 13px;
          background: #f7faf6;
          color: #718075;
          border-bottom: 1px solid #e9eee7;
          text-transform: uppercase;
          font-size: .73rem;
          letter-spacing: .5px;
          white-space: nowrap;
        }

        .atm-table td {
          padding: 15px 13px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f2ee;
        }

        .atm-table tbody tr:last-child td { border-bottom: 0; }

        .atm-table tbody tr:hover td { background: #fbfdfb; }

        .atm-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 41px;
          height: 41px;
          flex-shrink: 0;
          border-radius: 13px;
          background: #e6f4eb;
          color: #237a57;
          font-size: .8rem;
          font-weight: 800;
        }

        .atm-action {
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

        .atm-action:hover {
          background: #edf6ef;
          color: #237a57;
          border-color: #cfe3d3;
        }

        .atm-delete:hover {
          color: #b93838;
          background: #fff0f0;
          border-color: #f2cccc;
        }

        .atm-overlay {
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

        .atm-modal {
          width: 100%;
          max-width: 570px;
          max-height: 92vh;
          overflow-y: auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 24px 80px rgba(0,0,0,.2);
        }

        .atm-modal-header {
          padding: 23px;
          border-bottom: 1px solid #edf0eb;
        }

        .atm-modal-body { padding: 23px; }

        .atm-label {
          display: block;
          font-size: .86rem;
          font-weight: 700;
          margin-bottom: 7px;
          color: #35493b;
        }

        @media (max-width: 575px) {
          .atm-stat { padding: 16px; }
          .atm-modal-header, .atm-modal-body { padding: 18px; }
        }
      `}</style>

      {/* Page heading */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="small fw-bold text-success mb-2">
            EDUMANAGE / STAFF ADMINISTRATION
          </div>
          <h2 className="atm-heading mb-2">Manage Teachers</h2>
          <p className="atm-muted mb-0">
            Register teachers, manage staff details, and organize departments.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success rounded-3 px-3 py-2 fw-semibold"
          style={{ background: "#237A57", borderColor: "#237A57" }}
          onClick={openAddForm}
        >
          <FiUserPlus className="me-2" />
          Add New Teacher
        </button>
      </div>

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
          <div className="atm-card atm-stat">
            <div className="d-flex align-items-center gap-3">
              <div className="atm-icon" style={{ background: "#E6F4EB", color: "#237A57" }}>
                <FiUsers size={23} />
              </div>
              <div>
                <div className="small atm-muted mb-1">Total Teachers</div>
                <div className="fs-3 fw-bold atm-heading">
                  {isPending || refreshing ? "..." : totalRecords}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="atm-card atm-stat">
            <div className="d-flex align-items-center gap-3">
              <div className="atm-icon" style={{ background: "#E6F2FA", color: "#2876A5" }}>
                <FiCheckCircle size={23} />
              </div>
              <div>
                <div className="small atm-muted mb-1">Active Teachers</div>
                <div className="fs-3 fw-bold atm-heading">
                  {displayedActiveCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="atm-card atm-stat">
            <div className="d-flex align-items-center gap-3">
              <div className="atm-icon" style={{ background: "#FFF1DC", color: "#B77932" }}>
                <FiBriefcase size={23} />
              </div>
              <div>
                <div className="small atm-muted mb-1">Departments</div>
                <div className="fs-3 fw-bold atm-heading">
                  {displayedDepartments.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <section className="atm-card p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-lg-6">
            <label className="atm-label" htmlFor="teacherSearch">
              Search Teachers
            </label>
            <div className="position-relative">
              <FiSearch
                size={19}
                className="position-absolute top-50 translate-middle-y ms-3 atm-muted"
              />
              <input
                id="teacherSearch"
                type="search"
                className="form-control atm-input ps-5"
                placeholder="Search name, email, phone, qualification, or ID..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="atm-label" htmlFor="departmentFilter">
              Department
            </label>
            <select
              id="departmentFilter"
              className="form-select atm-input"
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
            >
              <option value="all">All Departments</option>
              {displayedDepartments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <label className="atm-label" htmlFor="teacherStatusFilter">
              Status
            </label>
            <select
              id="teacherStatusFilter"
              className="form-select atm-input"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-12">
            <button
              type="button"
              className="btn btn-light border rounded-3"
              onClick={() => {
                setSearchTerm("");
                setDepartmentFilter("all");
                setStatusFilter("all");
              }}
            >
              <FiRefreshCw className="me-2" />
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Teacher records */}
      <section className="atm-card overflow-hidden mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 p-3 p-md-4 border-bottom">
          <div>
            <h5 className="atm-heading mb-1">Teacher Records</h5>
            <p className="small atm-muted mb-0">
              View individual profiles or manage staff information.
            </p>
          </div>
          <span className="badge rounded-pill bg-light text-success border px-3 py-2">
            {displayedTeachers.length} records
          </span>
        </div>

        {isPending || refreshing ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status" />
            <p className="atm-muted mt-3 mb-0">Loading teacher records...</p>
          </div>
        ) : error || refreshError ? (
          <div className="text-center py-5 px-3">
            <FiAlertCircle size={35} className="text-danger mb-3" />
            <h6 className="fw-bold">Unable to load teacher records</h6>
            <p className="atm-muted small mb-2">
              {error || refreshError}
            </p>
            <p className="atm-muted small mb-0">
              Make sure your JSON Server has a teachers resource at
              http://localhost:3000/teachers.
            </p>
          </div>
        ) : displayedTeachers.length === 0 ? (
          <div className="text-center py-5 px-3">
            <FiUsers size={38} className="atm-muted mb-3" />
            <h6 className="fw-bold">No teachers found</h6>
            <p className="atm-muted small mb-3">
              Change your filters or register a new teacher.
            </p>
            <button
              type="button"
              className="btn btn-success rounded-3"
              onClick={openAddForm}
            >
              <FiUserPlus className="me-2" />
              Add Teacher
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table atm-table mb-0">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Department</th>
                  <th>Qualification</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedTeachers.map((teacher) => {
                  const status = teacher.status || "Active";

                  return (
                    <tr key={teacher.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="atm-avatar">
                            {getInitials(teacher.name)}
                          </div>
                          <div>
                            <div className="fw-semibold small">
                              {teacher.name || "Unnamed Teacher"}
                            </div>
                            <div className="small atm-muted">
                              {teacher.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="small">
                        {teacher.department || "Not specified"}
                      </td>

                      <td className="small atm-muted">
                        {teacher.qualification || "Not provided"}
                      </td>

                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            status === "Active"
                              ? "bg-success-subtle text-success"
                              : "bg-secondary-subtle text-secondary"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="atm-action"
                            title="View teacher details"
                            aria-label={`View ${teacher.name}`}
                            onClick={() => setSelectedTeacher(teacher)}
                          >
                            <FiEye size={17} />
                          </button>

                          <button
                            type="button"
                            className="atm-action"
                            title="Edit teacher"
                            aria-label={`Edit ${teacher.name}`}
                            onClick={() => openEditForm(teacher)}
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            type="button"
                            className="atm-action atm-delete"
                            title="Delete teacher"
                            aria-label={`Delete ${teacher.name}`}
                            onClick={() => handleDelete(teacher)}
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
      </section>

      {/* Individual teacher details */}
      {selectedTeacher && (
        <div
          className="atm-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTeacher(null);
            }
          }}
        >
          <section
            className="atm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="teacherDetailsTitle"
          >
            <div className="atm-modal-header d-flex justify-content-between align-items-center gap-3">
              <div>
                <div className="small text-success fw-bold mb-1">
                  STAFF PROFILE
                </div>
                <h5 id="teacherDetailsTitle" className="atm-heading mb-0">
                  Teacher Details
                </h5>
              </div>
              <button
                type="button"
                className="btn btn-light rounded-3"
                aria-label="Close details"
                onClick={() => setSelectedTeacher(null)}
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="atm-modal-body">
              <div className="text-center mb-4">
                <div
                  className="atm-avatar mx-auto mb-3"
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 22,
                    fontSize: "1.3rem",
                  }}
                >
                  {getInitials(selectedTeacher.name)}
                </div>
                <h5 className="fw-bold mb-1">
                  {selectedTeacher.name || "Unnamed Teacher"}
                </h5>
                <span className="badge rounded-pill bg-light text-success border">
                  {selectedTeacher.department || "Department not specified"}
                </span>
              </div>

              <div className="rounded-4 border p-3 d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-3">
                  <FiMail className="text-success mt-1" size={19} />
                  <div>
                    <div className="small atm-muted">Email Address</div>
                    <div className="fw-semibold text-break">
                      {selectedTeacher.email || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <FiPhone className="text-success mt-1" size={19} />
                  <div>
                    <div className="small atm-muted">Phone Number</div>
                    <div className="fw-semibold">
                      {selectedTeacher.phone || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <FiBriefcase className="text-success mt-1" size={19} />
                  <div>
                    <div className="small atm-muted">Department</div>
                    <div className="fw-semibold">
                      {selectedTeacher.department || "Not specified"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <FiBookOpen className="text-success mt-1" size={19} />
                  <div>
                    <div className="small atm-muted">Qualification</div>
                    <div className="fw-semibold">
                      {selectedTeacher.qualification || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <FiCalendar className="text-success mt-1" size={19} />
                  <div>
                    <div className="small atm-muted">Teacher ID</div>
                    <div className="fw-semibold">
                      {selectedTeacher.id}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="small atm-muted me-2">Status:</span>
                  <span className="fw-semibold">
                    {selectedTeacher.status || "Active"}
                  </span>
                </div>
              </div>

              <div className="d-flex gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-success rounded-3 flex-grow-1"
                  onClick={() => openEditForm(selectedTeacher)}
                >
                  <FiEdit2 className="me-2" />
                  Edit Teacher
                </button>
                <button
                  type="button"
                  className="btn btn-light border rounded-3"
                  onClick={() => setSelectedTeacher(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Add/Edit teacher form */}
      {showForm && (
        <div
          className="atm-overlay"
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
            className="atm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="teacherFormTitle"
          >
            <div className="atm-modal-header d-flex justify-content-between align-items-center gap-3">
              <div>
                <div className="small text-success fw-bold mb-1">
                  STAFF MANAGEMENT
                </div>
                <h5 id="teacherFormTitle" className="atm-heading mb-0">
                  {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
                </h5>
                <p className="small atm-muted mb-0 mt-2">
                  Enter the teacher's professional and contact information.
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
              <div className="atm-modal-body">
                {formError && (
                  <div className="alert alert-danger rounded-3 small">
                    {formError}
                  </div>
                )}

                <div className="mb-3">
                  <label className="atm-label" htmlFor="teacherName">
                    Full Name *
                  </label>
                  <input
                    id="teacherName"
                    name="name"
                    type="text"
                    className="form-control atm-input"
                    placeholder="e.g. Mary Wanjiku"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="atm-label" htmlFor="teacherEmail">
                    Email Address *
                  </label>
                  <input
                    id="teacherEmail"
                    name="email"
                    type="email"
                    className="form-control atm-input"
                    placeholder="mary@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="atm-label" htmlFor="teacherPhone">
                    Phone Number
                  </label>
                  <input
                    id="teacherPhone"
                    name="phone"
                    type="tel"
                    className="form-control atm-input"
                    placeholder="e.g. 0712345678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="atm-label" htmlFor="teacherDepartment">
                    Department *
                  </label>
                  <input
                    id="teacherDepartment"
                    name="department"
                    type="text"
                    className="form-control atm-input"
                    placeholder="e.g. Computing"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    list="teacherDepartments"
                  />
                  <datalist id="teacherDepartments">
                    {departments.map((department) => (
                      <option value={department} key={department} />
                    ))}
                  </datalist>
                </div>

                <div className="mb-3">
                  <label className="atm-label" htmlFor="teacherQualification">
                    Qualification
                  </label>
                  <input
                    id="teacherQualification"
                    name="qualification"
                    type="text"
                    className="form-control atm-input"
                    placeholder="e.g. BSc Computer Science"
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="atm-label" htmlFor="teacherStatus">
                    Employment Status
                  </label>
                  <select
                    id="teacherStatus"
                    name="status"
                    className="form-select atm-input"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <p className="small atm-muted mt-3 mb-0">
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
                      {editingTeacher ? (
                        <FiCheckCircle className="me-2" />
                      ) : (
                        <FiUserPlus className="me-2" />
                      )}
                      {editingTeacher ? "Save Changes" : "Add Teacher"}
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

export default ManageTeachers;
