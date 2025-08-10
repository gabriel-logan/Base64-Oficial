import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MainPage() {
  return (
    <View style={styles.container}>
      <Text>Base 64</Text>
      <View>
        <TouchableOpacity>
          <Text>Encode</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Decode</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput placeholder="Enter text here" />
        <Text>0 Characters</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text>Cut</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Paste</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Consider space</Text>
        <View />
      </View>
      <View>
        <Text>Help the developer: </Text>
        <TouchableOpacity>
          <Text>Buy me a coffee</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
