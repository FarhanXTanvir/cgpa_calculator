// h1 ----------------- Initialization ----------------- @success Initialization |
// initialize the termList array of objects
let currentIndex = 0;
let termList = [
  {
    courseCount: 0,
    gpa: 0,
    credits: 0,
    result: 0,
    warning: 0,
  },
];
let termAll = {
  cgpa: 0,
  credits: 0,
  result: 0,
  warning: 0,
};

const termCount = function () {
  return termList.length;
};

// Define showResult function
const showResultGpa = (term, index) => {
  // Result template
  const result = `
        <div class="resultGpa">
          <table>
            <tr>
              <th> Total Credits </th>
              <td><span class="termCredits">${termList[index].credits.toFixed(
                2
              )}</span></td>
            </tr>
            <tr>
              <th>GPA</th>
              <td><span class="TermGpa">${termList[index].gpa.toFixed(
                2
              )}</span></td>
            </tr>
          </table>
        </div>
        `;
  term.insertAdjacentHTML("beforeend", result);
};
// Define showWarning function
const showWarningGpa = (term, warning) => {
  term.insertAdjacentHTML("beforeend", warning);
};

import { grading } from "./gradingscales.js";

// For adding new term
const termTemplate = (currentIndex) => `
  <div class="term" data-index="${currentIndex}">
    <div class="term-header">
      <h2>Term ${currentIndex + 1}</h2>
      <button class="toggle-format toggle">Toggle Format</button>
    </div>
    <span class="toggle-out">
    <div class="course">
      <span class="bind-inputs">
        <input type="text" class="courseName" placeholder="Course Name" />
        <input
          type="number"
          class="courseCredits"
          placeholder="Course Credits"
        />
      <select class="courseGrade">
        ${grading.options}
      </select>
      </span>
      <i class="fa-solid fa-circle-xmark remove-course remove"
        title="Delete the Course"></i>
    </div>
    </span>
    <div class="operationsGpa">
      <button class="add-course add">Add Course</button>
      <button class="calculate-gpa calculate">Calculate GPA</button>
      <button class="reset-term reset">Reset</button>
      <i class="fa-solid fa-trash remove-term remove" title="Delete the Term"></i>
    </div>
  </div>
`;
// For adding new course
const courseTemplate = () => `
  <div class="course">
    <span class="bind-inputs">
      <input type="text" class="courseName" placeholder="Course Name" />
      <input
        type="number"
        class="courseCredits"
        placeholder="Course Credits"
      />
      <select class="courseGrade">
        ${grading.options}
      </select>
    </span>
      <i class="fa-solid fa-circle-xmark remove-course remove"
        title="Delete the Course"></i>
  </div>
`;

// Define a function to debug the courseCount, termCount, currentIndex and warnings
const debug = () => {
  console.log("Updates: ");
  console.log(termList);
  console.log(termAll);
};

// Document on load event add a default term before the last child of terms which is operationsCgpa
document.addEventListener("DOMContentLoaded", () => {
  currentIndex = 0;
  termList[0].courseCount = 1;
  const terms = document.querySelector(".terms");
  terms.insertAdjacentHTML("afterbegin", termTemplate(currentIndex));
  debug();
});

