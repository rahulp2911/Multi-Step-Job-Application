import React, { useState } from "react";

import { Typography, TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { saveDataToStore } from "../shared/ReusableFunctions";

const AdditionalInfoForm = () => {
	const navigate = useNavigate();
	let reduxMainState = useSelector((state) => state.reduxMainState);
	const [coverLetter, setcoverLetter] = useState(reduxMainState?.additionalInformation?.coverLetter ?? "");
	const [resume, setResume] = useState(reduxMainState?.additionalInformation?.resume ?? "");
	const [errorObjectData, setErrorObjectData] = useState(reduxMainState?.errorObject?.additionalInformationErrors ?? {});

	const validateFile = (fieldName, file) => {
		let errorMsg = "";
		if (!file) {
			errorMsg = "This field is required";
		} else if (!["application/pdf", "application/msword"].includes(file.type)) {
			errorMsg = "Only PDF or Word documents are allowed";
		}

		setErrorObjectData((prevData) => {
			const updatedErrorObject = {
				...prevData,
				[fieldName]: errorMsg,
			};
			saveDataToStore({ ...reduxMainState?.errorObject, additionalInformationErrors: updatedErrorObject }, "ERROR");
			return updatedErrorObject;
		});
	};

	const handleBack = () => {
		navigate("/skills");
	};
	const handleNext = () => {
		if (resume !== "") {
			navigate("/review");
		} else {
			saveDataToStore({ open: true, message: "Please fill in the all required data." }, "ALERT");
		}
	};

	const handleFileChange = (event) => {
		const { name, files } = event.target;
		const file = files[0] || null;
		validateFile(name, file);
		if (file) {
			if (name === "coverLetter") {
				setcoverLetter(file.name);
			} else if (name === "resume") {
				setResume(file.name);
			}
		}
		saveDataToStore({ ...reduxMainState.additionalInformation, [name]: file.name }, "ADDITIONALINFORMATION");
	};

	return (
		<>
			<Typography className="StepHeader" variant="h5">
				Additional Information
			</Typography>
			<div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
				<TextField
					sx={{ width: "40%" }}
					name="coverLetter"
					label="Cover Letter"
					error={!!errorObjectData["coverLetter"]}
					helperText={errorObjectData["coverLetter"] ?? ""}
					onChange={handleFileChange}
					type="file"
					size="small"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
					InputProps={{
						inputProps: {
							accept: ".pdf, .doc, .docx",
						},
					}}
				/>
				<TextField
					sx={{ width: "40%" }}
					name="resume"
					label="Resume"
					error={!!errorObjectData["resume"]}
					helperText={errorObjectData["resume"] ?? ""}
					onChange={handleFileChange}
					type="file"
					required
					size="small"
					variant="outlined"
					InputLabelProps={{ shrink: true }}
					InputProps={{
						inputProps: {
							accept: ".pdf, .doc, .docx",
						},
					}}
				/>
			</div>
			<br />
			<div style={{ textAlign: "left" }}>
				<div style={{ display: "flex" }}>
					Selected Cover Letter :- <Typography>{coverLetter}</Typography>
				</div>

				<div style={{ display: "flex" }}>
					Selected Resume :- <Typography>{resume}</Typography>
				</div>
			</div>

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
export default AdditionalInfoForm;
