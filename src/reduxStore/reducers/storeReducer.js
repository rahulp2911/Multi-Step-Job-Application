const initialState = {
	personalInformation: {},
	educationInformation: {},
	workExperienceInformation: [],
	skillsInformation: "",
	additionalInformation: {
		coverLetter: "",
		resume: "",
	},
	errorObject: {
		personalInformationErrors: {},
		educationInformationErrors: {},
		workExperienceInformationErrors: {},
		skillsInformationErrors: {},
		additionalInformationErrors: {},
	},
	alertObject: {
		open: false,
		message: "",
	},
};

const storeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "PERSONALINFORMATION":
			return { ...state, personalInformation: action.payload };
		case "EDUCATIONINFORMATION":
			return { ...state, educationInformation: action.payload };
		case "WORKEXPERIENCEINFORMATION":
			return { ...state, workExperienceInformation: action.payload };
		case "SKILLSINFORMATION":
			return { ...state, skillsInformation: action.payload };
		case "ADDITIONALINFORMATION":
			return { ...state, additionalInformation: action.payload };
		case "ERROR":
			return { ...state, errorObject: action.payload };
		case "ALERT":
			return { ...state, alertObject: action.payload };
	}
	return state;
};
export default storeReducer;
