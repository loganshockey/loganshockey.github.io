// Problem 1, Problem 3

let employees = [
  { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
  { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
  { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false },
  { firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false },
];

console.log("Employees");
console.log(employees);

// Problem 2

let company = {
  companyName: "Tech Stars",
  website: "www.techstars.site",
  employees: employees
};

console.log("Company Info");
console.log(company);

// Problem 4

let totalSalary = company.employees.reduce((sum, emp) => sum + emp.salary, 0);

console.log("Total Salary:");
console.log(`$${totalSalary}`);

// Problem 5
company.employees.forEach(emp => {
  if (emp.raiseEligible) {
    emp.salary *= 1.1;
    emp.raiseEligible = false;
  }
});

console.log("Raises:");
console.log(company);

// Problem 6
let wfhEmployees = ["Anna", "Sam"];

company.employees.forEach(emp => {
  emp.wfh = wfhEmployees.includes(emp.firstName);
});

console.log("WFH Employees");
console.table(company.employees); 