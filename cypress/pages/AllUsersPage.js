import TestConfig from "../config/TestConfig"

class UserPage {
    visit() {
        cy.intercept('GET', '**/user').as('user')
        cy.visit(`${TestConfig.baseUiUrl}/all`)
        cy.wait('@user');
    }

    getDataRows() {
        return cy.get('div [role="row"]')
    }

    getDeleteButtons() {
        return cy.get('[qa-data="RemoveButton"]')
    }

    deleteRowAt(index) {
        this.getDeleteButtons().eq(index).click();
    }
}

export default UserPage