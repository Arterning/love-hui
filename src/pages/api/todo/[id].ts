import { NextApiRequest, NextApiResponse } from 'next';
import prisima from '../../../lib/prisma';

interface Todo {
    title: string;
    content: string;
    isCompeleted: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await updateTodo(req, res)
  } else {
    await deleteTodo(req, res)
  }
}

async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
    const id = parseInt(req.query.id as string, 10)
    try {
      const result = await prisima.todo.delete({ where: { id } })
      res.status(200).json(result);
    } catch (error) {
      console.error(error)
    }
  }
  
async function updateTodo(req: NextApiRequest, res: NextApiResponse) {
    const { title, content, isCompeleted } = req.body as Todo;
    const id = parseInt(req.query.id as string, 10)
    try {
        const result = await prisima.todo.update({ where: { id }, data: { title, content, isCompeleted } })
        res.status(200).json(result)
    } catch (error) {
      console.error(error)
    }
}