// Removing Past @review Remove result, warning
// => See if we repeat things unnecessarily @bug
document.addEventListener("click", (event) => {
  if (
    event.target.matches(
      ".toggle-format, .add-course, .calculate-gpa, .reset-term, .remove-term, .remove-course"
    )
  ) {
    const term = event.target.closest(".term");
    // Fetch the index of the term
    const index = parseInt(term.getAttribute("data-index"));
    if (isNaN(index)) {
      console.error("Invalid term index:", term.getAttribute("data-index"));
      return;
    } else {
      // Remove the previous resultGpa if it exists
      termList[index].result = 0;
      const resultGpa = term.querySelector(".resultGpa");
      if (resultGpa) {
        resultGpa.remove();
      }
      termList[index].warning = 0;
      const warningGpa = term.querySelector(".warningGpa");
      if (warningGpa) {
        warningGpa.remove();
      }
    }
  }
  if (
    event.target.matches(
      ".toggle-all, .toggle-format, .add-course, .calculate-gpa, .reset-term, .remove-term, .remove-course, .calculate-cgpa, .reset-all"
    )
  ) {
    termAll = {
      cgpa: 0,
      credits: 0,
      result: 0,
      warning: 0,
    };
    // Remove the previous resultCgpa if it exists
    const resultCgpa = document.querySelector(".resultCgpa");
    if (resultCgpa) {
      resultCgpa.remove();
    }
    // remove the previous warnings if exists
    const warningCgpa = document.querySelector(".warningCgpa");
    if (warningCgpa) {
      warningCgpa.remove();
    }
  }
});

