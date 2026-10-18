
import { Outlet } from "react-router-dom";
import { BsGrid1X2Fill } from "react-icons/bs";
import { PiStudentBold } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";
import { LuBadgeHelp } from "react-icons/lu";
import TeacherNavbar from "../components/TeacherNavbar";
import Sidebar from "../components/Sidebar";

const TeacherLayout = () => {
    const teacherLinks = [
        {
            name: "Dashboard",
            path: "/teacher",
            icon: <BsGrid1X2Fill />,
        },
        {
            name: "Manage Students",
            path: "/teacher/students",
            icon: <PiStudentBold />,
        },
        {
            name: "Settings",
            path: "/teacher/settings",
            icon: <IoSettingsSharp />,
        },
        {
            name: "Help & Support",
            path: "/teacher/help",
            icon: <LuBadgeHelp />,
        },
    ];

    return (
        <div
            className="d-flex min-vh-100"
            style={{ backgroundColor: "#F4F7F5" }}
        >
            {/* Teacher Sidebar */}
            <aside
                className="d-none d-md-flex flex-column p-3"
                style={{
                    width: "270px",
                    minWidth: "270px",
                    backgroundColor: "#173B2B",
                }}
            >
                <Sidebar links={teacherLinks}
                    title="Teacher Menu"/>
            </aside>

            {/* Main Content */}
            <div
                className="flex-grow-1 d-flex flex-column min-vh-100"
                style={{ minWidth: 0 }}
            >
                {/* Teacher Navbar */}
                <header className="sticky-top bg-white shadow-sm">
                    <TeacherNavbar />
                </header>

                {/* Page Content */}
                <main className="p-3 p-md-4 flex-grow-1">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="px-3 px-md-4 py-3 bg-white border-top text-secondary small d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
                    <span>
                        © {new Date().getFullYear()} eduManage. All rights reserved.
                    </span>

                    <span>
                        Teacher Portal <span className="text-success">•</span>{" "}
                        Empowering Education
                    </span>
                </footer>
            </div>
        </div>
    );
};

export default TeacherLayout;
