import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component{

    render() {
        let classNames = "todo-list-item";
        if(this.props.isDone){
            classNames += " isDone";
        }

        if(this.props.isImportant) {
            classNames += " isImportant";
        }

        const { label, onDeleted, onToggleImportant, onToggleDone } = this.props;
        return(
         <span className={classNames}>
            <span className="todo-list-item-label" onClick={onToggleDone}>
                {label}
            </span>
            <button type="button" className="btn btn-outline-danger btn-sm float-right fa fa-trash-o" onClick={onDeleted}/>
            <button type="button" className="btn btn-outline-success btn-sm float-right fa fa-exclamation" onClick={onToggleImportant}/>
        </span>
        );
    }
}
