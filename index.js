#! /usr/bin/env node
// Making a simple Countdown Timer.
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
// Displaying a title message
console.log(chalk.blue("============================================"));
console.log("\t", chalk.bold.bgBlue.white(" Seconds Countdown Timer "));
console.log(chalk.blue("============================================"));
// Prompting the user for countdown seconds
const response = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "How many seconds do you want to countdown?",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter a valid number";
        }
        else if (input > 60) {
            return "Please enter a number less than 60";
        }
        else if (input < 0) {
            return "Please enter a number greater than 0";
        }
        else {
            return true;
        }
    },
});
console.log(chalk.blue("----------------------------------------------"));
let input = response.userInput;
// Function to handle the countdown timer
function countdown(response) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + response);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDifference = differenceInSeconds(intervalTime, currentTime);
        // If the time difference is 0 or less, the countdown is complete
        if (timeDifference <= 0) {
            console.log("\t\t", chalk.red.bgWhite.bold("Time's up!"));
            console.log("\t", chalk.blue("-----------------------------"));
            process.exit();
        }
        // Calculation minutes and seconds left
        const mins = Math.floor((timeDifference % (3600 * 24)) / 3600);
        const secs = Math.floor(timeDifference % 60);
        // Output the remaining time
        console.log("\t", chalk.green.bgBlack.bold(`${mins} minutes and ${secs} seconds left`));
        console.log("\t", chalk.blue("-----------------------------"));
    }, 1000);
}
// Calling the countdown function with the user's input
countdown(input);
