import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    conditions: "",
    symptoms: "",
    hba1c: ""
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    const payload = {
      name: formData.name,
      age: parseInt(formData.age),
      conditions: [formData.conditions],
      symptoms: [formData.symptoms],
      lab_results: {
        HbA1c: parseFloat(formData.hba1c)
      }
    };

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      setResults(data.matches);

    } catch {

      alert("Backend not running!");

    }

  };

  const scrollToForm = () => {

    document
      .getElementById("form-section")
      .scrollIntoView({
        behavior: "smooth"
      });

  };

  const scrollToLearn = () => {

    document
      .getElementById("learn-more")
      .scrollIntoView({
        behavior: "smooth"
      });

  };

  return (

    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          AI-TRIAL
        </div>

        <ul className="nav-links">

          <li onClick={() => navigate("/")}>
            Home
          </li>

          <li onClick={() => navigate("/services")}>
            Services
          </li>

          <li onClick={() => navigate("/products")}>
            Products
          </li>

          <li onClick={() => navigate("/contact")}>
            Contact
          </li>

        </ul>

        <button
          className="signup-btn"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>

      </nav>

      {/* HERO */}

      <div className="hero-section">

        {/* LEFT */}

        <div className="hero-left">

          <h1>
            Smart Clinical Trial <br />
            Patient Matching
          </h1>

          <p>
            AI-powered healthcare platform for intelligent
            patient eligibility analysis and semantic
            clinical trial matching.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={scrollToForm}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={scrollToLearn}
            >
              Learn More
            </button>

          </div>

          {/* INFO CARD */}

          <div className="info-card">

            <div className="card-content">

              <div>

                <h2>
                  AI Healthcare System
                </h2>

                <h3>
                  Match Patients With
                  Clinical Trials Faster
                </h3>

                <p>
                  NLP + Semantic Search + Vector AI
                </p>

              </div>

              <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop"
                alt="doctor"
              />

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="image-card">

            <h2>
              AI HEALTHCARE
            </h2>

            {/* IMAGE SLIDER */}

            <div className="slider">

              <div className="slides">

                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
                  alt="medical"
                />

                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop"
                  alt="doctor"
                />

                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop"
                  alt="hospital"
                />

                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop"
                  alt="healthcare"
                />

              </div>

            </div>

            <p>
              AI Powered Clinical Intelligence
            </p>

          </div>

        </div>

      </div>

      {/* FORM */}

      <div
        className="form-section"
        id="form-section"
      >

        <h2>
          Check Patient Eligibility
        </h2>

        <div className="patient-form">

          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />

          <input
            type="text"
            name="conditions"
            placeholder="Conditions"
            onChange={handleChange}
          />

          <input
            type="text"
            name="symptoms"
            placeholder="Symptoms"
            onChange={handleChange}
          />

          <input
            type="number"
            name="hba1c"
            placeholder="HbA1c"
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            onClick={handleSubmit}
          >
            Find Matching Trials
          </button>

        </div>

      </div>

      {/* RESULTS */}

      <div className="results">

        {results.map((trial, index) => (

          <div
            className="result-card"
            key={index}
          >

            <h2>
              {trial.trial_id}
            </h2>

            <p>
              <strong>Disease:</strong>
              {" "}
              {trial.disease}
            </p>

            <p>
              <strong>Match Score:</strong>
              {" "}
              {trial.match_score.toFixed(2)}%
            </p>

            <p>
              <strong>Inclusion:</strong>
              {" "}
              {trial.inclusion_criteria}
            </p>

            <p>
              <strong>Exclusion:</strong>
              {" "}
              {trial.exclusion_criteria}
            </p>

            <p>
              <strong>AI Explanation:</strong>
            </p>

            <p>
              {trial.ai_explanation}
            </p>

          </div>

        ))}

      </div>

      {/* LEARN MORE */}

      <div
        className="learn-more-section"
        id="learn-more"
      >

        <h1>
          How This Website Works
        </h1>

        <div className="learn-grid">

          <div className="learn-card">

            <h2>
              AI Patient Matching
            </h2>

            <p>
              Our AI analyzes patient symptoms,
              conditions, and lab reports using
              semantic healthcare search.
            </p>

          </div>

          <div className="learn-card">

            <h2>
              Health Risk Indicators
            </h2>

            <p>
              Blood pressure, heart rate,
              blood sugar, and medical history
              help determine patient eligibility.
            </p>

          </div>

          <div className="learn-card">

            <h2>
              How To Use
            </h2>

            <p>
              Click Get Started and enter patient
              information to receive AI-generated
              trial matches instantly.
            </p>

          </div>

          <div className="learn-card">

            <h2>
              AI + Healthcare
            </h2>

            <p>
              NLP, semantic search, and vector AI
              combine to support smarter healthcare
              decisions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;