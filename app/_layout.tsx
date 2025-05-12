import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Todo {
  id: string;
  title: string;
}

export default function RootLayout() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { id: Date.now().toString(), title: task }]);
      setTask("");
    }
  };

  const handleDeleteTask = (id: string): void => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="タスクを入力"
          value={task}
          onChangeText={setTask}
        />
        <Button title="追加" onPress={handleAddTask} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    padding: 8,
  },
  item: {
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 5,
  },
});
