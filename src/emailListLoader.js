const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Load email lists from CSV files
async function loadEmailLists() {
  const emailLists = [
    {
      name: 'lifeTimeMemberList',
      path: 'lifeTimeMemberList.csv',
      role: 'Lifetime Member',
      emails: [],
    },
    {
      name: 'benIsBen',
      path: 'benIsBen.csv',
      role: 'isBen',
      emails: [],
    },
    {
      name: 'sarahIsSarah',
      path: 'sarahIsSarah.csv',
      role: 'isSarah',
      emails: [],
    },
  ];

  for (const list of emailLists) {
    const filePath = path.resolve(__dirname, list.path);
    console.log(`Loading ${list.name} email list`);
    const stream = fs.createReadStream(filePath, 'utf-8').pipe(csv());
    for await (const row of stream) {
      list.emails.push(row.email);
    }
    console.log(`Loaded ${list.emails.length} email addresses for ${list.name}`);
  }
  return emailLists;
}

module.exports = { loadEmailLists };
