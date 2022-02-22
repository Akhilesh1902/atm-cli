// ask for account
//  if account does not exist ask to create account
// ask what the want to do
// execute command
// 1.view  2.withdraw 3.deposit

// account object
const Account = require("./Account");
const CommandLine = require("./CommandLine");

async function main() {
  try {
    const accountName = await CommandLine.ask(
      "which account you want to access ?"
    );
    const account = await Account.find(accountName);
    if (account == null) account = await promtCreateAccount(accountName);
    if (account != null) await promptTask(account);
  } catch (e) {
    CommandLine.print("error please try again");
  }
}

async function promtCreateAccount(accountName) {
  const response = await CommandLine.ask(
    "That account does not exist do you like to create it? (y/n)"
  );
  if (response === "y") {
    return await Account.create(accountName);
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    "What would you like to do? (view / deposit / withdraw)"
  );
  if (response == "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much ?"));
    await account.deposit(amount);
  }
  if (response == "withdraw") {
    const amount = parseFloat(await CommandLine.ask("How much ?"));
    try {
      await account.withdraw(amount);
    } catch (e) {
      CommandLine.print(`Insufficient balance`);
    }
  }
  CommandLine.print(`your balance is : ${account.balance}`);
}

main();
