Feature: OrangeHRM Login

Background:
    Given user navigates to url

@smoke
Scenario: Valid login
    When user enters "Admin" in the username field 
    When user enters "admin123" in the password field
    When user clicks on Login button
    Then user should land on the Dashboard page

@regression
Scenario Outline: Invalid login
    When user enters "<username>" in the username field
    When user enters "<password>" in the password field
    When user clicks on Login button
    Then application shows appropriate error message

Examples:
|username|password|
|ADMIN33|admin123|
|Admin|admin12|
