import React, { useState } from "react";
import { Typography, Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { Add, Delete, ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { saveDataToStore, dateRegex } from "../shared/ReusableFunctions";

const WorkExperienceForm = () => {
	const navigate = useNavigate();
	let reduxMainState = useSelector((state) => state.reduxMainState);

	const [workExperienceFormData, setWorkExperienceFormData] = useState(reduxMainState?.workExperienceInformation ?? []);
	const [errorObjectData, setErrorObjectData] = useState(reduxMainState?.errorObject?.workExperienceInformationErrors ?? {});

	const checkDateRange = (durationValue) => {
		if (dateRegex.test(durationValue)) {
			const [inputStartDate, inputEndDate] = durationValue.split("-");
			const [startDay, startMonth, startYear] = inputStartDate.split("/").map(Number);
			const [endDay, endMonth, endYear] = inputEndDate.split("/").map(Number);
			let parsedStartDate = new Date(startYear, startMonth - 1, startDay);
			let parseEndDateFormat = new Date(endYear, endMonth - 1, endDay);

			let startDateIsValid = parsedStartDate.getFullYear() === startYear && parsedStartDate.getMonth() === startMonth - 1 && parsedStartDate.getDate() === startDay;
			let endDateIsValid = parseEndDateFormat.getFullYear() === endYear && parseEndDateFormat.getMonth() === endMonth - 1 && parseEndDateFormat.getDate() === endDay;

			if (startDateIsValid && endDateIsValid) {
				return parsedStartDate <= parseEndDateFormat;
			}
		}
		return false;
	};

	const Validation = (fieldName, value) => {
		let errorMsg = "";
		if (fieldName.includes("duration")) {
			errorMsg = checkDateRange(value) ? "" : "Please enter valid date range.(startDate-endDate)(01/04/2024-31/08/2024)";
		} else {
			errorMsg = value?.trim() ? "" : "This field is required";
		}

		setErrorObjectData((prevData) => {
			const updatedErrorObject = {
				...prevData,
				[fieldName]: errorMsg,
			};
			saveDataToStore({ ...reduxMainState?.errorObject, workExperienceInformationErrors: updatedErrorObject }, "ERROR");
			return updatedErrorObject;
		});
	};

	const handleChange = (e, inputObj) => {
		let { name, value } = e.target;

		let unpdatedWorkObj = {
			...inputObj,
			[name]: value,
		};

		const actualIndex = workExperienceFormData.findIndex((obj) => obj?.id === inputObj?.id);
		let existingArray = [...workExperienceFormData];
		if (actualIndex !== -1) {
			existingArray[actualIndex] = unpdatedWorkObj;
			Validation(name, value);
			setWorkExperienceFormData(existingArray);
			saveDataToStore(existingArray, "WORKEXPERIENCEINFORMATION");
		}
	};

	const handleNext = () => {
		workExperienceFormData.map((element, index) => {
			Object.entries(element).forEach(([key, value]) => {
				if (key !== "id") Validation(key, value);
			});
		});

		let allFieldsValidated = workExperienceFormData.length > 0 && Object.values(errorObjectData).every((x) => x === "");
		if (allFieldsValidated) {
			navigate("/skills");
		} else {
			saveDataToStore({ open: true, message: "Please fill in the all required data." }, "ALERT");
		}
	};

	const handleBack = () => {
		navigate("/education");
	};

	const handleAddMore = () => {
		let id = Math.random().toString();
		let companyNameId = "companyName" + id;
		let jobTitleId = "jobTitle" + id;
		let durationId = "duration" + id;
		let existingArray = [...workExperienceFormData, { id: id, [companyNameId]: "", [jobTitleId]: "", [durationId]: "" }];

		setWorkExperienceFormData(existingArray);
		saveDataToStore(existingArray, "WORKEXPERIENCEINFORMATION");

		setErrorObjectData((prevData) => {
			const updatedErrorObject = {
				...prevData,
				[companyNameId]: "This field is required",
				[jobTitleId]: "This field is required",
				[durationId]: "Please enter valid date range.(startDate-endDate)(01/04/2024-31/08/2024)",
			};
			saveDataToStore({ ...reduxMainState?.errorObject, workExperienceInformationErrors: updatedErrorObject }, "ERROR");
			return updatedErrorObject;
		});
	};

	const handleDelete = (deleteObj) => {
		let updatedErrorObjectData = { ...errorObjectData };

		let filterArray = workExperienceFormData.filter((obj, index) => {
			if (obj?.id === deleteObj?.id) {
				Object.entries(obj).forEach(([key, value]) => {
					delete updatedErrorObjectData[key];
				});
			}
			return obj?.id !== deleteObj?.id;
		});
		setWorkExperienceFormData(filterArray);
		saveDataToStore(filterArray, "WORKEXPERIENCEINFORMATION");

		setErrorObjectData(updatedErrorObjectData);
		saveDataToStore({ ...reduxMainState?.errorObject, workExperienceInformationErrors: updatedErrorObjectData }, "ERROR");
	};

	return (
		<>
			<Typography className="StepHeader" variant="h5">
				Work Experience
			</Typography>

			<TableContainer component={Paper} sx={{ maxHeight: "23rem" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className="TableHeader">Company Name</TableCell>
							<TableCell className="TableHeader">Job Title</TableCell>
							<TableCell className="TableHeader">Duration </TableCell>
							<TableCell className="TableHeader">Action </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{workExperienceFormData?.length > 0 ? (
							<>
								{workExperienceFormData.map((WorkObj, index) => {
									let id = WorkObj?.id.toString();
									let companyNameId = "companyName" + id;
									let jobTitleId = "jobTitle" + id;
									let durationId = "duration" + id;

									return (
										<TableRow key={index}>
											<TableCell>
												<TextField
													fullWidth
													type="text"
													name={companyNameId}
													value={WorkObj[companyNameId] ?? ""}
													onChange={(e) => handleChange(e, WorkObj)}
													size="small"
													error={!!errorObjectData[companyNameId]}
													helperText={errorObjectData[companyNameId] ?? ""}
												/>
											</TableCell>
											<TableCell>
												<TextField
													fullWidth
													type="text"
													name={jobTitleId}
													value={WorkObj[jobTitleId] ?? ""}
													onChange={(e) => handleChange(e, WorkObj)}
													size="small"
													error={!!errorObjectData[jobTitleId]}
													helperText={errorObjectData[jobTitleId] ?? ""}
												/>
											</TableCell>
											<TableCell>
												<TextField
													fullWidth
													type="text"
													name={durationId}
													value={WorkObj[durationId] ?? ""}
													onChange={(e) => handleChange(e, WorkObj)}
													size="small"
													error={!!errorObjectData[durationId]}
													placeholder="DD/MM/YYYY-DD/MM/YYYY"
													helperText={errorObjectData[durationId] ?? ""}
												/>
											</TableCell>

											<TableCell>
												<IconButton aria-label="delete" size="large">
													<Delete sx={{ color: "red" }} onClick={() => handleDelete(WorkObj)} />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
								<TableCell>
									<Button variant="contained" endIcon={<Add />} onClick={handleAddMore}>
										Add More
									</Button>
								</TableCell>
							</>
						) : (
							<TableRow>
								<TableCell>
									<Button variant="contained" endIcon={<Add />} onClick={handleAddMore}>
										Add More
									</Button>
								</TableCell>
							</TableRow>
						)}
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
export default WorkExperienceForm;
