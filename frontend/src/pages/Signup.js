import React from "react";
import "../App.css";

function Signup() {

  return (

    <div className="app">

      <div className="form-section">

        <h2>Create Account</h2>

        <div className="patient-form">

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button className="primary-btn">
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;