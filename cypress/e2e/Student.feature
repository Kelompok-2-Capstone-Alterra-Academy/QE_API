Feature: STUDENT
#done
#ganti jadi regisEmail
  Scenario: TC001 Students can register with valid data
    Given user try to register
    Then server should return register data
    And with reasonable time
    And return success status
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
    And user request course by empty id
    Then server should return error
    And with reasonable time

    #done
  Scenario: TC029 Students can change the password with valid data
    Given user send forgot password request
    Then Server should send otp to email
    And with reasonable time
    And return success status
#done

  Scenario: TC030 Students can't change the password with wrong email
    Given user send forgot password request with invalid email
    Then server should return error
    And with reasonable time

  #done

  Scenario: TC090 Get Learning module
    Given user already logged in
    And user wants to get all learning module
    Then server should return all learning module available
    And with reasonable time
    And return success status

#done

  Scenario: TC093 Get all videos
    Given user already logged in
    And user wants to get all learning videos
    Then server should return all learning video available
    And with reasonable time
    And return success status

#done


  Scenario: TC094 Get videos by ID
    Given user already logged in
    And user wants to get learning videos by id
    Then server should return specific video information
    And with reasonable time
    And return success status

#done

  Scenario: TC095 Get all quiz
    Given user already logged in
    And user wants to get all quiz
    Then server should return all quiz available
    And with reasonable time
    And return success status

#done


  Scenario: TC096 Get quiz by ID
    Given user already logged in
    And user wants to get quiz by id
    Then server should return specific quiz information
    And with reasonable time
    And return success status
