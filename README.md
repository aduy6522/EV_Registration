# DISC Personality Test Automation

## Overview

This repository contains an automated test case built with Cypress, a powerful testing framework for web applications. The test case verifies the functionality of the DISC personality test on a web application.

## Test Case Description

The test case performs the following actions:

- Visits the DISC test page of the web application.
- Fills out the test form with randomly generated data.
- Submits the form and verifies the successful completion of the test.
- Signs out from the application.

## Purpose

The purpose of this automation test case is to ensure the reliability and accuracy of the DISC personality test feature on the web application. By automating the testing process, we can efficiently detect any issues or regressions introduced during development or updates to the application.

## Getting Started

### Prerequisites

To run this test case, you need:

- Node.js installed on your machine.
- Cypress installed globally or as a dev dependency.

### Installation

1. Clone this repository to your local machine:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd DISC-automation-test
   ```

3. Install dependencies:

   ```
   npm install
   ```

### Running the Test

To run the test case, use the following command:

```
npm run test
```

This command will open Cypress Test Runner, where you can select the test case (`disc.spec.js`) and run it.

## Contributing

Contributions are welcome! If you find any issues or want to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

Replace `<repository-url>` with the actual URL of your repository. Feel free to further customize the content according to your project's specifics.
