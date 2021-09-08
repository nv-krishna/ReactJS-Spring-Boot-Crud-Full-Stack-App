package com.dev.springboot.reactjs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dev.springboot.reactjs.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
