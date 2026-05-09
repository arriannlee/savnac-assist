Feature: login authentication

@LGN-001
  Scenario: successful login
    Given the user is on the login screen
    When the user enters a valid name
    And the user enters the correct prototype password
    Then the system should redirect the user to the dashboard

@LGN-002
  Scenario: incorrect password
    Given the user is on the login screen
    When the user enters a valid name
    And the user enters an incorrect prototype password
    Then the system should return an incorrect password warning

@LGN-003
  Scenario: empty field warning
    Given the user is on the login screen
    When the user enters the correct prototype password
    And the user fails to input name
    Then the system should return an name request input

