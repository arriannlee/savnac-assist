Feature: device compatibility validation

@DEV-001
Scenario: allow desktop access
  Given the user accesses Savnac Assist on a desktop device
  When the application loads
  Then the login screen should be displayed

@DEV-002
Scenario: restrict mobile device access
  Given the user accesses Savnac Assist on a mobile device
  When the application loads
  Then the system should display a desktop-only access message
