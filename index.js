// TODO: Include packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');
const { type } = require('os');

// TODO: Create an array of questions for user input
const questions = [

    {
        type: "input",
        message: "What is the title of this project?",
        name: "title"
    },
    {
        type: "input",
        message: "Please provide a short description explaining the what, why, and how of your project.",
        name: "description"
    },
    {
        type: "list",
        message: "Are there installation instructions:",
        name: "installation",
        choices: ["Yes", "No"]
    },
    {
        type: "input",
        message: "Please provide instructions and examples for use.",
        name: "usage"
    },
    {
        type: "list",
        message: "Would you like to contribute?",
        name: "contribute",
        choices: ["Yes", "No"]
    },
    {
        type: "input",
        message: "Provide test instructions.",
        name: "test"
    },
    {
        type: "list",
        message: "Pick a license:",
        name: "licence",
        choices: ["MIT", "Apache ", "GNU General Public ", "Boost Software"]
    },
    {
        type: "input",
        message: "Enter github usename:",
        name: "githubUser"
    },
    {
        type: "input",
        message: "Enter email address:",
        name: "email"
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    // Generate README content based on user input
    const readmeContent = `# ${data.title}
        
## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
        
## Installation
${data.installInstructions}
        
## Usage
${data.usage}
        
## Contributing
${data.contributionInput}

## Tests
${data.test}

## Questions
For additional questions, you can reach me through my [GitHub profile](https://github.com/${data.githubUser}) or via email at ${data.email}.

`;

    // Write README content to a file
    fs.writeFile("README.md", readmeContent.trim(), err => {
        if (err) {
            console.error('Error creating README file', err);
            return;
        }
        console.log('README.md has been generated successfully!');
    });
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions).then(answers => {
        let promises = [];

        // Check if installation instructions are needed
        if (answers.installation === "Yes") {
            promises.push(
                inquirer.prompt({
                    type: "input",
                    message: "Provide installation steps:",
                    name: "installInstructions"
                }).then(installationAnswer => {
                    answers.installInstructions = installationAnswer.installInstructions;
                })
            );
        } else {
            answers.installInstructions = "N/A";
        }

        // Check if user wants to contribute
        if (answers.contribute === "Yes") {
            promises.push(
                inquirer.prompt({
                    type: "input",
                    message: "Provide contribution guidelines:",
                    name: "contributionInput"
                }).then(contributionAnswer => {
                    answers.contributionInput = contributionAnswer.contributionInput;
                })
            );
        } else {
            answers.contributionInput = "N/A";
        }

        // Handle all asynchronous operations
        Promise.all(promises).then(() => {
            writeToFile("README.md", answers);
        });
    });
}

// Function call to initialize app
init();
