import { fetchJson } from './api';
import { TodoData } from '@/type/TodoData';

export async function toggleTodo(id: number, isCompeleted: boolean) {
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

export async function deleteTodo(id: number) {
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

export async function fetchTodos(): Promise<TodoData[] | undefined>{
  try {
    const response = await fetch('/api/todo');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json()
    return todos
  } catch (error) {
    console.error(error)
  }
}

export const addTodo = async (taskText: string) => {
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
    return todo
  }
}
