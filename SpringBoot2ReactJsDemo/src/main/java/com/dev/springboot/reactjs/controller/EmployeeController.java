package com.dev.springboot.reactjs.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.springboot.reactjs.exception.ResourceNotFoundException;
import com.dev.springboot.reactjs.model.Employee;
import com.dev.springboot.reactjs.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	@Autowired
	private EmployeeRepository employeeRepository;
	
	//get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return this.employeeRepository.findAll();
	}
	
	//Add employee
	@PostMapping("/employees")
	public Employee saveEmployee(@RequestBody Employee employee) {
		return this.employeeRepository.save(employee);
	}
	
	//Get Employee by id
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) {
		Employee employee =  this.employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found for id " + id));
		return ResponseEntity.ok(employee);
	}
	
	//Update employee
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee employee) {
		Employee employee1 =  this.employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found for id " + id));
		employee1.setFirstName(employee.getFirstName());
		employee1.setLastName(employee.getLastName());
		employee1.setEmailId(employee.getEmailId());
		Employee updatedEmp = this.employeeRepository.save(employee1);
		return ResponseEntity.ok(updatedEmp);
	}
	
	//delete employee
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable("id") Long id) {
		Employee employee1 =  this.employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found for id " + id));
		this.employeeRepository.delete(employee1);
		Map<String, Boolean> result = new HashMap<>();
		result.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(result);
	}
}
