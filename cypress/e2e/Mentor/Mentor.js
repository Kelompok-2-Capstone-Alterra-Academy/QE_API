Given ("mentor already login", () =>{
    const token = Cypress.env('tokenMentor');
    cy.log("Token" + token)
});

And ('with reasonable time', () =>{
    const time = Cypress.env('time')
    cy.wrap(time).should('be.lessThan', 1500)
});
And ('return success status', () =>{
    const codeStatus = Cypress.env('status')
    cy.wrap(codeStatus).should('be.oneOf', [200, 201])
});

//
//
// REGISTER MENTOR
Given ("admin input mentor data", () =>{
    //GANTI GANTI GANTI
    const email = Cypress.env('regisEmail')
    const pass = Cypress.env('regisPassword')
    cy.log("Email is "+email)
    cy.log("Password is "+pass)
    Then ("server should return mentor data", () =>{

        cy.api("POST", "/registrasi-mentor",
            //GANTI GANTI GANTI GANTI
            {
                "email":`${email}`,
                "password":`${pass}`,
                "phone_number": "08281218446131",
                "user_type": "mentors",

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

//
//
//LOGIN LOGIN LOGIN
Given ("Mentor input email and password", () =>{
    const email = Cypress.env('mentorEmail') //GANTI KE ENV MENTOR
    const pass = Cypress.env('mentorPassword') //GANTI KE ENV MENTOR
    cy.log("Email is "+email)
    cy.log("Password is "+pass)

    Then ("server should return bearer token", () =>{

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
            Cypress.env('tokenMentor', token) //GANTI KE ENV MENTOR

        })
    })
});

//
//
//
//SEE ALL COURSE
And ('mentor want to see every course made', () =>{
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;
    cy.api({
        method: 'GET',
        url: '/mentors/courses',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server should return every course", () =>{
            expect(response.body.data).not.null //GANTI JADI not empty
        })

    });

});


//
//
//CREATE COURSE

And ('mentor wants to add course', () =>{
    const course = Cypress.env('courseName')
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;
    cy.api({
        method: 'POST',
        url: '/mentors/courses',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        },
        body:{
            "course_name" : course,
            "live_session_week" : "senin selasa kami 12.00-15.00",
            "thumbnail":"apple"
        }

    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        const id  = response.body.data.ID
        Cypress.env('courseID', id)
        cy.log(id)
        cy.log(Cypress.env('courseID'))
        Then ("server should return course info", () =>{
            expect(response.body.data.course_name).to.eq(course) //GANTI JADI COURSE NAME
        })

    });

});


// SEE COURSE BY ID
And ('mentor wants to see specific course', () =>{
    const id  = Cypress.env('courseID')
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;

    cy.api({
        method: 'GET',
        url: '/mentors/courses/'+id, //GANTI ID SAMA YANG MAU DIGANTI
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server will return only the course specified", () =>{
            expect(response.body.data.coursesCount[0].ID).to.eq(id) //GANTI JADI not empty
        })

    });

});


// DELETE COURSE BY ID
And ('mentor want to delete course', () =>{
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;
    const id = Cypress.env('courseID')
    cy.api({
        method: 'DELETE',
        url: '/mentors/courses/'+id, //GANTI ID SAMA YANG MAU DIGANTI
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server will return the course is deleted", () =>{
            expect(response.body.message).to.eq("Success Delete Course`") //GANTI JADI not empty
        })
    });
});



//