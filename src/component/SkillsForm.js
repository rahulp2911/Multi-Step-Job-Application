import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { saveDataToStore } from "../shared/ReusableFunctions";

const SkillsForm = () => {
	const navigate = useNavigate();
	let reduxMainState = useSelector((state) => state.reduxMainState);
	const [skillsFormData, setSkillsFormData] = useState(reduxMainState?.skillsInformation ?? "");
	const [errorObjectData, setErrorObjectData] = useState(reduxMainState?.errorObject?.skillsInformationErrors ?? {});

	const Validation = (fieldName, value) => {
		let errorMsg = "";
		if (value.trim() === "") {
			errorMsg = " This field is required";
		} else {
			errorMsg = "";
		}

		setErrorObjectData((prevData) => {
			const updatedErrorObject = {
				...prevData,
				[fieldName]: errorMsg,
			};
			saveDataToStore({ ...reduxMainState?.errorObject, skillsInformationErrors: updatedErrorObject }, "ERROR");
			return updatedErrorObject;
		});
	};

	const handleChange = (e) => {
		let { name, value } = e.target;
		Validation(name, value);
		setSkillsFormData(value);
		saveDataToStore(value, "SKILLSINFORMATION");
	};

	const handleBack = () => {
		navigate("/work-experience");
	};
	const handleNext = () => {
		Validation("skillTextField", skillsFormData);

		if (skillsFormData !== "") {
			navigate("/additional-info");
		} else {
			saveDataToStore({ open: true, message: "Please fill in the all required data." }, "ALERT");
		}
	};

	return (
		<>
			<Typography className="StepHeader" variant="h5">
				Skills
			</Typography>
			<TextField
				name="skillTextField"
				label="Technical Skills, Certifications"
				value={skillsFormData}
				error={!!errorObjectData["skillTextField"]}
				helperText={errorObjectData["skillTextField"] ?? ""}
				onChange={handleChange}
				type="text"
				required
				size="small"
				multiline
				rows={4}
				fullWidth
				variant="outlined"
			/>

			<div className="Card_BtnDiv">
				<Button variant="contained" startIcon={<ArrowCircleLeft />} sx={{ mr: "15px" }} onClick={handleBack}>
					Back and edit
				</Button>

				<Button variant="contained" endIcon={<ArrowCircleRight />} onClick={handleNext}>
					save and submit
				</Button>
			</div>
		</>
	);
};
export default SkillsForm;
