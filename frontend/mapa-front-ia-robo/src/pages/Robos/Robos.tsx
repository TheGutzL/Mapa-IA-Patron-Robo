import { getRobosRequest } from "@/api/robos";
import { RoboSchemaInfer } from "@/models";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
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
    isPending,
  } = useQuery<RoboSchemaInfer[], Error>({
    queryKey: ["robos"],
    queryFn: getRobosRequest,
  });

  if (isPending)
    return (
      <Center h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  if (error)
    return (
      <Alert
        status="error"
        variant="solid"
      >
        <AlertIcon />
        <AlertTitle>Error al cargar los datos</AlertTitle>
        <AlertDescription>
          No se pudieron cargar los datos de los robos. Por favor, intente
          recargar la pagina
        </AlertDescription>
      </Alert>
    );

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
