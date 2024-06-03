describe('Signup Page Test', function() {
  // Global uncaught:exception handler to ignore specific errors
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the "Failed to fetch" error
    if (err.message.includes('Failed to fetch')) {
      return false;
    }
    // Allow other errors to fail the test
    return true;
  });

  before(function() {
    // Load the fixture data
    cy.fixture('signupData').then(function(data) {
      this.testData = data;
    });
  });

  const attemptSignup = (data, attempt = 1, maxAttempts = 5) => {
    if (attempt > maxAttempts) {
      cy.log(`Max attempts reached for ${data.email}. Moving to the next account.`);
      return;
    }
    
    cy.log(`Attempt ${attempt}: Filling form with test data`);

    // Visit the Signup page
    cy.visit('https://staging.tracnghiemtinhcach.vn/signup');

    // Wait for the page to load completely
    cy.wait(2000); // Adjust wait time if necessary

    // Check if the signup form is visible
    cy.get('form').should('be.visible');

    // Fill the form with test data
    cy.get('#name').type(data.fullname);
    cy.get('#email').type(data.email);
    cy.get('#password').type(data.password);
    cy.get('#confirm-password').type(data.password);

    // Click the signup button
    cy.get('button[class*="bg-[var(--color-red-600)] hover:bg-[#851304] focus:bg-[var(--color-red-500)]"]')
      .should('have.class', 'cursor-pointer') // Optionally assert it has an expected class
      .click();

    // Wait for 3 seconds
    cy.wait(3000);

    // Check if the alert message is present
    cy.get('.ant-alert-message').then(($alertMessage) => {
      if ($alertMessage.length) {
        // If the alert message is present
        cy.log('Alert message detected.');

        // Check the content of the alert message
        if ($alertMessage.text().includes('Email đã tồn tại trên hệ thống')) {
          // If the alert message indicates that the email already exists, switch to the next account
          cy.log('Email đã tồn tại trên hệ thống');
          return;
        } else if ($alertMessage.text().includes('Đăng ký thành công')) {
          // If the alert message indicates successful registration, run the logout flow
          cy.log('Successful registration. Running logout flow.');
          
          // Click the logout button
          cy.contains('Đăng xuất').click({ force: true });

          // Wait for 2 seconds after signing out
          cy.wait(2000);
        }
      } else {
        // If the alert message is not present, sign out and switch to the next account
        cy.wait(5000);
        cy.contains('Đăng xuất').click({ force: true });

        // Wait for 2 seconds after signing out
        cy.wait(2000);

        // Retry signup
        attemptSignup(data, attempt + 1, maxAttempts);
      }
    });
  };

  it('Verify valid Sign-up form and sign out', function() {
    // Loop through each set of data in the fixture file
    this.testData.forEach((data, index) => {
      cy.log(`Processing account ${index + 1} of ${this.testData.length}`);
      attemptSignup(data);
    });
  });
});