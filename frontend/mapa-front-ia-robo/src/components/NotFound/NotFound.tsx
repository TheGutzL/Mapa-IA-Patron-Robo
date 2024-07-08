import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gray-800 w-screen h-screen justify-center items-center flex flex-col gap-4">
      <span className="text-8xl font-bold text-blue-400">404</span>
      <p className="text-4xl font-semibold text-gray-300 text-center">
        Pagina no encontrada
      </p>
      <div className="flex items-center justify-center">
        <span className="flex-1 text-gray-300 text-center">
          La pagina que estas buscando no existe o un error ocurrio.{" "}
          <Link
            to=".."
            relative="path"
            className="hover:underline hover:text-gray-100 font-semibold transition-all"
          >
            Volver Atras
          </Link>{" "}
          o
          <Link
            to="/"
            className="hover:underline hover:text-gray-100 font-semibold transition-all"
          >
            {" "}
            Regresar al inicio
          </Link>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
