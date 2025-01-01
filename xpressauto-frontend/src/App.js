import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Add a CSS file for better styling.

function App() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        bikeModel: "",
        issue: "",
    });

    const [statusMessage, setStatusMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/enquiry", formData);
            setStatusMessage({ type: "success", text: response.data.message });
            setFormData({ name: "", phone: "", address: "", bikeModel: "", issue: "" });
        } catch (err) {
            setStatusMessage({
                type: "error",
                text: err.response?.data?.error || "Something went wrong.",
            });
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>XpressAuto.in</h1>
                <p>Your Trusted Partner for Bike Services</p>
            </header>
            
            <main>
                <section className="services">
                    <h2>Our Services</h2>
                    <ul>
                        <li>Regular Bike Servicing</li>
                        <li>Engine Repairs</li>
                        <li>Tyre Replacement</li>
                        <li>Battery Check & Replacement</li>
                        <li>Roadside Assistance</li>
                        <li>Custom Modifications</li>
                    </ul>
                </section>

                <section className="enquiry-form">
                    <h2>Bike Service Enquiry</h2>
                    {statusMessage && (
                        <p className={`status-message ${statusMessage.type}`}>
                            {statusMessage.text}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Bike Model:</label>
                            <input
                                type="text"
                                name="bikeModel"
                                placeholder="Enter your bike model"
                                value={formData.bikeModel}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Issue:</label>
                            <textarea
                                name="issue"
                                placeholder="Describe the issue"
                                value={formData.issue}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">
                            Submit Enquiry
                        </button>
                    </form>
                </section>
            </main>

            <footer>
                <p>© 2024 XpressAuto.in | All Rights Reserved</p>
            </footer>
        </div>
    );
}

export default App;

