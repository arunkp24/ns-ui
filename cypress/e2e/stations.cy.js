describe('stations page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    it('should display header', () => {
        cy.get('.mat-toolbar').should('have.length', 1);
    });

    it('should display stations component', () => {
        cy.get('app-stations').should('have.length', 1);
    });

    it('should show error message', () => {
        cy.get('#searchStationInput').type('kjdhfklad');
        cy.get('#getDeparturesBtn').click();
        cy.get('#mat-error-0').should('have.length', 1);
    });

    it('should redirect to departures page', () => {
        cy.get('#searchStationInput').type('Den Haag');
        cy.get('mat-option').contains('Den Haag Centraal').click();
        cy.get('#getDeparturesBtn').click();
        cy.url().should('include', '/departures');
    });
});