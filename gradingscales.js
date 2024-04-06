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

  AUST: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  BAIUST: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
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

  BUP: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  Daffodil: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  EWU: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  GUB: {
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

  Green: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  IUBAT: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  IUB: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  MIST: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
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

  Stamford: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  Southeast: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  SUB: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  UAP: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    C: "2.50",
    D: "2.00",
    F: "0.00",
  },

  UIU: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },

  UITS: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    C: "2.50",
    D: "2.00",
    F: "0.00",
  },

  ULAB: {
    "A+": "4.00",
    A: "3.75",
    "A-": "3.50",
    "B+": "3.25",
    B: "3.00",
    "B-": "2.75",
    "C+": "2.50",
    C: "2.25",
    "C-": "2.00",
    "D+": "1.75",
    D: "1.50",
    F: "0.00",
  },
};
export let grading = {
  options: `
    <option value="">Grade</option>
    <option value="4.0">A+</option>
    <option value="3.75">A</option>
    <option value="3.50">A-</option>
    <option value="3.25">B+</option>
    <option value="3.00">B</option>
    <option value="2.75">B-</option>
    <option value="2.50">C+</option>
    <option value="2.25">C</option>
    <option value="2.00">D</option>
    <option value="0.00">F</option>
`,
};

// Generate Options of grade input of each course
let generateOptions = function (grades) {
  let options = '<option value="">Grade</option>'; // Start with the default option

  for (let grade in grades) {
    options += `<option value="${grades[grade]}">${grade}</option>`;
  }

  return options;
};

// Generate Table Rows
let table = function (grades) {
  const table = document.querySelector(".gradTable table");
  let rows = "<tr><th>Grade</th><th>Points</th></tr>"; // Start with the header row

  for (let grade in grades) {
    rows += `<tr><td>${grade}</td><td>${grades[grade]}</td></tr>`;
  }

  // Replace the table rows
  table.innerHTML = rows;
};

// Changes the Grade Table with the gradScale dropdown
function updateGradScale(scale) {
  const grades = gradingScales[scale];

  // Update Table
  table(grades);

  // Generate Options
  const options = generateOptions(grades);

  // Update the grade dropdown of all existing courses
  const gradeDropdown = document.querySelectorAll(".courseGrade");
  gradeDropdown.forEach((dropdown) => {
    // Replace the dropdown options
    dropdown.innerHTML = options;
  });
  return options;
}

// The selected grade scale is synced over entire document and updates grade table and grade options of existing each course
const selectGradScale = document.querySelectorAll(".selectGradScale");

selectGradScale.forEach((dropdown) => {
  dropdown.addEventListener("change", function () {
    const newValue = this.value;
    selectGradScale.forEach((select) => {
      if (select !== dropdown) {
        select.value = newValue;
      }
    });
    grading.options = updateGradScale(newValue);
  });
});
