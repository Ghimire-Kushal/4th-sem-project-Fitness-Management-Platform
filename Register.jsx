import { useState } from "react";
import API from "./client/src/services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      console.log("SUCCESS:", res.data);

      localStorage.setItem("token", res.data.token);

      setMessage("Registration Successful ✅");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("ERROR:", error);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <br />
          <br />

          <button type="submit">Register</button>
        </form>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Register;
