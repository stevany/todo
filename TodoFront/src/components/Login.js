import React from 'react';
import {connect} from 'react-redux';
import * as userActions from '../actions/user';
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'; 


class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
				username:'',
				password:'',
				
			}
		
		this.login=this.login.bind(this)
		this.cancel=this.cancel.bind(this)
		this.handleInputChange=this.handleInputChange.bind(this)

	};

	login(){
		
		this.props.login(this.state)
		this.state={}
		setTimeout(()=>{browserHistory.push(`/`)},1000)
		}
	

	

	handleInputChange(e){

		this.setState({...this.state, [e.target.name]: e.target.value })
        
	}
	cancel(e){
		this.props.cancel()
	}

	
	render(){		
		
		return(
			<div className="card">
				<h2 className="card-header">
				Login
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
				<button  className="btn" onClick={this.login}><i className="fa fa-check fa-lg" aria-hidden="true"></i> Login</button>
				<button  className="btn red" onClick={this.cancel}><i className="fa fa-times-circle fa-lg" aria-hidden="true"></i> Cancel</button>
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
		login:user=>dispatch(userActions.login(user)),
		cancel:()=>dispatch(userActions.clear()),
		
		
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);