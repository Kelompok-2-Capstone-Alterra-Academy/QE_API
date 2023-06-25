import {And, Given, Then, When} from "cypress-cucumber-preprocessor/steps";

//Barengan
And ('with reasonable time', () =>{
    const time = Cypress.env('time')
    cy.wrap(time).should('be.lessThan', 5000)
});
And ('return success status', () =>{
    const codeStatus = Cypress.env('status')
    cy.wrap(codeStatus).should('be.oneOf', [200, 201])
});

Given ("user already logged in", () =>{
    const token = Cypress.env('token');
    cy.log("Token "+ token)
});

Then("server should return error", () => {
    const codeStatus = Cypress.env('status')
    cy.wrap(codeStatus).should('be.oneOf', [401, 500, 404, 400, 403])
});

//TC001 Students can register with valid data
Given ("user try to register", () =>{
    //GANTI GANTI GANTI
    const pass = Cypress.env('pass')
    const email = Cypress.env('regisEmailStudent')
    cy.log("Email is "+email)
    cy.log("Password is "+pass)
    Then ("server should return register data", () =>{

        cy.api("POST", "/registrasi",
            //GANTI GANTI GANTI GANTI
            {
                "name": "Muhammad Nur Firdaus",
                "email":`${email}`,
                "password":`${pass}`,
                "phone_number": "081218446131",
                "user_type": "students",
                "school_name": "SMK Bakti",
                "gender": "male"
            }
        ).then((response) => {
            expect(response.body.data.users.email).to.eq(email)

                const duration = response.duration
                const statusCode = response.status

                Cypress.env('time', duration)
                Cypress.env('status', statusCode)
        })
    })
});
//TC003 STUDENTS CANT REGISTER
Given ("user try to register using empty email", () =>{
    //GANTI GANTI GANTI
    const pass = Cypress.env('pass')
    const email = Cypress.env('email')
    cy.log("Email is "+email)
    cy.log("Password is "+pass)
    Then ("server should return status code 500", () =>{

        cy.api({method: "POST", url: "/registrasi",failOnStatusCode: false,
            //GANTI GANTI GANTI GANTI
            body:{
                "name": "Muhammad Nur Firdaus",
                "email": "",
                "phone_number": "6281218446131",
                "username": "daus123",
                "password": "12345678",
                "user_type": "students",
                "school_name": "SMK Bakti",
                "gender": "male"
            }}
        ).then((response) => {
            expect(response.status).to.eq(500)
            const duration = response.duration
            Cypress.env('time', duration)
        })
    })
});



//TC021 Students can login with valid data
Given ("after user register and verify", () =>{
    const email = Cypress.env('emailStudent')
    const pass = Cypress.env('pass')
    cy.log("Email is "+email)
    cy.log("Password is "+pass)

    Then ("user should be able to login", () =>{

        cy.api("POST", "/login",
            {
                "email":`${email}`,
                "password":`${pass}`,
            }
        ).then((response) => {
            expect(response.body.data).not.empty
            const token = response.body.data.token
            const duration = response.duration
            const statusCode = response.status
            Cypress.env('time', duration)
            Cypress.env('status', statusCode)
            Cypress.env('token', token)

        })
    })
});
//TC022 Students can't login with empty email
Given("after user register with empty email", () => {
    const email = "<blank>";
    const pass = Cypress.env('pass');
    cy.log("Email is " + email);
    cy.log("Password is " + pass);
});

Then("user shouldnt be able to login", () => {
    const pass = Cypress.env('pass');
    cy.api({
        method: "POST",
        url: "/login",
        body: {
            email: "",
            password: `${pass}`,
        },
        failOnStatusCode: false,
    }).then((response) => {
        expect(response.status).to.be.oneOf([401, 500]);
        const duration = response.duration;
        Cypress.env('time', duration);
    });
});



//TC051 Students can take course

    And ('user wants to buy course', () =>{
        const token = Cypress.env('token');
        const authorization = `Bearer ${token}`;
        cy.log(authorization)
        cy.api({
            method: 'POST',
            url: '/students/transaction',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body:{
                "price": 1000,
                "course_id":"1",
                "total_payment": 100000,
                "admin_fees": 1000
            }

        }).then((response) => {
            const statusCode = response.status
            Cypress.env('status', statusCode)
            const duration = response.duration
            Cypress.env('time', duration)
            Then ("user should be redirected to payment gateway", () =>{
                expect(response.body.transaction.item_details[0].id).to.eq('1') //COURSE JADI COURSE ID
            })
        });
    })


