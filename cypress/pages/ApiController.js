import TestConfig from "../config/TestConfig";

class ApiController {

    createUser(user) {
        cy.request('POST', `${TestConfig.baseApiUrl}/user`, user )
    }

    deleteAllUsers() {
        cy.request('GET', `${TestConfig.baseApiUrl}/user`).then(response => 
            {
                const jsonResponse = response.body;
                jsonResponse.forEach(element => {
                    cy.request('DELETE', `${TestConfig.baseApiUrl}/user/${element.id}`)
                })           
            })
    }
}

export default ApiController