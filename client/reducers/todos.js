const initState = [
		'My first TODO',
		'My second TODO'
]

export default function todos(state = initState, action) {
		if (action.type === 'ADD_TODO')
		{
			return [
				...state,
				action.payload
			];
		}
		else if (action.type === 'DELETE_TODO')
		{
			return state;
		}
		return state;
	}