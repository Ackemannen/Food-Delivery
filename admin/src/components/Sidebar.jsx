import { ListCheck, ListOrdered, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-red-300">
      <div className="flex flex-col ml-6 py-4 md:ml-10 md:py-12 lg:ml-16 gap-10">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-2 border border-red-300 border-r-0 p-2 rounded-lg cursor-pointer hover:!bg-red-100 ${
              isActive ? "!bg-red-100" : ""
            }`
          }
        >
          <Plus />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-2 border border-red-300 border-r-0 p-2 rounded-lg cursor-pointer hover:!bg-red-100 ${
              isActive ? "!bg-red-100" : ""
            }`
          }
        >
          <ListOrdered />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 border border-red-300 border-r-0 p-2 rounded-lg cursor-pointer hover:!bg-red-100 ${
              isActive ? "!bg-red-100" : ""
            }`
          }
        >
          <ListCheck />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
