import { NextApiRequest, NextApiResponse } from 'next';
import prisima from '../../../lib/prisma';

interface Todo {
  title: string;
  content: string;
  isCompeleted: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await createTodo(req, res)
  } else if (req.method === 'GET') {
    await getAllTodos(res)
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}



async function createTodo(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, isCompeleted } = req.body as Todo;
  console.log(title, content, isCompeleted);
  
  const result = await prisima.todo.create({
    data: { 
       title,
       content,
       isCompeleted: false
    }
  })
  res.status(200).json(result)
}

async function getAllTodos(res: NextApiResponse) {
  const todos = await prisima.todo.findMany()
  res.status(200).json(todos)
}

