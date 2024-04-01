// -------------- GPA Section ----------------
let courseCount = 1;

const courseTemplate = `
  <div class="gpa-course">
    <input type="text" class="courseName" placeholder="Course Name">
    <input type="number" class="courseCredit" placeholder="Course Credits">
    <select class="courseGrade">
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
    </select>
    <button class="remove">Remove</button>
  </div>
`;
// Document onload the class="gpa-courses" with the courseTemplate
document.addEventListener("DOMContentLoaded", function () {
  const gpaCourses = document.querySelector(".gpa-courses");
  gpaCourses.insertAdjacentHTML("beforeend", courseTemplate);
});

// Calculate GPA
document.querySelector(".calculate-gpa").addEventListener("click", function () {
  let courses = []; // Array to store the courses
  let emptyFieldsGpa = false; // Flag to check if any field is empty
  let totalGradePoints = 0;
  let totalCredits = 0;

  // Remove existing warnings if any
  document.querySelectorAll(".warningGpa").forEach(function (warning) {
    warning.remove();
  });

  // Remove existing result if any
  const existingResultGpa = document.querySelector(".resultGpa");
  if (existingResultGpa) {
    existingResultGpa.remove();
  }

  // Get all the course names, credits, and grades
  let courseNames = Array.from(document.querySelectorAll(".courseName"));
  let courseCredits = Array.from(document.querySelectorAll(".courseCredit"));
  let courseGrades = Array.from(document.querySelectorAll(".courseGrade"));

  // Loop through all the courses
  for (let i = 0; i < courseNames.length; i++) {
    // Check if the inputs are valid, if yes store them in an object and add it to the array else show a warning
    if (
      courseNames[i].value === "" ||
      courseCredits[i].value === "" ||
      courseGrades[i].value === ""
    ) {
      emptyFieldsGpa = true;
      const warningGpaTemplate = `
        <div class="warningGpa" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
          Please fill out all fields for each course.
          <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
        </div>
      `;
      document
        .querySelector(".operationsGpa")
        .insertAdjacentHTML("afterend", warningGpaTemplate);
      return;
    } else if (courseCredits[i].value <= 0 || courseCredits[i].value > 4) {
      const warningGpaTemplate = `
          <div class="warningGpa" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
            Please enter a valid credit hours between 0 and 4.
            <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
          </div>
        `;
      document
        .querySelector(".operationsGpa")
        .insertAdjacentHTML("afterend", warningGpaTemplate);
      return;
    } else {
      // Create an object for the course
      let course = {
        name: courseNames[i].value,
        credits: parseFloat(courseCredits[i].value),
        grade: parseFloat(courseGrades[i].value),
      };

      // Add the course to the array
      courses.push(course);

      totalGradePoints += courses[i].grade * courses[i].credits;
      totalCredits += courses[i].credits;
    }
  }
  let gpa = totalGradePoints / totalCredits;

  // Result template
  const resultGpaTemplate = `
      <div class="resultGpa">
        <table>
          <tr>
            <th>Total Credits </th>
            <td><span class="totalCredits">${totalCredits.toFixed(
              2
            )}</span></td>
          </tr>
          <tr>
            <th>Total Grade Points</th>
            <td><span class="totalGradePoints">${totalGradePoints.toFixed(
              2
            )}</span></td>
          </tr>
          <tr>
            <th>GPA</th>
            <td><span class="gpa-result">${gpa.toFixed(2)}</span></td>
          </tr>
        </table>
      </div>
    `;

  // Add new result
  document
    .querySelector(".operationsGpa")
    .insertAdjacentHTML("afterend", resultGpaTemplate);
});

// -------------- GPA Section Ends----------------

// -------------- CGPA Section -------------------
// -------------------------------------------------
let termCount = 1;

const termTemplate = `
    <div class="cgpa-term">
      <input type="text" class="termNo" placeholder="Term No." />
      <input type="number" class="termCredits" placeholder="Term Credits" />
      <input type="number" class="termGPA" placeholder="GPA" />
      <button class="remove">Remove</button>
    </div>
`;
// Document onload the class="cgpa-terms" with the termTemplate
document.addEventListener("DOMContentLoaded", function () {
  const cgpaTerms = document.querySelector(".cgpa-terms");
  cgpaTerms.insertAdjacentHTML("beforeend", termTemplate);
});

