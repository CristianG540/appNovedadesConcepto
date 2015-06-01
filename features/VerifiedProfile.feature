Feature: Verified user profile
  The system should support verified user profiles

  Scenario: User profile is verified
    Given I have signed up
    And I am verified
    When I enter my credentials
    Then I should see the verification

  Scenario: User profile is not verified
    Given I have signed up
    When I enter my credentials
    Then I should not see the verification