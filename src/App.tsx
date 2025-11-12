import './App.css'
import AddStudent from './components/AddStudent/addStudent'
import GetStudent from './components/GetStudent/getstudent'
import { Route,Routes} from 'react-router'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<GetStudent/>}/>
        <Route path='/add' element={<AddStudent/>}/>
        <Route path='*' element/>
      </Routes>
    </>
  )
}

export default App