/*----------------------------- All clear till now -----------------*/
// Calculate CGPA
document
  .querySelector(".calculate-cgpa")
  .addEventListener("click", function () {
    let terms = []; // Array to store the courses
    let emptyFieldsCgpa = false; // Flag to check if any field is empty
    let totalGpaCredits = 0;
    let totalCredits = 0;

    // Remove existing warnings if any
    document.querySelectorAll(".warningCgpa").forEach(function (warningCgpa) {
      warningCgpa.remove();
    });

    // Remove existing result if any
    const existingResultCgpa = document.querySelector(".resultCgpa");
    if (existingResultCgpa) {
      existingResultCgpa.remove();
    }

    // Get all the course names, credits, and grades
    let termNo = Array.from(document.querySelectorAll(".termNo"));
    let termCredits = Array.from(document.querySelectorAll(".termCredits"));
    let termGPA = Array.from(document.querySelectorAll(".termGPA"));

    // Loop through all the courses
    for (let i = 0; i < termNo.length; i++) {
      // Check if the inputs are valid, if yes store them in an object and add it to the array else show a warning
      if (
        termNo[i].value === "" ||
        termCredits[i].value === "" ||
        termGPA[i].value === ""
      ) {
        emptyFieldsCgpa = true;
        const warningCgpaTemplate = `
        <div class="warningCgpa" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
          Please fill out all fields for each term.
          <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
        </div>
      `;
        document
          .querySelector(".operationsCgpa")
          .insertAdjacentHTML("afterend", warningCgpaTemplate);
        return;
      } else if (termGPA[i].value <= 0 || termGPA[i].value > 4) {
        const warningCgpaTemplate = `
          <div class="warningCgpa" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
            Please enter a valid GPA between 0 and 4.
            <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
          </div>
        `;
        document
          .querySelector(".operationsCgpa")
          .insertAdjacentHTML("afterend", warningCgpaTemplate);
        return;
      } else {
        // Create an object for the course
        let term = {
          no: termNo[i].value,
          credits: parseFloat(termCredits[i].value),
          gpa: parseFloat(termGPA[i].value),
        };

        // Add the course to the array
        terms.push(term);

        totalGpaCredits += terms[i].gpa * terms[i].credits;
        totalCredits += terms[i].credits;
      }
    }
    let cgpa = totalGpaCredits / totalCredits;

    // Result template
    const resultCgpaTemplate = `
      <div class="resultCgpa">
        <h2 style="text-align: center;">CGPA: ${cgpa.toFixed(2)}</h2>
      </div>
    `;

    // Add new result
    document
      .querySelector(".operationsCgpa")
      .insertAdjacentHTML("afterend", resultCgpaTemplate);
  });

// -------------- CGPA Section Ends ----------------

// ---------------------------- Buttons ------------------------------
// Add Element
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("add")) {
    // Check if the parent element is operations or operationsCG
    if (event.target.parentElement.classList.contains("operationsGpa")) {
      // Add the courseTemplate and increment courseCount
      const gpaCourses = document.querySelector(".gpa-courses");
      gpaCourses.insertAdjacentHTML("beforeend", courseTemplate);
      courseCount++;
    } else if (
      event.target.parentElement.classList.contains("operationsCgpa")
    ) {
      // Add the termTemplate and increment termCount
      const cgpaTerms = document.querySelector(".cgpa-terms");
      cgpaTerms.insertAdjacentHTML("beforeend", termTemplate);
      termCount++;
    }
  }
});

// Remove or Reset Element on click event
document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("remove")) {
    // Check if the parent element is a gpa-course or a cgpa-term
    if (event.target.parentElement.classList.contains("gpa-course")) {
      // Only remove the course if there is more than one
      if (courseCount > 1) {
        event.target.parentElement.remove();
        courseCount--;
      }
    } else if (event.target.parentElement.classList.contains("cgpa-term")) {
      // Only remove the term if there is more than one
      if (termCount > 1) {
        event.target.parentElement.remove();
        termCount--;
      }
    }
  } else if (event.target && event.target.classList.contains("reset")) {
    // Check if the parent element is operationsGpa or operationsCgpa
    if (event.target.parentElement.classList.contains("operationsGpa")) {
      // Remove resultGpa div if any
      const resultGpa = document.querySelector(".resultGpa");
      if (resultGpa) {
        resultGpa.remove();
      }

      // Remove existing GPA warnings if any
      const warningGpa = document.querySelector(".warningGpa");
      if (warningGpa) {
        warningGpa.remove();
      }

      // Remove all existing gpa-courses if any
      document.querySelectorAll(".gpa-course").forEach(function (item) {
        item.remove();
      });

      // Reset courseCount
      courseCount = 0;

      // Add a new default course-gpa
      document.querySelector(".operationsGpa .add").click();
    } else if (
      event.target.parentElement.classList.contains("operationsCgpa")
    ) {
      // Remove resultCgpa div if any
      const resultCgpa = document.querySelector(".resultCgpa");
      if (resultCgpa) {
        resultCgpa.remove();
      }

      // Remove existing CGPA warnings if any
      const warningCgpa = document.querySelector(".warningCgpa");
      if (warningCgpa) {
        warningCgpa.remove();
      }

      // Remove all existing cgpa-terms
      document.querySelectorAll(".cgpa-term").forEach(function (item) {
        item.remove();
      });

      // Reset termCount
      termCount = 0;

      // Add a new default term-cgpa
      document.querySelector(".operationsCgpa .add").click();
    }
  }
});

// Print the result
document.getElementById("print").addEventListener("click", function () {
  window.print();
});

// Add event listener to Calculate from GPA button using event delegation
// Define the template
let termsTemplate = `
  <div class="cgpa-term">
  ${courseTemplate}
    <div class="operationsGpa">
      <button class="add">Add Course</button>
      <button class="calculate-Gpa calculate">Calculate GPA</button>
      <button class="reset">Reset</button>
    </div>
  </div>
`;
// When the toggle button is clicked
/*
document.querySelector(".toggle").addEventListener("click", function () {
  
});
*/
// Add event listener to close button using event delegation
document.body.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("close-warning")) {
    e.target.parentElement.remove();
  }
});