document.addEventListener("click", (event) => {
  // h1 --------------------- Add --------------------------------------
  // h2 ---------------- Add Term ----------------- @success Add Term |
  /* 
    h2 Tasks of add-term: 
    * 1. Increase the currentIndex
    * 2. Insert the termTemplate before the beginning of the operationsCgpa
    * 3. Add the courseCount = 1

    */
  if (event.target.matches(".add-term")) {
    // * 1. Increase the currentIndex
    currentIndex++;

    // * 2. Insert the termTemplate before the beginning of the operationsCgpa
    const operationsCgpa = document.querySelector(".operationsCgpa");
    operationsCgpa.insertAdjacentHTML(
      "beforebegin",
      termTemplate(currentIndex)
    );

    // * 3. Initialize termList object for that index
    termList[currentIndex] = {
      courseCount: 1,
      gpa: 0,
      credits: 0,
      result: 0,
      warning: 0,
    };
    //todo --------------Debug-----------
    debug();
  }

  // h1 ---------------- Add Course ----------------- @success Add Course |
  /* 
    h2 Tasks of add-course: 
    * 1. Select the closest term and fetch the index
    * 2. Insert the courseTemplate after the last course
    * 3. Increase the courseCount

  */
  if (event.target.matches(".add-course")) {
    // * 1. Select the closest term and fetch the index
    const term = event.target.closest(".term");
    const index = parseInt(term.getAttribute("data-index"));
    if (isNaN(index)) {
      console.error("Invalid term index:", term.getAttribute("data-index"));
      return;
    } else {
      // * 2. Insert the courseTemplate before the end of the toggle-out
      const toggleOut = term.querySelector(".toggle-out");
      toggleOut.insertAdjacentHTML("beforeend", courseTemplate());
      termList[index].courseCount++;

      //todo --------------Debug-----------
      debug();
    }
  }

  // h1 ---------------- Remove -----------------------------------------------

  // rh ---------------- Remove the term ----------------- @success Remove Term |
  /* 
  h2 Tasks of remove-term:
  * 1. Remove the term
  * 2. Decrease the termCount
  * 3. Decrease the courseCount
  * 4. Update the data-index of all the terms
  * 5. Update the headings of all the terms
  * 6. Update the currentIndex
  
  */
  if (event.target.matches(".remove-term")) {
    const term = event.target.closest(".term");
    const index = parseInt(term.getAttribute("data-index"));

    // * 1. Remove the term
    // * 2. Decrease the termCount
    if (isNaN(index)) {
      console.error("Invalid term index:", term.getAttribute("data-index"));
      return;
    }
    if (currentIndex === 0) {
      console.log("Cannot remove term: only one term left");
    } else {
      // Removes the term from html and termList
      term.remove();
      termList.splice(index, 1);

      // * 4. Update the data-index of all the terms
      const terms = document.querySelectorAll(".term");
      const n = terms.length;
      currentIndex = n - 1;
      for (let i = index; i < n; i++) {
        terms[i].setAttribute("data-index", i);
        terms[i].querySelector(".term-header h2").textContent = `Term ${i + 1}`;
      }
    }

    //todo --------------Debug-----------
    debug();
  }

  // rh ---------------- Remove the course ----------------- @success Remove Course |
  /* 

  h2 Tasks of remove-course:
    * 1. Remove the course
    * 2. Decrease the courseCount
  
  */
  if (event.target.matches(".remove-course")) {
    const course = event.target.closest(".course");
    const term = course.closest(".term");
    const index = parseInt(term.getAttribute("data-index"));
    if (isNaN(index)) {
      console.error("Invalid term index:", term.getAttribute("data-index"));
      return;
    } else if (termList[index].courseCount === 1) {
      console.log(
        "Cannot remove course: only one course left in term " + (index + 1)
      );
      return;
    } else {
      // * 1. Remove the course
      course.remove();

      // * 2. Decrease the termList[index]
      termList[index].courseCount--;
    }

    //todo --------------Debug-----------
    debug();
  }

  // h1 ------------------------------------ Reset --------------------------

  // h2 ---------------- Reset the term ----------------- @success Reset Term |
  /* 
  h2 Tasks of reset-term:

  => Select the closest term and fetch all the courses
  * 1. Remove the previous resultGpa if it exists 
  * 2. Remove the previous warningGpa if exists, warningGpaTemplate = ``
  * 3. Remove all the courses
  * 4. Add the default course inside the term in the beginning of the toggle-out
  * 5. Reset the courseCount[index] = 1

  */

  // ! Bug: term => reset => toggle-out => output bug

  if (event.target.matches(".reset-term")) {
    const term = event.target.closest(".term");
    const courses = term.querySelectorAll(".course");

    // remove all courses
    courses.forEach((course) => {
      course.remove();
    });

    // New Additions
    // Add default course inside the term in the beginning of the toggle-out
    const toggleOut = term.querySelector(".toggle-out");
    toggleOut.insertAdjacentHTML("afterbegin", courseTemplate());

    // Reset the data of the term
    const index = parseInt(term.getAttribute("data-index"));
    termList[index] = {
      courseCount: 1,
      gpa: 0,
      credits: 0,
      result: 0,
      warning: 0,
    };

    //todo --------------Debug-----------
    debug();
  }

  // rh ---------------- Reset All ----------------- @success Reset All |
  /* 
    h2 Tasks of reset-all:

    * 1. Remove all the terms
    * 2. Add the default term
    * 3. Reset the currentIndex, termList, 

  */

  if (event.target.matches(".reset-all")) {
    // * 1. Remove all the terms
    const terms = document.querySelectorAll(".term");
    terms.forEach((term) => term.remove());

    // * 2. Add the default term after the beginning of the class terms
    currentIndex = 0;
    document
      .querySelector(".terms")
      .insertAdjacentHTML("afterbegin", termTemplate(currentIndex));

    // * 3. Reset data of all terms
    termList = [
      {
        courseCount: 1,
        gpa: 0,
        credits: 0,
        result: 0,
        warning: 0,
      },
    ];
    termAll = {
      cgpa: 0,
      credits: 0,
      result: 0,
      warning: 0,
    };

    //todo --------------Debug-----------
    debug();
  }
  // h1 ----------------- Calculate ---------------------------------------------------------------

  // h1 ----------------- Calculate GPA -------------------------------- @section Calculate GPA |
  /* Tasks of calculate-gpa 

  * 1. Remove the previous warningGpa if it exists, warningGpaTemplate = ``
  * 2. Remove the previous resultGpa if it exists
  * 3. Check if the fields are empty
  * 4. Check if the credits are between 0 and 4
  * 5. Display the warning if any, return 
  * 6. Otherwise, Calculate the GPA
  * 7. Display the result
  * 8. Add the result to the totalGpaCredits for CGPA calculation
  * 9. Add the credits to the totalCredits for CGPA calculation
  
  */
  if (event.target.matches(".calculate-gpa")) {
    let totalGradeCredits = 0;
    let warning = "";
    termList.warning = 0;

    // select the closest term
    const term = event.target.closest(".term");

    // fetch the index of the term
    const index = parseInt(term.getAttribute("data-index"));
    if (isNaN(index)) {
      console.error("Invalid term index:", term.getAttribute("data-index"));
      return;
    } else {
      termList[index] = {
        courseCount: termList[index].courseCount,
        gpa: 0,
        credits: 0,
        result: 0,
        warning: 0,
      };

      // select all the courses
      const courses = term.querySelectorAll(".course");
      if (courses) {
        courses.forEach((course) => {
          // Fetched the values of courseCredits and courseGrade
          const credits = parseFloat(
            course.querySelector(".courseCredits").value
          );
          const grade = parseFloat(course.querySelector(".courseGrade").value);

          // Check if any field is empty
          if (isNaN(credits) || isNaN(grade)) {
            termList[index].warning = 1;
            termAll.warning = 1;
            warning = `
          <div class="warningGpa warning">
            <p>Please fill all the fields</p>
          </div>
        `;
            return;
          } else if (credits <= 0 || credits > 4) {
            // Check if credits are between 0 and 4
            termList[index].warning = 1;
            termAll.warning = 1;
            warning = `
          <div class="warningGpa warning">
            <p>Credits should be between 0 and 4</p>
          </div>
        `;
            return;
          } else {
            termList[index].credits += credits;
            totalGradeCredits += credits * grade;
          }
        });
      } else {
        console.error("Invalid term: ", term.getAttribute("data-index"));
      }

      if (termList[index].warning) {
        term.insertAdjacentHTML("beforeend", warning);
        debug();
        return;
      } else {
        termList[index].gpa = totalGradeCredits / termList[index].credits;

        // Result template
        termList[index].result = 1;
        let result = `
        <div class="resultGpa">
          <table>
            <tr>
              <th> Total Credits </th>
              <td><span class="termCredits">${termList[index].credits.toFixed(
                2
              )}</span></td>
            </tr>
            <tr>
              <th>GPA</th>
              <td><span class="TermGpa">${termList[index].gpa.toFixed(
                2
              )}</span></td>
            </tr>
          </table>
        </div>
        `;
        term.insertAdjacentHTML("beforeend", result);
        debug();
      }
    }
  }

  // h1 ----------------- Calculate CGPA ----------------------- @section Calculate CGPA |
  /* Tasks of calculate-cgpa

  * 1. Remove the previous warningCgpa if it exists, warningCgpaTemplate = ``
  * 2. Remove the previous resultCgpa if it exists
  * 3. Iterate over all terms where: 
      % For each term 
        => If toggle-in exists, fetch the values of termCredits and termGpa
          ?  Remove the previous warningGpa if it exists
          ?  Remove the previous resultGpa if it exists
          ?  If any field is empty, display the warning, return
          ?  If termCredits <= 0, display the warning, return
          ?  If termGpa < 0 or termGpa > 4, display the warning, return
          ?  Add termCredits to totalCredits and termCredits * termGpa to totalGpaCredits

        => If toggle-out exists, click calculate-gpa, rest will be handled by calculate-gpa

  * 4. If any warning exists, display the warning, return
  * 5. Calculate the CGPA = totalGpaCredits / totalCredits
  * 6. Display the result

  */

  if (event.target.matches(".calculate-cgpa")) {
    let warning = "";

    const terms = document.querySelectorAll(".term");
    terms.forEach((term) => {
      if (term.querySelector(".toggle-in")) {
        // fetch the index of the term
        const index = parseInt(term.getAttribute("data-index"));
        if (isNaN(index)) {
          console.error("Invalid term index:", term.getAttribute("data-index"));
          return;
        }
        const termCredits = parseFloat(
          term.querySelector(".toggle-in .termCredits").value
        );
        const gpa = parseFloat(term.querySelector(".toggle-in .termGpa").value);
        // check if any field is empty
        if (isNaN(termCredits) || isNaN(gpa)) {
          termList[index].warning = 1;
          termAll.warning = 1;
          warning = `
            <div class="warningGpa warning">
              <p>Please fill all the fields</p>
            </div>
          `;
        }
        // check if 0 <= termGpa < 4 and 0 <= termCredits
        else if (termCredits <= 0) {
          termList[index].warning = 1;
          termAll.warning = 1;
          warning = `
            <div class="warningGpa warning">
              <p>Term Credits should be more than 0</p>
            </div>
          `;
        }
        // check if 0 <= termGpa < 4 and 0 <= termCredits
        else if (gpa < 0 || gpa > 4) {
          termList[index].warning = 1;
          termAll.warning = 1;
          warning = `
            <div class="warningGpa warning">
              <p>GPA should be between 0 and 4</p>
            </div>
          `;
        }
        if (termList[index].warning) {
          showWarningGpa(term, warning);
          return;
        } else {
          termList[index].credits = termCredits;
          termList[index].gpa = gpa;
          termList[index].result = 1;
        }
      } else {
        // Click calculate-gpa for each term
        const calculateGpa = term.querySelector(".calculate-gpa");
        calculateGpa.click();
        const index = parseInt(term.getAttribute("data-index"));
        if (termList[index].warning) return;
      }
    });
    if (termAll.warning) {
      warning = `
          <div class="warningCgpa warning">
            <p>Please resolve all the warnings</p>
          </div>
        `;
      document.querySelector(".terms").insertAdjacentHTML("beforeend", warning);

      debug();
    } else {
      // Calculate the CGPA
      // For each of termList, add the termCredits to totalCredits and termCredits * termGpa to totalGpaCredits
      let totalGpaCredits = 0;
      termList.forEach((term) => {
        termAll.credits += term.credits;
        totalGpaCredits += term.credits * term.gpa;
      });
      termAll.cgpa = totalGpaCredits / termAll.credits;
      // Result template
      termAll.result = 1;
      const result = `
      <div class="resultCgpa">
        <table>
          <tr>
            <th>Total Credits </th>
            <td><span class="totalCredits">${termAll.credits.toFixed(
              2
            )}</span></td>
          </tr>
          <tr>
            <th>CGPA</th>
            <td><span class="cgpa">${termAll.cgpa.toFixed(2)}</span></td>
          </tr>
        </table>
      </div>
    `;
      document.querySelector(".terms").insertAdjacentHTML("afterend", result);
      debug();
    }
  }
});

