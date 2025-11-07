import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { generateUUID } from "./src/utils/uuid";
import AddEditModal from "./components/AddEditModal";
import PlayerItem from "./components/PlayerItem";
import type {
  Player,
  Category,
} from "../PGL-MyList-FootballPlayer/src/types/types";

const CATEGORIES: Category[] = [
  {
    id: "del",
    name: "Delantero",
    icon: "⚽️",
    color: "#f8b195",
    positionAbbr: "del",
  },
  {
    id: "mc",
    name: "Medio campo",
    icon: "🎯",
    color: "#c06c84",
    positionAbbr: "mc",
  },
  {
    id: "def",
    name: "Defensa",
    icon: "🛡️",
    color: "#355c7d",
    positionAbbr: "def",
  },
  {
    id: "gk",
    name: "Portero",
    icon: "🧤",
    color: "#99b898",
    positionAbbr: "P",
  },
];

// Seed players (real, public football players) to demonstrate the app
const DEFAULT_PLAYERS: Player[] = [
  {
    id: generateUUID(),
    name: "Lionel Messi",
    category: "del",
    price: 120000000,
    marked: false,
    position: "del",
    team: "Inter Miami",
    awards: "Ballon d'Or, Copa America",
  },
  {
    id: generateUUID(),
    name: "Kevin De Bruyne",
    category: "mc",
    price: 90000000,
    marked: true,
    position: "mc",
    team: "Manchester City",
    awards: "Premier League titles",
  },
  {
    id: generateUUID(),
    name: "Virgil van Dijk",
    category: "def",
    price: 75000000,
    marked: false,
    position: "def",
    team: "Liverpool",
    awards: "UEFA Champions League",
  },
  {
    id: generateUUID(),
    name: "Thibaut Courtois",
    category: "gk",
    price: 50000000,
    marked: false,
    position: "P",
    team: "Real Madrid",
    awards: "LaLiga, World Cup Golden Glove",
  },
];

export default function App() {
  const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Player | null>(null);

  // derived totals
  const totals = useMemo(() => {
    const totalCount = players.length;
    const marked = players.filter((p) => p.marked);
    const markedCount = marked.length;
    const markedSum = marked.reduce((s, p) => s + Number(p.price || 0), 0);
    return { totalCount, markedCount, markedSum };
  }, [players]);

  function openAdd() {
    setEditing(null);
    setModalVisible(true);
  }

  function openEdit(p: Player) {
    setEditing(p);
    setModalVisible(true);
  }

  function handleSave(data: Omit<Player, "id"> & { id?: string }) {
    if (data.id) {
      // edit
      setPlayers((prev) =>
        prev.map((p) => (p.id === data.id ? (data as Player) : p))
      );
    } else {
      const newP: Player = {
        ...(data as Omit<Player, "id">),
        id: generateUUID(),
      } as Player;
      setPlayers((prev) => [newP, ...prev]);
    }
    setModalVisible(false);
  }

  function handleDelete(id: string) {
    Alert.alert("Eliminar", "¿Eliminar este jugador?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => setPlayers((prev) => prev.filter((p) => p.id !== id)),
      },
    ]);
  }

  function handleToggle(id: string) {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, marked: !p.marked } : p))
    );
  }

  function handleDeleteAll() {
    if (players.length === 0) return;

    Alert.alert("Borrar todo", "¿Borrar todos los jugadores?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Borrar", style: "destructive", onPress: () => setPlayers([]) },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mercado</Text>

      <View style={styles.header}>
        <View style={styles.counters}>
          <View style={styles.counterItem}>
            <Text style={styles.counterLabel}>Total jugadores:</Text>
            <Text style={styles.counterValue}>{totals.totalCount}</Text>
          </View>
          <View style={styles.counterItem}>
            <Text style={styles.counterLabel}>Seleccionados:</Text>
            <Text style={styles.counterValue}>{totals.markedCount}</Text>
          </View>
          <View style={styles.counterItem}>
            <Text style={styles.counterLabel}>Valor total:</Text>
            <Text style={styles.counterValue}>
              €{totals.markedSum.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {players.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No hay jugadores. Añade alguno con el botón "Añadir".
          </Text>
        </View>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlayerItem
              player={item}
              categories={CATEGORIES}
              onToggle={() => handleToggle(item.id)}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          style={styles.list}
        />
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Text style={styles.addBtnText}>Añadir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.deleteAllBtn,
            players.length === 0 && styles.disabledBtn,
          ]}
          onPress={handleDeleteAll}
          disabled={players.length === 0}
        >
          <Text style={styles.deleteAllText}>Borrar todo</Text>
        </TouchableOpacity>
      </View>

      <AddEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        categories={CATEGORIES}
        initialValue={editing ?? undefined}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5d6", // Fondo amarillo claro como en el diseño
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1a4d1a", // Verde oscuro para el título
  },
  header: {
    marginBottom: 20,
  },
  counters: {
    backgroundColor: "#e8f5e9", // Verde muy claro para el fondo
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4caf50", // Verde principal para el borde
  },
  counterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  counterLabel: {
    fontSize: 16,
    color: "#2e7d32", // Verde medio para las etiquetas
  },
  counterValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a4d1a", // Verde oscuro para los valores
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#2e7d32", // Verde medio para el texto
    textAlign: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    width: "100%",
    gap: 12,
  },
  addBtn: {
    backgroundColor: "#4caf50", // Verde principal como en el diseño
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  addBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteAllBtn: {
    backgroundColor: "#2196f3", // Azul para el botón de borrar como en el diseño
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  deleteAllText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledBtn: {
    opacity: 0.5,
  },
});