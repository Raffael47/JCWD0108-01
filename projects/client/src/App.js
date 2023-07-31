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
import { HomePage } from './pages/homePage';
import { ReportPage } from './pages/reportPage';
import { NavbarDummy } from './components/navbarDummy';
import { SetupPage } from './pages/setupPage';

const router = createBrowserRouter([
  { path: "/", 
  element: <SetupPage/>,
  children : [
    {path: "/", element: <HomePage/>},
    {path: "/report", element: <ReportPage/>}
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
