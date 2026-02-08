import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();
   console.log("profile:", user);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>
      <p><b>Email:</b> {user.email}</p>
      {/* <p><b>Role:</b> {user.role}</p> */}
    </div>
  );
};

export default Profile;
