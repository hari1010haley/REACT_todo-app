import React, { useState, useEffect } from 'react';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');

  // 데이터 로드
  useEffect(() => {
    fetch('/todos')
      .then((response) => response.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.log(error));
  }, []);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // 빈 입력값 처리
    const trimmedInput = input.trim();
    if (trimmedInput === '') {
      setInput('제목 없음');
    }

    // POST 요청
    const data = {
      name: trimmedInput === '' ? '제목 없음' : trimmedInput,
      status: 0,
    };

    try {
      const response = await fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newTodo = await response.json();
      setTodoList([newTodo, ...todoList]);
    } catch (error) {
      console.log(error);
    }

    setInput('');
  };

  const onRemove = async (id) => {
    console.log('remove...', id);

    // DELETE 요청
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(`/todos/${id}`, init);
      if (response.ok) {
        setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
      } else {
        console.log('Failed to remove todo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onToggle = async (todo) => {
    console.log('toggle...');

    // PUT 요청할 데이터 생성
    const data = {
      status: todo.status ? 0 : 1, // 현재 상태에 따라 새로운 상태 결정
    };

    try {
      // 서버에 PUT 요청 보내기
      const response = await fetch(`/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // 응답이 성공적이면 JSON으로 변환
        const updatedTodo = await response.json();

        // 상태 업데이트
        setTodoList((todoList) =>
          todoList.map((item) =>
            item.id === updatedTodo.id ? updatedTodo : item
          ).sort((a, b) => a.status - b.status || b.id - a.id)
        );
      } else {
        console.error('Failed to toggle todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onCompleteAll = async () => {
    console.log('Complete all todos...');
    
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //빈 바디를 제출
      body: JSON.stringify({}), // 빈 객체를 문자열로 변환
    };
    
    try {
        const response = await fetch('/todos/completeAll', init);
        if (response.ok) {
            const updatedTodos = await response.json();
            setTodoList(updatedTodos.sort((a, b) => a.status - b.status || b.id - a.id));
          } else {
            console.log('Failed to complete all todos:', response.statusText);
          }
        } catch (error) {
        console.log('Error:', error);
        }
    };

  const onRemoveAll = async () => {
    console.log('Remove all todos...');
  
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch('/todos', init);
      if (response.ok) {
        setTodoList([]);
      } else {
        console.log('Failed to remove all todos');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const onUpdate = async (updatedTodo) => {
    if (!updatedTodo.id) {
      console.error('No ID found in the todo item.');
      return;
    }
  
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    };
  
    try {
      const response = await fetch(`/todos/${updatedTodo.id}`, init);
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedItem = await response.json();
      setTodoList((todoList) => 
        todoList.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ).sort((a, b) => a.status - b.status === 0 ? b.id - a.id : a.status - b.status)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <TodoHeader />
      <TodoInput input={input} onChange={onChange} onSubmit={onSubmit} />
      <TodoList todoList={todoList} onRemove={onRemove} onToggle={onToggle} onUpdate={onUpdate}/>
      <TodoFooter onCompleteAll={onCompleteAll} onRemoveAll={onRemoveAll} />
    </div>
  );
};

export default TodoContainer;
