Cypress.Commands.add('token', (email, password) => {
    cy.request({
        method : 'POST',
        url : 'login',
        body : {
          "email": email,
          "password": password
        }
      }).then(response=>{
        return response.body.authorization
      })
})

Cypress.Commands.add('createProduct', (token, product, price, description, quantity)=>{
  cy.request({
    method : 'POST',
    url : 'produtos',
    headers : {authorization : token},
    body:{
        "nome": product,
        "preco": price,
        "descricao": description,
        "quantidade": quantity
      }, 
    failOnStatusCode: false
  })  
})