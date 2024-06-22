import React from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ReviewForm = () => {
	const navigate = useNavigate();
	let reduxMainState = useSelector((state) => state.reduxMainState ?? {});

	const handleBack = () => {
		navigate("/additional-info");
	};

	return (
		<>
			<Typography className="StepHeader" variant="h5">
				Review and Submit Application
			</Typography>
			<div>
				<Typography variant="h6">Personal Information</Typography>
				<p>First Name: {reduxMainState?.personalInformation?.firstName ?? ""}</p>
				<p>Last Name: {reduxMainState?.personalInformation?.lastName ?? ""}</p>
				<p>Email: {reduxMainState?.personalInformation?.email ?? ""}</p>
				<p>Phone: {reduxMainState?.personalInformation?.phone ?? ""}</p>
				<p>Address: {reduxMainState?.personalInformation?.address ?? ""}</p>
			</div>

			<br />
			<div>
				<Typography variant="h6">Education</Typography>

				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className="TableHeader">School/Institute Name</TableCell>
								<TableCell className="TableHeader">Board/University</TableCell>
								<TableCell className="TableHeader">CGPA </TableCell>
								<TableCell className="TableHeader">Passing Year</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{["SSC", "HSC", "Graduation", "Post Graduation"].map((edu, index) => {
								let id = edu === "Post Graduation" ? "postgraduation" : edu.toLowerCase();
								let boardId = "board" + id;
								let cgpaId = "cgpa" + id;
								let yearId = "year" + id;
								return (
									<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell>{edu}</TableCell>
										<TableCell>{reduxMainState?.educationInformation[boardId] ?? "-"} </TableCell>
										<TableCell>{reduxMainState?.educationInformation[cgpaId] ?? "-"} </TableCell>
										<TableCell>{reduxMainState?.educationInformation[yearId] ?? "-"} </TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			<br />

			<div>
				<Typography variant="h6">Work Experience</Typography>

				<TableContainer component={Paper} sx={{ maxHeight: "23rem" }}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className="TableHeader">Company Name</TableCell>
								<TableCell className="TableHeader">Job Title</TableCell>
								<TableCell className="TableHeader">Duration </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reduxMainState?.workExperienceInformation?.length > 0 ? (
								<>
									{reduxMainState?.workExperienceInformation?.map((WorkObj, index) => {
										let id = WorkObj?.id.toString();
										let companyNameId = "companyName" + id;
										let jobTitleId = "jobTitle" + id;
										let durationId = "duration" + id;
										return (
											<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell>{WorkObj[companyNameId] ?? "-"}</TableCell>
												<TableCell>{WorkObj[jobTitleId] ?? "-"} </TableCell>
												<TableCell>{WorkObj[durationId] ?? "-"} </TableCell>
											</TableRow>
										);
									})}
								</>
							) : (
								<TableRow>
									<TableCell>No Experience</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			<br />

			<div>
				<Typography variant="h6">Technical Skills</Typography>
				<p>{reduxMainState?.skillsInformation ?? "-"}</p>
			</div>

			<br />

			<div>
				<Typography variant="h6">Additional Information</Typography>
				<p>Cover Letter: {reduxMainState?.additionalInformation?.coverLetter ?? "-"}</p>
				<p>Resume: {reduxMainState?.additionalInformation?.resume ?? "-"}</p>
			</div>

			<div className="Card_BtnDiv">
				<Button variant="contained" startIcon={<ArrowCircleLeft />} sx={{ mr: "15px" }} onClick={handleBack}>
					Back and edit
				</Button>
			</div>
		</>
	);
};
export default ReviewForm;
