Feature: User profile update
  Every user of the system should be able to update their
  profile with personal information

  Scenario: User updates profile info
    Given I have signed up
    When I enter my credentials
    And I update my profile
    Then I should see the updated information

  Scenario: User updates profile password
    Given I have signed up
    When I enter my credentials
    And I update my password
    And I sign out
    And I enter my new credentials
    Then I am authenticated