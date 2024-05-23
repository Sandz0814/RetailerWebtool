describe('Validate Forgot Passwor', ()=> {

    it('Verify forgot password', ()=> {

        cy.visit('https://retailers.posible.net.ph/login')

        cy.get(".ui.violet.button.left").click() // Forgot Password Button

        cy.url().should('contain', 'https://retailers.posible.net.ph/password/email') // URL

        cy.get(".text-center").should('have.text', 'Forgot Password').and('exist') // Forgot password page name

        cy.get("div[class='field'] label").should('be.visible').and('exist') // email input area label

        cy.get("input[placeholder='Email Address']").should('be.visible')
        .and('exist').type('sandrojimena0814@gmail.com')

        cy.get("button[type='submit']").should('be.visible')
        .and('exist').click()

        const expectedResult = 'Request has been sent to your email address';

        cy.get("div[id='sf-resetcontent'] h1").invoke('text').then((elementText) => {
            if (elementText === expectedResult) {
              cy.log("Finally it is fixed");
            } else {
              cy.log("Forgot password has still not fixed");
              cy.log("Forgot Password feature failed");
              cy.screenshot("cypress/PassedScreenshots/Whoops, Looks like something went wrong")
            }
        });
    });

})
