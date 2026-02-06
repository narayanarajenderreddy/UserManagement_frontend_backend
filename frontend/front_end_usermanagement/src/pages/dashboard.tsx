const Dashboard = () => {
    const logout  = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return (
        <div style = {{padding:20}}>
            <h1>Dashboard</h1>
            {/* <p>Welcome!you are logged in.</p> */}
            <button onClick = {logout}>Logout</button>
        </div>
    )
}

export default Dashboard;