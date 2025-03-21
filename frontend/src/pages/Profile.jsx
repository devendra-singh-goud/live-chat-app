import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to access this page.");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data)); // Update localStorage
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        setError("Session expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Welcome, {user?.name || "User"}!</h2>
      <img
        src={user?.profilePicture || "https://via.placeholder.com/100"}
        alt="Profile"
        className="rounded-circle"
        width="100"
        height="100"
      />
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
