// //
// Scenario: See all course
// Given user want to see every course made
// Then server should return every course
// And with reasonable time
// And return created status


//TC003
Then("server shouldn't return register data", () => {});
//TC022
Then("user shouldn't be able to login", () => {});

Then("user should be redirected to payment gateway", () => {});

Then("user shouldn't be redirected to payment gateway", () => {});

Then("Server should send otp to email", () => {});

Then("Server shouldn't send otp to email", () => {});

Then("user should be redirected to student course", () => {});

Then("user should be redirected progress", () => {});

Then("user should be redirected choosen learning module", () => {});

Then("user should be redirected to learning material", () => {});

Then("user should be redirected learning material by ID", () => {});

Then("user should be redirected to learning videos", () => {});

Then("user should be redirected kearning videos by ID", () => {});

Then("user should be redirected to quiz", () => {});

Then("user should be redirected to quiz by ID", () => {});

And("with reasonable time", () => {});

And("return success status", () => {});

And("return created status", () => {});

And("user wants to buy course", () => {});

And("user wants to get course by student ID", () => {});

And("user wants to see progress", () => {});

And("user wants to get learning module", () => {});

And("user wants to get all learning material", () => {});

And("user wants to get material by ID", () => {});

And("user wants to get all learning videos", () => {});

And("user wants to buy get videos by ID", () => {});

And("user wants to get all quiz", () => {});

And("user wants to buy get quiz by ID", () => {});




//TC001 Students can register with valid data
Given ("user try to register using empty email", () =>{
    //GANTI GANTI GANTI
    const pass = Cypress.env('pass')
    const email = Cypress.env('email')
    cy.log("Email is "+email)
    cy.log("Password is "+pass)
    Then ("server should return status code 500", () =>{

        cy.api("POST", "/registrasi",
            //GANTI GANTI GANTI GANTI
            {
                "name": "Muhammad Nur Firdaus",
                "email": "",
                "phone_number": "+6281218446131",
                "username": "daus123",
                "password": "12345678",
                "user_type": "students",
                "school_name": "SMK Bakti",
                "gender": "male"
            }
        ).then((response) => {
            expect(response.status).to.eq(500)
            const duration = response.duration
            Cypress.env('time', duration)
        })
    })
});
