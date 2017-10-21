import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			name:''
		}
	};

 	componentWillReceiveProps = (nextProps, nextState) => {
  		console.log(this.props)
  		console.log(nextProps)
  		if(this.props.user!==nextProps.user){
  			this.state={...this.state, name:nextProps.user.username }
  			console.log(this.state)
  		
	  	}
	}
  render() {
    const { visible,activeItem } = this.state || {}
    return (
			<div>
			<div className="top">
			<span className="left">
				<Link to="/" activeClassName="active"><i className="fa fa-home fa-2x" aria-hidden="true"></i>Home</Link>
			</span>	
				<span className="right">
					{this.state.name===''? '' : 'Welcome, ' + this.state.name + '  '}
					<Link to="/register" activeClassName="active">
						<i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> Register  
					</Link>

					<Link to="/login" activeClassName="active">
						<i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>  Login 
						</Link>
				</span>
			
			</div>
			<div className="container">
				{this.props.children}
			  <div className="footer-spacer"></div>   
			</div>
			<div className="footer">

				<i className="fa fa-copyright" aria-hidden="true"></i>
				stevany October 2017
			
			</div>
			</div>
			);
};
};

const mapStateToProps=(state,ownProps)=>{
	return{
		
		user:state.user.currentUser
		
	}
};
export default connect(mapStateToProps)(App)