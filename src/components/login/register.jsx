import React from "react";
import registerImg from "../../user.svg";
import { Auth } from "aws-amplify";
import welcome from "./welcome";

export class Register extends React.Component{
	
	constructor(props){
		super(props);
		
	this.state = {
		isLoading: false,
		username: "",
		password: "",
		email: "",
		code: "",
		newUser: null,
		errors: {
		  cognito: null,
		  blankfield: false
		}
	  }
	}
	//newaddition
	validateForm() {
		return (
			this.state.email.length > 0 &&
			this.state.password.length > 0 
			
		);
	}
	
	  clearErrorState = () => {
		this.setState({
		  errors: {
			cognito: null,
			blankfield: false
		  }
		});
	  }
	  handleSubmit = async event => {
		 
		alert(`${this.state.username}`)
		 event.preventDefault(); 
		//addition 
		 this.setState({ isLoading: true });
		 //aws
		 const { username, email, password } = this.state;
	   try{
		   const newUser = await Auth.signUp({
			   username,
			   password,
			   attributes:{
				email: email
			   }
			  
			   
			   
			   });
			   console.log(newUser);
			   this.setState({
				newUser
			});
			   
			   
			   

		}catch(error){
			let err = null;
			!error.message ? err = { "message": error } : err = error;
			this.setState({
				errors: {
					...this.state.errors,
					cognito: err
				}

			});

		}
		//addition
		this.setState({ isLoading: false });
	  };
	//addition
	handleConfirmationSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			await Auth.confirmSignUp(this.state.username, this.state.code);
			await Auth.signIn(this.state.email, this.state.password);

			//this.props.userHasAuthenticated(true);
			this.props.history.push('/');
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	};

	  
	
	  handleUsernameChange = (event) => {
		  this.setState({
			  username: event.target.value
		  })
	  }
	  handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value
		})
	}
	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value
		})
	}

	handleCodeChange = (event) => {
		this.setState({
			code: event.target.value
		})
	}

		//addition
		renderConfirmationForm() {
			return (
				<form onSubmit={this.handleConfirmationSubmit}>  
					<div className="form">
					<div className="form-group">
					<label htmlFor="confirmationcode">Confirmation Code</label>
					<input type="text" name="code" placeholder="code" value={this.state.code} onChange={this.handleCodeChange} />
					</div>
					</div>
					<button type="submit" isLoading={this.state.isLoading} >Submit</button>
				</form>
				
			)
		}

	renderForm() {
	return (
		<div className="base-container" ref={this.props.containerRef}>
	
		<div className="header">Login</div>
	
		<div className="content">
		<div className="image">
			<img src={registerImg} alt="register"/>
			<div className="header">Welcome to iWebLens</div>
		</div>
		
		<div className="header">Login</div>
		<form onSubmit={this.handleSubmit} >
		<div className="form" >
		 <div className="form-group">
		 <label htmlFor="username">Username</label>
		 <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
		</div>
		<div className="form-group">
		 <label htmlFor="email">Email</label>
		 <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} />
		</div>
		<div className="form-group">
		 <label htmlFor="password">Password</label>
		 <p>Password require Lowecase, uppercase and number</p>
		 <input type="password" name="pasword" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
		</div>
		<div className="footer">
		<button type="submit" className="btn">
		Register
		</button>
		</div>
		</div>
		</form>
		</div>
		
		</div>
	
	
	
	);
	} 
     //addition
	render() {
		return (
			<div className="Signup">{this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()}</div>
		);
	}
}