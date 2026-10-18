
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiBell,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
  FiRefreshCw,
  FiShield,
  FiCheckCircle,
  FiSettings,
} from "react-icons/fi";

const TeacherSettings = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    bio: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    studentUpdates: true,
    weeklySummary: false,
    compactView: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;

    setPreferences((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    // Connect this handler to your backend profile-update endpoint.
    showMessage(
      "Profile details validated. Connect your backend to save changes permanently."
    );
  };

  const handlePreferencesSubmit = (event) => {
    event.preventDefault();

    // Preferences currently live in component state only.
    showMessage(
      "Preferences updated for this session. Connect persistent storage to keep them after leaving this page."
    );
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (passwords.newPassword.length < 8) {
      showMessage(
        "Your new password must contain at least 8 characters.",
        "danger"
      );
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      showMessage("Your new passwords do not match.", "danger");
      return;
    }

    // Never change passwords only in the frontend.
    // Send the current and new passwords to a secure backend endpoint.
    showMessage(
      "Password details validated. Connect your secure backend password endpoint to complete the change."
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const resetProfile = () => {
    setProfile({
      fullName: "",
      email: "",
      phone: "",
      department: "",
      bio: "",
    });

    setMessage("");
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const renderPasswordInput = (field, label, placeholder) => (
    <div className="mb-3" key={field}>
      <label className="ts-label" htmlFor={field}>
        {label}
      </label>

      <div className="position-relative">
        <input
          id={field}
          name={field}
          type={showPasswords[field] ? "text" : "password"}
          className="form-control ts-input pe-5"
          placeholder={placeholder}
          value={passwords[field]}
          onChange={handlePasswordChange}
          required
          autoComplete={
            field === "current"
              ? "current-password"
              : "new-password"
          }
        />

        <button
          type="button"
          className="btn position-absolute top-50 end-0 translate-middle-y text-secondary"
          onClick={() => togglePasswordVisibility(field)}
          aria-label={showPasswords[field] ? "Hide password" : "Show password"}
        >
          {showPasswords[field] ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="teacher-settings">
      <style>{`
        .teacher-settings {
          color: #26372c;
          min-width: 0;
        }

        .ts-heading {
          color: #193c2b;
          font-weight: 800;
          letter-spacing: -0.6px;
        }

        .ts-muted {
          color: #7c897f;
        }

        .ts-panel {
          background: #fff;
          border: 1px solid #edf0eb;
          border-radius: 20px;
          box-shadow: 0 5px 22px rgba(25, 58, 41, 0.04);
        }

        .ts-cover {
          padding: 28px;
          border-radius: 21px;
          background: linear-gradient(120deg, #e3f1e6, #faf2e5);
          border: 1px solid #e1e9df;
        }

        .ts-label {
          display: block;
          margin-bottom: 7px;
          font-size: 0.87rem;
          font-weight: 700;
          color: #354a3a;
        }

        .ts-input {
          min-height: 46px;
          border: 1px solid #e1e8df;
          border-radius: 11px;
          box-shadow: none !important;
        }

        .ts-input:focus {
          border-color: #63a581;
        }

        .ts-input-icon {
          position: absolute;
          top: 50%;
          left: 14px;
          transform: translateY(-50%);
          color: #7c897f;
          pointer-events: none;
        }

        .ts-input-with-icon {
          padding-left: 42px;
        }

        .ts-nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 14px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: #66766a;
          text-align: left;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .ts-nav-button:hover {
          background: #f3f8f3;
          color: #237a57;
        }

        .ts-nav-button.active {
          background: #e6f4eb;
          color: #237a57;
        }

        .ts-avatar {
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 23px;
          background: #237a57;
          color: white;
          font-size: 1.7rem;
          font-weight: 800;
          box-shadow: 0 8px 18px rgba(35, 122, 87, 0.2);
        }

        .ts-setting-row {
          padding: 17px 0;
          border-bottom: 1px solid #edf0eb;
        }

        .ts-setting-row:last-child {
          border-bottom: 0;
        }

        .ts-switch {
          width: 43px;
          height: 23px;
          cursor: pointer;
          accent-color: #237a57;
        }

        .ts-section-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: #e6f4eb;
          color: #237a57;
          flex-shrink: 0;
        }

        @media (max-width: 575px) {
          .ts-cover {
            padding: 20px;
          }

          .ts-avatar {
            width: 60px;
            height: 60px;
            border-radius: 18px;
          }
        }
      `}</style>

      {/* Page heading */}
      <div className="mb-4">
        <div className="small text-success fw-bold mb-2">
          TEACHER WORKSPACE / SETTINGS
        </div>

        <h2 className="ts-heading mb-2">Account Settings</h2>

        <p className="ts-muted mb-0">
          Manage your personal information, security, and preferences.
        </p>
      </div>

      {/* Welcome banner */}
      <section className="ts-cover mb-4">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="ts-avatar">
            {profile.fullName.trim()
              ? profile.fullName
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0].toUpperCase())
                  .join("")
              : "T"}
          </div>

          <div className="flex-grow-1">
            <span className="small fw-bold text-success">
              YOUR PROFILE
            </span>

            <h4 className="ts-heading mt-1 mb-1">
              {profile.fullName || "Teacher Account"}
            </h4>

            <p className="text-secondary mb-0 small">
              {profile.email || "Add your email address"}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 rounded-pill bg-white px-3 py-2">
            <FiShield className="text-success" />
            <span className="small fw-semibold">Account Settings</span>
          </div>
        </div>
      </section>

      {/* Feedback message */}
      {message && (
        <div
          className={`alert alert-${messageType} rounded-3 d-flex align-items-start gap-2`}
          role="status"
        >
          <FiCheckCircle className="mt-1 flex-shrink-0" />
          <div>{message}</div>
          <button
            type="button"
            className="btn-close ms-auto"
            aria-label="Dismiss message"
            onClick={() => setMessage("")}
          />
        </div>
      )}

      <div className="row g-4">
        {/* Settings navigation */}
        <div className="col-12 col-lg-3">
          <section className="ts-panel p-3">
            <div className="small fw-bold text-uppercase ts-muted px-2 py-2">
              Settings Menu
            </div>

            <button
              type="button"
              className={`ts-nav-button ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("profile");
                setMessage("");
              }}
            >
              <FiUser size={19} />
              Personal Profile
            </button>

            <button
              type="button"
              className={`ts-nav-button ${
                activeTab === "preferences" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("preferences");
                setMessage("");
              }}
            >
              <FiSettings size={19} />
              Preferences
            </button>

            <button
              type="button"
              className={`ts-nav-button ${
                activeTab === "security" ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab("security");
                setMessage("");
              }}
            >
              <FiLock size={19} />
              Password & Security
            </button>

            <div className="border-top mt-3 pt-3 px-2">
              <div className="d-flex align-items-start gap-2">
                <FiShield className="text-success mt-1" size={18} />

                <div>
                  <div className="fw-semibold small">Keep your account safe</div>
                  <p className="ts-muted small mb-0 mt-1">
                    Use a strong password and keep your contact details updated.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Settings content */}
        <div className="col-12 col-lg-9">
          {/* Personal Profile */}
          {activeTab === "profile" && (
            <section className="ts-panel p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="ts-section-icon">
                  <FiUser size={22} />
                </div>

                <div>
                  <h5 className="ts-heading mb-1">Personal Profile</h5>
                  <p className="ts-muted small mb-0">
                    Update your personal and professional details.
                  </p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="ts-label" htmlFor="fullName">
                      Full Name
                    </label>

                    <div className="position-relative">
                      <FiUser className="ts-input-icon" />

                      <input
                        id="fullName"
                        name="fullName"
                        className="form-control ts-input ts-input-with-icon"
                        placeholder="Enter your full name"
                        value={profile.fullName}
                        onChange={handleProfileChange}
                        maxLength={100}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="ts-label" htmlFor="email">
                      Email Address
                    </label>

                    <div className="position-relative">
                      <FiMail className="ts-input-icon" />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control ts-input ts-input-with-icon"
                        placeholder="teacher@example.com"
                        value={profile.email}
                        onChange={handleProfileChange}
                        maxLength={150}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="ts-label" htmlFor="phone">
                      Phone Number
                    </label>

                    <div className="position-relative">
                      <FiPhone className="ts-input-icon" />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-control ts-input ts-input-with-icon"
                        placeholder="Enter your phone number"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        maxLength={30}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="ts-label" htmlFor="department">
                      Department / Subject
                    </label>

                    <div className="position-relative">
                      <FiBookOpen className="ts-input-icon" />

                      <input
                        id="department"
                        name="department"
                        className="form-control ts-input ts-input-with-icon"
                        placeholder="e.g. Computer Science"
                        value={profile.department}
                        onChange={handleProfileChange}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="ts-label" htmlFor="bio">
                      About Me
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      className="form-control ts-input"
                      rows="4"
                      placeholder="Write a short professional introduction..."
                      value={profile.bio}
                      onChange={handleProfileChange}
                      maxLength={500}
                    />

                    <small className="ts-muted">
                      {profile.bio.length}/500 characters
                    </small>
                  </div>
                </div>

                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-light border rounded-3 px-4"
                    onClick={resetProfile}
                  >
                    <FiRefreshCw className="me-2" />
                    Clear Form
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success rounded-3 px-4 fw-semibold"
                    style={{
                      backgroundColor: "#237A57",
                      border: "none",
                    }}
                  >
                    <FiSave className="me-2" />
                    Save Profile
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Preferences */}
          {activeTab === "preferences" && (
            <section className="ts-panel p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="ts-section-icon">
                  <FiBell size={22} />
                </div>

                <div>
                  <h5 className="ts-heading mb-1">Your Preferences</h5>
                  <p className="ts-muted small mb-0">
                    Choose which updates and dashboard options you prefer.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePreferencesSubmit}>
                <h6 className="fw-bold mb-1">Notifications</h6>

                <div className="ts-setting-row d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <div className="fw-semibold">Email Notifications</div>
                    <div className="ts-muted small mt-1">
                      Receive important account updates by email.
                    </div>
                  </div>

                  <input
                    className="form-check-input ts-switch"
                    type="checkbox"
                    name="emailNotifications"
                    checked={preferences.emailNotifications}
                    onChange={handlePreferenceChange}
                    aria-label="Email notifications"
                  />
                </div>

                <div className="ts-setting-row d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <div className="fw-semibold">Student Updates</div>
                    <div className="ts-muted small mt-1">
                      Receive notifications about changes to student records.
                    </div>
                  </div>

                  <input
                    className="form-check-input ts-switch"
                    type="checkbox"
                    name="studentUpdates"
                    checked={preferences.studentUpdates}
                    onChange={handlePreferenceChange}
                    aria-label="Student updates"
                  />
                </div>

                <div className="ts-setting-row d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <div className="fw-semibold">Weekly Summary</div>
                    <div className="ts-muted small mt-1">
                      Receive a weekly summary of student records.
                    </div>
                  </div>

                  <input
                    className="form-check-input ts-switch"
                    type="checkbox"
                    name="weeklySummary"
                    checked={preferences.weeklySummary}
                    onChange={handlePreferenceChange}
                    aria-label="Weekly summary"
                  />
                </div>

                <h6 className="fw-bold mt-4 mb-1">Dashboard Display</h6>

                <div className="ts-setting-row d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <div className="fw-semibold">Compact View</div>
                    <div className="ts-muted small mt-1">
                      Prefer a more compact dashboard layout.
                    </div>
                  </div>

                  <input
                    className="form-check-input ts-switch"
                    type="checkbox"
                    name="compactView"
                    checked={preferences.compactView}
                    onChange={handlePreferenceChange}
                    aria-label="Compact view"
                  />
                </div>

                <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                  <button
                    type="submit"
                    className="btn btn-success rounded-3 px-4 fw-semibold"
                    style={{
                      backgroundColor: "#237A57",
                      border: "none",
                    }}
                  >
                    <FiSave className="me-2" />
                    Save Preferences
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Password & Security */}
          {activeTab === "security" && (
            <section className="ts-panel p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="ts-section-icon">
                  <FiLock size={22} />
                </div>

                <div>
                  <h5 className="ts-heading mb-1">Password & Security</h5>
                  <p className="ts-muted small mb-0">
                    Protect your teacher account.
                  </p>
                </div>
              </div>

              <div
                className="p-3 rounded-3 mb-4 d-flex align-items-start gap-3"
                style={{
                  background: "#f5f8f3",
                  border: "1px solid #e8eee5",
                }}
              >
                <FiShield className="text-success mt-1" size={21} />

                <div>
                  <div className="fw-semibold">Keep your password secure</div>
                  <p className="ts-muted small mb-0 mt-1">
                    Use at least 8 characters. Avoid sharing your password
                    with other people.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                {renderPasswordInput(
                  "current",
                  "Current Password",
                  "Enter your current password"
                )}

                {renderPasswordInput(
                  "newPassword",
                  "New Password",
                  "Enter your new password"
                )}

                {renderPasswordInput(
                  "confirmPassword",
                  "Confirm New Password",
                  "Re-enter your new password"
                )}

                <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                  <button
                    type="submit"
                    className="btn btn-success rounded-3 px-4 fw-semibold"
                    style={{
                      backgroundColor: "#237A57",
                      border: "none",
                    }}
                  >
                    <FiLock className="me-2" />
                    Update Password
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
