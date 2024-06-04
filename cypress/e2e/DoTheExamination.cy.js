// Import the SignUpData fixture
describe('Tracnghiemtinhcach.vn Test', () => {
    // Global uncaught:exception handler to ignore specific errors
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Ignore the "Failed to fetch" error
        if (err.message.includes('Failed to fetch')) {
            return false;
        }
        // Allow other errors to fail the test
        return true;
    });

    it('should complete the DISC personality test', function () {
        signUpData.forEach((userData, index) => {
            // Open the website
            cy.visit('https://tracnghiemtinhcach.vn/')
            
            // Verify the page title
            cy.title().should('eq', 'Trắc nghiệm tính cách DISC miễn phí | Tracnghiemtinhcach.vn')
            
            // Click the Đăng nhập button with { force: true }
            cy.contains('button', 'Đăng nhập').click({ force: true })
            
            // Click the Đăng ký link
            cy.contains('a', 'Đăng ký').click()
            
            // Fill in the registration form using data from SignUpData fixture
            cy.get('#name').type(userData.fullname);
            cy.get('#email').type(userData.email);
            cy.get('#password').type(userData.password, { log: false });
            cy.get('#confirm-password').type(userData.password, { log: false });
            
            // Submit the registration form
            cy.contains('button', 'Đăng ký').click()
            
            // Navigate to user profile and update details
            cy.contains('span', 'J').click()
            cy.contains('a', 'Hồ Sơ của tôi').click()
            
            // Update user profile using data from SignUpData fixture
            cy.get('input[name="name"]').clear().type(userData.fullname)
            cy.get('input[name="phone"]').clear().type(userData.phone)
            cy.contains('label', 'Facebook').click()
            cy.get('input[name="facebook_profile_url"]').clear().type(userData.facebook)
            cy.contains('button', 'Lưu thay đổi').click()
            
            // Continue navigating through the website
            cy.contains('span', 'J').click()
            cy.contains('span', 'Bài Test').click()
            cy.contains('span', 'J').click()
            cy.contains('a', 'Kết quả của tôi').click()
            cy.contains('span', 'J').click()
            cy.contains('a', 'Hồ Sơ của tôi').click()
            cy.contains('span', 'Bài Test').click()
            cy.contains('a', 'Tính cách DISC').click()
            cy.contains('button', 'Làm ngay').click()
            
            // Complete the DISC test
            cy.get('div').each(($div, index, $list) => {
                if(index < 20) { // Adjust the number as needed
                    cy.wrap($div).click()
                }
            })
            
            // Complete the test
            cy.contains('button', 'Hoàn thành').click()
            
            // Sign out
            cy.contains('Đăng xuất').click({ force: true });

            // Wait for 2 seconds after signing out
            cy.wait(2000);

            // Log the completion of the current account
            cy.log(`Completed signup and test for account ${index + 1} of ${signUpData.length}`);
        });
    });
});