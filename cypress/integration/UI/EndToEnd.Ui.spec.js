/// <reference types="Cypress" />

import AddUser from "../../pages/AddUserPage";
import UserPage from "../../pages/AllUsersPage";
import ApiController from "../../pages/ApiController"
import EditPage from "../../pages/EditPage"

describe('End to End UI tests', () => {

    const onUsersPage = new UserPage();
    const onApiController = new ApiController();
    const onAddUserPage = new AddUser();
    const onEditPage = new EditPage();

    beforeEach(() => {
        //Arrange
        onApiController.deleteAllUsers();
    });

        //Cleanup
    afterEach(() => {
        onApiController.deleteAllUsers();
    }) 

    it('performs CRUD operations on valid user entry', () => {
        //Create
        onAddUserPage.visit();
        cy.intercept('POST', '**/user').as('newUser')
        cy.fixture('ValidUser').then((validUser) => {
            onAddUserPage.createUser(validUser)

            //Read
            cy.wait('@newUser').then(() => {
                onUsersPage.visit();
                cy.contains(validUser.name).should('be.visible');
            })

            //Update
            onEditPage.visit(validUser.id);
            cy.fixture('ValidUser2').then((validUser2) => {
                cy.intercept('PUT', '**/user/*').as('updatedUser')
                onEditPage.updateUser(validUser2);

                cy.wait('@updatedUser').then(() => {
                    cy.contains(validUser2.name).should('be.visible');
                })

                //Delete
                cy.intercept('DELETE', '**/user/*').as('deleteUser')
                onUsersPage.getDeleteButtons().first().click();
                cy.wait('@deleteUser').then(() => {
                    cy.contains(validUser2.name).should('not.exist');
                })
            })  
        })      
    });
})