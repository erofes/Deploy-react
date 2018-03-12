const initState = [
		'My list one',
		'My list two'
]

export default function todos(state = initState, action) {
		if (action.type === 'ADD_LIST')
		{
			return state;
		}
		else if (action.type === 'DELETE_LIST')
		{
			return state;
		}
		return state;
	}