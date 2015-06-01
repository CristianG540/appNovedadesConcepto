Feature: Delete user profile
  Every user of the system should be able to delete
  their profile

  Scenario: Delete user profile
    Given I have signed up
    When I enter my credentials
    And I delete my profile
    And I enter my credentials
    Then I should not be authenticated