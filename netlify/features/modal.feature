Feature: Savnac Assist modal

@MOD-001
  Scenario: open Savnac Assist modal on login
    Given the user has provided login credentials
    When the user clicks login
    Then the dashboard should be displayed
    And the Savnac Assist modal should open

@MOD-002
  Scenario: open Savnac Assist modal manually
    Given the user is on the dashboard
    When the user clicks "Savnac Assist" tab
    Then the system should display the Savnac Assist modal

@MOD-003
  Scenario: close Savnac Assist modal using close button
    Given the Savnac Assist modal is open
    When the user clicks the close button
    Then the Savnac Assist modal should close

@MOD-004
  Scenario: close Savnac Assist modal pressing escape key
    Given the Savnac Assist modal is open
    When the user presses the escape key
    Then the Savnac Assist modal should close

@MOD-005
  Scenario: access manual controls
    Given the Savnac Assist modal is open
    When the user clicks "Click here"
    Then the system should display manual controls

