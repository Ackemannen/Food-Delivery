import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-1 px-16 border-b border-red-300">
      <h1 className="text-2xl md:!text-4xl font-bold text-red-600">
        Foodel Admin
      </h1>
      <div className="flex items-center p-2 bg-red-300 rounded-full cursor-pointer">
        <User className="w-6 h-6 md:w-8 md:h-8" />
      </div>
    </div>
  );
};

export default Navbar;
