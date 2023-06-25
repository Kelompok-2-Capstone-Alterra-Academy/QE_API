Given ("mentor already login", () =>{
    const token = Cypress.env('tokenMentor');
    cy.log("Token =" + token)
});

And ('with reasonable time', () =>{
    const time = Cypress.env('time')
    cy.wrap(time).should('be.lessThan', 5000)
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
    const email = Cypress.env('regisEmailMentor')
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
//TC056 Post Mentor Login without Email
Given ("Mentor didn't input email but input password", () =>{
    const email = Cypress.env('mentorEmail') //GANTI KE ENV MENTOR
    const pass = Cypress.env('mentorPassword') //GANTI KE ENV MENTOR
    cy.log("Email is >blank<")
    cy.log("Password is "+pass)

    Then("server shouldnt return bearer token", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                "email": "",
                "password": pass,
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eq(401);
            const duration = response.duration;
            Cypress.env('time', duration);
        });
    });
});

//TC057 Post Mentor Login without password
Given ("Mentor input email but didn't input password", () =>{
    const email = Cypress.env('mentorEmail') //GANTI KE ENV MENTOR
    cy.log("Email is " +email)
    cy.log("Password is >blank<")

    Then("server should return error", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                "email":email,
                "password": ""
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).eq(401);
            const duration = response.duration;
            Cypress.env('time', duration);
        });
    });
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


//TC086 Get All Modules
And ('mentor want to get all modules', () =>{
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;
    cy.api({
        method: 'GET',
        url: '/mentors/module',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server will return all modules", () =>{
            expect(response.body.data).not.null //GANTI JADI not empty
        })

    });

});

//TC083 Create Module
And ('mentor want to create module', () =>{
    const course = Cypress.env('courseName')
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;
    cy.api({
        method: 'POST',
        url: '/mentors/module',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        },
        body:{
            "module_name" : "testing" ,
            "section_id" : 1,
            "description" : "ini adalah desciption"
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
        Then ("server will return module info", () =>{
            expect(response.body.data.module_name).to.eq("testing")
            const modules_id = response.body.data.ID
            Cypress.env('modules_id', modules_id)

        })
    });
});

// TC082 Get Modules by ID
And ('mentor want to get modules by ID', () =>{
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;
    const id = Cypress.env('modules_id')
    cy.api({
        method: 'GET',
        url: '/mentors/module/'+id, //GANTI ID SAMA YANG MAU DIGANTI
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server will return the module", () =>{
            expect(response.body.data.ID).to.eq(id) //GANTI JADI not empty
        })
    });
});


//TC085 DELETE MODULE
And ('mentor want to delete modules by ID', () =>{
    const token = Cypress.env('tokenMentor');
    const authorization = `Bearer ${token}`;
    const id = Cypress.env('courseID')
    cy.api({
        method: 'DELETE',
        url: '/mentors/module/'+id, //GANTI ID SAMA YANG MAU DIGANTI
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((response) => {
        const statusCode = response.status
        Cypress.env('status', statusCode)
        const duration = response.duration
        Cypress.env('time', duration)
        Then ("server will return message successfully delete module", () =>{
            expect(response.body.message).to.eq("Success Delete module`") //GANTI JADI not empty
        })
    });
});