import { getMapWithPredictionsRequest } from "@/api/mapa";
import { Button, useToast } from "@chakra-ui/react";
import { FormRobo } from "./components";

const Home = () => {
  const toast = useToast();

  const onDownloadMap = async () => {
    try {
      const response = await getMapWithPredictionsRequest();
      const htmlContent = response.data;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "mapa-predicciones.html");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast({
        title: "Error",
        description: `Error al descargar: ${error}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onUpdatedMap = async () => {};

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

      <div className="flex gap-4">
        <Button onClick={onDownloadMap}>Descargar</Button>
        <Button onClick={onUpdatedMap}>Actualizar</Button>
      </div>
      <FormRobo />
      <iframe
        src="/mapa/mapa-predicciones.html"
        width="100%"
        height="800"
        className="mt-4"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default Home;
