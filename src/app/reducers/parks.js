function parks(state={}, action) {
	
	switch(action.type) {
		case 'FETCH_PARKS':
			return {
				...state,
				area: action.area,
				hasFetched: false
			}
		case 'FETCH_PARKS_SUCCESS':
		    return {
				...state,
				hasFetched: true,
				parks: action.payload
			}
		case 'FETCH_PARKS_FAIL':
			return {
				...state,
				hasFetched: true,
				error: action.payload
			}

		default:
			return state;
	}

	return state;
}

export default parks;
