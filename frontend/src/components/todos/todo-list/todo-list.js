import React from 'react';
import TodoListItem from "../todo-list-item/todo-list-item";
import './todo-list.css';

const TodoList=({todos, onDeleted, onToggleImportant, onToggleDone})=>{
    const elements = todos.map((item)=>{
        const {index} = item;
        return(
            <li key={index} className="list-group-item"><TodoListItem {...item} onDeleted={()=>onDeleted(index)} onToggleImportant={()=>onToggleImportant(index)} onToggleDone={()=>onToggleDone(index)}/></li>
        );
    });
    return(
        <ul className="list-group todo-list">
            {elements}
        </ul>
    );
};

export default TodoList;