const fs = require('fs'); // Import the fs module for file system operations
const path = require('path'); // Import the path module for manipulating file paths
const csv = require('csv-parser'); // Import the csv-parser module for parsing CSV data

// Load email lists from CSV files
async function loadEmailLists() {
  const emailLists = [
    {
      name: 'Lifetime Member', // Name of the email list
      path: 'lifeTimeMemberList.csv', // Path to the CSV file
      role: 'Lifetime Member', // Role associated with this email list
      emails: [], // Array to store the email addresses
    },
    {
      name: 'Chivette', // Name of the email list
      path: 'chivetteList.csv', // Path to the CSV file
      role: 'Chivette', // Role associated with this email list
      emails: [], // Array to store the email addresses
    },
  ];

  for (const list of emailLists) {
    const filePath = path.resolve(__dirname, list.path); // Resolve the file path relative to the current module
    console.log(`Loading ${list.name} email list`);
    const stream = fs.createReadStream(filePath, 'utf-8').pipe(csv()); // Create a read stream for the CSV file and pipe it to the csv-parser
    for await (const row of stream) {
      list.emails.push(row.email); // Push each email address from the CSV row to the emails array
    }
    console.log(`Loaded ${list.emails.length} email addresses for ${list.name}`);
  }
  return emailLists; // Return the array of email lists
}

module.exports = { loadEmailLists }; // Export the loadEmailLists function
