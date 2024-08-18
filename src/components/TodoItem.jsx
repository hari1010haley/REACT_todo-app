import React, { useState, useEffect } from 'react';

const TodoItem = ({ todo, onToggle, onRemove, onUpdate }) => {
    console.log('TodoItem props:', todo); // todo 객체 확인

    const { id, name, status } = todo;    
    const [inputValue, setInputValue] = useState(name || '');

    // Effect to update inputValue when name changes
    useEffect(() => {
        setInputValue(name || '');
    }, [name]);

    if (!id) {
        console.error('TodoItem: No ID found in the todo item.');
    }

    return (
        <li className={status === 1 ? 'todoItem active' : 'todoItem'}>
            <div className="item">
                <input 
                    type="checkbox" 
                    id={id} 
                    checked={status === 1}
                    onChange={() => onToggle(todo)} 
                />
                <label htmlFor={id}></label>
                <input 
                    type="text"
                    id={`name-${id}`}
                    className='input' 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                />
            </div>
            <div className="item">
                <button 
                    className='btn btn-sm' 
                    onClick={() => onUpdate({ ...todo, name: inputValue })} 
                >
                    ✔︎
                </button>
                <button 
                    className='btn btn-sm' 
                    onClick={() => onRemove(id)} 
                >
                    ✖︎
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
