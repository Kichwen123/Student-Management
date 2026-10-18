
import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiBookOpen,
  FiArrowUpRight,
  FiClock,
  FiChevronRight,
  FiArrowRight,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import useFetch from "../../hook/UseFetch";


// Update this path if your useFetch hook is stored elsewhere.
const API_URL = "http://localhost:3000/students";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function formatDate(date) {
  if (!date) return "Recently added";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently added";
  }

  return parsedDate.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const TeacherDashboard = () => {
  // Assumes useFetch returns { data, isPending, error }.
  const {
    data: fetchedStudents,
    isPending,
    error,
  } = useFetch(API_URL);

  const students = Array.isArray(fetchedStudents)
    ? fetchedStudents
    : [];

  const recentStudents = useMemo(() => {
    return [...students]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.dateAdded || 0
        ).getTime();

        const dateB = new Date(
          b.createdAt || b.dateAdded || 0
        ).getTime();

        // If neither student has a date, preserve API order.
        if (!a.createdAt && !a.dateAdded &&
            !b.createdAt && !b.dateAdded) {
          return students.indexOf(b) - students.indexOf(a);
        }

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [fetchedStudents]);

  const totalCourses = useMemo(() => {
    const courses = students
      .map((student) => student.course || student.courseName)
      .filter(Boolean);

    return new Set(courses).size;
  }, [students]);

  const stats = [
    {
      title: "Total Students",
      value: isPending ? "—" : students.length,
      description: "Students in your records",
      icon: <FiUsers size={23} />,
      color: "#237A57",
      background: "#E6F4EC",
      link: "/teacher/students",
    },
    {
      title: "Recently Added",
      value: isPending ? "—" : recentStudents.length,
      description: "Latest student records",
      icon: <FiUserPlus size={23} />,
      color: "#B77932",
      background: "#FFF1DC",
      link: "/teacher/students",
    },
    {
      title: "Courses Represented",
      value: isPending ? "—" : totalCourses,
      description: "Unique courses in records",
      icon: <FiBookOpen size={23} />,
      color: "#6D65B5",
      background: "#EEEBFF",
      link: "/teacher/students",
    },
  ];

  return (
    <div className="teacher-dashboard">
      <style>{`
        .teacher-dashboard {
          color: #24352c;
          font-family: inherit;
        }

        .td-welcome {
          background: linear-gradient(120deg, #e2f1e6, #f8f3e8);
          border: 1px solid #e2e9df;
          border-radius: 22px;
          overflow: hidden;
        }

        .td-eyebrow {
          color: #237a57;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .td-heading {
          color: #183b2a;
          font-weight: 800;
          letter-spacing: -0.8px;
        }

        .td-stat-card {
          height: 100%;
          padding: 22px;
          background: #fff;
          border: 1px solid #edf0eb;
          border-radius: 18px;
          box-shadow: 0 5px 20px rgba(25, 58, 41, 0.035);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .td-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(25, 58, 41, 0.09);
        }

        .td-stat-icon {
          width: 49px;
          height: 49px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
        }

        .td-stat-number {
          color: #193c2b;
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 800;
        }

        .td-section-card {
          background: #fff;
          border: 1px solid #edf0eb;
          border-radius: 20px;
          box-shadow: 0 5px 20px rgba(25, 58, 41, 0.035);
          overflow: hidden;
        }

        .td-student-row {
          padding: 15px 20px;
          border-top: 1px solid #f0f2ee;
          transition: background 0.2s ease;
        }

        .td-student-row:hover {
          background: #f8fbf8;
        }

        .td-avatar {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: #237a57;
          background: #e7f3e9;
          font-weight: 800;
        }

        .td-quick-link {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 15px;
          color: #26382d;
          text-decoration: none;
          border: 1px solid #edf0eb;
          border-radius: 15px;
          transition: all 0.2s ease;
        }

        .td-quick-link:hover {
          color: #237a57;
          background: #f3faf4;
          border-color: #cde4d2;
          transform: translateX(3px);
        }

        .td-quick-icon {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 13px;
          color: #237a57;
          background: #e8f4eb;
        }

        .td-muted {
          color: #7b887e;
        }

        @media (max-width: 575px) {
          .td-welcome {
            border-radius: 17px;
          }

          .td-stat-card {
            padding: 17px;
          }

          .td-stat-number {
            font-size: 1.7rem;
          }

          .td-student-row {
            padding: 14px;
          }
        }
      `}</style>

      {/* Welcome banner */}
      <section className="td-welcome p-4 p-lg-5 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <span className="td-eyebrow">
              TEACHER WORKSPACE
            </span>

            <h1 className="td-heading mt-3 mb-2">
              Your classroom,
              <br className="d-none d-sm-block" />
              your impact.
            </h1>

            <p
              className="text-secondary mb-4"
              style={{ maxWidth: "490px", lineHeight: 1.8 }}
            >
              Welcome back! Keep track of your students,
              review their records, and stay organized
              throughout your teaching journey.
            </p>

            <Link
              to="/teacher/students"
              className="btn btn-success px-4 py-3 rounded-3 fw-semibold"
              style={{ backgroundColor: "#237A57", border: "none" }}
            >
              Manage Students
              <FiArrowRight className="ms-2" />
            </Link>
          </div>

          <div className="col-lg-4 d-none d-lg-flex justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: 185,
                height: 185,
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(35,122,87,0.12)",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 135,
                  height: 135,
                  background: "#237A57",
                  color: "white",
                }}
              >
                <FiBookOpen size={66} strokeWidth={1.3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page heading */}
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <h4 className="td-heading mb-1">Dashboard Overview</h4>
          <p className="td-muted mb-0 small">
            A snapshot of your student records.
          </p>
        </div>

        <div className="small td-muted d-flex align-items-center gap-2">
          <FiCalendar />
          {new Date().toLocaleDateString("en-KE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Summary cards */}
      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div className="col-12 col-sm-6 col-xl-4" key={stat.title}>
            <Link
              to={stat.link}
              className="text-decoration-none d-block h-100"
            >
              <div className="td-stat-card">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div
                    className="td-stat-icon"
                    style={{
                      color: stat.color,
                      background: stat.background,
                    }}
                  >
                    {stat.icon}
                  </div>

                  <FiArrowUpRight
                    size={21}
                    className="td-muted"
                  />
                </div>

                <p className="text-secondary small fw-semibold mb-2">
                  {stat.title}
                </p>

                <div className="td-stat-number mb-2">
                  {stat.value}
                </div>

                <p className="td-muted small mb-0">
                  {stat.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* API status */}
      {isPending && (
        <div className="alert alert-light border rounded-3">
          <span
            className="spinner-border spinner-border-sm text-success me-2"
            role="status"
            aria-hidden="true"
          />
          Loading student information...
        </div>
      )}

      {error && (
        <div className="alert alert-warning rounded-3" role="alert">
          <strong>Student records are unavailable.</strong>
          <p className="mb-0 mt-1">
            Check that your student API is running and try again.
            Your dashboard will display student statistics when
            the data becomes available.
          </p>
        </div>
      )}

      {/* Main dashboard content */}
      <div className="row g-4">
        {/* Recently added students */}
        <div className="col-12 col-xl-8">
          <section className="td-section-card h-100">
            <div className="p-4 d-flex justify-content-between align-items-center gap-3">
              <div>
                <h5 className="fw-bold mb-1">Recently Added Students</h5>
                <p className="td-muted small mb-0">
                  The latest student records in your system.
                </p>
              </div>

              <Link
                to="/teacher/students"
                className="btn btn-light btn-sm rounded-3 fw-semibold text-success text-nowrap"
              >
                View all <FiChevronRight className="ms-1" />
              </Link>
            </div>

            {error ? (
              <div className="px-4 pb-4 text-secondary small">
                Student information could not be loaded.
              </div>
            ) : isPending ? (
              <div className="px-4 pb-4 text-secondary small">
                Loading student records...
              </div>
            ) : recentStudents.length === 0 ? (
              <div className="text-center px-4 py-5">
                <div
                  className="td-stat-icon mx-auto mb-3"
                  style={{ background: "#E6F4EC", color: "#237A57" }}
                >
                  <FiUsers size={24} />
                </div>

                <h6 className="fw-bold">No students yet</h6>

                <p className="td-muted small mb-3">
                  Student records will appear here when they are added.
                </p>

                <Link
                  to="/teacher/students"
                  className="btn btn-success btn-sm rounded-3"
                >
                  View student management
                </Link>
              </div>
            ) : (
              recentStudents.map((student, index) => (
                <div
                  className="td-student-row d-flex align-items-center gap-3"
                  key={student.id ?? student.email ?? index}
                >
                  <div className="td-avatar">
                    {getInitials(student.name || student.fullName) || (
                      <FiUser />
                    )}
                  </div>

                  <div className="flex-grow-1" style={{ minWidth: 0 }}>
                    <div className="fw-semibold text-dark text-truncate">
                      {student.name ||
                        student.fullName ||
                        "Unnamed Student"}
                    </div>

                    <div className="td-muted small text-truncate">
                      {student.email || "No email provided"}
                    </div>
                  </div>

                  <div className="d-none d-sm-block text-end">
                    <div className="small fw-semibold text-dark">
                      {student.course ||
                        student.courseName ||
                        "No course assigned"}
                    </div>

                    <div className="td-muted small d-flex align-items-center justify-content-end gap-1 mt-1">
                      <FiClock size={12} />
                      {formatDate(
                        student.createdAt || student.dateAdded
                      )}
                    </div>
                  </div>

                  {student.id != null && (
                    <Link
                      to={`/teacher/students/${student.id}`}
                      className="btn btn-light btn-sm rounded-circle"
                      aria-label={`View ${
                        student.name || "student"
                      }`}
                      title="View student details"
                    >
                      <FiChevronRight />
                    </Link>
                  )}
                </div>
              ))
            )}

            {!isPending && !error && students.length > 0 && (
              <div className="p-3 text-center border-top">
                <Link
                  to="/teacher/students"
                  className="text-success fw-semibold small text-decoration-none"
                >
                  Go to student management <FiArrowRight className="ms-1" />
                </Link>
              </div>
            )}
          </section>
        </div>

        {/* Quick actions */}
        <div className="col-12 col-xl-4">
          <section className="td-section-card p-4 h-100">
            <div className="mb-4">
              <h5 className="fw-bold mb-1">Quick Actions</h5>
              <p className="td-muted small mb-0">
                Common tasks, all in one place.
              </p>
            </div>

            <div className="d-flex flex-column gap-3">
              <Link
                to="/teacher/students"
                className="td-quick-link"
              >
                <div className="td-quick-icon">
                  <FiUsers size={21} />
                </div>

                <div className="flex-grow-1">
                  <div className="fw-semibold">Manage Students</div>
                  <div className="td-muted small">
                    Review student records
                  </div>
                </div>

                <FiChevronRight />
              </Link>

              <Link
                to="/teacher/settings"
                className="td-quick-link"
              >
                <div className="td-quick-icon">
                  <FiUser size={21} />
                </div>

                <div className="flex-grow-1">
                  <div className="fw-semibold">My Account</div>
                  <div className="td-muted small">
                    Update your account settings
                  </div>
                </div>

                <FiChevronRight />
              </Link>

              <Link
                to="/teacher/help"
                className="td-quick-link"
              >
                <div
                  className="td-quick-icon"
                  style={{ background: "#FFF1DC", color: "#B77932" }}
                >
                  <FiBookOpen size={21} />
                </div>

                <div className="flex-grow-1">
                  <div className="fw-semibold">Help & Support</div>
                  <div className="td-muted small">
                    Get help using eduManage
                  </div>
                </div>

                <FiChevronRight />
              </Link>
            </div>

            {/* Helpful reminder */}
            <div
              className="mt-4 p-3 rounded-4"
              style={{ background: "#F5F3EB" }}
            >
              <div className="fw-bold mb-1" style={{ color: "#604C31" }}>
                Stay organized
              </div>

              <p className="small mb-0" style={{ color: "#756A58", lineHeight: 1.7 }}>
                Keep student details accurate and up to date to make
                classroom management easier.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
