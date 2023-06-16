import Header from '../components/Header'
import Head from '../components/Head'
import { supabase } from '../utils/initSupabase'
import TodoList from '../components/TodoList'

export default function TodoPage() {

  return (
    <>
    <Head />
    <Header />
    <div className="w-full h-full bg-gray-300">
        <div
          className="w-full h-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
        >
          <TodoList user={supabase.auth.user()} />
        </div>
    </div>
    </>
  )
}
