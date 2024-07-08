import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-gray-800 text-white">
      <div className="p-5 text-center">Mapa IA Robo</div>
      <ul>
        <li>
          <ChakraLink
            as={Link}
            to="/"
            className="block p-4 hover:bg-gray-700"
            _hover={{ bg: "gray.700" }}
          >
            Inicio
          </ChakraLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
