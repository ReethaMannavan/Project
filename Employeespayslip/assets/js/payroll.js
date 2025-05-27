const form = document.getElementById('payrollForm');

const basic = document.getElementById('basicSalary');
const additions = document.getElementById('additions');
const totalSalary = document.getElementById('totalSalary');
 const deductionsInput = document.getElementById("deductions");


// Update total salary dynamically
function updateTotalSalary() {
  const basicVal = parseFloat(basic.value) || 0;
  const addVal = parseFloat(additions.value) || 0;
  const deduction = parseFloat(deductionsInput.value) || 0;
  totalSalary.value = basicVal + addVal - deduction;
   totalInput.value = totalSalary.toFixed(2);
}

basic.addEventListener('input', updateTotalSalary);
additions.addEventListener('input', updateTotalSalary);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const payrollData = {
    empName: document.getElementById('empName').value,
    empRole: document.getElementById('empRole').value,
    empId: document.getElementById('empId').value,
    date: document.getElementById('date').value,
    basicSalary: parseFloat(basic.value),
    additions: parseFloat(additions.value),
    deductions: parseFloat(document.getElementById('deductions').value),
    workingDays: document.getElementById('workingDays').value,
    presentDays: document.getElementById('presentDays').value,
    leaveDays: document.getElementById('leaveDays').value,
    totalSalary: parseFloat(totalSalary.value)
  };

  // Store data to localStorage
  localStorage.setItem('payrollData', JSON.stringify(payrollData));

  // Redirect to payslip
  window.location.href = 'payslip.html';
});




form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validate numbers
  const basicSalary = parseFloat(basic.value);
  const addVal = parseFloat(additions.value);
  const deductionVal = parseFloat(document.getElementById('deductions').value);

  if (isNaN(basicSalary) || isNaN(addVal) || isNaN(deductionVal)) {
    alert("Please enter valid numeric values for salary, additions, and deductions.");
    return;
  }

  // Save and go to payslip
  const payrollData = {
    empName: document.getElementById('empName').value.trim(),
    empRole: document.getElementById('empRole').value.trim(),
    empId: document.getElementById('empId').value.trim(),
    date: document.getElementById('date').value,
    basicSalary,
    additions: addVal,
    deductions: deductionVal,
    workingDays: document.getElementById('workingDays').value,
    presentDays: document.getElementById('presentDays').value,
    leaveDays: document.getElementById('leaveDays').value,
    totalSalary: parseFloat(totalSalary.value)
  };

  localStorage.setItem('payrollData', JSON.stringify(payrollData));
  window.location.href = 'payslip.html';
});