Feature: STUDENT

  Scenario: TC001 Students can register with valid data
    Given user try to register
    Then server should return register data
    And with reasonable time
    And return created status

  Scenario: TC003 Students can't register with empty email
    Given user try to register
    Then server shouldn't return register data
    And with reasonable time
    And return created status

  Scenario: TC021 Students can login with valid data
    Given after user register and verify
    Then user should be able to login
    And with reasonable time
    And return success status

  Scenario: TC022 Students can't login with empty email
    Given after user register and verify
    Then user shouldn't be able to login
    And with reasonable time
    And return success status

  Scenario: TC051 Students can take course
    Given user already logged in
    And user wants to buy course
    Then user should be redirected to payment gateway
    And with reasonable time
    And return success status

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
    Then Server shouldn't send otp to email
    And with reasonable time
    And return success status