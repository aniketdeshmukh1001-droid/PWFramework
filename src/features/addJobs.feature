Feature: OrangeHRM Add Job

Background:
    Given user navigates to url
    When user enters "Admin" in the username field
    When user enters "admin123" in the password field
    When user clicks on Login button

@addJob
Scenario Outline: Add a new OrangeHRM job title
    When user opens the Admin section
    When user expands the Job menu
    When user clicks on Job Titles
    When user clicks on Add Job button
    When user enters "<jobTitle>" in the job title field
    When user enters "<jobDescription>" in the job description field
    When user clicks on Save Job button
    Then user sees job creation confirmation

Examples:
    | jobTitle        | jobDescription                        |
    | Automation Eng  | Responsible for automation workflows |
    | HR Specialist   | Manages core HR and talent programs  |
