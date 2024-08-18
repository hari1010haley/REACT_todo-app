import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todoList, onRemove, onToggle, onUpdate }) => {

    console.log('Todo List:', todoList);

    return (
      <ul className='todoList'>
        {todoList.map((todo) => {
          console.log('Rendering todo with key:', todo.id); // 로그 추가
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              onRemove={onRemove}
              onToggle={onToggle}
              onUpdate={onUpdate}
            />
          );
        })}
      </ul>
    );
  };  

export default TodoList;