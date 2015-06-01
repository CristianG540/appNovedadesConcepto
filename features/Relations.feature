Feature: Relations
  Users of the system should be able to interact forming
  different relations between one and other

  Scenario: User follows another user
    Given I have signed up
    And Another user has signed up
    When I enter my credentials
    And I follow a user
    Then I should see the user in my following list

  Scenario: User is being followed by another user
    Given I have signed up
    And Another user has signed up
    When Another user signs in
    And Another user follows me
    And Another user signs out
    And I enter my credentials
    Then I should see the user in my followers list

  Scenario: User unfollows another user
    Given I have signed up
    And Another user has signed up
    And I follow the other user
    When I enter my credentials
    And I unfollow a user
    Then I should not see the user in my following list
