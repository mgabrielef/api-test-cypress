Cypress.Commands.add('token', (email, password) => {
    cy.request({
        method : 'POST',
        url : 'login',
        body : {
          "email": email,
          "password": password
        }
      })
})