const { loadEmailLists } = require('./emailListLoader.js');

let emailLists;

async function getEmailLists() {
  if (!emailLists) {
    emailLists = await loadEmailLists();
  }
  return emailLists;
}

async function checkEmailList(email, emailListName) {
  const lowercaseEmail = email.trim().toLowerCase();
  const emailLists = await getEmailLists();
  const emailList = emailLists.find((list) => list.name === emailListName);
  if (emailList && emailList.emails) {
    const emailsArray = emailList.emails.map((str) => str.trim().toLowerCase());
    if (emailsArray.includes(lowercaseEmail)) {
      return true;
    }
  }
  return false;
}

function getAssignedRolesMessage(namesOfAssignedRoles) {
  if (namesOfAssignedRoles.length > 0) {
    const message = `You have been assigned the following roles: ${namesOfAssignedRoles.join(", ")}`;
    return message;
  } else {
    return "No roles have been assigned.";
  }
}

const RoleAssignmentPage = {
  assignRole: async function(message, userEmail) {
    console.log('Assigning role...');
    let roleNumberOfPasses = 0;
    let namesOfAssignedRoles = [];

    const rolesToCheck = ['Lifetime Member', 'Chivette'];

    for (const roleName of rolesToCheck) {
      console.log(`Checking role ${roleName}...`);
      if (await checkEmailList(userEmail, roleName)) {
        const role = message.guild.roles.cache.find((r) => r.name === roleName);
        if (!role) {
          console.error(`Role ${roleName} not found!`);
          message.reply(`Sorry, the ${roleName} role was not found.`);
          return;
        }
        await message.member.roles.add(role);
        namesOfAssignedRoles.push(roleName);
        console.log(`Role ${roleName} assigned.`);
      }
      roleNumberOfPasses++;
    }

    if (namesOfAssignedRoles.length > 0 && roleNumberOfPasses >= 2) { // Check if all roles have been assigned
      const replyMessage = getAssignedRolesMessage(namesOfAssignedRoles);
      console.log('Assigned roles:', namesOfAssignedRoles);
      message.reply(replyMessage);
      return true;
    } else {
      console.log('No role assigned.');
      return false;
    }
  },
};

module.exports = {
  checkEmailList,
  RoleAssignmentPage
};
