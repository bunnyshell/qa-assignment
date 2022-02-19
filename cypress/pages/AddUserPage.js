import TestConfig from "../config/TestConfig"

class AddUser {
    visit() {
        cy.visit(`${TestConfig.baseUiUrl}/add`)
    }

    createUser(userdata) {
        cy.get('[qa-data="name"]').type(userdata.name)
        cy.get('[qa-data="userName"]').type(userdata.userName)
        cy.get('[qa-data="email"]').type(userdata.email)
        cy.get('[qa-data="phoneNumber"]').type(userdata.phoneNumber)
        cy.get('[qa-data="submit"]').click();
    }
}

export default AddUser