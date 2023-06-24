Given ("mentor already logged in", () =>{
    const token = Cypress.mentor('tokenMentor');
    const authorization = `Bearer ${token}`;
});

And ('with reasonable time', () =>{
    const time = Cypress.env('time')
    cy.wrap(time).should('be.lessThan', 1500)
});
And ('return success status', () =>{
    const codeStatus = Cypress.env('status')
    cy.wrap(codeStatus).should('deep.equal', 200)
});


// REGISTER MENTOR
Given ("admin input mentor data", () =>{
    //GANTI GANTI GANTI
    const pass = Cypress.mentor('regisEmail')
    const email = Cypress.mentor('regisPassword')
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


//LOGIN LOGIN LOGIN
Given ("Mentor input email and password", () =>{
    const email = Cypress.mentor('mentorEmail') //GANTI KE ENV MENTOR
    const pass = Cypress.mentor('mentorPassword') //GANTI KE ENV MENTOR
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
            Cypress.mentor('token', tokenMentor) //GANTI KE ENV MENTOR

        })
    })
});



//SEE ALL COURSE
And ('mentor want to see every course made', () =>{
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
            expect(response.body.data).to.eq() //GANTI JADI not empty
        })

    });

});




//CreateCourses
cy.log(authorization)
And ('mentor wants to add course', () =>{
    cy.api({
        method: 'POST',
        url: '/mentors/courses',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        },
        body:{
            "course_name" : "ips 3" ,
            "live_session_week" : "senin selasa kami 12.00-15.00",
            "thumbnail":"https://github.com/Kelompok-2-Capstone-Alterra-Academy/golang-repo/tree/staging"
        }

    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        const id  = response.body.data.id
        Cypress.mentor('courseID', id)
        Then ("server should return course info", () =>{
            expect(response.body.data.course_name).to.eq() //GANTI JADI COURSE NAME
        })

    });

});




// SEE COURSE BY ID
And ('mentor wants to see specific course', () =>{

    cy.api({
        method: 'DEL',
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
        Then ("server should return every course", () =>{
            expect(response.body.message).to.eq("Success Delete Course`") //GANTI JADI not empty
        })

    });

});


// DELETE COURSE BY ID
And ('mentor want to delete course', () =>{
    const id = Cypress.mentor('courseID')
    cy.api({
        method: 'DEL',
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
        Then ("server should return every course", () =>{
            expect(response.body.message).to.eq("Success Delete Course`") //GANTI JADI not empty
        })

    });

});



//