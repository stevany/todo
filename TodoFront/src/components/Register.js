import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/user';
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'; 


class Register extends React.Component{
	constructor(props){
		super(props);
		
		
		this.save=this.save.bind(this)
		this.cancel=this.cancel.bind(this)
		this.handleInputChange=this.handleInputChange.bind(this)
		

	};
	state={
		username:'',
		password:'',
	}

	save(){
		
		this.props.add(this.state)
		this.state={}
		setTimeout(()=>{browserHistory.push(`/login`)},1000)
	}
	

	

	handleInputChange(e){

		this.setState({...this.state, [e.target.name]: e.target.value})
        
	}
	cancel(e){
		this.props.cancel()
		this.state={username:'',password:''}
	}

	
	render(){		
		
		return(
			<div className="card">
				<h2 className="card-header">
				Register
				</h2>

				<input
					type="text"
					name="username"
					placeholder="username"
					value={this.state.username}
					id="username"
					onChange={this.handleInputChange}/>
				<input
					type="password"
					name="password"
					placeholder="password"
					value={this.state.password}
					id="password"
					onChange={this.handleInputChange}/>
				<p></p>
				<button type="button" className="btn green" onClick={this.save}><i className="fa fa-check fa-lg" aria-hidden="true"></i> Save</button>
				<button type="button" className="btn red" onClick={this.cancel}>Cancel <i className="fa fa-times-circle fa-lg" aria-hidden="true"></i></button>
			</div>
		)
	}
}
const mapStateToProps=(state,ownProps)=>{
	return{
		
		user:state.user.item
	}
};
const mapDispatchToProps=(dispatch)=>{

	return{
		add:user=>dispatch(userActions.add(user)),
		cancel:()=>dispatch(userActions.clear()),
		
	}
};
export default connect(mapStateToProps,mapDispatchToProps)(Register);