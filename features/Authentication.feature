Feature: Authentication
  Every user of the system should be able to authenticate in order
  to properly use the other features

  Scenario: User signs up
    When I sign up
    And I enter my credentials
    Then I am authenticated

  Scenario: User signs out
    Given I have signed up
    When I enter my credentials
    And I sign out
    Then I should not be authenticated