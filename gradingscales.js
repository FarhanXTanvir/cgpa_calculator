// h1 Grading Scale key-values ||
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

  BRAC: {
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
    "D-": "0.70",
    F: "0.00",
  },

  IUBAT: {
    A: "4.00",
    "B+": "3.70",
    B: "3.40",
    "B-": "3.10",
    "C+": "2.80",
    C: "2.50",
    "C-": "2.20",
    "D+": "1.50",
    D: "1.00",
    F: "0.00",
  },

  IUB: {
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

  UIU: {
    A: "4.00",
    "A-": "3.67",
    "B+": "3.33",
    B: "3.00",
    "B-": "2.67",
    "C+": "2.33",
    C: "2.00",
    "D+": "1.67",
    D: "1.00",
    F: "0.00",
  },

  ULAB: {
    "A+": "4.00",
    A: "4.00",
    "A-": "3.80",
    "B+": "3.30",
    B: "3.00",
    "B-": "2.80",
    "C+": "2.50",
    C: "2.20",
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

// h1 Generates Options for each course ||
// Generate Options of grade input of each course
let generateOptions = function (grades) {
  let options = '<option value="">Grade</option>'; // Start with the default option

  for (let grade in grades) {
    options += `<option value="${grades[grade]}">${grade}</option>`;
  }
  return options;
};

// h1 Generate Grade_Point Table ||
let table = function (grades) {
  const table = document.querySelector(".gradTable table");
  let rows = "<tr><th>Grade</th><th>Points</th></tr>"; // Start with the header row

  for (let grade in grades) {
    rows += `<tr><td>${grade}</td><td>${grades[grade]}</td></tr>`;
  }

  // Replace the table rows
  table.innerHTML = rows;
};

// h1 Changes the Grade Table with the gradScale dropdown ||
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
// h1 Changes each gradescale dropdown value ||
const selectGradScale = document.querySelectorAll(".selectGradScale");

selectGradScale.forEach((dropdown) => {
  dropdown.addEventListener("change", function () {
    const newValue = this.value;
    selectGradScale.forEach((select) => {
      if (newValue === "custom") {
        return;
      } else if (select !== dropdown) {
        select.value = newValue;
        // if custom grade form is present then remove it
        const customGrade = document.getElementById("customGrade");
        if (customGrade) {
          customGrade.remove();
        }
      }
    });
    if (newValue !== "custom") {
      grading.options = updateGradScale(newValue);
    } else {
      customGrade();
      // return;
    }
  });
});
// Custom Grading Form
const customGradeTemp = `
      <div id="customGrade">
        <h2 style="text-align: left;">Enter Your Custom Grades: </h2>
        <form id="customGradeForm">
          <table>
            <thead>
              <th>Letter Grade</th>
              <th>Grade Points</th>
            </thead>
            <tr>
              <td>
                <input type="text" name="grade" />
              </td>
              <td>
                <input type="number" name="points" />
              </td>
              <td>
                <i
                  class="fa-solid fa-circle-plus addGrade add"
                  title="Add a new grade"
                ></i>
                <i
                  class="fa-solid fa-circle-xmark removeGrade remove"
                  title="Remove the grade"
                ></i>
              </td>
            </tr>
          </table>
          <span class="customGradeBtns">
            <button
              type="button"
              id="doneCustomGrade"
              style="background: blueviolet; margin: 0.5rem;"
            >
              Done
            </button>
            <button
              type="button"
              id="cancelCustomGrade"
              style="background: red; margin: 0.5rem;"
            >
              Cancel
            </button>
          </span>
        </form>
      </div>`;
function customGrade() {
  // Append the customGrade template before the beginning of terms
  const customGrade = document.querySelector(".customGrade");
  if (!customGrade) {
    const terms = document.querySelector(".terms");
    terms.insertAdjacentHTML("beforebegin", customGradeTemp);
  }
}

let customGradeBtnsHTML;
const rowTemplate = `
  <tr>
    <td>
      <input type="text" name="grade" />
    </td>
    <td>
      <input type="number" name="points" />
    </td>
    <td>
      <i
        class="fa-solid fa-circle-plus addGrade add"
        title="Add a new grade"
      ></i>
      <i
        class="fa-solid fa-circle-xmark removeGrade remove"
        title="Remove the grade"
      ></i>
    </td>
  </tr>
`;
// Add edit and reset button
const editSpanBtns = `
  <span class="editSpanBtns">
    <button
      type="button"
      id="editCustomGrade"
      style="background: blueviolet; margin: 0.5rem;"
    >
      Edit
    </button>
    <button
      type="button"
      id="resetCustomGrade"
      style="background: red; margin: 0.5rem;"
    >
      Reset
    </button>
  </span>
`;
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("addGrade")) {
    // h1 Add Button ||
    const add = e.target;
    const row = add.parentElement.parentElement;
    // Add a new row after the current row
    row.insertAdjacentHTML("afterend", rowTemplate);
  } else if (e.target.classList.contains("removeGrade")) {
    // h1 Remove Button ||
    const remove = e.target;
    let addGrade = document.querySelectorAll(".addGrade");
    // If addGrade is more than one then remove the row
    if (addGrade.length > 1) {
      const row = remove.parentElement.parentElement;
      row.remove();
    }
  } else if (e.target.id === "doneCustomGrade") {
    // h1 Done Button ||
    // Remove all warning text
    const warning = document.querySelectorAll("#customGrade p");
    warning.forEach((warn) => {
      warn.remove();
    });

    // Get the custom grades
    const customGradeForm = document.getElementById("customGradeForm");
    // store the custom grades in the grading object and update the grade options of all existing courses
    grading.options = `<option value="">Grade</option>`;
    const customGrades = customGradeForm.querySelectorAll("tr");
    for (let grade of customGrades) {
      const gradeNameElement = grade.querySelector("input[name='grade']");
      const gradePointsElement = grade.querySelector("input[name='points']");
      if (gradeNameElement && gradePointsElement) {
        const gradeName = gradeNameElement.value;
        const gradePoints = gradePointsElement.value;
        if (gradeName && gradePoints) {
          grading.options += `<option value="${gradePoints}">${gradeName}</option>`;
        } else {
          // if any of the input field is empty then show warning text after customGradeForm
          const warning = `<p class="warningCustom" style="color: red;">Please fill all the fields</p>`;
          customGradeForm.insertAdjacentHTML("afterend", warning);
          break;
        }
      }
    }
    // remove customGradeBtns class
    const customGradeBtns = document.querySelector(".customGradeBtns");
    if (customGradeBtns) {
      // Store the customGradeBtns outerHTML
      customGradeBtnsHTML = customGradeBtns.outerHTML;
      // if no warningCustom class then remove customGradeBtns
      const warningCustom = document.querySelector(".warningCustom");
      if (!warningCustom) {
        customGradeBtns.remove();
        customGradeForm.insertAdjacentHTML("beforeend", editSpanBtns);
        // Get all table cells
        const tableCells = document.querySelectorAll("td");

        // For each table cell, disable the pointer events
        tableCells.forEach((cell) => {
          cell.style.pointerEvents = "none";
          cell.style.opacity = "0.65";
        });
      }
    }
    // h2 Sets the custom grades for all existing courses ||
    const gradeDropdown = document.querySelectorAll(".courseGrade");
    gradeDropdown.forEach((dropdown) => {
      dropdown.innerHTML = grading.options;
    });
  } else if (e.target.id === "cancelCustomGrade") {
    // h1 Cancel Button ||
    // directly select target id and remove the custom grade form
    const customGrade = document.getElementById("customGrade");
    if (customGrade) {
      customGrade.remove();
      // return to the default grading scale
      grading.options = updateGradScale("Default");
      // Select All the dropdowns and set the default grading scale
      selectGradScale.forEach((select) => {
        select.value = "Default";
      });
    }
  } else if (e.target.id === "editCustomGrade") {
    // h1 Edit Button ||
    // remove the editSpanbtns
    const editSpanBtns = document.querySelector(".editSpanBtns");
    editSpanBtns.remove();
    // Add the customGradeBtns class
    const customGradeForm = document.getElementById("customGradeForm");
    customGradeForm.insertAdjacentHTML("beforeend", customGradeBtnsHTML);

    // Enable table cells pointer events
    const tableCells = document.querySelectorAll("td");
    tableCells.forEach((cell) => {
      cell.style.pointerEvents = "auto";
      cell.style.opacity = "1";
    });
  } else if (e.target.id === "resetCustomGrade") {
    // h1 Reset Button ||
    // remove the custom grade form
    const customGrad = document.getElementById("customGrade");
    if (customGrad) {
      customGrad.remove();

      // return to the default grading scale
      grading.options = updateGradScale("Default");

      // Add customGradeTemp again
      customGrade();
      // Select All the dropdowns and set the default grading scale
      // selectGradScale.forEach((select) => {
      //   select.value = "Default";
      // });
    }
  }
});
