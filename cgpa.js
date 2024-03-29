let termCount = 1;

const termTemplate = `
    <div class="cgpa-term">
    <input type="text" class="term" placeholder="Term" />
    <input type="number" class="gpa-value" placeholder="GPA" />
    <input type="number" class="total-credit" placeholder="Total Credit Hours" />
    <button class="remove-term">Remove</button>
    </div>
`;

// Add Term
document.querySelector(".add-term").addEventListener("click", function () {
  const cgpaTerms = document.querySelector(".cgpa-terms");
  cgpaTerms.insertAdjacentHTML("beforeend", termTemplate);
  termCount++;
});

// Remove Course
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("remove-term")) {
    // Only remove the term if there is more than one
    if (termCount > 1) {
      e.target.parentElement.remove();
      termCount--;
    }
  }
});

// Calculate CGPA
document
  .querySelector(".calculate-cgpa")
  .addEventListener("click", function () {
    let totalGPA = 0;
    let cummTotalCreditHours = 0;
    let emptyFieldsCG = false;

    // Remove existing warnings if any
    document.querySelectorAll(".warningCG").forEach(function (warningCG) {
      warningCG.remove();
    });

    if (termCount > 0) {
      document.querySelectorAll(".cgpa-term").forEach(function (term) {
        const gpa = parseFloat(term.querySelector(".gpa-value").value); // Parse GPA as float
        const totalCreditHours = parseFloat(
          term.querySelector(".total-credit").value
        );

        if (isNaN(gpa) || isNaN(totalCreditHours)) {
          emptyFieldsCG = true;
          return;
        }

        if (gpa <= 0 || gpa > 4) {
          const warningTemplateCG = `
          <div class="warningCG" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
            Please enter a valid GPA between 0 and 4.
            <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
          </div>
        `;
          document
            .querySelector(".operationsCG")
            .insertAdjacentHTML("afterend", warningTemplateCG);

          // Add event listener to close button
          document
            .querySelector(".close-warning")
            .addEventListener("click", function () {
              this.parentElement.remove();
            });

          return;
        }

        totalGPA += gpa * totalCreditHours;
        cummTotalCreditHours += totalCreditHours;
      });

      if (emptyFieldsCG) {
        const warningTemplateCG = `
        <div class="warningCG" style="padding: 15px; margin: 8px; background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; margin-bottom: 20px; border-radius: 4px; text-align: center; position: relative;">
          Please fill out all fields for each term.
          <button class="close-warning" style="position: absolute; top: 0; right: 0; border: none; background: none; color: #721c24; font-size: 20px; padding: 10px;">&times;</button>
        </div>
      `;
        document
          .querySelector(".operationsCG")
          .insertAdjacentHTML("afterend", warningTemplateCG);

        // Add event listener to close button
        document
          .querySelector(".close-warning")
          .addEventListener("click", function () {
            this.parentElement.remove();
          });

        return;
      }

      const cgpa = totalGPA / cummTotalCreditHours;

      // Result template
      const resultTemplateCG = `
      <div class="resultCG">
        <h3>CGPA: ${cgpa.toFixed(2)}</h3>
      </div>
    `;

      // Remove existing result if any
      const existingResultCG = document.querySelector(".resultCG");
      if (existingResultCG) {
        existingResultCG.remove();
      }

      // Add new result
      document
        .querySelector(".operationsCG")
        .insertAdjacentHTML("afterend", resultTemplateCG);
    }
  });

// Reset
document.querySelector(".reset-cgpa").addEventListener("click", function () {
  // Remove result div if any
  const resultCG = document.querySelector(".resultCG");
  if (resultCG) {
    resultCG.remove();
  }

  // Remove all existing courses
  document.querySelectorAll(".cgpa-term").forEach(function (term) {
    term.remove();
  });

  // Reset termCount
  termCount = 0;

  // Add a new default course
  document.querySelector(".add-term").click();

  // Remove existing warnings if any
  document.querySelectorAll(".warningCG").forEach(function (warningCG) {
    warningCG.remove();
  });
});
