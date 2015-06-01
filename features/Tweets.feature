Feature: Users of the system can tweet cool things
  Every user of the system should be able to tweet
  a message shorter than 140 characters

  Scenario: Tweet a message less than 140 characters
    Given I have signed up
    When I enter my credentials
    And I tweet something less than 140 characters
    Then I should see the message

  Scenario: Tweet a message longer than 140 characters
    Given I have signed up
    When I enter my credentials
    And I tweet something longer than 140 characters
    Then I should not see the message