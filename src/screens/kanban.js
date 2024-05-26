import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TrashIcon } from 'react-native-heroicons/outline';

const KanbanScreen = ({ route }) => {
  const { title, description } = route.params;
  const navigation = useNavigation();
  const [tasks, setTasks] = useState({
    todo: [{ id: 1, text: 'Sample Task' }],
    inProgress: [],
    done: [],
  });
  const [newTask, setNewTask] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks(prevTasks => ({
        ...prevTasks,
        todo: [...prevTasks.todo, { id: Date.now(), text: newTask }],
      }));
      setNewTask('');
    }
  };

  const moveTask = (task, from, to) => {
    setTasks(prevTasks => {
      const fromTasks = prevTasks[from].filter(t => t.id !== task.id);
      const toTasks = [...prevTasks[to], task];
      return {
        ...prevTasks,
        [from]: fromTasks,
        [to]: toTasks,
      };
    });
  };

  const deleteTask = (task, column) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [column]: prevTasks[column].filter(t => t.id !== task.id),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.description}>Descrição: {description}</Text>
        <View style={styles.newTaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adicionar task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.kanban}>
          <View style={[styles.column, { borderColor: 'red' }]}>
            <Text style={styles.columnTitle}>To Do</Text>
            {tasks.todo.map(task => (
              <TouchableOpacity key={task.id} onPress={() => moveTask(task, 'todo', 'inProgress')}>
                <View style={styles.taskContainer}>
                  <Text style={styles.task}>{task.text}</Text>
                  <TouchableOpacity onPress={() => deleteTask(task, 'todo')}>
                    <TrashIcon name="trash" size={24} color="#8080D7" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.column, { borderColor: 'yellow' }]}>
            <Text style={styles.columnTitle}>In Progress</Text>
            {tasks.inProgress.map(task => (
              <TouchableOpacity key={task.id} onPress={() => moveTask(task, 'inProgress', 'done')}>
                <View style={styles.taskContainer}>
                  <Text style={styles.task}>{task.text}</Text>
                  <TouchableOpacity onPress={() => deleteTask(task, 'inProgress')}>
                    <TrashIcon name="trash" size={24} color="#8080D7" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.column, { borderColor: 'green' }]}>
            <Text style={styles.columnTitle}>Done</Text>
            {tasks.done.map(task => (
              <View key={task.id} style={styles.taskContainer}>
                <Text style={styles.task}>{task.text}</Text>
                <TouchableOpacity onPress={() => deleteTask(task, 'done')}>
                  <TrashIcon name="trash" size={24} color="#8080D7" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  contentContainer: {
    paddingVertical: 20,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  newTaskContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#8080D7',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  kanban: {
    flexDirection: 'column',
  },
  column: {
    flex: 1,
    marginBottom: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  task: {
    flex: 1,
    padding: 20,
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  trashIcon: {
    marginLeft: 10,
  },
});

export default KanbanScreen;
