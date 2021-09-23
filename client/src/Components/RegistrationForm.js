/*eslint linebreak-style: ["error", "windows"]*/
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "../Style/Form.css";
import { Form, Button } from "react-bootstrap";

const RegistrationForm = () => {

	const linkStyleInput = {
		width: "85vw",
		height: "7vh",
		borderRadius: "30px",
		fontSize: "3vw",
		padding: "2vw 4vw",
		margin: "0",
	};
	const registerButtonStyle = {
		color: "#FFF",
		backgroundColor: "#6360FF",
		padding: "30px",
		fontSize: "3vw",
		borderRadius: "20px",
		alignItems: "center",
	};
	const loginButtonStyle = {
		color: "#FFF",
		backgroundColor: "#FF8181",
		padding: "30px",
		fontSize: "3vw",
		borderRadius: "20px",
	};


	const [values, setValues] = useState({
		firstname: "",
		email: "",
		password: "",
		passwordCheck: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target;
		setValues({
			...values,
			[id]: value,
		});
	};

	const history = useHistory();
	const login = () => history.push("/login");
	const termsConditions = () => history.push("/termsconditions");

	function handleSubmit(e) {
		e.preventDefault();

		const { email, password, passwordCheck } = values;

		// Validation - empty field
		if (!email && !password) {
			return setError("The fields cannot be empty");
		}
		// Validation of email
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			return setError("Email address is invalid");
		}
		// Validation - empty field
		if (!password) {
			return setError("Password is required");
		}
		// Validation - password match
		if (password !== passwordCheck) {
			return setError("Passwords must match");
		}
		// Validation - password contain a number and at least 8 characters uppercase and lowercase
		let regValue = /(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)(.{8,})/;
		if (!regValue.test(password)) {
			return setError(
				"Passwords must contain a number and at least 8 characters"
			);
		}

		setError("");
		const body = {
			firstname: values.firstname,
			email: values.email,
			password: values.password,
			passwordCheck: values.password,
		};
		let result = fetch("/api/register", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.register === "success") {
					history.push("/login");
				} else if (
					data.register === "error" ||
					data.register === "error-registereduser"
				) {
					setError("User already exists");
					history.push("/register");
				}
			})
			.catch((error) => {
            console.log("Error:", error);
          });
		localStorage.setItem("users", result);
	}

	const errorMessage = error && <p>{error}</p>;

	return (
		<div id="login">
			{errorMessage}

			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Control
						type="text"
						id="firstname"
						placeholder="Firstname"
						style={linkStyleInput}
						value={values.firstname}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Control
						type="text"
						id="email"
						placeholder="Email"
						style={linkStyleInput}
						value={values.email}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Control
						type="password"
						id="password"
						placeholder="Password"
						style={linkStyleInput}
						value={values.password}
						onChange={(e) => handleChange(e)}
					/>
					<Form.Text className="text-muted" style={{ fontSize: "2vw" }}>
						The password must contain at least 8 characters including one
						uppercase and one number
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Control
						type="password"
						id="passwordCheck"
						placeholder="Confirm password"
						style={linkStyleInput}
						value={values.passwordCheck}
						onChange={(e) => handleChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Button
						className="btn-login"
						type="submit"
						variant="default"
						style={registerButtonStyle}
					>
						Register
					</Button>
				</Form.Group>
				<Form.Group className="mb-3">
					<h5>Already have an account?</h5>
				</Form.Group>
				<Form.Group className="mb-3">
					<Link to="/login" onClick={login}>
						<Button
							className="btn-register"
							variant="default"
							type="submit"
							style={loginButtonStyle}
						>
							Sign in
						</Button>
					</Link>
				</Form.Group>
				<Form.Group className="mb-3 login-a">
					<Link
						to="/termsconditions"
						onClick={termsConditions}
						style={{ color: "black" }}
					>
						T&C and Privacy Policy
					</Link>
				</Form.Group>
			</Form>
		</div>
	);
};

export default RegistrationForm;
