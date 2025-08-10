import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";

export default function MainPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Base 64</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.primary]}>
          <Text style={styles.buttonText}>Encode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondary]}>
          <Text style={styles.buttonText}>Decode</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter text here"
          placeholderTextColor="#aaa"
          multiline
        />
        <Text style={styles.charCount}>0 Characters</Text>
      </View>

      <View style={styles.rowWrap}>
        {["Cut", "Copy", "Paste", "Clear"].map((label, index) => (
          <TouchableOpacity
            key={index /** nosonar */}
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.checkboxRow}>
        <Text style={styles.checkboxLabel}>Consider space</Text>
        <Checkbox value={false} color="#007AFF" />
      </View>

      <View style={styles.supportBox}>
        <Text style={styles.supportText}>Help the developer:</Text>
        <TouchableOpacity style={styles.coffeeButton}>
          <Text style={styles.coffeeButtonText}>☕ Buy me a coffee</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 20,
    marginTop: 40,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  input: {
    minHeight: 100,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
  charCount: {
    textAlign: "right",
    color: "#777",
    fontSize: 14,
    marginTop: 5,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#E5E5EA",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  actionButtonText: {
    fontWeight: "500",
    color: "#333",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  supportBox: {
    alignItems: "center",
    marginTop: "auto",
  },
  supportText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  coffeeButton: {
    backgroundColor: "#FF9500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  coffeeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
