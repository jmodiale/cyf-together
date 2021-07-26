import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useHistory, Link, NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import chevronLeft from "@iconify-icons/feather/chevron-left";
import checkIcon from "@iconify-icons/feather/check";
import PracticeFooter from "./PracticeFooter";
import "../Style/Note.css";


const Note = ({ data }) => {
	const history = useHistory();
	const [value, setValue] = useState(data[0].prompted_answer);
	const complete = () => {
		const token=localStorage.getItem("users");
		const body = { answer:value, practice_id:data[0].id };
		let result = fetch("http://localhost:3100/api/reflects", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
					"Content-Type": "application/json",
			Authorization:
				`Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

			});
		history.push("/confirmation");

	};


	const linkStyle = {
		width: "22rem",
		borderRadius: "20px",
	};


    return (
			<div>
				<Container style={linkStyle} className="container">
					<Card className="mb-3" style={linkStyle}>
						<Card.Body className="note-top">
							<div className="note-header">
								<div>
									<NavLink to="/practice">
										<Icon icon={chevronLeft} style={{ color: "white" }} />
									</NavLink>
									<span style={{ textAlign: "justify" }}>
										Today&apos;s Practice
									</span>
								</div>
							</div>
						</Card.Body>
						<Card.Body className="note-top2">
							<div>
								<p>{data[0].practice}</p>
							</div>
						</Card.Body>
						<Card.Body>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Control
									as="textarea"
									size="sm"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									style={({ fontSize: "8px" }, { height: "250px" })}
								/>
							</Form.Group>
						</Card.Body>
						<div className="btn-note">
							<Link to="/confirmation" onClick={complete}>
								<Button
									variant="success"
									size="sm"
									style={{ backgroundColor: "#7DC579" }}
								>
									<Icon icon={checkIcon} />
									Done
								</Button>{" "}
							</Link>
						</div>
						<Card.Footer>
							<PracticeFooter />
						</Card.Footer>
					</Card>
				</Container>
			</div>
		);
};

export default Note;