import * as React from 'react';
import { TodoItem } from './TodoItem';
import TodoItemComponent from './TodoItemComponent';

export interface ItemsProp {
    items: TodoItem[]
}

function TodoItemsComponent(prop: ItemsProp) {

    return (
        <ul>
            { prop.items.map((i) => {
                return <TodoItemComponent title={i.title} completed={i.completed} id={i.id} key={i.id}/>
            })}
        </ul>
        
    )
}

export default TodoItemsComponent;