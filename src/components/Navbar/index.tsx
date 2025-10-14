import { PersonCircle } from "react-ionicons";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 h-[70px] flex items-center justify-between px-6 border-b border-slate-300 bg-white z-50">
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonCircle color="#2563eb" width="28px" height="28px" />
        <span className="text-blue-500 font-semibold md:text-lg text-sm whitespace-nowrap">
          Kanban Board
        </span>
      </div>
    </div>
  );
};

export default Navbar;
