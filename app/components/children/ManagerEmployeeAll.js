var React = require("react");
var helpers = require("../utils/helpers");

var ManagerEmployeeAll = React.createClass({
    getInitialState: function() {
        return {
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
            error: "",
            allEmployees: [],
            selectedEmployee: "",
            emp_id: ""
        };
    },

    componentDidMount: function() {
        this.getEmployees();
    },

    getEmployees: function() {
        helpers.getAllEmployees().then(function(response) {
            if (response !== this.state.allEmployees) {
                this.setState({ allEmployees: response.data });
                this.activeButtons();
            }
        }.bind(this));
    },

    handleUserChange(event) {
       this.setState({ [event.target.name]: event.target.value});
    },

    handleAddForm: function(event) {
        const {teamId, firstName, lastName, username, email, addressOne, addressTwo, city, country, zip, phone, phoneType, password} = this.state;
        event.preventDefault();
        helpers.addEmployee(teamId, firstName, lastName, username, email, addressOne, addressTwo, city, country, zip, phone, phoneType, password).then(function(response) {
            this.state.emp_id = response.data._id;

            helpers.addEmpSchedule(this.state.emp_id, this.state.firstName, this.state.lastName).then(function(response) {
                this.clearStates();
            }.bind(this));

        }.bind(this));
        Materialize.toast('Employee added', 3000);
        this.clearForm();
        this.getEmployees();
    },

    handleUpdateForm: function(event) {
        const {teamId, firstName, lastName, username, email, addressOne, addressTwo, city, country, zip, phone, phoneType, password} = this.state;
        event.preventDefault();
        helpers.updateEmployee(teamId, firstName, lastName, username, email, addressOne, addressTwo, city, country, zip, phone, phoneType, password).then(function(response) {
        }.bind(this));

        helpers.updateEmpName(this.state.emp_id, this.state.firstName, this.state.lastName).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast("Employee updated", 3000);
        this.clearForm();
        this.getEmployees();
   },

    handleRemoveForm: function(event) {
        event.preventDefault();
        helpers.removeEmployee(this.state.selectedEmployee).then(function(response) {
        }.bind(this));
        helpers.removeEmpSchedule(this.state.emp_id).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast("Employee removed", 3000);
        this.clearForm();
        this.getEmployees();
    },

    clickEmployee: function(event) {
        this.setState({selectedEmployee: event.target.id}, function() {
            for (var i = 0; i < this.state.allEmployees.length; i++) {
                if (this.state.allEmployees[i]._id == this.state.selectedEmployee) {
                    this.setState({
                        teamId: this.state.allEmployees[i].teamId,
                        firstName: this.state.allEmployees[i].firstName,
                        lastName: this.state.allEmployees[i].lastName,
                        username: this.state.allEmployees[i].username,
                        userType: this.state.allEmployees[i].userType,
                        picture: this.state.allEmployees[i].picture,
                        addressOne: this.state.allEmployees[i].addressOne,
                        addressTwo: this.state.allEmployees[i].addressTwo,
                        city: this.state.allEmployees[i].city,
                        country: this.state.allEmployees[i].state,
                        zip: this.state.allEmployees[i].zip,
                        email: this.state.allEmployees[i].email,
                        phone: this.state.allEmployees[i].phone,
                        phoneType: this.state.allEmployees[i].phoneType,
                        emp_id: this.state.selectedEmployee
                    });
                    this.activeButtons();
                }
            }
        });
    },

    newEmployee: function() {
        this.clearForm();
        this.clearStates();
        this.activeButtons();
    },

    clearForm: function() {
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
            if ((elements[i].type == "text") || (elements[i].type == "number") || (elements[i].type == "email")) {
                elements[i].value = "";
                elements[i].classList.remove("valid");
            }
        };
        this.getEmployees();
    },

    clearStates: function() {
        this.setState({ firstName: "", lastName: "", addressOne: "", addressTwo: "", city: "", state: "", zip: "", email: "", phone: "", phoneType: "", selectedEmployee: ""});
    },

    activeButtons: function() {
        // don't allow updating or removing on empty form
        if (this.state.selectedEmployee == "") {
            document.getElementById("addEmployee").className = "btn btn-large waves-effect waves-light green accent-3";
            document.getElementById("updateEmployee").className += " disabled";
            document.getElementById("removeEmployee").className += " disabled";
        } else {
            document.getElementById("addEmployee").className += " disabled";
            document.getElementById("updateEmployee").className = "btn btn-large waves-effect waves-light blue accent-3";
            document.getElementById("removeEmployee").className = "btn btn-large waves-effect waves-light red accent-3";
        }
    },

    render: function() {
        return (
            <div className="row">
                <div className="col m3">
                    <table className="highlight" id="allEmployees">
                        <thead>
                            <tr>
                                <th data-field="name">Employees</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="newEmployee" onClick={this.newEmployee}>
                                    <strong>New Employee<i className="material-icons right">add</i></strong>
                                </td>
                            </tr>
                            {this.state.allEmployees.map(function(ManagerEmployeeAll, i) {
                                return (
                                    <tr key={i}>
                                        <td onClick={this.clickEmployee} id={this.state.allEmployees[i]._id}>
                                            {ManagerEmployeeAll.firstName} {ManagerEmployeeAll.lastName}
                                        </td>
                                    </tr>
                                );
                            }, this)}
                        </tbody>
                    </table>
                </div>
                <div className="col m9">
                    <div className="row">
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
                                <div className="col s4">
                                    <button id="addEmployee" className="btn btn-large waves-effect waves-light green accent-3" type="submit" value="Submit">Add
                                        <i className="material-icons right">person_add</i>
                                    </button>
                                </div>
                                <div className="col s4">
                                    <a id="updateEmployee" className="btn btn-large waves-effect waves-light blue accent-3" onClick={this.handleUpdateForm}>Update
                                        <i className="material-icons right">edit</i>
                                    </a>
                                </div>
                                <div className="col s4">
                                    <a id="removeEmployee" className="btn btn-large waves-effect waves-light red accent-3" onClick={this.handleRemoveForm}>Remove
                                        <i className="material-icons right">person_outline</i>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ManagerEmployeeAll;