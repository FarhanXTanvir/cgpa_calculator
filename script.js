let courseCount = 1;

const courseTemplate = `
  <div class="gpa-course">
    <input type="text" class="course-name" placeholder="Course Name">
    <input type="number" class="credit-hours" placeholder="Credit Hours">
    <select class="grade">
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
    <button class="remove-course">Remove</button>
  </div>
`;

// Add Course
document.querySelector(".add-course").addEventListener("click", function () {
  const gpaCourses = document.querySelector(".gpa-courses");
  gpaCourses.insertAdjacentHTML("beforeend", courseTemplate);
  courseCount++;
});

// Remove Course
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("remove-course")) {
    // Only remove the course if there is more than one
    if (courseCount > 1) {
      e.target.parentElement.remove();
      courseCount--;
    }
  }
});

// Calculate GPA
document.querySelector(".calculate-gpa").addEventListener("click", function () {
  let totalGradePoints = 0;
  let totalCreditHours = 0;
  let emptyFields = false;

  // Remove existing warnings if any
  document.querySelectorAll(".warning").forEach(function (warning) {
    warning.remove();
  });

  if (courseCount > 0) {
    document.querySelectorAll(".gpa-course").forEach(function (course) {
      const grade = course.querySelector(".grade").value;
      const creditHours = parseFloat(
        course.querySelector(".credit-hours").value
      );

      if (grade === "" || isNaN(creditHours)) {
        emptyFields = true;
        return;
      }

      if (creditHours <= 0 || creditHours > 4) {
        const warningTemplate = `
          <div class="warning" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
            Please enter a valid credit hours between 0 and 4.
            <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
          </div>
        `;
        document
          .querySelector(".operations")
          .insertAdjacentHTML("afterend", warningTemplate);

        // Add event listener to close button
        document
          .querySelector(".close-warning")
          .addEventListener("click", function () {
            this.parentElement.remove();
          });

        return;
      }

      totalGradePoints += grade * creditHours;
      totalCreditHours += creditHours;
    });

    if (emptyFields) {
      const warningTemplate = `
        <div class="warning" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
          Please fill out all fields for each course.
          <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
        </div>
      `;
      document
        .querySelector(".operations")
        .insertAdjacentHTML("afterend", warningTemplate);

      // Add event listener to close button
      document
        .querySelector(".close-warning")
        .addEventListener("click", function () {
          this.parentElement.remove();
        });

      return;
    }

    const gpa = totalGradePoints / totalCreditHours;

    // Result template
    const resultTemplate = `
      <div class="result">
        <table>
          <tr>
            <th>Total Credit Hours</th>
            <td><span class="totalCreditHours">${totalCreditHours.toFixed(
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

    // Remove existing result if any
    const existingResult = document.querySelector(".result");
    if (existingResult) {
      existingResult.remove();
    }

    // Add new result
    document
      .querySelector(".operations")
      .insertAdjacentHTML("afterend", resultTemplate);
  }
});

// Reset
document.querySelector(".reset").addEventListener("click", function () {
  // Remove result div if any
  const resultDiv = document.querySelector(".result");
  if (resultDiv) {
    resultDiv.remove();
  }

  // Remove all existing courses
  document.querySelectorAll(".gpa-course").forEach(function (course) {
    course.remove();
  });

  // Reset courseCount
  courseCount = 0;

  // Add a new default course
  document.querySelector(".add-course").click();

  // Remove existing warnings if any
  document.querySelectorAll(".warning").forEach(function (warning) {
    warning.remove();
  });
});
