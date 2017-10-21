import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as todoActions from '../actions/todo';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {browserHistory} from 'react-router'; 

class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			todos:[],
			todo:{
				
				text:'',
				done:false
			},

			filtered:"0"

		}
		this.save=this.save.bind(this)
		this.handleInputEnter=this.handleInputEnter.bind(this)
		this.handleInputChange=this.handleInputChange.bind(this)
		this.handleRadioChange=this.handleRadioChange.bind(this)
		this.handleCheckboxChange=this.handleCheckboxChange.bind(this)
	};

	componentWillMount(){
		if(!this.props.isLogin){
			browserHistory.push('/login')
		}
		
		this.props.getAll(this.props.user._id)
		
	};

  	componentWillReceiveProps = (nextProps) => {
  		console.log(this.props)
  		console.log(nextProps)
  		if(this.props.todos){
  		
  			this.state={...this.state, todos:nextProps.todos, filter:nextProps.filter}

  			
  		}
  		
  		if(this.props.todo!==nextProps.todo){
  			this.getTodo(nextProps.todo)
  		}
  		
  	console.log(this.state)
  		
  	};
  	getTodo(todo){
  			this.state={...this.state,todo:{
  	
			text:Object.keys(todo).length===0?'':todo.text,
			done:Object.keys(todo).length===0?'':todo.done,
			
  		}}
  	}

	save(){

		this.props.add(this.state.todo);
		setTimeout(()=>{this.props.clear()},1000)
		this.state={...this.state,todo:{text:'',done:false,user:this.props.user._id}}
	}
	
	handleCheckboxChange(t,e){

		let todo={
			...t,
			done:!t.done
		}
		let todos=this.state.todos.filter(d=>d._id!==t._id).map(t=>Object.assign({},t))

		todos.push(todo)
		this.props.update(todo)
	
		this.setState({...this.state, todos:todos, filtered:"0"})
	}
	handleInputEnter(e){
		if(e.keyCode === 13){
			
			this.save()
		}
	}
	handleInputChange(e){
		this.setState({...this.state, todo:{...this.state.todo, user:this.props.user._id, [e.target.name]:e.target.value}})

	}

	
	
	handleRadioChange(e){
		this.props.filtered(e.target.value)
		this.state={...this.state, filtered:e.target.value}

	}
	render(){		

		return(
			<div className="card">
				<h2 className="card-header">Todos</h2>
				<button className="transparent" onClick={this.save}>
				<i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i></button>
				<input
					type="text"
					name="text"
					id="text"
					placeholder="todo task"
					value={this.state.todo.text}
					onChange={this.handleInputChange}
					onKeyDown={this.handleInputEnter}/>
		
				<div onChange={this.handleRadioChange}>
					<input type="radio" id="all" value="0" checked={this.state.filtered==="0"} />all
					<input type="radio" id="open" value="1" checked={this.state.filtered==="1"} />open
					<input type="radio" id="closed" value="2" checked={this.state.filtered==="2"} />closed
				
              	</div>
				<ul className="todo">
				{this.state.todos.map((t,i)=>{
					return(
						
						<li className={"todo__item todo__item--" + (t.done ? 'done' : 'open')} key={i}>  
						<input type="checkbox" checked={t.done} onClick={this.handleCheckboxChange.bind(this,t)}/>
						{t.text}
						</li>
					
					)
				})}
				</ul>
				
			</div>
		)
	}
}

const mapStateToProps=(state,ownProps)=>{
	return{
		
		todos:state.todo.items,
		todo:state.todo.item,
		filter:state.todo.filter,
		user:state.user.currentUser,
		isLogin:state.user.isLogin
	}
};
const mapDispatchToProps=(dispatch)=>{

	return{
		getAll:(id)=>dispatch(todoActions.getAll(id)),
		getId:(id)=>dispatch(todoActions.getId(id)),
		clear:()=>dispatch(todoActions.clear()),
		filtered:(code)=>dispatch(todoActions.filtered(code)),
		add:todo=>dispatch(todoActions.add(todo)),
		update:todo=>dispatch(todoActions.update(todo))
		
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(Todo);