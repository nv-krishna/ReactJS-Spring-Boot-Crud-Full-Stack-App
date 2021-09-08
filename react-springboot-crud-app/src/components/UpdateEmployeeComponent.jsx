import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class UpdateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  componentDidMount() {
    console.log("ID : " + this.state.id);
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        emailId: res.data.emailId,
      });
    });
  }
  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailIdHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };

  updateEmployee = (e) => {
    e.preventDefault();
    let employee = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };
    EmployeeService.saveEmployee(employee).then((res) => {
      this.props.history.push("/employees");
    });
  };

  cancel() {
    this.props.history.push("/employees");
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Update Employee</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>First Name: </label>
                  <input
                    name="firstName"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Email ID: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={this.state.emailId}
                    onChange={this.changeEmailIdHandler}
                  />
                </div>
                <br></br>
                <button
                  className="btn btn-success"
                  onClick={this.updateEmployee}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.cancel.bind(this)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateEmployeeComponent;
