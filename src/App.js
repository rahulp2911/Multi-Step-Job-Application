import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Typography, Snackbar, Alert } from "@mui/material";
import { saveDataToStore } from "./shared/ReusableFunctions";
import { useSelector } from "react-redux";
import { Card } from "@mui/material";
import PersonalInfoForm from "./component/PersonalInfoForm";
import EducationForm from "./component/EducationForm";
import WorkExperienceForm from "./component/WorkExperienceForm";
import SkillsForm from "./component/SkillsForm";
import AdditionalInfoForm from "./component/AdditionalInfoForm";
import ReviewForm from "./component/ReviewForm";
import "./App.css";

export default function App() {
	let alertObject = useSelector((state) => state.reduxMainState?.alertObject);

	const handleAlertMsgClose = () => {
		saveDataToStore({ open: false, message: "" }, "ALERT");
	};

	return (
		<div className="App">
			<Typography variant="h4" sx={{ mt: "15px" }}>
				Multi-Step Job Application
			</Typography>

			<div className="Main_Div">
				<Card className="Main_Card">
					<Router>
						<Routes>
							<Route path="/" element={<PersonalInfoForm />} />
							<Route path="/education" element={<EducationForm />} />
							<Route path="/work-experience" element={<WorkExperienceForm />} />
							<Route path="/skills" element={<SkillsForm />} />
							<Route path="/additional-info" element={<AdditionalInfoForm />} />
							<Route path="/review" element={<ReviewForm />} />
						</Routes>
					</Router>
				</Card>
				<Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={alertObject.open} autoHideDuration={4000} onClose={handleAlertMsgClose}>
					<Alert onClose={handleAlertMsgClose} severity={alertObject?.severity ?? "error"} variant="filled" sx={{ width: "100%" }}>
						{alertObject.message}
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
}
