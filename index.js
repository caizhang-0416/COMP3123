var http = require("http");
var employees = require("./Employee");
console.log("Lab 03 - NodeJs");

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            res.end('<h1>Welcome to Lab Exercises 03</h1>');
        } else if (req.url === '/Employee') {
            
            res.end(JSON.stringify(employees, null, 2));
        } else if (req.url === '/Employee/names') {
            
            let employeeNames = employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort();
            res.end(JSON.stringify(employeeNames));
        } else if (req.url === '/Employee/totalsalary') {
            
            let total_salary = employees.reduce((total, emp) => total + emp.Salary, 0); 
            res.end(JSON.stringify({"total_salary": total_salary}));
        } else {
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
        }
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
