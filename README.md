DISC Personality Test Automation
Overview
This repository contains an automated test case built with Cypress, a powerful testing framework for web applications. The test case verifies the functionality of the DISC personality test on a web application.

Test Case Description
The test case performs the following actions:

Visits the DISC test page of the web application.
Fills out the test form with randomly generated data.
Submits the form and verifies the successful completion of the test.
Signs out from the application.
Purpose
The purpose of this automation test case is to ensure the reliability and accuracy of the DISC personality test feature on the web application. By automating the testing process, we can efficiently detect any issues or regressions introduced during development or updates to the application.

Getting Started
Prerequisites
To run this test case, you need:

Node.js installed on your machine.
Cypress installed globally or as a dev dependency.
Installation
Clone this repository to your local machine:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd DISC-automation-test
Install dependencies:

bash
Copy code
npm install
Running the Test
To run the test case, use the following command:

bash
Copy code
npm run test
This command will open Cypress Test Runner, where you can select the test case (disc.spec.js) and run it.

Test Data
The test case uses randomly generated data for filling out the DISC test form. The data is stored in the DISCData.json file located in the cypress/fixtures directory.

Contributing
Contributions are welcome! If you find any issues or want to suggest improvements, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Feel free to customize the README according to your specific project requirements and add any additional information that might be helpful for users or contributors.





