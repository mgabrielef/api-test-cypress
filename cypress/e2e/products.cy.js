/// < reference types="cypress"/>

describe('API Test - Products', () => {
    it('list products - GET', () => {
        cy.request({
            method : 'GET',
            url : 'produtos'
        }).should((response)=>{
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')
        })
    })
    
    it.only('create product - POST', ()=>{
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmtAdGVzdC5jb20iLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE3MTMzODE4NTQsImV4cCI6MTcxMzM4MjQ1NH0.s9ebxqne9shO8-RcFPLO-T-1wwPCgzTOuEw6hMsES-Q"
        cy.request({
            method : 'POST',
            url : 'produtos',
            headers : {authorization : token},
            body:{
                "nome": "Webcam HD Logitech C270",
                "preco": 164,
                "descricao": "Webcam",
                "quantidade": 213
            }
        }).should((response)=>{
            expect(response.status).equal(201)
            expect(response.body.message).equal("Cadastro realizado com sucesso")
        })
    })
})