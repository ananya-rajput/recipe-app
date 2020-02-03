export const tabClose = () => {
	return {
		type: 'TAB_CLOSE'
	};
};

export const tabSwitch = payload => {
	return {
		type: 'TAB_SWITCH',
		payload
	};
};

export const newTab = payload => {
	return {
		type: 'NEW_TAB',
		payload
	};
};

export const saveTabData = payload => {
	return {
		type: 'SAVE_DATA',
		payload
	};
};

export const updateTitle = payload => {
	return {
		type: 'UPDATE_TITLE',
		payload
	};
};
