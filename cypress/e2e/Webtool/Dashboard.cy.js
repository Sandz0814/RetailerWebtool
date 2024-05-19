import 'cypress-xpath';

describe('Verify Dashboard', function(){

    beforeEach('Loging in', function(){
        cy.visit('https://retailers.posible.net.ph/login')

        cy.fixture('testData').then(function(data){
            let userdata = data[5]

        cy.get("input[placeholder='Email Address']").clear().type(userdata.username)
        cy.get('#password').clear().type(userdata.password)
        cy.get('.primary').click()

        })

    })
    
    it('Verify date filter function by selecting', ()=> {
        
        cy.url().should('contain', 'https://retailers.posible.net.ph/dashboard')
          
        // Filtering the date range
        cy.get('#rangestart > .input > input').type('Jan 1, 2024')
        cy.wait(1000)
        cy.get('#rangeend > .input > input').type('May 17, 2024')
        cy.get('.primary').click()

        // Cliking the service field to populate the service
        cy.get('.form > :nth-child(2) > :nth-child(1) > .ui').click()
        // When service is clicked dropdown will display and 1st in the list is "Top UP"
        cy.get("div[data-value='TOP_UP']").should('be.visible')

        // Approach -- 1 Scrolling down to find the element to select 
        // cy.get('.menu.transition.visible').scrollIntoView()
        cy.get("div[data-value='EM_TRANSFER']").scrollIntoView({duration:2000}).click()


        // Cliking the service field to populate the service
        cy.get('.form > :nth-child(2) > :nth-child(2) > .ui').click()
        // Selecting success
        cy.get(".menu.transition.visible").contains('Success').click()

        // Filtering by transaction ID
        cy.get('.three > :nth-child(1) > input').type('45408797')

        // Filtering by Target
        cy.get(':nth-child(2) > input').type('2402067964260')

        // Filtering by SKU
        cy.get('.three > :nth-child(3) > .ui').click()
        
        // Aproach 1 - to view and select the gcash payout
        cy.get(".menu.transition.visible").scrollTo('center', {duration:5000})
        cy.get(".menu.transition.visible").contains('GCash Padala Payout').click()

        // Approach 2 - to view and select the gcash payout
        //cy.get("div:nth-child(334)").scrollIntoView({duration:5000}).click()

        // Cicking Filter Button
        cy.get('.primary').click()

    })    
        
    it("Verifying the all the tables", function(){

        // Filtering by transaction ID
        cy.get('.three > :nth-child(1) > input').type('45408797')
        cy.get('.primary').click()

        

    
        // Verifying the table column should be 14 and 1 row if filtered
        cy.get(".ui.small.fixed.compact.table>thead>tr>th").should('have.length', '14')

        // Row is equal to 1 because it is filtered by Gcash pay out only
        cy.get(".ui.small.fixed.compact.table>tbody>tr").should('have.length', '1')

        // Verifying the count of metric row and asserting it content
        cy.get("div[class='ui red segment'] table[class='ui very basic celled table']>tbody>tr")
        .should('have.length', '4').and('contain', 'No. of Transactions')

        cy.xpath("//body[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]/td[2]").
        should('contain', '1')


    });
        

})
