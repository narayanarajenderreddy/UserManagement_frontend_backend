
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const {user} = useAuth();
    //console.log("Dashboard user:",user.data);
    const logout  = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p>Welcome, {user?.email}</p>

      <Link to="/profile">My Profile</Link>
      <br /><br />

      {user?.role === "admin" && (
        <div>
          <Link to="/admin/users">Manage Users</Link>
        </div>
      )}

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;