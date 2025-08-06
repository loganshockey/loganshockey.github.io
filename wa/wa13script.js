let employees = [
  { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
  { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
  { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false },
  { firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false },
];

console.log("Employees");
console.log(employees);

let company = {
  companyName: "Tech Stars",
  website: "www.techstars.site",
  employees: employees
};

console.log("Company Info");
console.log(company);

let totalSalary = company.employees.reduce((sum, emp) => sum + emp.salary, 0);

console.log("Total Salary:");
console.log(`$${totalSalary}`);


company.employees.forEach(emp => {
  if (emp.raiseEligible) {
    emp.salary *= 1.1;
    emp.raiseEligible = false;
  }
});

console.log("Raises:");
console.log(company);


let wfhEmployees = ["Anna", "Sam"];

company.employees.forEach(emp => {
  emp.wfh = wfhEmployees.includes(emp.firstName);
});

console.log("WFH Employees");
console.log(company);