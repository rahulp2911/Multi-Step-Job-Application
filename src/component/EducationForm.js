import React, { useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Button, Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { saveDataToStore, allowOnlyNumber, allowOnlyNumberWithDecimalPoint } from "../shared/ReusableFunctions";

const EducationForm = () => {
	const navigate = useNavigate();
	let reduxMainState = useSelector((state) => state.reduxMainState);
	const [educationFormData, setEducationFormData] = useState(reduxMainState?.educationInformation ?? {});
	const [errorObjectData, setErrorObjectData] = useState(reduxMainState?.errorObject?.educationInformationErrors ?? {});

	const Validation = (fieldName, value) => {
		let errorMsg = "";
		if (fieldName.includes("cgpa")) {
			errorMsg = Number(value) != NaN && (Number(value) > 0 || (Number(value) == 0 && value == "0")) && Number(value) <= 10 ? "" : "CGPA must be between 0 and 10";
		} else if (fieldName.includes("year")) {
			errorMsg = Number(value) != NaN && Number(value) >= 1900 && Number(value) <= new Date().getFullYear() ? "" : `Year must be between 1900 and ${new Date().getFullYear()}`;
		} else {
			errorMsg = value?.trim() ? "" : "Board/University is required";
		}

		setErrorObjectData((prevData) => {
			const updatedErrorObject = {
				...prevData,
				[fieldName]: errorMsg,
			};
			saveDataToStore({ ...reduxMainState?.errorObject, educationInformationErrors: updatedErrorObject }, "ERROR");
			return updatedErrorObject;
		});
	};

	const handleChange = (e) => {
		let { name, value } = e.target;
		Validation(name, value);
		let obj = {
			...educationFormData,
			[name]: value,
		};
		setEducationFormData(obj);
		saveDataToStore(obj, "EDUCATIONINFORMATION");
	};

	const handleNext = () => {
		Object.entries(educationFormData).forEach(([key, value]) => {
			Validation(key, value);
		});

		let allFieldsValidated = Object.keys(errorObjectData).length == 12 && Object.values(errorObjectData ?? {}).every((x) => x === "");
		if (allFieldsValidated) {
			navigate("/work-experience");
		} else {
			saveDataToStore({ open: true, message: "Please fill in the all required data." }, "ALERT");
		}
	};

	const handleBack = () => {
		navigate("/");
	};

	return (
		<>
			<Typography className="StepHeader" variant="h5">
				Education
			</Typography>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className="TableHeader">School/Institute Name</TableCell>
							<TableCell className="TableHeader">Board/University</TableCell>
							<TableCell className="TableHeader">CGPA </TableCell>
							<TableCell className="TableHeader">Passing Year</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{["SSC", "HSC", "Graduation", "Post Graduation"].map((level, index) => {
							let id = level === "Post Graduation" ? "postgraduation" : level.toLowerCase();
							let boardId = "board" + id;
							let cgpaId = "cgpa" + id;
							let yearId = "year" + id;

							return (
								<TableRow key={index}>
									<TableCell>{level}</TableCell>
									<TableCell>
										<TextField fullWidth type="text" name={boardId} value={educationFormData[boardId] ?? ""} onChange={handleChange} size="small" error={!!errorObjectData[boardId]} helperText={errorObjectData[boardId] ?? ""} />
									</TableCell>
									<TableCell>
										<TextField
											fullWidth
											type="number"
											name={cgpaId}
											value={educationFormData[cgpaId] ?? ""}
											onChange={handleChange}
											size="small"
											error={!!errorObjectData[cgpaId]}
											onKeyDown={allowOnlyNumberWithDecimalPoint}
											helperText={errorObjectData[cgpaId] ?? ""}
										/>
									</TableCell>
									<TableCell>
										<TextField
											fullWidth
											type="number"
											name={yearId}
											value={educationFormData[yearId] ?? ""}
											onChange={handleChange}
											size="small"
											error={!!errorObjectData[yearId]}
											onKeyDown={allowOnlyNumber}
											helperText={errorObjectData[yearId] ?? ""}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

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
export default EducationForm;
