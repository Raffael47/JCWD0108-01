// import axios from "axios";
// import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     (async () => {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/greetings`
//       );
//       setMessage(data?.message || "");
//     })();
//   }, []);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {message}
//       </header>
//     </div>
//   );
// }

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navBar';
import { HomePage } from './pages/homePage';
import { DetailProduct } from './pages/detailProduct';

const router = createBrowserRouter([
  { path: "/", 
  element: <Navbar/>,
  children : [
    {path: "/", element: <HomePage/>},
    {path: "/detailProduct", element: <DetailProduct/>}
  ]

},

])
function App() {
  return (
    <div>
          <RouterProvider router={router}/>
    </div>
  );
}

export default App;
