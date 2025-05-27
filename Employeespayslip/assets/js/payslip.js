const data = JSON.parse(localStorage.getItem('payrollData'));



if (data) {
  const date = new Date(data.date);
  const month = date.toLocaleString('default', { month: 'long' });

  document.getElementById('empNameInfo').innerText = data.empName;
  document.getElementById('dateInfo').innerText = data.date;
  document.getElementById('empIdInfo').innerText = data.empId;
  document.getElementById('monthInfo').innerText = month;
  document.getElementById('empRoleInfo').innerText = data.empRole;

  // Also fill table values if you have a table section below
  document.getElementById('empIdShow').innerText = data.empId;
  document.getElementById('empNameShow').innerText = data.empName;
  document.getElementById('basicSalaryShow').innerText = data.basicSalary;
  document.getElementById('totalSalaryShow').innerText = data.totalSalary;
  document.getElementById('additionsShow').innerText = data.additions;
  document.getElementById('deductionsShow').innerText = data.deductions;

  const finalEarnings = data.totalSalary - data.deductions;
  document.getElementById('finalEarnings').innerText = finalEarnings.toFixed(2);
}






document.getElementById('empIdShow').innerText = data.empId;
document.getElementById('empNameShow').innerText = data.empName;
document.getElementById('basicSalaryShow').innerText = `₹${data.basicSalary}`;
document.getElementById('totalSalaryShow').innerText = `₹${data.totalSalary}`;
document.getElementById('additionsShow').innerText = `₹${data.additions}`;
document.getElementById('deductionsShow').innerText = `₹${data.deductions}`;

// Calculate final earnings
const finalEarnings = data.totalSalary;
document.getElementById('finalEarnings').innerText = finalEarnings.toFixed(2);