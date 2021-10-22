import React, { useState, useEffect } from 'react';
import Spinner from '../Shared/Components/Spinner/Spinner';
import { TodoItem } from './TodoItem';
import TodoItemsComponent from './TodoItemsComponent';

export default function TodoPageComponent() {
    const [items, setItems] = React.useState<TodoItem[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json()).then(data => setItems(data))
    }, []);

    function removeItem(id:number) {
        setItems(items.filter(i => i.id !== id));
    }

    if (items.length > 0) {
        return (
            <TodoItemsComponent items={items}/>
        )
    }
    else {
        return (
            <Spinner/>   
        )
    }
}