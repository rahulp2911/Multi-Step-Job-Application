import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { saveDataToStore, emailRegex, allowOnlyNumber } from "../shared/ReusableFunctions";

const InputTextFieldComponent = ({ name, label, value, error, onChange, helperText }) => {
	return (
		<TextField
			sx={{
				width: name !== "address" ? "48%" : "-webkit-fill-available",
			}}
			name={name}
			label={label}
			value={value}
			error={error}
			helperText={helperText}
			onChange={onChange}
			type={name === "phone" ? "number" : "text"}
			required
			size="small"
			fullWidth
			className="Card_PersonalInfoForm_TextField"
			variant="outlined"
			{...(name === "phone" ? { onKeyDown: allowOnlyNumber } : {})}
		/>
	);
};

const PersonalInfoForm = () => {
	const navigate = useNavigate();
	let reduxMainState = useSelector((state) => state.reduxMainState);
	const [personalInfoFormData, setPersonalInfoFormData] = useState(reduxMainState?.personalInformation ?? {});
	const [errorObjectData, setErrorObjectData] = useState(reduxMainState?.errorObject?.personalInformationErrors ?? {});

	const Validation = (fieldName, value) => {
		let errorMsg = "";
		if (fieldName === "email") {
			errorMsg = emailRegex.test(value) ? "" : "Email is not valid";
		} else if (fieldName === "phone") {
			errorMsg = Number(value) > 0 && value.length == 10 ? "" : "Please enter valid 10 numbers";
		} else {
			errorMsg = value?.trim() ? "" : "This field is required";
		}

		setErrorObjectData((prevData) => {
			const updatedErrorObject = {
				...prevData,
				[fieldName]: errorMsg,
			};
			saveDataToStore({ ...reduxMainState?.errorObject, personalInformationErrors: updatedErrorObject }, "ERROR");
			return updatedErrorObject;
		});
	};

	const handleChange = (e) => {
		let { name, value } = e.target;

		let updatedObject = {};
		setPersonalInfoFormData((prevData) => {
			updatedObject = {
				...prevData,
				[name]: value,
			};
			return updatedObject;
		});

		saveDataToStore(updatedObject, "PERSONALINFORMATION");
		Validation(name, value);
	};

	const handleNext = (e) => {
		Object.entries(reduxMainState?.personalInformation).forEach(([key, value]) => {
			Validation(key, value);
		});

		let allFieldsValidated = Object.keys(errorObjectData).length == 5 && Object.values(errorObjectData ?? {}).every((x) => x === "");
		if (allFieldsValidated) {
			navigate("/education");
		} else {
			saveDataToStore({ open: true, message: "Please fill in the all required data." }, "ALERT");
		}
	};

	return (
		<>
			<Typography className="StepHeader" variant="h5">
				Personal Information
			</Typography>

			<div className="PersonalInformationFormDiv">
				<InputTextFieldComponent name="firstName" label="First Name" value={personalInfoFormData?.firstName ?? ""} onChange={handleChange} error={!!errorObjectData["firstName"]} helperText={errorObjectData["firstName"] ?? ""} />
				<InputTextFieldComponent name="lastName" label="Last Name" value={personalInfoFormData?.lastName ?? ""} onChange={handleChange} error={!!errorObjectData["lastName"]} helperText={errorObjectData["lastName"] ?? ""} />
				<InputTextFieldComponent name="email" label="Email" value={personalInfoFormData?.email ?? ""} onChange={handleChange} error={!!errorObjectData["email"]} helperText={errorObjectData["email"] ?? ""} />
				<InputTextFieldComponent name="phone" label="Phone" value={personalInfoFormData?.phone ?? ""} onChange={handleChange} error={!!errorObjectData["phone"]} helperText={errorObjectData["phone"] ?? ""} />
				<InputTextFieldComponent name="address" label="Address" value={personalInfoFormData?.address ?? ""} onChange={handleChange} error={!!errorObjectData["address"]} helperText={errorObjectData["address"] ?? ""} />
			</div>
			<div className="Card_BtnDiv">
				<Button variant="contained" endIcon={<Send />} onClick={handleNext}>
					save and submit
				</Button>
			</div>
		</>
	);
};

export default PersonalInfoForm;
