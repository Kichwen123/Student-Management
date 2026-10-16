
import { Outlet } from "react-router-dom";
import { BsBuildingFillDash } from "react-icons/bs";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardUser } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { LuBadgeHelp } from "react-icons/lu";
import SideBar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";

const AdminLayout = () => {
  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <BsBuildingFillDash />,
    },
    {
      name: "Manage Students",
      path: "/admin/students",
      icon: <PiStudentBold />,
    },
    {
      name: "Manage Teachers",
      path: "/admin/teachers",
      icon: <FaChalkboardUser />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <IoSettingsSharp />,
    },
    {
      name: "Help & Support",
      path: "/admin/help",
      icon: <LuBadgeHelp />,
    },
  ];

  return (
    <div
      className="d-flex min-vh-100"
      style={{ backgroundColor: "#F4F7F5" }}
    >
      {/* Sidebar */}
      <aside
        className="d-none d-md-flex flex-column p-3"
        style={{
          width: 270,
          minWidth: 270,
          backgroundColor: "#173B2B",
        }}
      >
        <SideBar
          links={adminLinks}
          title="Admin Menu"
        />
      </aside>

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100"
        style={{ minWidth: 0 }}
      >
        {/* Top navbar */}
        <header className="bg-white shadow-sm">
          <DashboardNavbar/>
        </header>

        {/* Page content */}
        <main className="p-3 p-md-4 flex-grow-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer
          className="px-4 py-3 bg-white border-top text-secondary small"
        >
          © {new Date().getFullYear()} eduManage. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
