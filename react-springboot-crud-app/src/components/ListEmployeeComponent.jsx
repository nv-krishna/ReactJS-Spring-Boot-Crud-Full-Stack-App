import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);

    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.viewEmployee = this.viewEmployee.bind(this);
  }
  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }
  addEmployee() {
    this.props.history.push("/add-employee");
  }

  updateEmployee(id) {
    this.props.history.push(`/update-employee/${id}`);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployeeById(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        )
      });
    });
  }

  viewEmployee(id) {
      this.props.history.push(`/view-employee/${id}`);
  }
  render() {
    return (
      <div>
        <h2 className="text-center">Employee List</h2>
        <div className="row">
          <div className="col-sm">
            <button
              className="btn btn-primary btn-block"
              onClick={this.addEmployee}
            >
              Add Employee{" "}
            </button>
          </div>
          <div className="col-sm"></div>
          <div className="col-sm"></div>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-primary">
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.emailId}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.updateEmployee(employee.id)}
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-danger btn-sm"
                      onClick={() => this.deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="btn btn-info btn-sm"
                      onClick={() => this.viewEmployee(employee.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
