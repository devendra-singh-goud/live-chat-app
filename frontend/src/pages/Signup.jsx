import React, { useState } from "react";
import { Form, Button, Container, Image, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    profilePicture: null, // File storage
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Profile Picture Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreviewImage(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Create FormData to send file and text fields
    const data = new FormData();
    data.append("name", formData.name);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("password", formData.password);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("Signup Successful! Redirecting to login...");
        setFormData({
          name: "",
          username: "",
          email: "",
          mobile: "",
          password: "",
          profilePicture: null,
        });
        setPreviewImage(null);
        navigate("/login");
      } else {
        setError(result.message || "Signup Failed");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong! Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Signup</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Profile Picture (Optional)</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        {previewImage && (
          <Image src={previewImage} alt="Preview" className="mt-3" width="100" height="100" roundedCircle />
        )}

        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
