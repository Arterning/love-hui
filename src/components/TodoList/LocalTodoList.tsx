import { TodoItem } from "./LocalTodoItem";
import { prisma } from "../../lib/prisma";
import Link from "next/link";
import { useState, useEffect } from 'react'

interface TodoData {
  id: number;
  content: string;
  isCompeleted: boolean;
}

async function toggleTodo(id: number, isCompeleted: boolean) {
  try {
    const response = await fetch(`/api/todo/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, isCompeleted})
    });
    if (!response.ok) {
      throw new Error('Failed to put todos');
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodo(id: number) {
  try {
    const response = await fetch(`/api/todo/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
  } catch (error) {
    console.error(error);
  }

}

export default function LocalTodoList() {
  const [todos, setTodos] = useState<TodoData[]>([])
  useEffect(() => {
    fetchTodos()
  }, [])
  
  async function fetchTodos() {
    try {
      const response = await fetch('/api/todo');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todos = await response.json();
      setTodos(todos)
    } catch (error) {
      console.error(error);
    }
  }

  return <>
    <header className="flex justify-between mb-4 items-center">
      <h1 className="text-2xl">Todos</h1>
      <Link
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        href="/new"
      >
        New
      </Link>
    </header>
    <ul className="pl-4" >
      {todos.map(todo => (
        <TodoItem 
          id={todo.id}
          title={todo.content}
          complete={todo.isCompeleted}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}/>
      ))}
    </ul>

  </>
}