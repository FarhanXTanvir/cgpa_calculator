const gradingScales = {
  Default: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    D: "2.00",
    F: "0.00",
  },
  NSU: {
    A: "4.00",
    "A-": "3.70",
    "B+": "3.30",
    B: "3.00",
    "B-": "2.70",
    "C+": "2.30",
    C: "2.00",
    "C-": "1.70",
    "D+": "1.30",
    D: "1.00",
    F: "0.00",
  },
  BRAC: {
    "A+": "4.00",
    A: "4.00",
    "A-": "3.70",
    "B+": "3.30",
    B: "3.00",
    "B-": "2.70",
    "C+": "2.30",
    C: "2.00",
    "C-": "1.70",
    "D+": "1.30",
    D: "1.00",
    D: "0.70",
    F: "0.00",
  },
  AIUB: {
    "A+": "4.00",
    A: "3.75",
    "B+": "3.50",
    B: "3.25",
    "C+": "3.00",
    C: "2.75",
    "D+": "2.50",
    D: "2.25",
    F: "0.00",
  },
};
function updateGradingScale(scale) {
  const grades = gradingScales[scale];

  const table = document.querySelector(".gradTable table");
  let rows = "<tr><th>Grade</th><th>Points</th></tr>"; // Start with the header row

  for (let grade in grades) {
    rows += `<tr><td>${grade}</td><td>${grades[grade]}</td></tr>`;
  }

  table.innerHTML = rows; // Replace the table rows

  const gradeDropdown = document.querySelector(".grade");
  let options = '<option value="">Grade</option>'; // Start with the default option

  for (let grade in grades) {
    options += `<option value="${grades[grade]}">${grade}</option>`;
  }

  gradeDropdown.innerHTML = options; // Replace the dropdown options
}
document.getElementById("gradScale").addEventListener("change", function (e) {
  updateGradingScale(e.target.value);
});

document
  .getElementById("gradScaleTop")
  .addEventListener("change", function (e) {
    updateGradingScale(e.target.value);
  });
