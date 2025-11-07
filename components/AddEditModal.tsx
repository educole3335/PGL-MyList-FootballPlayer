import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import type {
  Player,
  Category,
} from "../../PGL-MyList-FootballPlayer/src/types/types";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (p: Player | (Omit<Player, "id"> & { id?: string })) => void;
  categories: Category[];
  initialValue?: Player;
};

export default function AddEditModal({
  visible,
  onClose,
  onSave,
  categories,
  initialValue,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [category, setCategory] = useState(categories[0]?.id ?? "");
  const [team, setTeam] = useState("");
  const [awards, setAwards] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name);
      setPrice(String(initialValue.price));
      setCategory(initialValue.category);
      setTeam(initialValue.team);
      setAwards(initialValue.awards);
    } else {
      setName("");
      setPrice("0");
      setCategory(categories[0]?.id ?? "");
      setTeam("");
      setAwards("");
    }
  }, [initialValue, visible]);

  function validateAndSave() {
    if (!name.trim()) {
      return Alert.alert("Error", "El nombre no puede estar vacío");
    }

    const priceNum = Number(price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      return Alert.alert("Error", "Precio inválido");
    }

    if (!team.trim()) {
      return Alert.alert("Error", "El equipo no puede estar vacío");
    }

    const selectedCategory = categories.find((c) => c.id === category);
    if (!selectedCategory) {
      return Alert.alert("Error", "Selecciona una posición");
    }

    const payload = {
      id: initialValue?.id,
      name: name.trim(),
      price: priceNum,
      category,
      position: selectedCategory.positionAbbr,
      team: team.trim(),
      awards: awards.trim(),
      marked: initialValue?.marked ?? false,
    };

    onSave(payload);
  }

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          {initialValue ? "Editar jugador" : "Añadir jugador"}
        </Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre del jugador"
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="0"
        />

        <Text style={styles.label}>Equipo</Text>
        <TextInput
          style={styles.input}
          value={team}
          onChangeText={setTeam}
          placeholder="Nombre del equipo"
        />

        <Text style={styles.label}>Premios</Text>
        <TextInput
          style={styles.input}
          value={awards}
          onChangeText={setAwards}
          placeholder="Premios o logros"
        />

        <Text style={styles.label}>Posición</Text>
        <View style={styles.categories}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => setCategory(c.id)}
              style={[
                styles.catBtn,
                category === c.id && styles.catBtnActive,
                { borderColor: c.color },
              ]}
            >
              <Text style={styles.catIcon}>{c.icon}</Text>
              <Text style={styles.catText}>{c.name}</Text>
              <Text style={styles.catPosition}>{c.positionAbbr}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.rowActions}>
          <TouchableOpacity style={styles.saveBtn} onPress={validateAndSave}>
            <Text style={styles.saveText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff5d6", // Fondo amarillo claro como en el diseño
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1a4d1a", // Verde oscuro para el título
    textAlign: "center",
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    color: "#2e7d32", // Verde medio para las etiquetas
  },
  input: {
    backgroundColor: "#e8f5e9", // Verde muy claro para los inputs
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4caf50", // Verde principal para los bordes
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  catBtn: {
    padding: 12,
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    minWidth: 100,
  },
  catBtnActive: {
    backgroundColor: "#81c784", // Verde más intenso para la selección
  },
  catIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  catText: {
    fontSize: 12,
    color: "#1a4d1a", // Verde oscuro para el texto
  },
  catPosition: {
    fontSize: 10,
    color: "#2e7d32", // Verde medio para la posición
    marginTop: 2,
  },
  rowActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    gap: 12,
  },
  saveBtn: {
    backgroundColor: "#4caf50", // Verde principal como en el diseño
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#2196f3", // Azul para cancelar como en el diseño
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancelText: {
    color: "#fff",
    fontWeight: "700",
  },
});
