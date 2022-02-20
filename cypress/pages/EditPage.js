import TestConfig from "../config/TestConfig"

class EditPage {
    visit(index) {
        cy.visit(`${TestConfig.baseUiUrl}/edit/${index}`)
    }

    updateUser(userdata) {
        cy.get('[qa-data="name"]>input').clear().type(userdata.name)
        cy.get('[qa-data="userName"]>input').clear().type(userdata.userName)
        cy.get('[qa-data="phoneNumber"]>input').clear().type(userdata.phoneNumber)
        cy.get('[qa-data="submit"]').click();
    }
}

export default EditPage