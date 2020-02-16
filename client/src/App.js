import React from 'react';

import Home from './views/Home';
import TabView from './components/TabView';
import RecipeListing from './views/Listings/Recipe/';
import AddRecipe from './views/Forms/Recipe/AddRecipe';

function App() {
	return (
		<>
			<TabView />
			<AddRecipe />
		</>
	);
}

export default App;
