
const initialState={
	items:[],
	item:[],
	currentUser:[],
	isLogin:false,
	listItems:[],
	
}



export const userReducer=(state=initialState, action)=>{
	switch(action.type){
		case 'FETCH_USERS_SUCCESS':
			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				
			});
		case 'FETCH_USERS_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[]
				
			});
		
		case 'FETCH_USER_ID':
			return Object.assign({},state,{
				item: state.items.filter(i=>i._id===action.id)[0],
				
			})
		case 'LOGIN_SUCCESS':
			return Object.assign({},state,{
				item:{},
				items:[],
				listItems:[],
				currentUser:action.payload,
				isLogin:true,
				
			})
		case 'LOGIN_FAILED':
			return Object.assign({},state,initialState)
		case 'LOGOUT_SUCCESS':
			return Object.assign({},state,initialState)

		case 'ADD_USER_SUCCESS':
			return Object.assign({},state,{
				item:action.payload,
				items:state.listItems.concat(action.payload),
				listItems:state.listItems.concat(action.payload),
				
			})
		case 'ADD_USER_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		case 'EDIT_USER_SUCCESS':
			let updated=state.listItems.filter(i=>i._id!==action.payload._id)
			updated.push(action.payload)
			return Object.assign({},state,{
				item:action.payload,
				items:updated,
				listItems:updated,
				
			})
		case 'EDIT_USER_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
	
		case 'NEW_USER':
			return Object.assign({},state,{
				item:initialState.item
			})
		
		default:
			return state;
	}
}
