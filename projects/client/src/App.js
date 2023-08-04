import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/homePage';
import { ReportPage } from './pages/reportPage';
import { SetupPage } from './pages/setupPage';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { login } from './redux/accountSlice';
import { useEffect } from 'react';

const router = createBrowserRouter([
  { path: "/", 
  element: <SetupPage/>,
  children : [
    {path: "/", element: <HomePage/>},
    {path: "/statistics", element: <ReportPage/>}
  ]

},

])
function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const keepLogin = async() => {
    try{
      const response =  await Axios.get("http://localhost:8000/api/auth/", { 
        headers: { 
          authorization: `Bearer ${token}`,
        },
      })
      const { id, username, email, imgProfile,isAdmin } = response.data
      dispatch(login({ id, username, email, imgProfile,isAdmin }))
      console.log(response.data);
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
      token ? keepLogin() : console.log('Sign in first');
  },[])
  return (
    <div>
          <RouterProvider router={router}/>
    </div>
  );
}

export default App;
