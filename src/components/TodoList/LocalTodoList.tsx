import { TodoItem } from "./LocalTodoItem";
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
      body: JSON.stringify({id, isCompeleted, title: 'toogle', content:'content'})
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
  const [newTaskText, setNewTaskText] = useState<string>('')
  useEffect(() => {
    fetchTodos()
  }, [])
  
  async function fetchTodos() {
    try {
      const response = await fetch('/api/todo');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todos = await response.json()
      setTodos(todos)
    } catch (error) {
      console.error(error);
    }
  }

  const addTodo = async (taskText: string) => {
    let content = taskText.trim()
    if (content.length) {
      const response = await fetch(`/api/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          title: content
        })
      })
      const todo = await response.json()
      setTodos([...todos, todo])
    }
  }

  return <>
    <header className="flex justify-between mb-4 items-center">
      <h1 className="text-2xl">Todo List</h1>
      <div className="flex gap-2 my-2">
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="小慧代办列表"
          value={newTaskText}
          onChange={(e) => {
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black" onClick={() => addTodo(newTaskText)}>
          Add
        </button>
      </div>
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