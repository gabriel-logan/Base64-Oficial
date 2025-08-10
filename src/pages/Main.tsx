import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import Checkbox from "expo-checkbox";

export default function MainPage() {
  const [inputText, setInputText] = useState("");
  const [considerSpace, setConsiderSpace] = useState(false);

  function encodeToBase64(text: string) {
    if (considerSpace) {
      text = text.replace(/ /g, "_");
    }

    return Buffer.from(text).toString("base64");
  }

  function decodeFromBase64(encodedText: string) {
    const decoded = Buffer.from(encodedText, "base64").toString("utf-8");

    if (considerSpace) {
      return decoded.replace(/_/g, " ");
    }

    return decoded;
  }

  function copyToClipboard(text: string) {
    // Implement copy to clipboard functionality
  }

  function cutToClipboard(text: string) {
    // Implement cut to clipboard functionality
  }

  function pasteFromClipboard() {
    // Implement paste from clipboard functionality
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
            placeholder="Enter or paste text here"
            placeholderTextColor="#aaa"
            maxLength={25000}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <Text style={styles.charCount}>{inputText.length} Characters</Text>
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
      </ScrollView>

      <View style={styles.supportBox}>
        <Text style={styles.supportText}>Help the developer:</Text>
        <TouchableOpacity
          style={styles.coffeeButton}
          onPress={() =>
            Linking.openURL("https://www.buymeacoffee.com/gabriellogan")
          }
        >
          <Text style={styles.coffeeButtonText}>☕ Buy me a coffee</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 20,
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
    minHeight: 180,
    maxHeight: 200,
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
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
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
