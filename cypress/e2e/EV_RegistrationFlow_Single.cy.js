describe('Event Registration Flow - Single', () => {
	beforeEach(() => {
		// Mở trang web hoặc form mà bạn muốn kiểm tra
		cy.visit('https://evexus-dev.com/event/example/register/246/email');
        cy.wait(5000)
        //cy.get('#rcc-confirm-button').click();

	});

	it('RS_001: Blank Email Field', () => {
		// Nhập thông tin không hợp lệ vào các trường
		cy.get('button').contains('Next').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();

		// Kiểm tra thông báo lỗi
		cy.get('.chakra-form__error-message') // Lựa chọn phần tử bằng lớp CSS
			.should('be.visible') // Kiểm tra thông báo lỗi có hiển thị không
			.and('contain.text', 'Email is required'); // Kiểm tra nội dung thông báo lỗi
	});

	it('RS_002: Multiple Error Messages', () => {
		// Tạo email ngẫu nhiên
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@temp.com`;

		// Nhập email và nhấn nút Next
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();

		// Nhấn nút Next để tiếp tục
		cy.wait(2500);
		cy.get('button').contains('Next').click();

		// Kiểm tra tất cả các thông báo lỗi
		cy.get('[aria-live="polite"].chakra-form__error-message')
			.should('have.length', 3) // Điều chỉnh số lượng theo số lượng thông báo lỗi mong muốn
			.then(($errors) => {
				const errorMessages = [
					'Please choose an attendee group',
					'Please agree with the privacy policy before you continue',
					'Please agree with terms and condition before you continue'
				];
				$errors.each((index, error) => {
					cy.wrap(error).should('contain.text', errorMessages[index]);
				});
			});
	});

    it('RS_003: Discount code availible', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
		cy.get('p.chakra-text.css-1elyv8m')
            .should('contain.text', 'Registration types');
	});

    it('RS_004: Check logic you must add a Registration type to your cart to continue', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        cy.wait(2500);

        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
		cy.get('p.chakra-text.css-1elyv8m')
            .should('contain.text', 'Registration types');
        // Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        //Check 
        cy.get('div.chakra-modal__body.css-1apuxeq') // Tìm div chứa modal body
            .find('p.chakra-text.css-1r9f8zl') // Tìm p chứa thông báo lỗi
            .should('exist') // Kiểm tra sự tồn tại của thông báo lỗi
            .and('have.text', 'You must add a Registration type to your cart to continue'); // Kiểm tra văn bản thông báo chính xác

	});

    it('RS_005: Unavailable Ticket Option', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
		cy.get('p.chakra-text.css-1elyv8m')
            .should('contain.text', 'Registration types');
        //Check Unavailable Ticket Option icon
        cy.get('svg[xmlns="http://www.w3.org/2000/svg"][width="24"][height="24"][fill="#000"][viewBox="0 0 256 256"]')
            .should('exist'); // Kiểm tra sự tồn tại của phần tử SVG chính xác
	});

    it('RS_006: Check Out of stock ticket', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
		cy.get('p.chakra-text.css-1elyv8m')
            .should('contain.text', 'Registration types');
        //Check Out of stock option
        cy.contains('span', 'Out of stock')
            .should('exist'); // Kiểm tra sự tồn tại của phần tử chứa chữ "Out of stock"
	});

    it('RS_007: Check Registration ticket in Shopping cart', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
	});

    it('RS_008: Check Function ticket in Shopping cart', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Function tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '2'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
	});

    it('RS_009: Check Workshop ticket in Shopping cart', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
		// Click on the form 
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Function tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '2'); // Kiểm tra số lượng giỏ hàng đã tăng lên 2
        
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Workshop tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '3'); // Kiểm tra số lượng giỏ hàng đã tăng lên 3
	});

    it('RS_010: Check Tour ticket in Shopping cart', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Function tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '2'); // Kiểm tra số lượng giỏ hàng đã tăng lên 2

        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Workshop tickets') // Tìm phần tử có văn bản "Workshop tickets"
        .should('exist'); // Xác nhận sự tồn tại của phần tử

        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '3'); // Kiểm tra số lượng giỏ hàng đã tăng lên 3
        
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Tour tickets') // Tìm phần tử có văn bản "Tour tickets"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '4'); // Kiểm tra số lượng giỏ hàng đã tăng lên 4
	});

    it('RS_011: Redirect to Registration types page after Remove Registration ticket', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.com`;

		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
        cy.wait(2500);
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        cy.wait(2500);
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Function tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
        cy.wait(2500);
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '2'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
        // Click this icon to open shopping cart 
        cy.wait(2500);
        cy.get('div.chakra-stack.css-d0dext') // Tìm div chứa SVG và p
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"]') // Tìm SVG có viewBox chính xác
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        //Click Remove Registration ticket
        cy.wait(2500);
        cy.get('p.chakra-text.css-r76ffi') // Tìm phần tử <p> với class cụ thể
        .contains('Remove') // Kiểm tra xem nội dung có chứa "Remove"
        .first() // Chọn phần tử đầu tiên nếu có nhiều phần tử giống nhau
        .click(); // Nhấp vào phần tử đầu tiên
        //Check Redirect to registration types page
        cy.wait(2500);
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
	});

	it('RS_012: Leave Billing address with blank', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
		// Fill in billing details
        cy.wait(500);
		cy.get('button').contains('Pay').click();
        //Check error message
        cy.get('div.chakra-form__error-message').contains('First name is required.').should('be.visible');
        cy.get('div.chakra-form__error-message').contains('Last name is required.').should('be.visible');
        cy.get('div.chakra-form__error-message').contains('Street address is required.').should('be.visible');
        cy.get('div.chakra-form__error-message').contains('City is required.').should('be.visible');
        cy.get('div.chakra-form__error-message').contains('State is required.').should('be.visible');
        cy.get('div.chakra-form__error-message').contains('Postcode is required.').should('be.visible');
        cy.get('div.chakra-form__error-message').contains('Country is required.').should('be.visible');
	});

    it('RS_013: Select Payment Invoice (Offline payment)', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');;
        cy.get('input[name="billingState"]').type('New York');;
        cy.get('input[name="billingPostcode"]').type('New York');;
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();

		// Proceed to payment
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
	});

    it.skip('RS_013: Select Payment Invoice (Offline payment)', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');;
        cy.get('input[name="billingState"]').type('New York');;
        cy.get('input[name="billingPostcode"]').type('New York');;
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();

		// Proceed to payment
        cy.get('.chakra-stack').contains('Pay by credit card').click();

        cy.intercept('GET', '/v1/elements/sessions*').as('stripeRequest');
        
        cy.wait(15000);
        
        // Đợi phản hồi và ghi lại nội dung của nó
        cy.wait('@stripeRequest').then((interception) => {
            // Ghi log toàn bộ nội dung request để debug
            cy.log('Full API Interception:', JSON.stringify(interception));
        
            // Lấy URL từ request
            const requestUrl = interception.request.url;
        
            // Regex để tìm client_secret
            const clientSecretPattern = /client_secret=(pi_[a-zA-Z0-9]+_secret_[a-zA-Z0-9]+)/;
            const match = requestUrl.match(clientSecretPattern);
        
            if (match) {
                const clientSecret = match[1];
                const paymentIntentId = clientSecret.split("_secret_")[0];
        
                cy.log(`🔹 Payment Intent ID: ${paymentIntentId}`);
                cy.log(`🔹 Client Secret: ${clientSecret}`);
            } else {
                cy.log("⚠ Can't find payment_intent_id or client_secret!");
            }
            cy.request({
                method: 'POST',
                url: `https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`,
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/x-www-form-urlencoded',
                    'origin': 'https://js.stripe.com',
                    'referer': 'https://js.stripe.com/',
                    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
                },
                form: true,
                body: {
                    return_url: 'https://evexus-dev.com/event/example/register/246/payment-processing?orderHash=7c7c766797df560be7e000e242722adffb9752968c2fc98d68df851bb86164d5',
                    'payment_method_data[type]': 'card',
                    'payment_method_data[card][number]': '4242 4242 4242 4242',
                    'payment_method_data[card][cvc]': '231',
                    'payment_method_data[card][exp_year]': '25',
                    'payment_method_data[card][exp_month]': '04',
                    'payment_method_data[billing_details][address][country]': 'VN',
                    'use_stripe_sdk': 'true',
                    'key': 'pk_test_51Ois7MFO7mbemM2fQkH6rlqWNDRkeiex4JqdA7e1L0dGxGGRvwcY5UqiTD0vPVpOguKZ981nn2j56T8dixYGh9ua00DiKqyUXN',
                    'client_secret': clientSecret
                }
            }).then((response) => {
                cy.log('🔹 Stripe Confirm Response:', JSON.stringify(response.body));
                expect(response.status).to.eq(200);
            });
        });
        cy.wait(2500);
     });


    it('RS_014: Leave Basic infor with blank- Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');;
        cy.get('input[name="billingState"]').type('New York');;
        cy.get('input[name="billingPostcode"]').type('New York');;
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();

		// Proceed to payment
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('.chakra-form__error-message')  // Get all error messages
            .filter(':contains("The field is required")')  // Filter by the text you're expecting
            .should('have.length', 2)  // Assert there are exactly two of them
            .and('be.visible');  // Check if they are visible
	});

    it('RS_015: Check Registration review page- Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();

		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
	});

    it('RS_016: Check Registration Successful page - Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();
		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
		cy.get('button').contains('Complete registration').click();
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration successful') // Check if it contains the text "Registration successful"
            .should('be.visible'); // Ensure it's visible
	});

    it('RS_017: Check View Detail - Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();
		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
		cy.get('button').contains('Complete registration').click();
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration successful') // Check if it contains the text "Registration successful"
            .should('be.visible'); // Ensure it's visible
        cy.get('button[type="button"]')  // Select button by type
            .contains('View details')  // Ensure the button contains the text
            .click();  // Click the button
	});

    it('RS_018: Check Download Invoice.pdf - Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();
		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
		cy.get('button').contains('Complete registration').click();
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration successful') // Check if it contains the text "Registration successful"
            .should('be.visible'); // Ensure it's visible
        cy.get('button[type="button"]')  // Select button by type
            .contains('View details')  // Ensure the button contains the text
            .click();  // Click the button
        // Click vào liên kết tải xuống
        cy.contains('Download')
            .click();
	});

    it('RS_019: Buy 1 ticket: Registration types - Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();
		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
		cy.get('button').contains('Complete registration').click();
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration successful') // Check if it contains the text "Registration successful"
            .should('be.visible'); // Ensure it's visible
        cy.get('button[type="button"]')  // Select button by type
            .contains('View details')  // Ensure the button contains the text
            .click();  // Click the button
        // Click vào liên kết tải xuống
        cy.contains('Download')
            .click();
	});

    it('RS_020: Buy 2 tickets: Registration types + Function ticket - Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Function tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '2'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();
		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
		cy.get('button').contains('Complete registration').click();
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration successful') // Check if it contains the text "Registration successful"
            .should('be.visible'); // Ensure it's visible
        cy.get('button[type="button"]')  // Select button by type
            .contains('View details')  // Ensure the button contains the text
            .click();  // Click the button
        // Click vào liên kết tải xuống
        cy.contains('Download')
            .click();
	});

    it('RS_021: Buy 3 tickets: Registration types + Function ticket + Workshop ticket - Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Function tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '2'); // Kiểm tra số lượng giỏ hàng đã tăng lên 2

        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Workshop tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '3'); // Kiểm tra số lượng giỏ hàng đã tăng lên 3
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();
		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
		cy.get('button').contains('Complete registration').click();
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration successful') // Check if it contains the text "Registration successful"
            .should('be.visible'); // Ensure it's visible
        cy.get('button[type="button"]')  // Select button by type
            .contains('View details')  // Ensure the button contains the text
            .click();  // Click the button
        // Click vào liên kết tải xuống
        cy.contains('Download')
            .click();
	});

    it('RS_022: Buy 4 tickets: Registration types + Function ticket + Workshop ticket + Tour ticket - Payment Invoice', () => {
		const randomEmail = `user${Math.floor(Math.random() * 10000)}@evexus.au`;
		// Enter email and submit
		cy.get('input[name="email"]').type('alan' + randomEmail);
		cy.get('button').contains('Next').click();
		// Click on the form 
        cy.wait(2500);
		cy.contains('p.chakra-text', 'Early Bird (Payment First)')
			.should('be.visible')
			.click();
        //  Type Discount code
        cy.get('input[name="discountCodeString"]')
            .should('be.empty')  // Kiểm tra rằng trường input ban đầu là trống
            .type('EARLYBIRD2024');
        //  Checkboxes
        cy.wait(2500);
        cy.get(':nth-child(1) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();
        cy.get(':nth-child(2) > [data-testid="ui-vstack"] > [data-testid="ui-hstack"] > .chakra-checkbox > .chakra-checkbox__control').click();

		// Click next button
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
		// If right discount code -> redirect to Registration types page
        cy.contains('p', 'Registration types') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '1'); // Kiểm tra số lượng giỏ hàng đã tăng lên 1
		// Click next button
        cy.wait(2500);
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Function tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '2'); // Kiểm tra số lượng giỏ hàng đã tăng lên 2

        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Workshop tickets') // Tìm phần tử có văn bản "Registration types"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '3'); // Kiểm tra số lượng giỏ hàng đã tăng lên 3
        cy.wait(2500);
		cy.get('button').contains('Next').click();
        // If right discount code -> redirect to Functional ticket
        cy.contains('p', 'Tour tickets') // Tìm phần tử có văn bản "Tour tickets"
        .should('exist'); // Xác nhận sự tồn tại của phần tử
      
        // Bước 2: Click vào nút SVG bên dưới Registration types
        cy.get('button.chakra-button.css-1edt7ad') // Chọn tất cả các button có class tương ứng
            .eq(0) // Chọn nút đầu tiên
            .find('svg[viewBox="0 0 256 256"][width="1.875rem"][height="1.875rem"][fill="#3F51B5"]') // Tìm SVG bên trong nút
            .should('exist') // Kiểm tra sự tồn tại của SVG
            .click(); // Nhấp vào SVG
        // Bước 3: Nhấn nút "Add to cart"
        cy.contains('button', 'Add to cart') // Tìm button có văn bản "Add to cart"
            .click(); // Nhấp vào nút "Add to cart"
        
        // Bước 4: Kiểm tra rằng số lượng giỏ hàng đã tăng lên
        cy.get('p.chakra-text.css-i4xdx5') // Chọn phần tử hiển thị số lượng giỏ hàng
            .should('have.text', '4'); // Kiểm tra số lượng giỏ hàng đã tăng lên 4
		cy.get('button').contains('Next').click();
		cy.wait(500);
		cy.get('button').contains('Next').click();
		// Fill in billing details
        cy.get('input[name="firstName"]').type('Wall');
        cy.get('input[name="lastName"]').type('Stryder');
        cy.get('input[name="billingCompanyName"]').type('Evexus');
        cy.get('input[name="billingStreet"]').type('37 Wall');
        cy.get('input[name="billingCity"]').type('Yorktown');
        cy.get('input[name="billingState"]').type('New York');
        cy.get('input[name="billingPostcode"]').type('New York');
        cy.get('.css-18euh9p').click();
        cy.contains('Australia').click();
        cy.wait(500);
		cy.get('button').contains('Pay').click();
		// Proceed to payment
        const organisationName = 'Acmed Corp';
		const positionTitle = 'Software Engineer';
		cy.get('.chakra-stack').contains('Pay by invoice (offline)').click();
		cy.wait(2500);
        cy.get('button').contains('Confirm').click();
		cy.wait(2500);
		cy.get('button').contains('Next').click();
		cy.wait(2500);
        cy.get('input[name="organisation"]').type(organisationName);
        cy.get('input[name="position"]').type(positionTitle);;
		cy.wait(2500);
		cy.get('button').contains('Next').click();
        cy.wait(2500);
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration review') // Check if it contains the text "Registration review"
            .should('be.visible'); // Ensure it's visible
		cy.get('button').contains('Complete registration').click();
        cy.get('p.chakra-text.css-1elyv8m') // Select the paragraph with the specific class
            .contains('Registration successful') // Check if it contains the text "Registration successful"
            .should('be.visible'); // Ensure it's visible
        cy.get('button[type="button"]')  // Select button by type
            .contains('View details')  // Ensure the button contains the text
            .click();  // Click the button
        // Click vào liên kết tải xuống
        cy.contains('Download')
            .click();
	});

});
