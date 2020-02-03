const initialState = {
	tabs: [],
	currentTab: undefined
};

const tabsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'NEW_TAB': {
			let check = state.tabs.find(tab => tab.title === action.payload.title);
			if (check) return { ...state, currentTab: check };
			else
				return {
					...state,
					tabs: [...state.tabs, action.payload],
					currentTab: action.payload
				};
		}
		case 'TAB_CLOSE': {
			let updatedCurrentTab;
			let updatedTabs = state.tabs;
			let index = state.tabs.findIndex(
				tab => tab.title === state.currentTab.title
			);
			updatedTabs.splice(index, 1);
			if (updatedTabs.length) {
				updatedCurrentTab =
					index === 0 ? updatedTabs[0] : updatedTabs[index - 1];
			}
			return { ...state, tabs: updatedTabs, currentTab: updatedCurrentTab };
		}
		case 'TAB_SWITCH': {
			return { ...state, currentTab: action.payload.currentTab };
		}
		case 'SAVE_DATA': {
			let index = state.tabs.findIndex(
				tab => tab.title === action.payload.currentTab.title
			);
			let tabs = state.tabs;
			tabs[index] = {
				...tabs[index],
				data: { ingredient: action.payload.ingredient }
			};
			return { ...state, tabs };
		}
		case 'UPDATE_TITLE': {
			let index = state.tabs.findIndex(
				tab => tab.title === action.payload.currentTab.title
			);
			let tabs = state.tabs;
			tabs[index] = { ...tabs[index], title: action.payload.title };
			return { ...state, tabs, currentTab: tabs[index] };
		}
		default:
			return state;
	}
};

export default tabsReducer;
