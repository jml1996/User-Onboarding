
describe('Form app', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    const nameInput = () => cy.get("input[name='name']");
    const emailInput = () => cy.get("input[name='email']");
    const passwordInput = () => cy.get("input[name='password']");
    const agreeCheckbox = () => cy.get("input[name='terms']");    

    it('selecting elems from DOM', () => {
        nameInput().should("exist");
        emailInput().should("exist");
        passwordInput().should("exist");
        agreeCheckbox().should("exist");
        submitButton().should("exist");
    })

    it("can type in the inputs", () => {
        nameInput()
            .should("have.value", "")
            .type("Josh")
            .should("have.value", "Josh")
            .clear()
        
        emailInput()
            .should("have.value", "")
            .type("josh@josh.com")
            .should("have.value", "josh@josh.com")
            .clear()

        passwordInput()
            .should("have.value", "")
            .type("joshspassword")
            .should("have.value", "joshspassword")
            .clear()
        
        agreeCheckbox()
            .should("not.be.checked")
            .check()
            .should("be.checked")
            .uncheck()
            .should("not.be.checked") 
    });

    const submitButton = () => cy.get("button").contains("submit");

    const nameCard = () => cy.get("h2[name='cardName']");
    const emailCard = () => cy.get("p[name='cardEmail']");
    const passCard = () => cy.get("p[name='cardPass']");
    const termsCard = () => cy.get("p[name='agreed']");

    it("submitted form data is displayed", () => {
        nameInput()
            .should("have.value", "")
            .type("Josh")
        
        emailInput()
            .should("have.value", "")
            .type("josh@josh.com")

        passwordInput()
            .should("have.value", "")
            .type("joshspassword")
        
        agreeCheckbox()
            .should("not.be.checked")
            .check()

        submitButton().click()
        cy.get("div[class='friend container']").should("exist")

        nameCard().should("have.text", "Josh")
        emailCard().should("have.text", "Email: josh@josh.com")
        passCard().should("have.text", "Password: joshspassword")
        termsCard().should("have.text", "Agreed to terms of service.")
    });



    const nameError = () => cy.get("div[name='nameError']");
    const emailError = () => cy.get("div[name='emailError']");
    const passwordError = () => cy.get("div[name='passwordError']");
    const termsError = () => cy.get("div[name='termsError']");

    it("gets correct error messages", () => {
        // should also have checks for absent values
        // but I am not having validation return text for that, 
        // just having it disable the submit button.
        // So I suppose I could do the casework for button being disbaled too...
        
        nameInput()
            .should("have.value", "")
            .type("jo")
        nameError().should("have.text", "Username must be 3 chars long.")

        emailInput()
            .should("have.value", "")
            .type("joshjosh.com")
        emailError().should("have.text", "Must be valid email address.")

        passwordInput()
            .should("have.value", "")
            .type("jo")
        passwordError().should("have.text", "Password must be 3 chars long.")
    });
});