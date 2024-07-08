import { FormRobo } from "./components";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
        Bienvenido al Sistema de Predicción de Robos
      </h1>
      <p className="text-md md:text-lg text-justify mb-6">
        Este sistema permite visualizar los robos ocurridos en la zona y utiliza
        modelos predictivos para señalar posibles futuros robos. Navega por el
        mapa para explorar las predicciones y planificar estrategias de
        prevención efectivas.
      </p>
      <FormRobo />
      <iframe
        src="/mapa/mapa-predicciones.html"
        width="100%"
        height="600"
        className="mt-4"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default Home;
