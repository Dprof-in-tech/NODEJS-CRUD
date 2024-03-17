const fs = require('fs');
const path = require('path');

// Read package.json to get project information
const packageJson = require('./package.json');

// Read other configuration files as needed

// Generate README content
const readmeContent = `
# ${packageJson.name}

${packageJson.description}

## Installation

${'npm install'}

## Usage

${'npm run server'}

## API Documentation

${'localhost:3001/api-docs'}

## Testing

${'npx jest'}
`;

// Write README content to README.md file
fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent);