//TC052 Students can't take course with empty course ID
    And("user request course by empty id", () => {
        const token = Cypress.env('token');
        const authorization = `Bearer ${token}`;
        cy.log(authorization)
        cy.api({
            method: 'GET',
            url: '/students/transaction',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body:{
                "price": 1000,
                "course_id": "" ,
                "total_payment": 100000,
                "admin_fees": 1000
            },
            failOnStatusCode: false,
        }).then((response) => {
            const statusCode = response.status
            Cypress.env('status', statusCode)
            const duration = response.duration
            Cypress.env('time', duration)
        });
    })






// Scenario: TC029 Students can change the password using valid data
Given ('user send forgot password request', () =>{
    cy.api("POST", "/forgot-password",
        //GANTI GANTI GANTI GANTI
        {
            "email": "jono@gmail.com"
        }
    ).then((response) => {
        Then ('Server should send otp to email', () =>{
            expect(response.body.message).to.eq("OTP sent successfully")
        });
        const duration = response.duration
        const statusCode = response.status
        Cypress.env('time', duration)
        Cypress.env('status', statusCode)
    })
});

// TC030 Students can't change the password with wrong email
Given('user send forgot password request with invalid email', () => {
    cy.api({
        method: 'POST',
        url: '/forgot-password',
        body: {
            "email": "dimastesting"
        },
        failOnStatusCode: false,
    }).then((response) => {
        const duration = response.duration;
        const statusCode = response.status;
        Cypress.env('time', duration);
        Cypress.env('status', statusCode);
    });
});

// TC090 GET LEARNING MODULE
And ('user wants to get all learning module', () =>{
    const token = Cypress.env('token');
    const authorization = `Bearer ${token}`;

    cy.api({
        method: 'GET',
        url: '/students/courses/module',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server should return all learning module available", () =>{
            expect(response.body.data).not.null
        })
    });
});

// TC093 GET all videos
And ('user wants to get all learning videos', () =>{
    const token = Cypress.env('token');
    const authorization = `Bearer ${token}`;

    cy.api({
        method: 'GET',
        url: '/students/courses/video-attachments',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server should return all learning video available", () =>{
            expect(response.body.data).not.null
        })
    });
});

//TC094 GET VIDEOS BY ID
And ('user wants to get learning videos by id', () =>{
    const token = Cypress.env('token');
    const authorization = `Bearer ${token}`;

    cy.api({
        method: 'GET',
        url: '/students/courses/video-attachments/92',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server should return specific video information", () =>{
            expect(response.body.attachment_name).to.eq("Matematika 1")
        })
    });
});

// TC095 GET all QUIZ
And ('user wants to get all quiz', () =>{
    const token = Cypress.env('token');
    const authorization = `Bearer ${token}`;

    cy.api({
        method: 'GET',
        url: '/students/courses/quiz-attachments',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server should return all quiz available", () =>{
            expect(response.body.data).not.null
        })
    });
});

//TC 096 GET QUIZ BY ID
And ('user wants to get quiz by id', () =>{
    const token = Cypress.env('token');
    const authorization = `Bearer ${token}`;

    cy.api({
        method: 'GET',
        url: '/students/courses/quiz-attachments/109',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server should return specific quiz information", () =>{
            expect(response.body.attachment_name).to.eq("Quiz 7")
        })
    });
});

//GET AUTH INFO
// Given ("user already logged in", () =>{
//     const token = Cypress.env('token');
//     const authorization = `Bearer ${token}`;
//     cy.api({
//         method: 'GET',
//         url: '/auth/info',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': authorization
//         },
//
//     }).then((response) => {
//         Then ("user should be able to see their information", () =>{
//             expect(response.status).to.eq(200)
//             const statusCode = response.status
//             Cypress.env('status', statusCode)
//             const duration = response.duration
//             Cypress.env('time', duration)
//             expect(response.body.data.Email).to.eq(Cypress.env('email'))
//         })
//     })
// });
//

//
//

