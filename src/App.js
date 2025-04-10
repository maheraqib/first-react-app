import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
  return (
    <>
      <Navbar title = "First React Code" about = "About us" home = " Home" blog = "My Blogs"/>

      <div className='container my-3' >
      <TextForm heading = "Enter the text below, and I will convert it to uppercase for you"/>

      </div>
    </>
  );
}

export default App;
