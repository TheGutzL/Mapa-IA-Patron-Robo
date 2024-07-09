import { IconButton } from "@chakra-ui/react";
import { DoorClosedIcon, LayoutDashboard, Menu, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondaryBackColor2 p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all bg-slate-950 `}
      >
        <div>
          <div className="flex flex-col items-center justify-center mb-2">
            <img
              src="/logo.avif"
              alt="Logo"
              className="w-20 h-20 rounded-full"
            />

            <h1 className="font-bold text-3xl text-white">Mapa IA Robo</h1>
          </div>
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-slate-950 text-white transition-colors"
              >
                <LayoutDashboard className="text-green-300" /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/robos"
                className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-slate-950 text-white transition-colors"
              >
                <User className="text-green-300" /> Robos
              </Link>
            </li>
          </ul>
        </div>
        {/* <nav>
          <Link
            to="/"
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-slate-950 text-white transition-colors"
          >
            <LogOut className="text-green-300" /> Cerrar Sesion
          </Link>
        </nav> */}
      </div>

      <div className="xl:hidden fixed bottom-4 right-4 text-black rounded-full z-50">
        <IconButton
          onClick={() => setShowMenu(!showMenu)}
          color="success"
          size="medium"
          aria-label="add"
        >
          {showMenu ? (
            <DoorClosedIcon className="text-lg" />
          ) : (
            <Menu className="text-lg" />
          )}
        </IconButton>
      </div>
    </>
  );
};

export default Sidebar;
