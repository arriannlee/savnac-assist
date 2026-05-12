Feature: AI recommendation system

@AI-001
  Scenario: accept a challenge description
    Given AI input form is visible
    When user inputs a challenge description
    And the user clicKs "show recommendations"
    Then the system displays options to aid challenges

@AI-002
  Scenario: validate accessibility-related input
    Given the AI input form is visible
    When the user enters a non-accessibility-related challenge description
    And the user clicks "show recommendations"
    Then the system should display an input guidance message
    And request an accessibility-related challenge description

@AI-003
  Scenario: empty field input
    Given the Savnac Assist modal is open
    When the user attempts to submit without entering an accessibility challenge
    Then the system should display an error message

@AI-004
  Scenario: display service unavailable message
    Given the AI input form is visible
    When the user enters a valid accessibility challenge
    And the user clicks "show recommendation"
    And the AI service is unavailable
    Then the system should display an error message

@AI-005
  Scenario: preview recommendations
    Given the system displays options to aid challenges
    When the user clicks "preview"
    Then the system displays recommended settings

@AI-006
  Scenario: apply recommendations
    Given the system displays options to aid challenges
    When the user clicks "apply recommendations"
    Then the system applies recommended settings
    And the Savnac Assist modal closes

@AI-007
  Scenario: dismiss preview recommendations
    Given the system displays recommended settings
    When the user closes Savnac Assist modal
    Then the previous settings are restored


