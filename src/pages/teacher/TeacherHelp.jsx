
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiUsers,
  FiUserPlus,
  FiEdit3,
  FiTrash2,
  FiSettings,
  FiShield,
  FiBookOpen,
  FiHelpCircle,
  FiMessageCircle,
  FiChevronDown,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiMail,
  FiLayout,
  FiLock,
} from "react-icons/fi";

const TeacherHelp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const guides = [
    {
      icon: <FiLayout size={24} />,
      title: "Understanding Your Dashboard",
      description:
        "Learn how to use the overview cards, recent student records, and quick actions.",
      steps: [
        "Open the Teacher Dashboard from the sidebar.",
        "Review the total number of students and other summary statistics.",
        "Use Quick Actions to navigate to student management or account settings.",
      ],
      color: "#237A57",
      background: "#E6F4EB",
    },
    {
      icon: <FiUserPlus size={24} />,
      title: "Adding a Student",
      description:
        "Register a new student and enter their academic and contact information.",
      steps: [
        "Open Manage Students from the teacher sidebar.",
        "Click the Add Student button.",
        "Enter the student's full name, email, course, and phone number if available.",
        "Submit the form and check that the student appears in the records table.",
      ],
      color: "#B77932",
      background: "#FFF1DC",
    },
    {
      icon: <FiEdit3 size={24} />,
      title: "Editing Student Records",
      description:
        "Keep student details accurate by updating existing records.",
      steps: [
        "Go to Manage Students.",
        "Find the student using the search box or course filter.",
        "Click the pencil icon in the Actions column.",
        "Update the information and click Save Changes.",
      ],
      color: "#6D65B5",
      background: "#EEEBFF",
    },
    {
      icon: <FiTrash2 size={24} />,
      title: "Deleting a Student",
      description:
        "Remove a student record when you are authorized to do so.",
      steps: [
        "Find the student in Manage Students.",
        "Click the trash icon in the Actions column.",
        "Read the confirmation prompt carefully.",
        "Confirm only if you are certain the record should be deleted.",
      ],
      color: "#C45454",
      background: "#FCEAEA",
    },
    {
      icon: <FiSettings size={24} />,
      title: "Managing Account Settings",
      description:
        "Update your teacher profile and choose your dashboard preferences.",
      steps: [
        "Open Settings from the teacher sidebar.",
        "Choose Personal Profile to edit your details.",
        "Choose Preferences to manage notification options.",
        "Open Password & Security to access the password form.",
      ],
      color: "#2876A5",
      background: "#E6F2FA",
    },
    {
      icon: <FiShield size={24} />,
      title: "Keeping Your Account Secure",
      description:
        "Follow good practices to protect your teacher account and student information.",
      steps: [
        "Use a strong, unique password.",
        "Never share your password with another person.",
        "Log out when using a shared computer.",
        "Only view or change student records you are authorized to access.",
      ],
      color: "#3D8064",
      background: "#E7F3EC",
    },
  ];

  const faqs = [
    {
      question: "How do I add a new student?",
      answer:
        "Open Manage Students from the sidebar, click Add Student, complete the required fields, and submit the form. The student will appear in the records list if the API saves the request successfully.",
    },
    {
      question: "How can I find a particular student?",
      answer:
        "Use the search box on the Manage Students page. You can search by name, email address, phone number, or course. You can also select a course from the filter dropdown.",
    },
    {
      question: "Can I edit a student's information?",
      answer:
        "Yes. Find the student in Manage Students and click the pencil icon in the Actions column. Update the required details and select Save Changes.",
    },
    {
      question: "What happens when I delete a student?",
      answer:
        "The application asks you to confirm the deletion. If you confirm and the backend request succeeds, the record is removed. Deletion may be permanent, so verify the student before confirming.",
    },
    {
      question: "Why are student records not loading?",
      answer:
        "Check your internet connection and make sure the student API is running. In your development setup, verify that the API is available at http://localhost:3000/students. Also check the browser console and terminal for errors.",
    },
    {
      question: "Do my settings save automatically?",
      answer:
        "In the current interface, some profile and preference forms only update temporary React state or display validation messages. Permanent saving requires connecting the forms to your backend or another persistent storage solution.",
    },
    {
      question: "How do I change my password?",
      answer:
        "Open Settings, choose Password & Security, and complete the password form. A secure backend must verify your current password and save the new one. The current front-end form alone does not change your actual account password.",
    },
    {
      question: "What should I do if a feature is not working?",
      answer:
        "Refresh the page, check the displayed error message, and verify that your API is running. If the problem continues, record what you were doing and share the error details with your system administrator or support contact.",
    },
  ];

  const searchQuery = searchTerm.trim().toLowerCase();

  const filteredGuides = guides.filter((guide) =>
    [
      guide.title,
      guide.description,
      ...guide.steps,
    ].some((text) => text.toLowerCase().includes(searchQuery))
  );

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(searchQuery)
  );

  const hasResults =
    filteredGuides.length > 0 || filteredFaqs.length > 0;

  return (
    <div className="teacher-help">
      <style>{`
        .teacher-help {
          color: #26372c;
          min-width: 0;
        }

        .th-heading {
          color: #193c2b;
          font-weight: 800;
          letter-spacing: -0.6px;
        }

        .th-muted {
          color: #7c897f;
        }

        .th-hero {
          position: relative;
          overflow: hidden;
          padding: 36px;
          border: 1px solid #e1e9df;
          border-radius: 23px;
          background: linear-gradient(120deg, #e2f1e6, #faf2e5);
        }

        .th-search {
          min-height: 53px;
          border: 1px solid #e1e8df;
          border-radius: 13px;
          box-shadow: 0 6px 18px rgba(25, 58, 41, 0.04);
        }

        .th-search:focus {
          border-color: #65a581;
          box-shadow: 0 0 0 3px rgba(35, 122, 87, 0.1);
        }

        .th-card {
          height: 100%;
          padding: 23px;
          border: 1px solid #edf0eb;
          border-radius: 19px;
          background: #fff;
          box-shadow: 0 5px 22px rgba(25, 58, 41, 0.035);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .th-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(25, 58, 41, 0.08);
        }

        .th-icon {
          display: flex;
          width: 49px;
          height: 49px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
        }

        .th-step {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          margin-bottom: 12px;
          color: #5f6e63;
          font-size: 0.9rem;
          line-height: 1.65;
        }

        .th-step:last-child {
          margin-bottom: 0;
        }

        .th-step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 25px;
          height: 25px;
          border-radius: 8px;
          background: #edf5ed;
          color: #237a57;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .th-faq {
          border: 1px solid #edf0eb;
          border-radius: 14px;
          overflow: hidden;
          background: white;
        }

        .th-faq-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 17px 19px;
          border: 0;
          background: white;
          color: #26372c;
          text-align: left;
          font-weight: 700;
        }

        .th-faq-button:hover {
          background: #f8fbf7;
          color: #237a57;
        }

        .th-faq-answer {
          padding: 0 19px 19px;
          color: #718075;
          font-size: 0.91rem;
          line-height: 1.8;
        }

        .th-support {
          padding: 27px;
          border-radius: 20px;
          color: white;
          background: #173b2b;
        }

        .th-support-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 11px 17px;
          border-radius: 11px;
          background: white;
          color: #173b2b;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .th-support-link:hover {
          color: #173b2b;
          background: #e2f1e6;
        }

        @media (max-width: 575px) {
          .th-hero {
            padding: 23px;
            border-radius: 18px;
          }

          .th-card {
            padding: 19px;
          }

          .th-support {
            padding: 22px;
          }
        }
      `}</style>

      {/* Page heading */}
      <div className="mb-4">
        <div className="small fw-bold text-success mb-2">
          TEACHER WORKSPACE / HELP & SUPPORT
        </div>

        <h2 className="th-heading mb-2">
          How can we help you?
        </h2>

        <p className="th-muted mb-0">
          Find instructions, learn dashboard features, and get answers
          to common questions.
        </p>
      </div>

      {/* Help hero and search */}
      <section className="th-hero mb-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8">
            <span className="badge rounded-pill px-3 py-2 mb-3"
              style={{ background: "#d2e9d8", color: "#237a57" }}>
              <FiBookOpen className="me-2" />
              TEACHER HELP CENTER
            </span>

            <h1 className="th-heading mb-3">
              Everything you need
              <br className="d-none d-sm-block" />
              to teach with confidence.
            </h1>

            <p
              className="text-secondary mb-4"
              style={{ maxWidth: 530, lineHeight: 1.8 }}
            >
              Explore simple guides for managing student records,
              updating your account, and making the most of eduManage.
            </p>

            <div className="position-relative">
              <FiSearch
                size={20}
                className="position-absolute top-50 translate-middle-y ms-3"
                style={{ color: "#7c897f", pointerEvents: "none" }}
              />

              <input
                type="search"
                className="form-control th-search ps-5"
                placeholder="Search guides, questions, or features..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setOpenFaq(-1);
                }}
                aria-label="Search help topics"
              />
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="small text-secondary">Popular:</span>

              {["Add a student", "Edit records", "Password"].map(
                (topic) => (
                  <button
                    type="button"
                    key={topic}
                    className="btn btn-sm rounded-pill bg-white border"
                    style={{ color: "#42654b" }}
                    onClick={() => {
                      setSearchTerm(topic);
                      setOpenFaq(-1);
                    }}
                  >
                    {topic}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="col-lg-4 d-none d-lg-flex justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: 190,
                height: 190,
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(35,122,87,0.12)",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 135,
                  height: 135,
                  background: "#237A57",
                  color: "#fff",
                }}
              >
                <FiHelpCircle size={65} strokeWidth={1.3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick guide links */}
      <div className="d-flex justify-content-between align-items-end gap-3 mb-3">
        <div>
          <h4 className="th-heading mb-1">Teacher Guides</h4>
          <p className="th-muted small mb-0">
            Step-by-step help for your everyday tasks.
          </p>
        </div>

        <span className="small th-muted">
          {filteredGuides.length} guides
        </span>
      </div>

      {filteredGuides.length > 0 ? (
        <div className="row g-3 mb-5">
          {filteredGuides.map((guide) => (
            <div className="col-12 col-md-6 col-xl-4" key={guide.title}>
              <article className="th-card">
                <div
                  className="th-icon mb-3"
                  style={{
                    background: guide.background,
                    color: guide.color,
                  }}
                >
                  {guide.icon}
                </div>

                <h5 className="fw-bold mb-2">{guide.title}</h5>

                <p className="th-muted small mb-4"
                  style={{ lineHeight: 1.75 }}>
                  {guide.description}
                </p>

                <div className="small fw-bold mb-3"
                  style={{ color: guide.color }}>
                  HOW TO DO IT
                </div>

                {guide.steps.map((step, index) => (
                  <div className="th-step" key={step}>
                    <span className="th-step-number">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}

                {guide.title === "Understanding Your Dashboard" && (
                  <Link
                    to="/teacher"
                    className="btn btn-light border rounded-3 w-100 mt-4 fw-semibold"
                  >
                    Open Dashboard <FiArrowRight className="ms-2" />
                  </Link>
                )}

                {guide.title === "Adding a Student" && (
                  <Link
                    to="/teacher/students"
                    className="btn btn-light border rounded-3 w-100 mt-4 fw-semibold"
                  >
                    Manage Students <FiArrowRight className="ms-2" />
                  </Link>
                )}

                {guide.title === "Managing Account Settings" && (
                  <Link
                    to="/teacher/settings"
                    className="btn btn-light border rounded-3 w-100 mt-4 fw-semibold"
                  >
                    Open Settings <FiArrowRight className="ms-2" />
                  </Link>
                )}
              </article>
            </div>
          ))}
        </div>
      ) : (
        <div className="th-card text-center mb-5 py-5">
          <FiSearch size={34} className="th-muted mb-3" />
          <h5 className="fw-bold">No guides found</h5>
          <p className="th-muted mb-3">
            Try a different search term to find the help you need.
          </p>
          <button
            type="button"
            className="btn btn-outline-success rounded-3"
            onClick={() => setSearchTerm("")}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Frequently asked questions */}
      <section className="mb-5">
        <div className="mb-3">
          <h4 className="th-heading mb-1">
            Frequently Asked Questions
          </h4>
          <p className="th-muted small mb-0">
            Quick answers to common teacher questions.
          </p>
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="d-flex flex-column gap-2">
            {filteredFaqs.map((faq) => {
              const originalIndex = faqs.indexOf(faq);
              const isOpen = openFaq === originalIndex;

              return (
                <article className="th-faq" key={faq.question}>
                  <button
                    type="button"
                    className="th-faq-button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaq(isOpen ? -1 : originalIndex)
                    }
                  >
                    <span className="d-flex align-items-center gap-3">
                      <FiMessageCircle
                        size={19}
                        style={{ color: "#237A57", flexShrink: 0 }}
                      />
                      {faq.question}
                    </span>

                    <FiChevronDown
                      size={19}
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div className="th-faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="th-card text-center py-4">
            <p className="th-muted mb-0">
              No FAQs match your search.
            </p>
          </div>
        )}
      </section>

      {/* Troubleshooting */}
      <section className="th-card mb-4">
        <div className="d-flex align-items-start gap-3">
          <div
            className="th-icon"
            style={{ background: "#FFF1DC", color: "#B77932" }}
          >
            <FiAlertCircle size={23} />
          </div>

          <div>
            <h5 className="fw-bold mb-2">
              Having trouble with the dashboard?
            </h5>

            <p className="th-muted small mb-3"
              style={{ lineHeight: 1.8 }}>
              If student records do not load, check that your backend is
              running and that the API endpoint is correct. If an action
              fails, read the error message before trying again.
            </p>

            <ul className="small text-secondary ps-3 mb-0"
              style={{ lineHeight: 2 }}>
              <li>Refresh the page and retry the action.</li>
              <li>Check the browser console for JavaScript errors.</li>
              <li>Check the backend terminal for API errors.</li>
              <li>Make sure the student record contains a valid ID.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Support footer */}
      <section className="th-support">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FiCheckCircle size={20} />
              <span className="small fw-bold text-uppercase">
                WE'RE HERE TO HELP
              </span>
            </div>

            <h4 className="fw-bold mb-2">
              Still need assistance?
            </h4>

            <p
              className="mb-0"
              style={{ color: "#d5e3d9", lineHeight: 1.8 }}
            >
              Contact your system administrator if you encounter
              persistent errors or need help accessing a feature.
            </p>
          </div>

          <div className="col-12 col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
            <Link to="/teacher" className="th-support-link">
              <FiLayout size={18} />
              Dashboard
            </Link>

            <Link to="/teacher/settings" className="th-support-link">
              <FiSettings size={18} />
              Settings
            </Link>
          </div>
        </div>
      </section>

      <p className="text-center th-muted small mt-4 mb-1">
        eduManage Teacher Help Center · Helping you manage your classroom.
      </p>
    </div>
  );
};

export default TeacherHelp;
