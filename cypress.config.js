const cucumber = require('cypress-cucumber-preprocessor').default
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  env:{

    postID: "",
    time: "",
    status: "",
    //token student (AUTOMATIS TERISI/JANGAN DIISI)
    token: "",
    //email login student (WAJIB DIISI)
    emailStudent:"studenttesting@mail.com",
    //email untuk register student (WAJIB DIISI)
    regisEmailStudent: "dimasalta@gmail.com",
    //password student (WAJIB DIISI)
    pass: "12345678",
    //register mentor (WAJIB DIISI)
    regisEmailMentor:"autotest1@mail.com",
    regisPassword:"12345678",
    //login mentor (WAJIB DIISI)
    mentorEmail:"dimastesting223@gmail.com",
    mentorPassword:"12345678",
    //token mentor (AUTOMATIS TERISI/JANGAN DIISI)
    tokenMentor:"",
    //course id setelah create (AUTOMATIOS TERISI/JANGAN DIISI)
    courseID:"",
    //course name untuk create
    courseName:"testingan 123"
  },
  mentor:{

  },
  students:{

  },
  projectId: '',
  e2e: {
    baseUrl: 'http://3.26.234.145:8081',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber())
    },
    specPattern: "cypress/e2e/*.feature"
  },
});
