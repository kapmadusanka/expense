import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full">
      <div className="h-10 bg-primary-900"></div>
      <div className="h-[calc(100vh-40px)] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
