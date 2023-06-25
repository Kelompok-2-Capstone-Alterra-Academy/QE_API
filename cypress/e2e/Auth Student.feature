Feature: STUDENT
#done
  Scenario: TC001 Students can register with valid data
    Given user try to register
    Then server should return register data
    And with reasonable time
    And return created status
#done
  Scenario: TC003 Students can't register with empty email
    Given user try to register using empty email
    Then server should return status code 500
    And with reasonable time
#DONE
  Scenario: TC021 Students can login with valid data
    Given after user register and verify
    Then user should be able to login
    And with reasonable time
    And return success status

    #DONE
  Scenario: TC022 Students can't login with empty email
    Given after user register with empty email
    Then user shouldnt be able to login
    And with reasonable time

#done
  Scenario: TC051 Students can take course
    Given user already logged in
    And user wants to buy course
    Then user should be redirected to payment gateway
    And with reasonable time
    And return success status
#done
  Scenario: TC052 Students can't take course with empty course ID
    Given user already logged in
    And user wants to buy course
    Then user shouldn't be redirected to payment gateway
    And with reasonable time
    And return success status

  Scenario: TC029 Students can change the password with valid data
    Given user send forgot password request
    Then Server should send otp to email
    And with reasonable time
    And return success status

  Scenario: TC030 Students can't change the password with wrong email
    Given user send forgot password request
    Then server should return error
    And with reasonable time

  Scenario: TC088 Get course by student ID
    Given user already logged in
    And user wants to get course by student ID
    Then user should be redirected to student course
    And with reasonable time
    And return success status

  Scenario: TC089 Get in progress and done
    Given user already logged in
    And user wants to see progress
    Then user should be redirected progress
    And with reasonable time
    And return success status

  Scenario: TC090 Get module
    Given user already logged in
    And user wants to get learning module
    Then user should be redirected choosen learning module
    And with reasonable time
    And return success status
    
  Scenario: TC091 Get all materials
    Given user already logged in
    And user wants to get all learning material
    Then user should be redirected to learning material
    And with reasonable time
    And return success status
    
  Scenario: TC092 Get materials by ID
    Given user already logged in
    And user wants to get material by ID
    Then user should be redirected learning material by ID
    And with reasonable time
    And return success status
    
  Scenario: TC093 Get all videos
    Given user already logged in
    And user wants to get all learning videos
    Then user should be redirected to learning videos
    And with reasonable time
    And return success status
    
  Scenario: TC094 Get videos by ID
    Given user already logged in
    And user wants to buy get videos by ID
    Then user should be redirected kearning videos by ID
    And with reasonable time
    And return success status
    
  Scenario: TC095 Get all quiz
    Given user already logged in
    And user wants to get all quiz
    Then user should be redirected to quiz
    And with reasonable time
    And return success status
    
  Scenario: TC096 Get quiz by ID
    Given user already logged in
    And user wants to buy get quiz by ID
    Then user should be redirected to quiz by ID
    And with reasonable time
    And return success status