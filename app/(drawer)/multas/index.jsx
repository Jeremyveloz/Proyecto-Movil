import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import multasAPI from "../../../api/multasAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const [page, setPage] = useState(0);
  const [selectedMulta, setSelectedMulta] = useState({});
  const [multas, setMultas] = useState([]);

  const itemsPerPage = 5;
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;
  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem("userData");
      if (value) {
        const parsedUser = JSON.parse(value);
        const data = await multasAPI.getMultas(parsedUser._id);
        setMultas(data);
      }
    }
    fetchData();
  }, []);
  return (
    <View>
      {
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Detalles de la Multa
          </Text>
          <Text>
            Cédula: {selectedMulta.cedula ? selectedMulta.cedula : ""}
          </Text>
          <Text>
            Nombre del Conductor:
            {selectedMulta.nombreConductor ? selectedMulta.nombreConductor : ""}
          </Text>
          <Text>Placa: {selectedMulta.placa ? selectedMulta.placa : ""}</Text>
          <Text>
            Teléfono: {selectedMulta.telefono ? selectedMulta.telefono : ""}
          </Text>
          <Text>Fecha: {selectedMulta.fecha ? selectedMulta.fecha : ""}</Text>
          <Text>Hora: {selectedMulta.hora ? selectedMulta.hora : ""}</Text>
          <Text>
            Motivo: {selectedMulta.motivo ? selectedMulta.motivo : ""}
          </Text>
          <Text>
            Comentario:
            {selectedMulta.comentario ? selectedMulta.comentario : ""}
          </Text>
          <Text>
            Dirección: {selectedMulta.direccion ? selectedMulta.direccion : ""}
          </Text>
          <Text>
            Motivo: {selectedMulta.motivo ? selectedMulta.motivo : ""}
          </Text>
        </View>
      }
      <DataTable>
        <DataTable.Header
          style={{ backgroundColor: "#146698", marginHorizontal: 5 }}
        >
          <DataTable.Title>Cedula</DataTable.Title>
          <DataTable.Title>Nombre</DataTable.Title>
          <DataTable.Title>Motivo</DataTable.Title>
          <DataTable.Title>Acciones</DataTable.Title>
        </DataTable.Header>

        {multas &&
          multas.slice(from, to).map((item) => (
            <DataTable.Row key={item._id}>
              <DataTable.Cell>{item.cedula}</DataTable.Cell>
              <DataTable.Cell>{item.nombreConductor}</DataTable.Cell>
              <DataTable.Cell>{item.motivo}</DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => setSelectedMulta(item)}>
                  <Text>Detalles</Text>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
      </DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(multas.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${multas.length}`}
        numberOfItemsPerPage={itemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      />
    </View>
  );
}
