import React, { useEffect, useState } from 'react';
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import './app.css';
import AppHeader from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, fetchTodosByDate, setLoad } from '../../../redux/actions/ActionFetchData';
import { deleteTodo } from '../../../redux/actions/ActionDeleteData';
import { createTodo } from '../../../redux/actions/ActionAddData';

const Todos = ({ dateTodos }) => {
    let maxId = 100;
    const dispatch = useDispatch();
    const { todos, todosDay } = useSelector(({ fetchDataReducer })=> fetchDataReducer);
    const [ todoData,  setTodoData ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ label, setLabel ] = useState('');
    const [ filter, setFilter ] = useState('all');

    const createTodoItem=(label, id)=>{
        return{
            label,
            isImportant: false,
            isDone: false,
            index: id
        }
    };

    useEffect(()=>{
        dispatch(setLoad(true));
        dispatch(fetchTodos(dateTodos)); 
    }, [])

    useEffect(()=>{
        setSearch('');
        dispatch(fetchTodosByDate(dateTodos));
    }, [dateTodos])

    useEffect(()=>{
        setTodoData([])
        todosDay.map(el=>addItem(el))
    }, [todos, todosDay])
    
    const deleteItem=(index)=>{
        dispatch(deleteTodo(index, dateTodos));
    };

    const addItem=(el)=>{
        const newItem = createTodoItem(el.todo, el.id);
        setTodoData(prevState => [...prevState, newItem]);
    };

    const toggleProperty=(arr, index, propName)=>{
        const idx = arr.findIndex((el)=> el.index === index);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    const onToggleImportant=(index)=>{
        setTodoData(toggleProperty(todoData, index, 'isImportant'));
    };

    const onToggleDone=(index)=>{
        setTodoData(toggleProperty(todoData, index, 'isDone'));
    };

    const onLabelSearch=(search)=>{
        setSearch(search);
    };

    const searchs=(items, search)=>{
        if(search.length === 0){
            return items;
        }
        return items.filter((item) =>{
            return item.label.toUpperCase().indexOf(search.toUpperCase()) > -1;
        })
    };

    const filtered=(items, filter)=>{
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return  items.filter((item)=>!item.isDone);
            case 'done':
                return items.filter((item)=>item.isDone);
            default:
                return items;
        }
    }

    const onFilterChange=(filter)=>{
        setFilter(filter);
    };
    
    const onLabelChange=(e)=>{
        setLabel(e.target.value);
    }

    const addItemToDB =(label)=>{
        dispatch(createTodo({
            label: label,
            adress: 'Minsk',
            dateStart: new Date(dateTodos).toJSON(),
            dateEnd: new Date(dateTodos).toJSON(),
            description: "Connect server by node.js",
            allDay: false,
            driver_id: 1,
            user_id: 1
        }))
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        addItemToDB(label);
        const el = { todo:label, id: maxId++ };
        addItem(el);
        setLabel('');
    }

    const visibleItems = filtered(searchs(todoData, search), filter);

    
    return(
        <div className="todo-app">
            <AppHeader dateTodos={dateTodos.toLocaleString('en-GB', {dateStyle:'medium'})}/>
            <div className='top-panel d-flex'>
                <SearchPanel search={search} onLabelSearch={onLabelSearch}/>
            </div>
            <TodoList todos={visibleItems} onDeleted={deleteItem} onToggleImportant={onToggleImportant} onToggleDone={onToggleDone}/>
            
            {/* Modal add */}
            <div>
                <div className='add-item-button d-grid'>
                    <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Item</button>
                </div>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Todos</h5>
                        <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id='add-item-form' className="item-add-form" onSubmit={(e)=>onSubmit(e)}>
                            <input type="text" className="form-control" onChange={(e)=>onLabelChange(e)} placeholder="What needs to be done" value={label}/>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" form="add-item-form" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
}

export default Todos;