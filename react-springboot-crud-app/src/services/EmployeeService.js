import axios from "axios";
const EMPLOYEE_API_BASE_URL = "http://localhost:8082/api/v1/employees";

class EmployeeService {
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    saveEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }
    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL+"/"+id);
    }
    deleteEmployeeById(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL+"/"+id)
    }
}
export default new EmployeeService()