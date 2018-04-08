var React = require("react");
var helpers = require("../utils/helpers");

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teamId: "",
      firstName: "",
      lastName: "",
      username: "",
      email:"",
      addressOne: "",
      addressTwo: "",
      city: "",
      country: "",
      zip: "",
      phone: "",
      phoneType: "",
      password: "",
      passwordConfirmation:"",
      error: ""
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUserChange(event) {
     this.setState({ [event.target.name]: event.target.value});
  }

  handleLogin() {

   // helpers.errorMessage().then(function(response) {
   //      console.log(response)
   //          this.setState({ error: response.data});
   //        }.bind(this));

  }
    render() {
      return (
        <div className="container">
            <div className="row" id="loginForm">
                <div className="col m6 offset-m3">
                    <div className="card-panel">
                        <div className="row grey lighten-5">
                            <div className="col s12 center">
                                <h4 className="blue-text text-darken-1">Register</h4>
                                <h4> {this.state.error}</h4>
                            </div>
                        </div>
                        <form action="/register" method="POST" onSubmit={this.handleLogin}><div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="TeamId"
                                        type="text"
                                        className="validate"
                                        value={this.state.teamId}
                                        name="teamId"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        className="validate"
                                        value={this.state.firstName}
                                        name="firstName"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        className="validate"
                                        value={this.state.lastName}
                                        name="lastName"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Username"
                                        type="text"
                                        className="validate"
                                        value={this.state.username}
                                        name="username"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        className="validate"
                                        value={this.state.email}
                                        name="email"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Password"
                                        type="password"
                                        className="validate"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="validate"
                                        value={this.state.passwordConfirmation}
                                        name="passwordConfirmation"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Address Line One"
                                        type="text"
                                        className="validate"
                                        value={this.state.addressOne}
                                        name="addressOne"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="Address Line Two"
                                        type="text"
                                        className="validate"
                                        value={this.state.addressTwo}
                                        name="addressTwo"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="City"
                                        name="city"
                                        type="text"
                                        className="validate"
                                        value={this.state.city}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m3 s6">
                                    <select className="browser-default" name="country" value={this.state.country} onChange={this.handleUserChange} required>
                                        <option value="" disabled>Country</option>
                                        <option value="IRL">IRL</option>
                                        <option value="AUS">AUS</option>
                                    </select>
                                </div>
                                <div className="input-field col m3 s6">
                                    <input
                                        placeholder="Zip/Eircode"
                                        name="zip"
                                        type="number"
                                        className="validate"
                                        value={this.state.zip}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <select name="userType">
                                        <option defaultValue="" disabled selected>Select User Type</option>
                                        <option value="employee">Employee</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s8">
                                    <input
                                        placeholder="phone"
                                        type="text"
                                        className="validate"
                                        value={this.state.phone}
                                        name="phone"
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m4 s4">
                                    <select className="browser-default" name="phoneType" value={this.state.phoneType} onChange={this.handleUserChange} required>
                                        <option value="" disabled>Phone Type</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="work">Work</option>
                                        <option value="home">Home</option>
                                    </select>
                                </div>
                            </div>
                                
                            <div className="row">
                                <div className="col s3">
                                    <button className="btn waves-effect waves-light btn-large blue accent-3 loginButtons" type="submit" value="Submit" name="action">Register<i className="material-icons right">person_add</i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  };

  module.exports = Register;
