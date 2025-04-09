import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, currentUser } = useAuth(); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value; 
    const password = e.target.password.value;
    let userData = { username, password };

    // Validation for Login and Sign-Up
    if(isLogin){
      if (!username || !password) {
        alert("Please fill all fields.");
        return;
      }
    }
    else{
      const email = e.target.email.value;
      if (!username || !email || !password) {
        alert("Please fill all fields.");
        return;
      }
    }
   

    
    localStorage.setItem("user", JSON.stringify(userData)); // Store username and password in localStorage
    login(userData); // Pass the user data to the login function

    navigate("/"); 
  };

  if (currentUser) {
    navigate("/"); // Redirect to home page immediately
    return null; // Prevent rendering of the form when logged in
  }

  return (
    <Container fluid className="vh-100 d-flex align-items-center bg-dark">
      <Row className="w-100">
        {/* Form Section */}
        <Col md={6} className="d-flex flex-column justify-content-center px-5">
          <h2 className="mb-4 text-white">{isLogin ? "Login" : "Sign Up"}</h2>
          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Username</Form.Label>
              <Form.Control type="text" name="username" placeholder="Enter username" />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control type="text" name="email" placeholder="Enter your email" />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 text-white">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Form>

          <p className="mt-3 text-primary" style={{ cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </Col>

        {/* Image Section */}
        <Col md={6} className="d-none d-md-block p-0">
          <img
            src="https://www.georgeinstitute.org/sites/default/files/styles/image_ratio_2_1_large/public/2020-10/world-food-day-2020.png.webp?itok=-h1y_Rz0"
            alt="Food"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;
