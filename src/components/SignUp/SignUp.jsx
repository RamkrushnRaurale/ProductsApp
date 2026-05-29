import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../SignIn/Api";

import "./SignUp.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameErr, setNameErr] = useState(false);

    const navigate = useNavigate();

    async function registration() {

        // Empty input validation
        if (
            username.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            setNameErr(true);
            return;
        }

        setNameErr(false);

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter valid email address");
            return;
        }

        // Password validation
        if (password.length < 5) {
            alert("Password must be at least 5 characters");
            return;
        }

        try {

            // API Call
            await api.post("/signup", {
                username,
                email,
                password,
            });

            alert("Signup Successful");

            // Clear Inputs
            setUsername("");
            setEmail("");
            setPassword("");

            // Navigate
            navigate("/SignIn");

        } catch (err) {

            console.log(err);

            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Signup Failed");
            }
        }
    }

    return (
        <div className="register-body">

            <div className="register-main">

                <h1>Sign Up</h1>

                {nameErr && (
                    <p className="errP">
                        *Please fill every input field*
                    </p>
                )}

                <br />

                <p>Name</p>

                <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    placeholder="Enter your name"
                />

                <br />

                <p>Email</p>

                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                />

                <br />

                <p>Password</p>

                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    placeholder="Enter password"
                />

                <br />
                <br />

                <button
                    style={{ marginBottom: "10px" }}
                    onClick={registration}
                >
                    Sign Up
                </button>

                <br />

                <p style={{ fontSize: "15px" }}>
                    Already have an account?{" "}
                    <Link to="/SignIn">
                        <b>Sign In</b>
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default SignUp;