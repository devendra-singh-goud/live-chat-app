import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Email or Username
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage("Email or Username and password are required!");
      return;
    }

    try {
      setLoading(true); // Show loading state

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/chat");
      } else {
        setErrorMessage(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Unable to connect. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img 
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                        {/*<span className="h1 fw-bold mb-0">Logo</span>*/}
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>
                      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="identifier"
                          className="form-control form-control-lg"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder="Email or Username"
                          required
                        />
                        <label className="form-label" htmlFor="identifier">Email or Username</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit" disabled={loading}>
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </div>
                      {/*<a className="small text-muted" href="#!">Forgot password?</a>*/}
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>Register here</span>
                      </p>
                      {/*<a href="#!" className="small text-muted">Terms of use.</a>*/}
                      {/*<a href="#!" className="small text-muted">Privacy policy</a>*/}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
