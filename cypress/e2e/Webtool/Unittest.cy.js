import 'cypress-xpath'

describe('Login Page', function() {
    let userdata;

    beforeEach(() => {
        // Open the website
        cy.visit('https://retailers.posible.net.ph');
    });

    beforeEach("Test Data", function() {
        cy.fixture('testData').then(function(data) {
            userdata = data;
        });
    });

    it('Verify Login with Positive and Negative Testing', () => {
        userdata.forEach(function(data) {
            // Conditionally type the username if it's not empty
            if (data.username) {
                cy.get("input[placeholder='Email Address']").clear().type(data.username);
            } else {
                cy.get("input[placeholder='Email Address']").clear();
            }

            // Conditionally type the password if it's not empty
            if (data.password) {
                cy.get('#password').clear().type(data.password);
            } else {
                cy.get('#password').clear();
            }
            cy.wait(2000)
            cy.get('.primary').click();

            cy.wait(2000); // Adjust wait time as needed

            // Check the expected outcome
            if (data.expected === 'Logout') {
                // Assert login success
                cy.get("a[href='/logout']").should('have.text', 'Logout');
                cy.screenshot('Valid user name');
                cy.log("Login successful");
            } else if (data.expected === 'The password field is required.') {
                // Assert specific error for empty password
                cy.get("ul[class='errors'] li").should('be.visible').and('have.text', 'The password field is required.');
                cy.screenshot('Login failed: Password is required');
                cy.log("Login failed: Password is required");
            } else if (data.expected === 'The email field is required.') {
                // Assert specific error for empty username
                cy.get("ul[class='errors'] li").should('be.visible').and('have.text', 'The email field is required.');
                cy.screenshot('Login failed: Email is required');
                cy.log("Login failed: Username is required");
            } else if (data.expected === 'Invalid email address.') {
                // Assert specific error for invalid email
                // cy.get("ul[class='errors'] li").should('be.visible').and('have.text', "Please include an '@ in the email address. " + data.username + " is missing an '@.");
                cy.screenshot('Invalid email address');
                cy.log("Login failed: Invalid email address");
            } else {
                // Assert general login failure
                cy.get("ul[class='errors'] li").should('be.visible').and('have.text', 'These credentials do not match our records.');
                cy.screenshot('Invalid User name and password');
                cy.log("Login failed");
            }
        });
    });
});
