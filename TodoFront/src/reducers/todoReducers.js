
const initialState={
	
	items:[],
	item:[],
	listItems:[],
	filter:[
	{id:"0", name:"all"},
	{id:"1", name:"open"},
	{id:"2", name:"closed"}]
}
function applyFilters(name,items){
	return items.filter(i => i.name.toLowerCase().match(name.toLowerCase()))
}

export const todoReducer=(state=initialState, action)=>{
	switch(action.type){
		case 'FETCH_TODOS_SUCCESS':
			return Object.assign({},state,{
				items:action.payload,
				listItems:action.payload,
				
			});
		case 'FETCH_TODOS_ERROR':
			return Object.assign({}, state,{
				items:[],
				listItems:[]
			});
		
		case 'ADD_TODO_SUCCESS':
			return Object.assign({},state,{
				item:action.payload,
				items:state.items.concat(action.payload),
				listItems:state.listItems.concat(action.payload)
			})
		case 'ADD_TODO_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		case 'EDIT_TODO_SUCCESS':
			let updated=state.items.filter(i=>i._id!==action.payload._id)

			updated.push(action.payload)

			return Object.assign({},state,{
				item:{},
				items:updated,
				listItems:updated
			})
		case 'EDIT_TODO_ERROR':
			return Object.assign({}, state,{
				error:action.error
			})
		case 'FETCH_TODOS_FILTERED':
			let todos=[]
			console.log(action.payload)
			switch(action.payload){
	                case "0":todos=state.listItems.map(t=>Object.assign({},t));break;
	                case "1":todos=state.listItems.filter(t=>t.done===false).map(t=>Object.assign({},t)); break;
	                case "2":todos=state.listItems.filter(t=>t.done===true).map(t=>Object.assign({},t));break;

	            }
	       
	        return Object.assign({},state,{
	        	items:todos
	        })
	    
		case 'NEW_TODO':
			return Object.assign({},state,{
				item:initialState.item
			})
		default:
			return state;
	}
}
