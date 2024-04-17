/// <reference types="cypress"/>

describe('API Test - Login', () => {
  it('should login successfully', () => {
    cy.request({
      method : 'POST',
      url : 'login',
      body : {
        "email": "mark@test.com",
        "password": "test"
      }
    }).should((response)=>{
      expect(response.body.message).to.equal("Login realizado com sucesso")
      expect(response.status).to.equal(200)
    })
  })
})