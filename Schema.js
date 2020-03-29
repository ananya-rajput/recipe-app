const Schema = {
	id: 'string',
	title: 'string', // !
	subtitle: 'string',
	description: 'string',
	author: 'String', // !
	cost: 'Number', // ! initial 0
	cuisine: 'ID', // !
	cookingTime: 'Number', // !
	allergans: ['ID', 'ID', 'ID'], // ID will come from each ingredients []!
	difficulty: [1, 2, 3, 4, 5], // []!
	assets: {
		images: [{ url: 'String', caption: 'String' }], // [length 1]!
		video: 'Url'
	},
	tags: ['string'],
	type: 'Enum', // !
	servings: [
		// [length 1]!
		{
			size: 2,
			cost: 12,
			nutritionalValue: { cals: 'String', sugar: 'String', carbs: 'String' } //{}!
		},
		{}
	],
	ingredients: [
		// [!]!
		{
			id: '7823647823',
			processing: '84758934579',
			quantity: ['3645327', '783468723', '3784723', '346343']
		}
	],
	procedure: [
		// [!]!
		{
			// section name
			name: 'String',
			// steps for this section
			steps: [
				// !
				{
					title: 'string',
					photos: ['url1', 'url2'],
					videos: ['url1', 'url2'],
					description: 'String!' // !
				}
			]
		}
	]
};