// h1 ---------------- Toggle ----------------|---------------------- @success Toggle format |
/* 
  h2 Tasks of toggle-format: 
  * 1. Remove the previous resultGpa if it exists 
  * 2. Remove the previous warningGpa if it exists, warningGpaTemplate = ``
  * 3. If toggle-out exists, remove the toggle-out and operationsGpa
  * 4. If toggle-in exists, remove the toggle-in and insert the toggle-out after the term-header
  * 5. Insert the operationsGpaHtml

*/
const toggleInHtml = `
            <span class="toggle-in">
            <span class="bind-inputs">
              <input type="number" class="termCredits" placeholder="Term Credits" />
              <input type="number" class="termGpa" placeholder="GPA" />
              <i 
              class="fa-solid fa-trash remove-term remove" 
              title="Delete the Term"></i>
            </span>
          </span>
          `;
let toggleOutHtml = ``;
const operationsGpaHtml = `
      <div class="operationsGpa">
      <button class="add-course add">Add Course</button>
      <button class="calculate-gpa calculate">Calculate GPA</button>
      <button class="reset-term reset">Reset</button>
      <i 
      class="fa-solid fa-trash remove-term remove" 
      title="Delete the Term"></i>
    </div>
  `;

document.addEventListener("click", (event) => {
  if (event.target.matches(".toggle-format")) {
    const term = event.target.closest(".term");
    const termHeader = term.querySelector(".term-header");

    // remove toggle-out if it exists
    const toggleOut = term.querySelector(".toggle-out");
    if (toggleOut) {
      toggleOutHtml = toggleOut.outerHTML;
      toggleOut.remove();

      const operationsGpa = term.querySelector(".operationsGpa");
      operationsGpa.remove();

      // insert the following code after the term-header
      termHeader.insertAdjacentHTML("afterend", toggleInHtml);
    } else {
      const toggleIn = term.querySelector(".toggle-in");
      if (toggleIn) {
        // remove toggle-in if it exists
        toggleIn.remove();

        // insert the toggle-out after the term-header
        termHeader.insertAdjacentHTML("afterend", toggleOutHtml);

        // Insert operationsGpaHtml
        term.insertAdjacentHTML("beforeend", operationsGpaHtml);
      } else alert("Nothing to toggle");
    }
    //todo --------------Debug-----------
    debug();
  }
});
// h1---------------------- @section Toggle All
// If id toggleAll is clicked, click the toggle-format for all the terms
document.getElementById("toggleAll").addEventListener("click", function () {
  const terms = document.querySelectorAll(".term");
  terms.forEach((term) => {
    const toggleFormat = term.querySelector(".toggle-format");
    toggleFormat.click();
  });
});

