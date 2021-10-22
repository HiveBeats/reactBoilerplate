import * as React from 'react';
import { TodoItem } from './TodoItem';
import './todoItem.css';
const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid gray',
    }
}

function TodoItemComponent({title, completed, id}: TodoItem) {
    return (
        <li style={styles.li} className='todo-item'>
            <span>
                <input type="checkbox" checked={completed} />
                {title}
            </span>
            <button className='close-button'>Delete</button>
        </li>
    );
}

export default TodoItemComponent;