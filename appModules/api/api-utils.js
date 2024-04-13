async function getData(url) {
	try {
		const response = await fetch(url);
		console.log(response)
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

function getRandomGame(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

module.exports = {
	getData,
	getRandomGame,
};
