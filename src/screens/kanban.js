import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TrashIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KanbanScreen = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('kanbanTasks');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks from storage", error);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('kanbanTasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error("Failed to save tasks", error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTasks = {
        ...tasks,
        todo: [...tasks.todo, { id: Date.now(), text: newTask }],
      };
      setTasks(newTasks);
      saveTasks(newTasks);
      setNewTask('');
    }
  };

  const moveTask = (task, from, to) => {
    const newTasks = {
      ...tasks,
      [from]: tasks[from].filter(t => t.id !== task.id),
      [to]: [...tasks[to], task],
    };
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (task, column) => {
    const newTasks = {
      ...tasks,
      [column]: tasks[column].filter(t => t.id !== task.id),
    };
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
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
