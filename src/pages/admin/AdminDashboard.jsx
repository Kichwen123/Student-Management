
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiBookOpen,
  FiArrowUpRight,
  FiArrowRight,
  FiCalendar,
  FiActivity,
  FiRefreshCw,
  FiAlertCircle,
  FiSettings,
  FiShield,
} from "react-icons/fi";
import useFetch from "../../hook/UseFetch";

const API_URL = "http://localhost:3000";

const AdminDashboard = () => {
  const {
    data: students,
    isPending: studentsLoading,
    error: studentsError,
  } = useFetch(`${API_URL}/students`);

  const {
    data: teachers,
    isPending: teachersLoading,
    error: teachersError,
  } = useFetch(`${API_URL}/teachers`);

  const studentList = Array.isArray(students) ? students : [];
  const teacherList = Array.isArray(teachers) ? teachers : [];

  // Calculate statistics from the API data.
  const courseCount = useMemo(() => {
    return new Set(
      studentList
        .map((student) => student.course)
        .filter(Boolean)
    ).size;
  }, [studentList]);

  const recentStudents = useMemo(() => {
    return [...studentList]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.dateAdded || 0
        ).getTime();

        const dateB = new Date(
          b.createdAt || b.dateAdded || 0
        ).getTime();

        // If dates are unavailable, preserve the API order.
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [studentList]);

  const courseStats = useMemo(() => {
    const counts = {};

    studentList.forEach((student) => {
      const course = student.course || "Not specified";
      counts[course] = (counts[course] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([course, count]) => ({ course, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [studentList]);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    return (name || "Student")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const summaryCards = [
    {
      title: "Total Students",
      value: studentsLoading
        ? "..."
        : studentsError
          ? "—"
          : studentList.length,
      note: studentsError
        ? "Unable to load records"
        : "Registered student records",
      icon: <FiUsers size={23} />,
      color: "#237A57",
      background: "#E6F4EB",
      link: "/admin/students",
    },
    {
      title: "Total Teachers",
      value: teachersLoading
        ? "..."
        : teachersError
          ? "—"
          : teacherList.length,
      note: teachersError
        ? "Teachers API unavailable"
        : "Registered teacher records",
      icon: <FiUserCheck size={23} />,
      color: "#6D65B5",
      background: "#EEEBFF",
      link: "/admin/teachers",
    },
    {
      title: "Courses Offered",
      value: studentsLoading
        ? "..."
        : studentsError
          ? "—"
          : courseCount,
      note: "Courses represented in student records",
      icon: <FiBookOpen size={23} />,
      color: "#B77932",
      background: "#FFF1DC",
      link: "/admin/students",
    },
    {
      title: "Recent Students",
      value: studentsLoading
        ? "..."
        : studentsError
          ? "—"
          : recentStudents.length,
      note: "Latest five available records",
      icon: <FiUserPlus size={23} />,
      color: "#2876A5",
      background: "#E6F2FA",
      link: "/admin/students",
    },
  ];

  return (
    <div className="admin-dashboard">
      <style>{`
        .admin-dashboard {
          min-width: 0;
          color: #26372c;
        }

        .ad-heading {
          color: #193c2b;
          font-weight: 800;
          letter-spacing: -0.6px;
        }

        .ad-muted {
          color: #7c897f;
        }

        .ad-hero {
          padding: 30px;
          border-radius: 22px;
          border: 1px solid #e0e9df;
          background: linear-gradient(115deg, #e2f1e6, #fbf3e7);
        }

        .ad-card {
          height: 100%;
          padding: 21px;
          background: #fff;
          border: 1px solid #edf0eb;
          border-radius: 18px;
          box-shadow: 0 5px 20px rgba(25, 58, 41, 0.035);
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .ad-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(25, 58, 41, 0.075);
        }

        .ad-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 15px;
        }

        .ad-panel {
          height: 100%;
          background: white;
          border: 1px solid #edf0eb;
          border-radius: 19px;
          padding: 23px;
          box-shadow: 0 5px 20px rgba(25, 58, 41, 0.03);
        }

        .ad-action {
          display: flex;
          align-items: center;
          gap: 13px;
          width: 100%;
          padding: 14px;
          border: 1px solid #edf0eb;
          border-radius: 13px;
          background: #fff;
          color: #26372c;
          text-decoration: none;
          transition: background .2s ease, border-color .2s ease;
        }

        .ad-action:hover {
          background: #f2f8f3;
          border-color: #b8d7c0;
          color: #237a57;
        }

        .ad-table th {
          padding: 13px 10px;
          color: #7c897f;
          font-size: .76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .5px;
          white-space: nowrap;
          background: #f8faf7;
          border-bottom: 1px solid #edf0eb;
        }

        .ad-table td {
          padding: 15px 10px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f2ee;
        }

        .ad-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .ad-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 39px;
          height: 39px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #e6f4eb;
          color: #237a57;
          font-weight: 800;
          font-size: .8rem;
        }

        .ad-progress {
          height: 8px;
          border-radius: 20px;
          background: #edf2ed;
          overflow: hidden;
        }

        .ad-progress-fill {
          height: 100%;
          border-radius: 20px;
          background: #37835c;
          transition: width .3s ease;
        }

        .ad-link {
          color: #237a57;
          text-decoration: none;
          font-weight: 700;
          font-size: .88rem;
        }

        .ad-link:hover {
          color: #145234;
        }

        @media (max-width: 575px) {
          .ad-hero {
            padding: 22px;
            border-radius: 18px;
          }

          .ad-card, .ad-panel {
            padding: 17px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div className="small fw-bold text-success mb-2">
            EDUMANAGE / ADMINISTRATION
          </div>

          <h2 className="ad-heading mb-2">
            Admin Dashboard
          </h2>

          <p className="ad-muted mb-0">
            Monitor your school's records, people, and academic activity.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2 rounded-3 bg-white border px-3 py-2">
          <FiCalendar className="text-success" size={18} />
          <span className="small fw-semibold">
            {new Date().toLocaleDateString("en-KE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Welcome banner */}
      <section className="ad-hero mb-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8">
            <span
              className="badge rounded-pill px-3 py-2 mb-3"
              style={{
                background: "#d2e9d8",
                color: "#237a57",
              }}
            >
              <FiShield className="me-2" />
              ADMINISTRATOR WORKSPACE
            </span>

            <h3 className="ad-heading mb-2">
              Welcome to your school overview.
            </h3>

            <p
              className="text-secondary mb-4"
              style={{ maxWidth: 600, lineHeight: 1.8 }}
            >
              Get a quick picture of student enrolment, teaching staff,
              and the courses represented in your student records.
              Use the shortcuts below to manage your school efficiently.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Link
                to="/admin/students"
                className="btn btn-success rounded-3 px-3 py-2 fw-semibold"
                style={{
                  background: "#237A57",
                  borderColor: "#237A57",
                }}
              >
                <FiUsers className="me-2" />
                Manage Students
              </Link>

              <Link
                to="/admin/teachers"
                className="btn btn-light rounded-3 px-3 py-2 fw-semibold border"
              >
                <FiUserCheck className="me-2" />
                Manage Teachers
              </Link>
            </div>
          </div>

          <div className="col-lg-4 d-none d-lg-flex justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: 175,
                height: 175,
                background: "rgba(255,255,255,.72)",
                border: "1px solid rgba(35,122,87,.12)",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 125,
                  height: 125,
                  color: "white",
                  background: "#237A57",
                }}
              >
                <FiActivity size={58} strokeWidth={1.4} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API error messages */}
      {(studentsError || teachersError) && (
        <div className="alert alert-warning rounded-4 mb-4">
          <div className="d-flex gap-2 align-items-start">
            <FiAlertCircle size={21} className="mt-1 flex-shrink-0" />
            <div>
              <div className="fw-bold mb-1">
                Some dashboard statistics are unavailable
              </div>

              {studentsError && (
                <p className="small mb-1">
                  Students: {studentsError}
                </p>
              )}

              {teachersError && (
                <p className="small mb-0">
                  Teachers: {teachersError}. Check that your
                  `/teachers` API endpoint exists and is running.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        {summaryCards.map((card) => (
          <div className="col-12 col-sm-6 col-xl-3" key={card.title}>
            <Link
              to={card.link}
              className="text-decoration-none text-reset d-block h-100"
            >
              <article className="ad-card">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-4">
                  <div
                    className="ad-icon"
                    style={{
                      background: card.background,
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </div>

                  <FiArrowUpRight
                    size={19}
                    className="ad-muted"
                  />
                </div>

                <div className="small ad-muted fw-semibold mb-2">
                  {card.title}
                </div>

                <div
                  className="fw-bold mb-2"
                  style={{
                    fontSize: "2rem",
                    color: "#193c2b",
                    lineHeight: 1.2,
                  }}
                >
                  {card.value}
                </div>

                <div className="small ad-muted">
                  {card.note}
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      {/* Main dashboard panels */}
      <div className="row g-4 mb-4">
        {/* Recent students */}
        <div className="col-12 col-xl-8">
          <section className="ad-panel">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <h5 className="ad-heading mb-1">
                  Recently Added Students
                </h5>
                <p className="small ad-muted mb-0">
                  A quick look at the latest available student records.
                </p>
              </div>

              <Link to="/admin/students" className="ad-link">
                View all <FiArrowRight className="ms-1" />
              </Link>
            </div>

            {studentsLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status" />
                <p className="small ad-muted mt-3 mb-0">
                  Loading student records...
                </p>
              </div>
            ) : studentsError ? (
              <div className="text-center py-5">
                <FiAlertCircle size={30} className="text-warning mb-2" />
                <p className="ad-muted mb-0">
                  Student records could not be loaded.
                </p>
              </div>
            ) : recentStudents.length === 0 ? (
              <div className="text-center py-5">
                <FiUsers size={35} className="ad-muted mb-3" />
                <h6 className="fw-bold">No student records yet</h6>
                <p className="small ad-muted mb-3">
                  Add your first student to populate this dashboard.
                </p>
                <Link
                  to="/admin/students"
                  className="btn btn-success rounded-3"
                >
                  <FiUserPlus className="me-2" />
                  Add Student
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table ad-table mb-0">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Date Added</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentStudents.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="ad-avatar">
                              {getInitials(student.name)}
                            </div>

                            <div>
                              <div className="fw-semibold small">
                                {student.name || "Unnamed Student"}
                              </div>
                              <div className="small ad-muted">
                                {student.email || "No email provided"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="small">
                          {student.course || "Not specified"}
                        </td>

                        <td className="small ad-muted">
                          {formatDate(
                            student.createdAt || student.dateAdded
                          )}
                        </td>

                        <td>
                          <Link
                            to={`/admin/students/${student.id}`}
                            className="ad-link"
                            aria-label={`View ${student.name || "student"} details`}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        {/* Course distribution */}
        <div className="col-12 col-xl-4">
          <section className="ad-panel">
            <div className="mb-4">
              <h5 className="ad-heading mb-1">
                Course Overview
              </h5>
              <p className="small ad-muted mb-0">
                Student records by course.
              </p>
            </div>

            {studentsLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border spinner-border-sm text-success" />
                <p className="small ad-muted mt-2 mb-0">
                  Calculating statistics...
                </p>
              </div>
            ) : studentsError ? (
              <p className="small ad-muted py-4">
                Course statistics are unavailable.
              </p>
            ) : courseStats.length === 0 ? (
              <div className="text-center py-4">
                <FiBookOpen size={32} className="ad-muted mb-3" />
                <p className="small ad-muted mb-0">
                  Course statistics will appear when student records
                  include course names.
                </p>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-end mb-4">
                  <div>
                    <div className="small ad-muted mb-1">
                      Courses represented
                    </div>
                    <div
                      className="fw-bold"
                      style={{ fontSize: "2rem", color: "#193c2b" }}
                    >
                      {courseCount}
                    </div>
                  </div>

                  <span className="badge rounded-pill bg-light text-success border">
                    {studentList.length} students
                  </span>
                </div>

                {courseStats.map((item) => {
                  const percentage =
                    studentList.length > 0
                      ? (item.count / studentList.length) * 100
                      : 0;

                  return (
                    <div className="mb-4" key={item.course}>
                      <div className="d-flex justify-content-between gap-2 mb-2">
                        <span
                          className="small fw-semibold text-truncate"
                          title={item.course}
                        >
                          {item.course}
                        </span>
                        <span className="small ad-muted">
                          {item.count}
                        </span>
                      </div>

                      <div
                        className="ad-progress"
                        role="progressbar"
                        aria-label={`${item.course} student share`}
                        aria-valuenow={Math.round(percentage)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="ad-progress-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                <Link
                  to="/admin/students"
                  className="btn btn-light border rounded-3 w-100 mt-1 fw-semibold"
                >
                  View Student Records
                  <FiArrowRight className="ms-2" />
                </Link>
              </>
            )}
          </section>
        </div>
      </div>

      {/* Quick actions */}
      <section className="ad-panel">
        <div className="mb-4">
          <h5 className="ad-heading mb-1">Quick Actions</h5>
          <p className="small ad-muted mb-0">
            Navigate directly to common administration tasks.
          </p>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-6 col-xl-3">
            <Link to="/admin/students" className="ad-action">
              <div
                className="ad-icon"
                style={{ background: "#E6F4EB", color: "#237A57" }}
              >
                <FiUserPlus size={22} />
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold small">Manage Students</div>
                <div className="ad-muted small mt-1">
                  Add and update records
                </div>
              </div>
              <FiArrowRight />
            </Link>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <Link to="/admin/teachers" className="ad-action">
              <div
                className="ad-icon"
                style={{ background: "#EEEBFF", color: "#6D65B5" }}
              >
                <FiUserCheck size={22} />
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold small">Manage Teachers</div>
                <div className="ad-muted small mt-1">
                  View teaching staff
                </div>
              </div>
              <FiArrowRight />
            </Link>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <Link to="/admin/settings" className="ad-action">
              <div
                className="ad-icon"
                style={{ background: "#FFF1DC", color: "#B77932" }}
              >
                <FiSettings size={22} />
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold small">System Settings</div>
                <div className="ad-muted small mt-1">
                  Manage preferences
                </div>
              </div>
              <FiArrowRight />
            </Link>
          </div>

          <div className="col-12 col-md-6 col-xl-3">
            <Link to="/admin/help" className="ad-action">
              <div
                className="ad-icon"
                style={{ background: "#E6F2FA", color: "#2876A5" }}
              >
                <FiActivity size={22} />
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold small">Help & Support</div>
                <div className="ad-muted small mt-1">
                  Get assistance
                </div>
              </div>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <p className="text-center ad-muted small mt-4 mb-1">
        eduManage · School Administration Overview
      </p>
    </div>
  );
};

export default AdminDashboard;
