import { getMapWithPredictionsRequest, updateMapRequest } from "@/api/mapa";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DownloadIcon, Repeat } from "lucide-react";
import { useEffect, useRef } from "react";
import { FormRobo } from "./components";

const Home = () => {
  const toast = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const {
    isPending,
    data: mapData,
    error,
  } = useQuery({
    queryKey: ["mapContent"],
    queryFn: getMapWithPredictionsRequest,
  });

  useEffect(() => {
    if (mapData) {
      const blob = new Blob([mapData.data], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
    }
  }, [mapData, error, toast]);

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

      toast({
        title: "Descargado con exito",
        description: `El mapa se descargo exitosamente`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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

  const updateMapMutation = useMutation({
    mutationFn: updateMapRequest,
    onSuccess: () => {
      toast({
        title: "Mapa actualizado",
        description: "El mapa se ha actualizado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar el mapa",
        description: `Error: ${error.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onUpdateMap = () => {
    updateMapMutation.mutate();
  };

  return (
    <div className="bg-gray-100 rounded-xl p-4">
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
        <Button
          leftIcon={<DownloadIcon />}
          onClick={onDownloadMap}
          colorScheme="teal"
        >
          Descargar
        </Button>
        <Button
          leftIcon={<Repeat />}
          onClick={onUpdateMap}
          isLoading={updateMapMutation.isPending}
          colorScheme="orange"
        >
          Actualizar
        </Button>
      </div>
      <FormRobo />
      {isPending ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" />
        </div>
      ) : error ? (
        <div className="mt-4">
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>
              Error al cargar el contenido del mapa
            </AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          width="100%"
          height="800"
          className="mt-4"
          style={{ border: "none" }}
        ></iframe>
      )}
    </div>
  );
};

export default Home;
