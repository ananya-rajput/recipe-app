import React from 'react';

import Home from './views/Home';
import TabView from './components/TabView';
import RecipeListing from './views/Listings/Recipe/';

function App() {
	return (
		<>
			<TabView />
			<RecipeListing />
		</>
	);
}

export default App;
