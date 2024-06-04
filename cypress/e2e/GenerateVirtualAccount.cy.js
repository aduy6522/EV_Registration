import { clearLocalStorage, clearCookies } from 'cypress-localstorage-commands';


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
    // Define an array of 10 career options
    const careerOptions = [
      'Tài chính',
      'Công Thương',
      'Lao động, Thương binh và Xã hội',
      'Nông nghiệp và Phát triển nông thôn',
      'Khoa học và Công nghệ',
      'Giao thông vận tải',
      'Xây dựng',
      'Thông tin và Truyền thông',
      'Giáo dục và Đào tạo'
    ];
      // Randomly select a career option
      const randomIndex = Math.floor(Math.random() * careerOptions.length);
      const selectedOption = careerOptions[randomIndex];
  
      // Random data for other fields
      const data2 = { career: selectedOption}
    cy.get('#name').type(data.fullname);
    cy.get('#email').type(data.email);
    cy.get('#password').type(data.password);
    cy.get('#job').type(data.job);
    cy.get('#facebook_profile_url').type(data.facebook);
    cy.get('#career').click();
    cy.contains(data2.career, { timeout: 10000 }).scrollIntoView();
    cy.contains(data2.career).click();
    cy.get('input[id="dob"]').click(); // Click on the input field for date of birth
    cy.contains('button', '2024').click(); // Click on the button for the year 2024
    cy.contains('2020').click(); // Click on the button for selecting the year
    cy.contains('1999').click(); // Click again on the button for selecting the year
    cy.contains(data.year).click(); // Click on the div for the year 2000
    cy.wait(1000);
    cy.contains(data.month).click(); // Click on the div for the month May
    cy.contains(data.day).click(); // Click on the div for the day 16
    cy.get('#dob').click(); // Click on the input field for date of birth
    cy.contains(data.day).click(); // Click on the div for the day 16
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
          cy.contains('Hồ Sơ của tôi').click({ force: true });
            // Update user profile using data from SignUpData fixture
            cy.get('#phone').clear().type(data.phone)
            cy.contains('Lưu thay đổi').click()           
            // Continue navigating through the website  
            cy.contains('Bài Test').click({ force: true });
            cy.contains('Tính cách DISC').click({ force: true });
            cy.contains('Làm ngay').click({ force: true });
            
            // Complete the DISC test
            cy.get('div').each(($div, index, $list) => {
                if(index < 20) { // Adjust the number as needed
                    cy.wrap($div).click()
                }
            })
            
            // Complete the test
            cy.contains('button', 'Hoàn thành').click()
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