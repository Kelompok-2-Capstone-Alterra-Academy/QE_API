Feature: Mentor

  Scenario:TC086 Register new mentor
    Given admin input mentor data
    Then server should return mentor data
    And with reasonable time
    And return success status

  Scenario: TC055 Post Mentor Login
    Given Mentor input email and password
    Then server should return bearer token
    And with reasonable time
    And return success status

  Scenario: TC056 Post Mentor Login without Email
    Given Mentor didn't input email but input password
    Then server shouldn't return bearer token
    And with reasonable time
    And return success status

  Scenario: TC057 Post Mentor Login without Password
    Given Mentor input email but didn't input password
    Then server shouldn't return bearer token
    And with reasonable time
    And return success status

  Scenario: TC067 See all course
    Given mentor already login
    And mentor want to see every course made
    Then server should return every course
    And with reasonable time
    And return success status

  Scenario: TC066 CreateCourse
    Given mentor already login
    And mentor wants to add course
    Then server should return course info
    And with reasonable time
    And return success status

  Scenario: TC073 See course by ID
    Given mentor already login
    And mentor wants to see specific course
    Then server will return only the course specified
    And with reasonable time
    And return success status

  Scenario: TC080 Delete Course
    Given mentor already login
    And mentor want to delete course
    Then server will return the course is deleted
    And with reasonable time
    And return success status




