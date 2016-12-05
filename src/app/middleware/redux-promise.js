const promiseMiddleware = store => next => action => {
	if(action.payload && action.payload.then) {
		action.payload.then(
			data => {
				store.dispatch({
					type: action.type+"_SUCCESS",
					payload: data
				})
			},
			error => {
				store.dispatch({
					type: action.type+"_FAIL",
					payload: error
				})
			}
		)
	}

	return next(action);
}

export default promiseMiddleware;
