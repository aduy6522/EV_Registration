describe('Signup Page Test', function() {
  before(function() {
    // Load the fixture data
    cy.fixture('signupData').then(function(data) {
      this.testData = data;
    });
  });

  it('Verify valid Sign-up form and sign out', function() {
    // Loop through each set of data in the fixture file
    this.testData.forEach((data, index) => {
      cy.log(`Filling form with data set ${index + 1}`);

      // Visit the Signup page
      cy.visit('https://tracnghiemtinhcach.vn/signup');

      // Fill the form with test data
      cy.get('#name').type(data.fullname);
      cy.get('#email').type(data.email);
      cy.get('#password').type(data.password);
      cy.get('#confirm-password').type(data.password);

      // Click the signup button
      cy.get('button[class*="bg-[var(--color-red-600)] hover:bg-[#851304] focus:bg-[var(--color-red-500)]"]')
        .should('have.class', 'cursor-pointer') // Optionally assert it has an expected class
        .click();

      // Use Cypress's conditional testing
      cy.contains('Đăng ký thành công', { timeout: 2000 }).then($success => {
        if ($success.length) {
          cy.log('Signup successful');
          
          // Find the sign-out element using XPath and click on it
          cy.wait(4000);
          cy.contains('Bài test').click({ force: true });
          cy.contains('Tính cách DISC').click({ force: true });  
          cy.contains('Làm ngay').click();
          cy.get('img[alt="close"][src="/_next/static/media/black-close.4683de0c.svg"]').click();

          cy.wait(10000);
          cy.contains('Đăng xuất').click({ force: true });
          // Loop to click different ratios 48 times, 2 milliseconds apart
          for (let i = 0; i < 48; i++) {
            const randomIndex = Cypress._.random(0, 1);
            const groupElements = cy.get('.group-question__type-item');
            groupElements.eq(randomIndex).click();
            cy.wait(2);
          }
        }
      });
    });
  });
});