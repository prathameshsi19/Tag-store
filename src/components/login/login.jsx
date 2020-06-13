import React from "react";
import  { Component } from 'react';
import loginImg from "../../user.svg";
import { Auth } from "aws-amplify";
//import FormErrors from "../FormErrors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import welcome from "./welcome";
export class Login extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			username: "",
			password: "",
			loggedIn: false,
			errors: {
			  cognito: null,
			  blankfield: false
			}
		  }
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

		 //aws 
		 try{
			const user = await Auth.signIn(this.state.username, this.state.password);
				console.log(user);
			
 
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

	render() {
	return (
	<div className="base-container" ref={this.props.containerRef}>
	
	<div className="header">Login</div>

	<div className="content">
	<div className="image">
		<img src={loginImg} alt="login"/>
		<div className="header">Welcome to iWebLens</div>
	</div>
	
	<div className="header">Login</div>
	<form onSubmit={this.handleSubmit}>
	<div className="form">
     <div className="form-group">
     <label htmlFor="username">Username</label>
     <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
	</div>
	<div className="form-group">
     <label htmlFor="password">Password</label>
     <input type="password" name="pasword" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
	</div>
	<div className="footer">
	<button type="submit" className="btn">
	Login
	</button>
	</div>
	</div>
	</form>
	</div>
	
	</div>
	);
	}
}

