
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHelpCircle,
  FiGrid,
  FiUsers,
  FiUserCheck,
  FiSettings,
  FiSearch,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiEye,
  FiShield,
  FiChevronDown,
  FiBookOpen,
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiRefreshCw,
} from "react-icons/fi";

function AdminHelp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const helpTopics = [
    {
      title: "Dashboard Overview",
      description:
        "Understand school statistics and monitor activity across the system.",
      icon: <FiGrid />,
      color: "#e4f2e8",
      iconColor: "#246b43",
      steps: [
        "Open the Admin Dashboard from the sidebar.",
        "Review the total number of students and teachers.",
        "Check recently added records and other available statistics.",
        "Use the dashboard shortcuts to open the relevant management pages.",
      ],
    },
    {
      title: "Manage Students",
      description:
        "View student records, register new students and maintain existing information.",
      icon: <FiUsers />,
      color: "#e8efff",
      iconColor: "#4266ad",
      steps: [
        "Select Manage Students from the admin sidebar.",
        "Use the search box or available filters to find a student.",
        "Select View to inspect an individual student's details.",
        "Select Add Student to register a new student and complete the form.",
        "Use Edit to update a record or Delete to remove it after confirming.",
      ],
    },
    {
      title: "Manage Teachers",
      description:
        "Maintain teacher profiles, contact information and department details.",
      icon: <FiUserCheck />,
      color: "#f9eadc",
      iconColor: "#a45d27",
      steps: [
        "Open Manage Teachers.",
        "Search by teacher name, email or other supported details.",
        "Use filters to narrow the list where available.",
        "Add a teacher using the registration form.",
        "View or edit teacher information as needed.",
        "Confirm carefully before deleting a teacher record.",
      ],
    },
    {
      title: "Account Settings",
      description:
        "Update your profile and choose dashboard and notification preferences.",
      icon: <FiSettings />,
      color: "#f0e7ff",
      iconColor: "#7952a4",
      steps: [
        "Open Settings from the admin sidebar.",
        "Review your name, email address and phone number.",
        "Choose your preferred notification and dashboard settings.",
        "Use the password section if password-change functionality is connected.",
        "Select Save Settings to submit your changes.",
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I add a new student or teacher?",
      answer:
        "Open Manage Students or Manage Teachers and select the relevant Add button. Complete the required fields and submit the form. If the form reports an error, check the required fields and your connection to the backend API.",
    },
    {
      question: "How can I find a particular record?",
      answer:
        "Use the search box on the relevant management page. Enter a name, email address or another supported search value. If filters are available, use them to narrow the results.",
    },
    {
      question: "What should I do if the records do not load?",
      answer:
        "Check your internet or local network connection, confirm that the backend or JSON Server is running, and verify that the API endpoint is correct. Refresh the page after checking these items.",
    },
    {
      question: "Can I recover a deleted record?",
      answer:
        "Recovery depends on your backend and backup configuration. Before deleting a record, verify that it is the correct one. A production system should implement suitable backup and recovery procedures.",
    },
    {
      question: "Why are my settings not saved permanently?",
      answer:
        "The current front-end demonstration may only hold changes in React state. Permanent settings require a backend endpoint and database storage. A password change also requires secure server-side verification.",
    },
    {
      question: "Does adding a teacher automatically create a login account?",
      answer:
        "Not necessarily. Creating a teacher profile and creating login credentials are separate operations unless your backend explicitly connects them. Authentication and role permissions should be managed securely.",
    },
    {
      question: "What should I do if I notice suspicious account activity?",
      answer:
        "Follow your institution's security procedures, report the activity to the responsible technical team, and change your password through the verified security process if necessary. Do not share passwords with other users.",
    },
  ];

  const filteredTopics = helpTopics.filter((topic) => {
    const searchableText = [
      topic.title,
      topic.description,
      ...topic.steps,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm.toLowerCase());
  });

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-help">
      <style>{`
        .admin-help {
          min-height: 100vh;
          padding: 28px;
          background: #f5f7f4;
          color: #2d3d32;
        }

        .help-title {
          color: #173b2b;
          font-weight: 800;
          letter-spacing: -0.6px;
        }

        .help-muted {
          color: #7d8a80;
          font-size: 14px;
          line-height: 1.7;
        }

        .help-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(125deg, #173b2b, #286a46);
          color: #ffffff;
          padding: 34px;
          border-radius: 22px;
          margin-bottom: 30px;
          box-shadow: 0 12px 30px rgba(23, 59, 43, 0.12);
        }

        .help-hero-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.14);
          font-size: 27px;
          margin-bottom: 18px;
        }

        .help-search {
          max-width: 540px;
          background: white;
          border-radius: 12px;
          padding: 5px 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #587061;
          margin-top: 23px;
        }

        .help-search input {
          width: 100%;
          border: none;
          outline: none;
          padding: 10px 0;
          background: transparent;
          color: #263b2e;
          font-size: 14px;
        }

        .help-section-title {
          color: #173b2b;
          font-weight: 750;
          font-size: 20px;
        }

        .help-topic-card {
          height: 100%;
          padding: 23px;
          background: #ffffff;
          border: 1px solid #e7ede7;
          border-radius: 17px;
          box-shadow: 0 5px 20px rgba(23, 59, 43, 0.035);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .help-topic-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(23, 59, 43, 0.08);
        }

        .help-topic-icon {
          width: 47px;
          height: 47px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          font-size: 22px;
          margin-bottom: 18px;
        }

        .help-topic-title {
          color: #244532;
          font-weight: 750;
          font-size: 16px;
          margin-bottom: 9px;
        }

        .help-topic-description {
          color: #849087;
          font-size: 13px;
          line-height: 1.65;
          min-height: 44px;
        }

        .help-steps {
          list-style: none;
          padding: 0;
          margin: 19px 0 0;
        }

        .help-steps li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          margin-bottom: 13px;
          color: #57675b;
          font-size: 13px;
          line-height: 1.65;
        }

        .help-step-number {
          display: flex;
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #eaf3ec;
          color: #246b43;
          font-size: 11px;
          font-weight: 750;
        }

        .help-faq-card {
          background: white;
          border: 1px solid #e7ede7;
          border-radius: 15px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .help-faq-button {
          width: 100%;
          border: none;
          background: white;
          color: #304537;
          padding: 19px 20px;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          font-size: 14px;
          font-weight: 650;
        }

        .help-faq-button:hover {
          background: #f9fbf8;
        }

        .help-faq-answer {
          padding: 0 20px 19px;
          color: #768379;
          font-size: 13px;
          line-height: 1.8;
        }

        .help-support-card {
          border: 1px solid #e3ebe3;
          border-radius: 17px;
          background: #edf5ed;
          padding: 24px;
          height: 100%;
        }

        .help-support-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #d8eadb;
          color: #246b43;
          border-radius: 13px;
          font-size: 21px;
          margin-bottom: 15px;
        }

        .help-action-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #21633e;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          margin-top: 12px;
        }

        .help-action-link:hover {
          color: #153d27;
        }

        .help-note {
          padding: 16px;
          border-radius: 12px;
          background: #fff7e7;
          color: #81632d;
          font-size: 13px;
          line-height: 1.7;
        }

        @media (max-width: 576px) {
          .admin-help {
            padding: 15px;
          }

          .help-hero {
            padding: 23px;
          }

          .help-topic-card {
            padding: 19px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2">
          <FiBookOpen className="text-success" size={21} />
          <span className="text-secondary small">Admin Portal / Help Center</span>
        </div>

        <h2 className="help-title mb-2">Administrator Help Center</h2>

        <p className="help-muted mb-0">
          Learn how to use eduManage, manage school records and resolve
          common dashboard issues.
        </p>
      </div>

      {/* Hero and search */}
      <section className="help-hero">
        <div className="help-hero-icon">
          <FiHelpCircle />
        </div>

        <h3 className="fw-bold mb-2">How can we help you?</h3>

        <p className="mb-0 opacity-75" style={{ fontSize: "14px" }}>
          Search the guides and frequently asked questions below to find
          the information you need.
        </p>

        <div className="help-search">
          <FiSearch size={20} />
          <input
            type="search"
            placeholder="Search dashboard, students, teachers, settings..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setOpenFaq(-1);
            }}
            aria-label="Search help topics and frequently asked questions"
          />
        </div>
      </section>

      {/* Main guides */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
          <div>
            <h4 className="help-section-title mb-1">Administrator Guides</h4>
            <p className="help-muted mb-0">
              Instructions for the main features of your dashboard.
            </p>
          </div>
          <FiBookOpen className="text-success" size={23} />
        </div>

        <div className="row g-4">
          {filteredTopics.map((topic) => (
            <div className="col-12 col-md-6" key={topic.title}>
              <article className="help-topic-card">
                <div
                  className="help-topic-icon"
                  style={{
                    background: topic.color,
                    color: topic.iconColor,
                  }}
                >
                  {topic.icon}
                </div>

                <h5 className="help-topic-title">{topic.title}</h5>

                <p className="help-topic-description mb-0">
                  {topic.description}
                </p>

                <div className="border-top mt-3 pt-3">
                  <p className="small fw-bold text-success mb-2">
                    HOW TO USE
                  </p>

                  <ol className="help-steps">
                    {topic.steps.map((step, index) => (
                      <li key={step}>
                        <span className="help-step-number">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="d-flex align-items-center gap-2 text-secondary small mt-3">
                  <FiCheckCircle className="text-success" />
                  Follow these steps when managing records.
                </div>
              </article>
            </div>
          ))}

          {filteredTopics.length === 0 && (
            <div className="col-12">
              <div className="help-topic-card text-center">
                <FiSearch size={28} className="text-secondary mb-3" />
                <h5 className="help-topic-title">No matching guides found</h5>
                <p className="help-muted mb-0">
                  Try another search term or clear your search.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Common actions */}
      <section className="mb-5">
        <h4 className="help-section-title mb-3">Quick Navigation</h4>

        <div className="row g-3">
          <div className="col-12 col-sm-6 col-xl-3">
            <Link
              to="/admin"
              className="help-topic-card d-flex align-items-center gap-3 text-decoration-none"
            >
              <span className="help-topic-icon mb-0" style={{
                background: "#e4f2e8",
                color: "#246b43",
              }}>
                <FiGrid />
              </span>
              <span>
                <span className="d-block help-topic-title mb-1">
                  Dashboard
                </span>
                <span className="help-muted">View school statistics</span>
              </span>
              <FiArrowRight className="ms-auto text-success" />
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <Link
              to="/admin/students"
              className="help-topic-card d-flex align-items-center gap-3 text-decoration-none"
            >
              <span className="help-topic-icon mb-0" style={{
                background: "#e8efff",
                color: "#4266ad",
              }}>
                <FiUsers />
              </span>
              <span>
                <span className="d-block help-topic-title mb-1">
                  Students
                </span>
                <span className="help-muted">Manage student records</span>
              </span>
              <FiArrowRight className="ms-auto text-success" />
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <Link
              to="/admin/teachers"
              className="help-topic-card d-flex align-items-center gap-3 text-decoration-none"
            >
              <span className="help-topic-icon mb-0" style={{
                background: "#f9eadc",
                color: "#a45d27",
              }}>
                <FiUserCheck />
              </span>
              <span>
                <span className="d-block help-topic-title mb-1">
                  Teachers
                </span>
                <span className="help-muted">Manage teacher records</span>
              </span>
              <FiArrowRight className="ms-auto text-success" />
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <Link
              to="/admin/settings"
              className="help-topic-card d-flex align-items-center gap-3 text-decoration-none"
            >
              <span className="help-topic-icon mb-0" style={{
                background: "#f0e7ff",
                color: "#7952a4",
              }}>
                <FiSettings />
              </span>
              <span>
                <span className="d-block help-topic-title mb-1">
                  Settings
                </span>
                <span className="help-muted">Manage your account</span>
              </span>
              <FiArrowRight className="ms-auto text-success" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-5">
        <div className="mb-3">
          <h4 className="help-section-title mb-1">
            Frequently Asked Questions
          </h4>
          <p className="help-muted mb-0">
            Answers to common administrator questions.
          </p>
        </div>

        {filteredFaqs.map((faq, index) => {
          const isOpen = openFaq === index;

          return (
            <div className="help-faq-card" key={faq.question}>
              <button
                type="button"
                className="help-faq-button"
                onClick={() => setOpenFaq(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className="d-flex align-items-center gap-2">
                  <FiHelpCircle className="text-success flex-shrink-0" />
                  {faq.question}
                </span>

                <FiChevronDown
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                />
              </button>

              {isOpen && (
                <div className="help-faq-answer">{faq.answer}</div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="help-topic-card text-center">
            <p className="help-muted mb-0">
              No matching FAQs. Try a different search phrase.
            </p>
          </div>
        )}
      </section>

      {/* Troubleshooting */}
      <section className="mb-5">
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div className="help-topic-card">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span
                  className="help-topic-icon mb-0"
                  style={{
                    background: "#fff0dc",
                    color: "#9c6420",
                  }}
                >
                  <FiAlertCircle />
                </span>

                <div>
                  <h5 className="help-topic-title mb-1">
                    Troubleshooting
                  </h5>
                  <p className="help-muted mb-0">
                    Try these checks when something is not working.
                  </p>
                </div>
              </div>

              <ul className="help-steps">
                <li>
                  <FiCheckCircle className="text-success mt-1" />
                  <span>
                    <strong>Records not loading:</strong> Check that your
                    API server is running and the endpoint is correct.
                  </span>
                </li>
                <li>
                  <FiCheckCircle className="text-success mt-1" />
                  <span>
                    <strong>Unable to save:</strong> Check required fields,
                    validation messages and the server response.
                  </span>
                </li>
                <li>
                  <FiCheckCircle className="text-success mt-1" />
                  <span>
                    <strong>Unexpected page:</strong> Verify the route and
                    ensure you are signed in with the appropriate role.
                  </span>
                </li>
                <li>
                  <FiCheckCircle className="text-success mt-1" />
                  <span>
                    <strong>Changes disappear:</strong> Confirm that the
                    feature is connected to persistent backend storage.
                  </span>
                </li>
              </ul>

              <button
                type="button"
                className="btn btn-outline-success btn-sm rounded-3 mt-3"
                onClick={() => {
                  setSearchTerm("");
                  setOpenFaq(0);
                }}
              >
                <FiRefreshCw className="me-2" />
                Reset Help Center
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="help-support-card">
              <div className="help-support-icon">
                <FiMail />
              </div>

              <h5 className="help-topic-title">Need Further Assistance?</h5>

              <p className="help-muted">
                If a feature is unavailable or an error persists, contact
                your school's designated technical support team. Include
                the page name, the action you attempted and the error
                message. Never include your password.
              </p>

              <div className="help-note">
                <FiShield className="me-2" />
                For account or security issues, use your institution's
                approved support channel.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-3">
        <p className="help-muted mb-1">
          <FiShield className="me-2 text-success" />
          eduManage Administrator Resources
        </p>
        <small className="text-secondary">
          Use administrator privileges responsibly and protect school data.
        </small>
      </footer>
    </div>
  );
}

export default AdminHelp;
