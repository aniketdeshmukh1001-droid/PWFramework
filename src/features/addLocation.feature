Feature: OrangeHRM Add Location

Background:
    Given user navigates to url
    When user enters "Admin" in the username field
    And user enters "admin123" in the password field
    And user clicks on Login button

@addLocation
Scenario: Successfully add a new location
    When user navigates to Locations page
    And user opens Add Location form
    And user creates a new location with city "Pune", state "MH", country "India", zipCode "411001", phone "9876543210"
    And user clicks on Save Location button
    Then user should see location saved successfully
    And newly created location appears in the Locations list

@addLocation
Scenario Outline: Add multiple locations
    When user navigates to Locations page
    And user opens Add Location form
    And user creates a new location with city "<city>", state "<state>", country "<country>", zipCode "<zipCode>", phone "<phone>"
    And user clicks on Save Location button
    Then user should see location saved successfully

Examples:
    | city   | state | country | zipCode | phone      |
    | Pune   | MH    | India   | 411001  | 9876543210 |
    | Mumbai | MH    | India   | 400001  | 9876543211 |

@addLocation
Scenario: Mandatory field validation
    When user navigates to Locations page
    And user opens Add Location form
    And user clicks on Save Location button
    Then application shows required field validation
