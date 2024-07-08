import { CustomAxiosError } from "@/api/errors/CustomError";
import { createRoboRequest } from "@/api/robos";
import { RoboSchema, RoboSchemaInfer } from "@/models/Robo";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

const FormRobo = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RoboSchemaInfer>({
    resolver: zodResolver(RoboSchema),
    mode: "onChange",
  });
  const [incidente, setIncidente] = useState("");

  useEffect(() => {
    setValue("casosAnteriores", []);
  }, [setValue]);

  const onSubmit: SubmitHandler<RoboSchemaInfer> = async (data) => {
    try {
      setValue("casosAnteriores", []);
      await createRoboRequest(data);
      toast({
        title: "Robo enviado",
        description: "Se ha enviado la información",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      const errorMessage =
        axiosError.response?.data?.message?.join(", ") || "Error desconocido";
      toast({
        title: "Error",
        description: `Tienes un error hdpt: ${errorMessage}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onError: SubmitErrorHandler<RoboSchemaInfer> = async () => {
    toast({
      title: "Error",
      description: `Error`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleIncidenteChange = (value: string) => {
    setIncidente(value);
    setValue("incidente", value); // Update the form value
  };

  return (
    <>
      <Box
        className="max-w-md mx-auto mt-10"
        borderWidth="lg"
        overflow="hidden"
        p={4}
        shadow="md"
        borderColor="gray.200"
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-2"
        >
          <FormControl id="incidente">
            <FormLabel>Incidente</FormLabel>
            <RadioGroup
              value={incidente}
              onChange={handleIncidenteChange}
            >
              <Stack direction="row">
                <Radio
                  value="robo"
                  {...register("incidente")}
                  colorScheme="teal"
                >
                  Robo
                </Radio>
                <Radio
                  value="asalto"
                  {...register("incidente")}
                  colorScheme="teal"
                >
                  Asalto
                </Radio>
              </Stack>
            </RadioGroup>
            {errors.incidente && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.incidente?.message}
              </p>
            )}
            <FormHelperText>Elige el incidente</FormHelperText>
          </FormControl>

          <FormControl id="tipoIncidente">
            <FormLabel>Tipo de Incidente</FormLabel>
            <Input
              placeholder="Especifique el tipo de incidente"
              {...register("tipoIncidente")}
            />
            {errors.tipoIncidente && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.tipoIncidente?.message}
              </p>
            )}
          </FormControl>

          <FormControl id="ubicacion">
            <FormLabel>Ubicación</FormLabel>
            <Input
              placeholder="Ingrese una dirección"
              {...register("ubicacion")}
            />
            {errors.ubicacion && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.ubicacion?.message}
              </p>
            )}
          </FormControl>

          <FormControl id="distrito">
            <FormLabel>Seleccione el distrito</FormLabel>
            <Select
              placeholder="Seleccionar"
              {...register("distrito")}
            >
              <option value="ICA">Ica</option>
              <option value="PUEBLO NUEVO">Pueblo Nuevo</option>
              <option value="YAUCA DEL ROSARIO">Yauca del Rosario</option>
              <option value="TATE">Tate</option>
              <option value="SUBTANJALLA">Subtanjalla</option>
              <option value="SANTIAGO">Santiago</option>
              <option value="PARCONA">Parcona</option>
              <option value="LA TINGUIÑA">La tinguiña</option>
              <option value="SAN JUAN BAUTISTA">San Juan Bautista</option>
              <option value="OCUCAJE">Ocucaje</option>
              <option value="LOS AQUIJES">Los aquijes</option>
              <option value="SAN JOSE DE LOS MOLINOS">
                San Jose de los Molinos
              </option>
              <option value="SALAS">Salas</option>
              <option value="PACHACUTEC">Pachacutec</option>
            </Select>
            {errors.distrito && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.distrito?.message}
              </p>
            )}
          </FormControl>

          <FormControl id="descripcion">
            <FormLabel>Descripción del Robo</FormLabel>
            <Textarea
              placeholder="Descripción detallada del robo"
              {...register("descripcion")}
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.descripcion?.message}
              </p>
            )}
          </FormControl>

          <FormControl id="fecha">
            <FormLabel className="text-sm font-bold text-gray-700">
              Fecha del Robo
            </FormLabel>
            <Input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Selecciona la fecha"
              type="date"
              {...register("fecha", { valueAsDate: true })}
            />

            {errors.fecha && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.fecha?.message}
              </p>
            )}
          </FormControl>

          <FormControl id="hora">
            <FormLabel className="text-sm font-bold text-gray-700">
              Hora del Robo
            </FormLabel>
            <Input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Selecciona la hora"
              type="time"
              {...register("hora")}
            />
          </FormControl>

          <Button
            leftIcon={<Send />}
            colorScheme="teal"
            variant="solid"
          >
            Enviar
          </Button>
        </form>
      </Box>
      <DevTool control={control} />
    </>
  );
};

export default FormRobo;
