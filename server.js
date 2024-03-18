const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());


let tasks = [];

// Funkcja do wczytania z pliku tasks.json
function loadTasksFromFile() {
    try {
        const data = fs.readFileSync('tasks.json');
        tasks = JSON.parse(data);
        console.log('Tasks loaded from tasks.json');
    } catch (error) {
        console.error('Error loading tasks from tasks.json:', error);
    }
}

// Wczytanie z pliku przy starcie serwera
loadTasksFromFile();

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    tasks.push(newTask);
    saveTasksToFile();
    res.json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToFile();
    res.status(204).send();
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).send();
    }
    task.completed = !task.completed;
    saveTasksToFile();
    res.json(task);
});
app.put('/tasksu', (req, res) => {
    tasks.forEach(task => {
        task.completed = false;
    });
    saveTasksToFile();
    res.json(tasks);
});

function saveTasksToFile() {
    fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2), err => {
        if (err) throw err;
        console.log('Tasks saved to tasks.json');
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
