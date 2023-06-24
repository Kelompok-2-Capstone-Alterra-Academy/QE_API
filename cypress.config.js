const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    token: "",
    postID: "",
    time: "",
    status: "",
    msg: "",
    email: "jono@gmail.com",
    pass: "newpassword",
    regisEmail:"autotest1@mail.com",
    regisPassword:"12345678",
    mentorEmail:"dimastesting223@gmail.com",
    mentorPassword:"12345678",
    tokenMentor:"",
    courseID:"",
    courseName:"testingan 123"
  },
  mentor:{

  },
  students:{

  },
  projectId: '',
  e2e: {
    baseUrl: 'http://34.128.101.27:8080',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber())
    },
    specPattern: "cypress/e2e/*.feature"
  },
});
