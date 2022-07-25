it('should redirect to home page', () => {
    cy.visit('http://localhost:4200/departures');
    cy.url().should('include', '/');
});

describe('departures page', () => {
    before(() => {
    })
    beforeEach(() => {
        cy.fixture('departures.json').as('departures');
        cy.intercept('GET', '**/api/v2/departures?*', { fixture: 'departures.json' }).as('departuresAPI');
        cy.visit('http://localhost:4200/departures?station=GVC');
    });

    it('should display header', () => {
        cy.get('.mat-toolbar').should('have.length', 1);
    });

    it('should display departures component', () => {
        cy.get('app-departures').should('have.length', 1);
    });

    it('should show only Sprinter trains', () => {
        cy.wait('@departuresAPI');
        cy.get('mat-select').first().click();
        cy.get('mat-option').contains('Sprinter').click();
        cy.get('.mat-table tbody tr').should('have.length', 3);
    });

    it('should show only Intercity trains', () => {
        cy.get('mat-select').first().click();
        cy.get('mat-option').contains('Intercity').click();
        cy.get('.mat-table tbody tr').should('have.length', 1);
    });

    it('should show only Haarlem departures', () => {
        cy.get('#searchDeparturesInput').type('Haarlem');
        cy.get('.mat-table tbody tr').should('have.length', 1);
    });

});