
import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from './components/shared/Navbar'
import { Home } from 'lucide-react';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  },


])

function App() {

  return (
    <>
    <Navbar />
    </>
  )
}

export default App
