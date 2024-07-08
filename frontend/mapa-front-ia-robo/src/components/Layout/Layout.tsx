import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <Sidebar />
      <div className="xl:col-span-5">
        <div className="h-[100vh] overflow-y-scroll p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;