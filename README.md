# emailVerificationBot

## Description

This project is a Discord bot that verifies user email addresses based on predefined email lists. It assigns roles to users based on their email addresses, allowing them access to specific channels or features within the Discord server.

The bot listens for messages starting with the command !!verifyEmail and extracts the user email address from the message arguments. It then checks if the email address is on the predefined email lists and assigns the appropriate role to the user.

The project consists of the following files:

`indexAssign.js`: The main file that creates and runs the Discord bot. It listens for incoming messages and triggers the email verification process.

`emailListLoader.js`: A helper file that loads the email lists from CSV files. It parses the CSV data and populates an array of email lists.

`helpers.js`: A helper file that contains functions for checking if an email is in the list and assigning roles to users. It utilizes the emailListLoader.js file to retrieve the email lists.

Additionally, there are two CSV files:

`lifeTimeMemberList.csv`: Contains a list of email addresses for lifetime members.

`chivetteList.csv`: Contains a list of email addresses for chivettes.

## Installation and Usage

1. Clone the repository and navigate to the project directory.

2. Install the required packages by running the command npm install.

3. Create a .env file in the project root directory and add the following line:

```
   BOT_TOKEN=<your_discord_bot_token>
```
4. Populate the CSV files (`lifeTimeMemberList.csv` and `chivetteList.csv`) with the respective email addresses.

5. Start the bot by running the command node `npm startAssign`.

6. Invite the bot to your Discord server and ensure it has the necessary permissions to read messages and assign roles.

7. Users can now use the command `!!verifyEmail <email_address>` to verify their email address and receive the appropriate role.

## Dependencies

The project uses the following dependencies:

* `discord.js`: A powerful JavaScript library for interacting with the Discord API.

* `dotenv`: A module that loads environment variables from a .env file.

* `fs`: The Node.js file system module for file operations.

* `path`: The Node.js path module for manipulating file paths.

* `csv-parser`: A module for parsing CSV data.
