
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiBell,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
  FiRefreshCw,
  FiCheckCircle,
  FiSettings,
  FiGlobe,
} from "react-icons/fi";

const initialProfile = {
  name: "Admin User",
  email: "admin@edumanage.com",
  phone: "",
  role: "System Administrator",
};

const initialPreferences = {
  emailNotifications: true,
  studentUpdates: true,
  teacherUpdates: true,
  securityAlerts: true,
  compactDashboard: false,
};

function AdminSettings() {
  const [profile, setProfile] = useState(initialProfile);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handlePreferenceChange = (name) => {
    setPreferences((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setMessage("");
  };

  const handlePasswordChange = (e) => {
    setPasswords((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (
      passwords.newPassword &&
      passwords.newPassword !== passwords.confirmPassword
    ) {
      setMessage("Your new passwords do not match.");
      return;
    }

    if (
      passwords.newPassword &&
      passwords.newPassword.length < 8
    ) {
      setMessage("Your new password must have at least 8 characters.");
      return;
    }

    // Demo only: changes are held in React state.
    // Connect a backend API to persist settings securely.
    setMessage(
      "Your changes are updated for this session. Connect the backend to save them permanently."
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleReset = () => {
    setProfile(initialProfile);
    setPreferences(initialPreferences);
    setPasswords({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
    setMessage("Settings have been reset to their initial values.");
  };

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const preferenceItems = [
    {
      key: "emailNotifications",
      title: "Email notifications",
      description: "Receive important updates through email.",
      icon: <FiMail />,
    },
    {
      key: "studentUpdates",
      title: "Student updates",
      description: "Get notified when student records change.",
      icon: <FiUser />,
    },
    {
      key: "teacherUpdates",
      title: "Teacher updates",
      description: "Get notified about teacher account changes.",
      icon: <FiBell />,
    },
    {
      key: "securityAlerts",
      title: "Security alerts",
      description: "Receive alerts about important security events.",
      icon: <FiShield />,
    },
    {
      key: "compactDashboard",
      title: "Compact dashboard",
      description: "Prefer a more condensed dashboard layout.",
      icon: <FiSettings />,
    },
  ];

  return (
    <div className="admin-settings">
      <style>{`
        .admin-settings {
          min-height: 100vh;
          background: #f5f7f4;
          padding: 28px;
          color: #26352d;
        }

        .settings-heading {
          color: #173b2b;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .settings-subtitle {
          color: #78857c;
          font-size: 14px;
        }

        .settings-card {
          background: #ffffff;
          border: 1px solid #e8eee8;
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 22px;
          box-shadow: 0 5px 20px rgba(23, 59, 43, 0.04);
        }

        .settings-section-title {
          color: #173b2b;
          font-size: 17px;
          font-weight: 750;
          margin-bottom: 5px;
        }

        .settings-section-description {
          color: #849087;
          font-size: 13px;
          margin-bottom: 22px;
        }

        .settings-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #eaf3ec;
          color: #247044;
          font-size: 19px;
          flex-shrink: 0;
        }

        .settings-label {
          font-size: 13px;
          font-weight: 650;
          color: #45544a;
          margin-bottom: 8px;
        }

        .settings-input {
          border: 1px solid #e0e7e1;
          border-radius: 10px;
          padding: 11px 13px;
          font-size: 14px;
          background: #fcfdfb;
        }

        .settings-input:focus {
          border-color: #39845a;
          box-shadow: 0 0 0 3px rgba(57, 132, 90, 0.1);
        }

        .settings-primary-btn {
          background: #1d5637;
          border: 1px solid #1d5637;
          color: white;
          border-radius: 10px;
          padding: 11px 18px;
          font-weight: 600;
          font-size: 14px;
        }

        .settings-primary-btn:hover {
          background: #286b46;
          border-color: #286b46;
          color: white;
        }

        .settings-secondary-btn {
          background: white;
          border: 1px solid #dce5dd;
          color: #425349;
          border-radius: 10px;
          padding: 11px 16px;
          font-size: 14px;
          font-weight: 600;
        }

        .settings-secondary-btn:hover {
          background: #f0f5f0;
        }

        .settings-preference {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 17px 0;
          border-bottom: 1px solid #edf1ed;
        }

        .settings-preference:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .settings-preference-title {
          font-weight: 650;
          font-size: 14px;
          color: #34463a;
          margin-bottom: 4px;
        }

        .settings-preference-description {
          font-size: 12px;
          color: #89938b;
          margin-bottom: 0;
          line-height: 1.5;
        }

        .settings-toggle {
          width: 42px;
          height: 23px;
          flex-shrink: 0;
          cursor: pointer;
          accent-color: #1d5637;
        }

        .settings-avatar {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background: #1d5637;
          color: white;
          font-size: 24px;
          font-weight: 800;
        }

        .settings-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8f5eb;
          color: #287446;
          padding: 6px 10px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 700;
        }

        .settings-note {
          background: #f3f7f1;
          border-radius: 12px;
          padding: 14px;
          color: #607064;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 576px) {
          .admin-settings {
            padding: 16px;
          }

          .settings-card {
            padding: 18px;
          }
        }
      `}</style>

      {/* Page heading */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="settings-icon">
              <FiSettings />
            </span>
            <span className="text-secondary small">Admin Portal</span>
          </div>

          <h2 className="settings-heading mb-2">Account Settings</h2>

          <p className="settings-subtitle mb-0">
            Manage your profile, preferences and account security.
          </p>
        </div>

        <span className="settings-status">
          <FiCheckCircle />
          Administrator account
        </span>
      </div>

      {message && (
        <div
          className={`alert ${
            message.includes("do not match") ||
            message.includes("at least 8")
              ? "alert-danger"
              : "alert-success"
          } d-flex align-items-start gap-2`}
          role="status"
        >
          <FiCheckCircle className="mt-1 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Profile overview */}
        <div className="settings-card">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="settings-avatar">{initials || "AD"}</div>

            <div className="flex-grow-1">
              <h5 className="settings-heading mb-1">
                {profile.name || "Administrator"}
              </h5>
              <p className="settings-subtitle mb-2">{profile.email}</p>
              <span className="settings-status">
                <FiShield />
                {profile.role}
              </span>
            </div>
          </div>
        </div>

        {/* Personal information */}
        <div className="settings-card">
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="settings-icon">
              <FiUser />
            </span>
            <div>
              <h5 className="settings-section-title mb-1">
                Personal Information
              </h5>
              <p className="settings-section-description mb-0">
                Update the details associated with your administrator profile.
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="settings-label">Full name</label>
              <input
                type="text"
                name="name"
                className="form-control settings-input"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="settings-label">Email address</label>
              <input
                type="email"
                name="email"
                className="form-control settings-input"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="settings-label">Phone number</label>
              <input
                type="tel"
                name="phone"
                className="form-control settings-input"
                value={profile.phone}
                onChange={handleProfileChange}
                placeholder="e.g. 0712345678"
              />
            </div>

            <div className="col-md-6">
              <label className="settings-label">Account role</label>
              <input
                type="text"
                className="form-control settings-input"
                value={profile.role}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="settings-card">
          <div className="d-flex align-items-center gap-3 mb-2">
            <span className="settings-icon">
              <FiBell />
            </span>
            <div>
              <h5 className="settings-section-title mb-1">
                Preferences & Notifications
              </h5>
              <p className="settings-section-description mb-0">
                Choose which updates you want to receive.
              </p>
            </div>
          </div>

          {preferenceItems.map((item) => (
            <div className="settings-preference" key={item.key}>
              <div className="d-flex align-items-start gap-3">
                <span
                  className="text-success mt-1"
                  style={{ fontSize: "18px" }}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="settings-preference-title">
                    {item.title}
                  </p>
                  <p className="settings-preference-description">
                    {item.description}
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                className="settings-toggle"
                checked={preferences[item.key]}
                onChange={() => handlePreferenceChange(item.key)}
                aria-label={item.title}
              />
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="settings-card">
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="settings-icon">
              <FiLock />
            </span>
            <div>
              <h5 className="settings-section-title mb-1">
                Account Security
              </h5>
              <p className="settings-section-description mb-0">
                Enter password details if you want to request a password change.
              </p>
            </div>
          </div>

          <div className="settings-note mb-4">
            <FiShield className="me-2" />
            Never share your password. A real password change must be
            verified and processed securely by your backend.
          </div>

          <div className="row g-3">
            <div className="col-12">
              <label className="settings-label">Current password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="current"
                  className="form-control settings-input pe-5"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y me-1"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <label className="settings-label">New password</label>
              <input
                type="password"
                name="newPassword"
                className="form-control settings-input"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />
            </div>

            <div className="col-md-6">
              <label className="settings-label">Confirm new password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control settings-input"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Repeat new password"
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        {/* Save actions */}
        <div className="d-flex flex-wrap justify-content-end gap-3 mb-4">
          <button
            type="button"
            className="settings-secondary-btn d-flex align-items-center gap-2"
            onClick={handleReset}
          >
            <FiRefreshCw />
            Reset Changes
          </button>

          <button
            type="submit"
            className="settings-primary-btn d-flex align-items-center gap-2"
          >
            <FiSave />
            Save Settings
          </button>
        </div>
      </form>

      {/* Footer note */}
      <div className="text-center py-3">
        <p className="settings-subtitle mb-1">
          <FiGlobe className="me-2" />
          eduManage Administration
        </p>
        <small className="text-secondary">
          Keep your account information accurate and secure.
        </small>
      </div>
    </div>
  );
}

export default AdminSettings;
