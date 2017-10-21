import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getAllSuccess=(items)=>{
	return{
		type:actionTypes.FETCH_TODOS_SUCCESS,
		payload:items
	}
}

export const getAllError=(error)=>{
	return{
		type:actionTypes.FETCH_TODOS_ERROR,
		payload: error
	}
}

export const createSuccess=(item)=>{
	return{
		type:actionTypes.ADD_TODO_SUCCESS,
		payload:item
	}
}
export const createError=(error)=>{

	return{
		type:actionTypes.ADD_TODO_ERROR,
		error:error
	}
}
export const editSuccess=(item)=>{
	console.log(item)
	return{
		type:actionTypes.EDIT_TODO_SUCCESS,
		payload:item
	}
}

export const editError=(error)=>{
	
	return{
		type:actionTypes.EDIT_TODO_ERROR,
		error:error
	}
}

export const getAll=(user)=>{
	return dispatch =>{
	
		axios.get(actionTypes.ROOT_URL+"/todos/user/"+user)
			.then((response)=>{
				console.log(response.data.data)
				dispatch(getAllSuccess(response.data.data));
			}).catch((error)=>{
				console.log(error)
				dispatch(getAllError(error));
			});
	}

}

export const add=(data)=>{
	console.log(data)
	return dispatch =>{
		return axios({
			method:'POST',
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			url:actionTypes.ROOT_URL + '/todo',
			
			data:JSON.stringify(data)
		})
		.then(
			response => {
				console.log(response)
				dispatch(createSuccess(response.data.data));
		}).catch(
			error => {
				dispatch(createError(error));
		})
		}
	}

export const update=(data)=>{
	
	return dispatch=>{
		return axios({
			method:'PUT',
			url:actionTypes.ROOT_URL + '/todo/id/'+ data._id,
			headers:{
				'Accept' : 'application/json',
				'Content-Type':'application/json'
			},
			data:JSON.stringify(data)
		})
		
		.then(
			response => {
				
				dispatch(editSuccess(data));
		}).catch(
			error => {
				dispatch(editError(error));
		})
      }
    }

 export const filtered=(code)=>{
 	return{
 		type:'FETCH_TODOS_FILTERED',
 		payload:code
 	}
 }

 export const clear=()=>{
 	return{
 		type:actionTypes.NEW_TODO
 	}
 }





