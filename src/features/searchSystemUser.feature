Feature: OrangeHRM search system user functionality

Background:
    Given user navigates to url
    When user enters "Admin" in the username field 
    When user enters "admin123" in the password field
    When user clicks on Login button

@regression
Scenario: Search system user by Valid username
    When user opens the Admin page
    When user enters username as "Admin"
    When user clicks on search button
    Then application shows 1 record found    