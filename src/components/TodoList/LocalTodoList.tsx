import { TodoItem } from "./LocalTodoItem";
import { useState, useEffect } from 'react'
import { toggleTodo, deleteTodo, fetchTodos, addTodo } from '../../lib/todo'
import { TodoData } from "@/type/TodoData";


export default function LocalTodoList() {
  const [todos, setTodos] = useState<TodoData[] | undefined>([])
  const [newTaskText, setNewTaskText] = useState<string>('')
  useEffect(() => {
    fetchTodos().then((data: TodoData[] | undefined) => {
      setTodos(data)
    })
  }, [])  
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
        <button className="btn-black" onClick={async () => {
            const todo = await addTodo(newTaskText)
            setTodos([...todos, todo])
          }}>
          Add
        </button>
      </div>
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