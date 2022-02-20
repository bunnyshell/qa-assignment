/// <reference types="Cypress" />

import ApiController from "../../pages/ApiController"
import TestConfig from "../../config/TestConfig"

describe('API create user tests', () => {

    const onApiController = new ApiController();

    beforeEach(() => {
        //Arrange
        onApiController.deleteAllUsers();
        cy.intercept('POST', '**/user').as('newUser')
    });

        //Cleanup
    after(() => {
        onApiController.deleteAllUsers();
    }) 

    it ('creates a valid user', () => {        
        cy.fixture('ValidUser').then((validUser) => {
            //Act
            cy.request('POST', `${TestConfig.baseApiUrl}/user`, validUser ).as('createUser')
            //Assert response code
            cy.get('@createUser').then((createdResponse) => {
                expect(createdResponse.status).to.eq(201);
                expect(createdResponse.duration).to.not.be.greaterThan(500);
            })
            //Assert object content was created in database
            cy.request('GET', `${TestConfig.baseApiUrl}/user/1`).then((response) => {
                expect(JSON.stringify(response.body)).to.equal(JSON.stringify(validUser));
            })
        })  
    })

    it('does not create a user with missing email', () => {
        cy.fixture('EmptyEmail').then((validUser) => {
            //Act
            cy.request('POST', `${TestConfig.baseApiUrl}/user`, validUser ).as('createUser')
            //Assert response code
            cy.get('@createUser').then((createdResponse) => {
                expect(createdResponse.duration).to.not.be.greaterThan(500);
                expect(createdResponse.status).to.eq(404);
            })
        })  
    });

    it('does not create a duplicated user', () => {
        cy.fixture('ValidUserNoId').then((user) => {
            //Act
            cy.request('POST', `${TestConfig.baseApiUrl}/user`, user ).as('created1')
            cy.get('@created1').then((createdResponse) => {
                expect(createdResponse.status).to.eq(201);
            })
            cy.request('POST', `${TestConfig.baseApiUrl}/user`, user ).as('created2')
            //Assert
            cy.get('@created2').then((createdResponse) => {
                expect(createdResponse.status).to.eq(404);
            })
        })
    });x``
})