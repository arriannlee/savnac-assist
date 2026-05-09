Feature: accessibility preference managemetn

@PRF-001
  Scenario: change font scaling
    Given the manual controls are displayed
    When the user adjusts font scaling
    Then the dashboard and Savnac Assist modal text size should update immediately

@PRF-002
  Scenario: enable high contrast
    Given the manual controls are displayed
    When the user clicks high contrast toggle
    Then the dashboard and Savnac Assist modal contrast should update immediately

@PRF-003
  Scenario: enable dyslexic friendly font
    Given the manual controls are displayed
    When the user clicks dyslexic freindly font toggle
    Then the dashboard and Savnac Assist modal font should update immediately

@PRF-004
  Scenario: change theme preferences
    Given the manual controls are displayed
    When the user clicks dark theme toggle
    Then the dashboard and Savnac Assist modal theme should update immediately

@PRF-005
  Scenario: change language preference
    Given the manual controls are displayed
    When the user clicks language dropdown
    And selects different language
    Then the dashboard and Savnac Assist modal text should update immediately

@PRF-006
  Scenario: save manual preferences
    Given the manual controls are displayed
    When the user applies their selected preferences
    Then the preferences should be saved
    And the Savnac Assist modal should close

@PRF-007
  Scenario: load saved accessibility preferences on login
    Given the user has previously saved accessibility preferences
    When the user logs in successfully
    Then the saved accessibility preferences should be applied to the dashboard
    And the Savnac Assist modal should reflect the saved preferences

@PRF-008
  Scenario: dismiss unsaved manual preference changes
    Given the user has adjusted accessibility preferences in manual controls
    When the user closes the Savnac Assist modal without applying changes
    Then the temporary accessibility changes should be reverted
    And the previous saved preferences should be restored
