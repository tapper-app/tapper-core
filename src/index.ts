#!/usr/bin/env node

// Libraries Used in Cli
import figlet from 'figlet';
import { program } from 'commander';
import { TapperInfo } from "./utils/tapper.info";
import {TapperCommandsManager} from "./utils/tapper.commands.manager";
import { TapperCommandsExecutionManager } from "./tapper.commands.execution.manager";

// Start Tapper Initialization in Terminal
console.log("==========================================================")
console.log("===== Welcome To Tapper CLI")
console.log("==========================================================")
console.log(figlet.textSync("Tapper CLI"));
console.log("==========================================================")
console.log("Welcome To Android Testing CLI Platform")
console.log("CLI Version : " + TapperInfo.CLI_VERSION)
console.log("CLI Supported Platforms : " + TapperInfo.CLI_SUPPORTED_PLATFORMS)
console.log("CLI Homepage : " + TapperInfo.CLI_HOMEPAGE)
console.log("CLI Source Code : " + TapperInfo.CLI_SOURCE_CODE)
console.log("==========================================================")
console.log("Tapper CLI is the Source Code of Tapper UI Application Available on Windows, Macos, Linux")
console.log("Tapper Can Interact With Android Devices to Execute Several Functions")
console.log("You can Use it Directly from Terminal or GUI Applications")
console.log("")

// Initialize Commander To Show Commands
program
    .name('Tapper')
    .description('Cli To Interact With ADB Android Devices For Developers')
    .version(TapperInfo.CLI_VERSION);

// Add Available Project Commands On CLI Options and Arguments
const cliOptions = TapperCommandsManager.getApplicationArgsOptions();
for (let optionIndex = 0; optionIndex < cliOptions.length; optionIndex++) {
    const option = cliOptions[optionIndex];
    if (option) {
        const commandInstance = program.command(option.command).description(option.description)
        if (option.args != undefined) {
            for (let optionArgument = 0; optionArgument < option.args.length; optionArgument++) {
                const argumentToShow = option.args[optionArgument];
                if (argumentToShow) {
                    commandInstance.argument(argumentToShow.name, argumentToShow.description)
                }
            }
        }

        commandInstance.action((str, options) => {
            console.log("Action: " + option.command + " : Options: " + options);
        })
    }
}


// Print Attributes
const options = program.opts();
console.log("CLI Started With the Following Commands : " + options);

program.parse(process.argv);
