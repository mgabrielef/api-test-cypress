/// < reference types="cypress"/>

describe('API Test - Products', () => {

    let token
    beforeEach(()=>{
        cy.token('mark@test.com', 'test').then(tkn=>{
            token = tkn
        })
    })

    it('should list all products - GET', () => {
        cy.request({
            method : 'GET',
            url : 'produtos'
        }).should((response)=>{
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')
        })
    })
    
    it('should create product succesfully - POST', ()=>{
        let product = 'Product ' + Math.floor(Math.random() * 100000)
        cy.createProduct(token, product, 244, 'Product', 123)
            .should((response)=>{
                expect(response.status).equal(201)
                expect(response.body.message).equal("Cadastro realizado com sucesso")
            })
    })

    it('should shown error message when creating product with already existing name - POST', ()=>{
        cy.createProduct(token, 'Logitech MX Vertical', 244, 'Mouse', 123)
            .should((response)=>{
                expect(response.status).equal(400)
                expect(response.body.message).equal("Já existe produto com esse nome")
            })
    })

    it('should edit product - PUT', () => {
        let product = 'Product ' + Math.floor(Math.random() * 100000)
        cy.createProduct(token, product, 244, 'Product', 123)
            .then(response=>{
                let id = response.body._id
                cy.editProduct(id, token, product, 1599, 'Edited Product', 200)
                .should((response)=>{
                    expect(response.status).equal(200)
                    expect(response.body.message).equal("Registro alterado com sucesso")
                })
            })
    })

    it('should delete product successfully - DELETE', () => {
        cy.createProduct(token, 'Delete Product', 244, 'Product', 123)
            .then(response=>{
                let id = response.body._id
                cy.deleteProduct(id, token)
                .should((response)=>{
                    expect(response.status).equal(200)
                    expect(response.body.message).equal("Registro excluído com sucesso")
                })
            })
    })
})