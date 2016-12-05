// async thunk fetch for parks request
export function fetchParks(area, lat, lng) {
	return { 
		type: 'FETCH_PARKS',
		area,
		payload: fetch(`https://pure-peak-99410.herokuapp.com/api/v1/parks?lat=${lat}&lng=${lng}`)
			.then(response => response.json())
	}
}