// h1 ---------------- Print the document ----------------- @review Print |
// print the class= "terms" when print button is clicked
/*
document.getElementById("print").addEventListener("click", function () {
  const terms = document.querySelector(".terms").outerHTML;
  const printWindow = window.open("", "_blank");
  printWindow.document.write("<html><head><title>Print</title>");

  // Get stylesheets of the current document and write them into the new window
  Array.from(document.styleSheets).forEach(function (styleSheet) {
    if (styleSheet.href) {
      printWindow.document.write(
        '<link rel="stylesheet" href="' + styleSheet.href + '">'
      );
    } else {
      printWindow.document.write("<style>" + styleSheet.cssText + "</style>");
    }
  });

  printWindow.document.write("</head><body>");
  printWindow.document.write(terms);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
});
*/

// print only window when print button clicked
document.getElementById("print").addEventListener("click", function () {
  window.print();
});

// close warning when close button is clicked
document.addEventListener("click", (event) => {
  if (event.target.matches(".warning")) {
    event.target.remove();
  }
});

// h1 ---------------- Export the data ----------------- @review Export
// export the data to a JSON file
document.getElementById("export").addEventListener("click", function () {
  const terms = document.querySelectorAll(".term");
  let csvContent = "data:text/csv;charset=utf-8,";

  terms.forEach((term, currentIndex) => {
    const courses = term.querySelectorAll(".course");
    if (courses.length > 0) {
      csvContent += `Term ${currentIndex + 1}\n`; // column headers
      csvContent += "Course Name,Course Credits,Course Grade\n"; // column headers
      courses.forEach((course) => {
        const courseName = course.querySelector(".courseName").value;
        const courseCredits = course.querySelector(".courseCredits").value;
        const courseGrade = course.querySelector(".courseGrade").value;
        csvContent += `${courseName},${courseCredits},${courseGrade}\n`; // data rows
      });
    }
    csvContent += "\n";
  });

  csvContent += "Results\n";
  // Add headers for Term, GPA, CGPA
  csvContent += "\nTerm,GPA,Credits\n";

  // Iterate over termList and termAll to add data to csvContent
  for (let i = 0; i < termList.length; i++) {
    const gpa = termList[i].gpa; // Assuming termList[i] is an object with a gpa property
    const credits = termList[i].credits; // Assuming termAll[i] is an object with a cgpa property
    csvContent += `${i + 1},${gpa},${credits}\n`;
  }
  // Add another header for CGPA and Total Credits
  csvContent += "\nCGPA,Total Credits\n";

  // Add row for CGPA and Total Credits
  const cgpa = termAll.cgpa; // Assuming termAll is an object with a cgpa property
  const totalCredits = termAll.credits; // Assuming termAll is an object with a credits property
  csvContent += `${cgpa},${totalCredits}\n`;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "CgpaSheet.csv");
  document.body.appendChild(link); // Required for Firefox

  link.click(); // This will download the data as a .csv file
});
