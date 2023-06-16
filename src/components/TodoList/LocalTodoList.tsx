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
  "use server"
  try {
    await prisma.todo.update({ where: { id }, data: { isCompeleted } })
    console.log(id, isCompeleted)
  } catch (error) {
    console.log(id, "deleted")
  }
}

async function deleteTodo(id: number) {
  "use server"
  console.log('deleting', id)

  await prisma.todo.delete({ where: { id: id } })
}

export default function LocalTodoList() {
  const [todos, setTodos] = useState<TodoData[]>([])
  useEffect(() => {
    fetchTodos()
  }, [])
  
  async function fetchTodos() {
    const todos = await prisma.todo.findMany()
    setTodos(todos)
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