# REACT_TodoList 📜

A simple Todo List application built with React. This app allows you to add new todos, toggle their completion status, delete individual todos, and remove all todos.

## Features

- Add new todos
- Toggle the completion status of todos
- Automatic Updates for Individual Todo Items: Each todo item updates automatically when its state changes.
- Delete individual todos
- Remove all todos
- Complete all todos

## Demo Video
![todoList](https://github.com/user-attachments/assets/09c41277-8465-40c2-bd66-1ed373f9d6fc)

[🤩Watch All](https://youtu.be/IyU5N1Bh8qc)

## Sorting of Todo Items:

- Completed Todos: Sorted in ascending order by ID.
- Incomplete Todos: Positioned at the top and sorted in descending order by ID

## Prerequisites

Make sure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. npm install express ws
2. npm add react-dom
3. Client: npm start / Server: to start the server from the server.js file -> Open a terminal and run node server.js 

## Debugging
- The issue with the onCompleteAll PUT request returning a 400 Bad Request error was due to sending data:-1. This data was not valid, so I modified the request to use an empty body.
- Additionally, since updating all todos can be done successfully with a POST request, I changed the implementation to use a POST request instead.
- Empty inputs are now treated as 'No title'.

