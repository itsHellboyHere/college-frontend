import {Route, Routes ,useLocation} from "react-router-dom"
import Register from "./pages/Register"
import {Toaster} from 'react-hot-toast'
import Login from "./pages/Login"
import CreateStudentProfile from "./pages/CreateStudentProfile"
import DashBoard from "./pages/DashBoard"
import RegisterFaculty from "./pages/RegisterFaculty"
import ProtectedRoute from "./components/ProtectedRoute"
import DasBoardFaculty from "./pages/DasBoardFaculty"
import Unauthorized from "./components/Unauthorized"
import LandingPage from "./pages/LandingPage"
import Header from "./components/Header"
import CreateStudent from "./pages/CreateStudent"
import ViewStudent from "./components/ViewStudent"
import UpdateStudentProfile from "./components/UpdateStudentProfile"
import CreateSubject from "./components/CreateSubject"

const App = () => {
   const location = useLocation();

  // Exclude Header from LandingPage and Login
  const excludeHeaderPaths = [ "/login","/regiter","/register-faculty"];
  return (
    <div>
      {!excludeHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
         <Route path="/unauthorized" element={<Unauthorized/>}/>
         <Route path="*" element={<Unauthorized />} />
          <Route path="/register" element={<Register />} />
          < Route path="/register-faculty" element={<RegisterFaculty/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/create-student-profile" element={ 
            <ProtectedRoute>
              <CreateStudentProfile/>
            </ProtectedRoute>
          } />
        <Route path="/dashboard" element={
          <ProtectedRoute role="is_student" >
            <DashBoard />
            </ProtectedRoute>
        } />
        <Route path="/dashboard-faculty" element={
          <ProtectedRoute role="is_faculty" >
            <DasBoardFaculty/>
          </ProtectedRoute>
        }/>
       
        <Route path="/create-student" element={
          <ProtectedRoute role="is_faculty" >
            <CreateStudent/>
          </ProtectedRoute>
        }/>
        <Route path="/update-student" element={
          <ProtectedRoute role="is_student" >
            <UpdateStudentProfile/>
          </ProtectedRoute>
        }/>
        <Route
        path="/create-subject"
        element={
          <ProtectedRoute role="is_faculty" >
            <CreateSubject/>
          </ProtectedRoute>
        }
        />
        <Route
        
  path="/student/:id"
  element={
    <ProtectedRoute role="is_faculty">
      <ViewStudent />
    </ProtectedRoute>
  }
/>
        </Routes>
    
    <Toaster/>
    </div>
  )
}
export default App