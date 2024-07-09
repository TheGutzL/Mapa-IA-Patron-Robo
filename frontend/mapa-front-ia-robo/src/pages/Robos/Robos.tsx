import { getRobosRequest } from "@/api/robos";
import { RoboSchemaInfer } from "@/models";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const Robos = () => {
  const {
    data: robos,
    error,
    isLoading,
  } = useQuery<RoboSchemaInfer[], Error>({
    queryKey: ["robos"],
    queryFn: getRobosRequest,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los robos</div>;

  // const [robos, setRobos] = useState<RoboSchemaInfer[]>([]);

  // useEffect(() => {
  //   const cargarRobos = async () => {
  //     try {
  //       const robosData = await getRobosRequest();
  //       setRobos(robosData);
  //     } catch (error) {
  //       console.error("Error al cargar los robos:", error);
  //     }
  //   };

  //   cargarRobos();
  // }, []);

  return (
    <div>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Robos</TableCaption>
          <Thead>
            <Tr>
              <Th width={"10%"}>Titulo</Th>
              <Th width={"80%"}>Descripcion</Th>
              <Th width={"10%"}>Fecha</Th>
            </Tr>
          </Thead>
          <Tbody>
            {robos?.map((robo, index) => (
              <Tr key={index}>
                <Td>{robo.incidente}</Td>
                <Td
                  maxW={"200px"}
                  isTruncated
                >
                  {robo.descripcion}
                </Td>
                <Td>
                  {new Date(robo.fecha).toLocaleDateString("es-Es", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Robos;
