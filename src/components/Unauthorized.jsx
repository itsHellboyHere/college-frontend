import { Link } from "react-router-dom";


const Unauthorized = () => {
  return (
    <div 
      className="unauthorized-page flex flex-col items-center justify-center min-h-screen text-white"
    >
      <div className="text-center p-6 bg-black bg-opacity-50 rounded-md">
        <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <Link to='/'>
          <button className="btn-denied ">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
