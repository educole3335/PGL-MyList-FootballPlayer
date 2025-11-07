import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type {
  Player,
  Category,
} from "../../PGL-MyList-FootballPlayer/src/types/types";

type Props = {
  player: Player;
  categories: Category[];
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PlayerItem({
  player,
  categories,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const category = categories.find((c) => c.id === player.category);

  return (
    <View style={[styles.container, player.marked && styles.marked]}>
      {/* Left: avatar with position text */}
      <View style={styles.avatarAndInfo}>
        <View
          style={[styles.avatar, { borderColor: category?.color ?? "#ccc" }]}
        >
          <Text style={styles.avatarText}>{player.position}</Text>
        </View>

        <View style={styles.mainInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.catIcon}>{category?.icon ?? ""}</Text>
            <Text style={styles.name}>{player.name}</Text>
          </View>

          <View style={styles.centerRow}>
            <View style={styles.iconText}>
              <Text style={styles.icon}>🏟️</Text>
              <Text style={styles.small}>{player.team}</Text>
            </View>
            <View style={styles.iconText}>
              <Text style={styles.icon}>🏆</Text>
              <Text style={styles.small}>{player.awards || "-"}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Right column: checkbox top, price bottom */}
      <View style={styles.rightCol}>
        <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
          <Text style={styles.checkboxText}>{player.marked ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <View style={styles.rightBottom}>
          <Text style={styles.price}>€{Number(player.price).toFixed(2)}</Text>

          <View style={styles.rowBtns}>
            <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={[styles.actionBtn, styles.deleteBtn]}
            >
              <Text style={[styles.actionText, { color: "#fff" }]}>Borrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#4caf50", // Verde principal como en el diseño
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "space-between",
  },
  marked: {
    borderWidth: 2,
    borderColor: "#2e7d32", // Verde medio para el borde cuando está marcado
  },
  avatarAndInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5d889ff", //Para el fondo
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 2,
  },
  avatarText: {
    fontWeight: "700",
    color: "#1a4d1a", // Verde oscuro para el texto
  },
  mainInfo: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  catIcon: {
    marginRight: 8,
    fontSize: 18,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
  centerRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  icon: { marginRight: 6 },
  small: {
    color: "#e8f5e9", // Verde muy claro para el texto pequeño
    fontSize: 12,
  },
  rightCol: {
    width: 110,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  checkbox: { padding: 6 },
  checkboxText: { fontSize: 18 },
  rightBottom: { alignItems: "flex-end" },
  price: {
    fontWeight: "900",
    fontSize: 14,
    color: "#fff",
    marginBottom: 6,
  },
  rowBtns: {
    flexDirection: "row",
    marginTop: 6,
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e8f5e9", // Verde muy claro para el botón
    borderRadius: 6,
    marginLeft: 6,
  },
  deleteBtn: {
    backgroundColor: "#2196f3", // Azul para el botón de borrar como en el diseño
  },
  actionText: {
    color: "#1a4d1a", // Verde oscuro para el texto
    fontWeight: "700",
  },
});
