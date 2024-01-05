import {CommandQuestionEntity} from "../models/command.question.entity.js";
import {AndroidGeneralSettingsKey} from "../models/android.general.settings.key.js";
import {TapperCommandsManager} from "../utils/tapper.commands.manager.js";
import {TapperCommandQueryBuilder} from "./tapper.command.query.builder.js";
import {TapperCommandExecutionManager} from "../utils/tapper.command.execution.manager.js";

export class TapperGeneralOptionsCommandsManager {

    // Sublist Questions
    private static QUESTION_ENABLED_DISABLED = "question_enabled_disabled";
    private static QUESTION_INSTALL_BY_PATH = "install_by_path";
    private static QUESTION_UN_INSTALL_BY_PACKAGE_NAME = "uninstall_by_package_name";

    // CLI Actions List - SubList from General Options
    private static QUESTION_TOGGLE_DARK_MODE = "Change Dark Mode";
    private static QUESTION_POWER_SAVING_MODE = "Change Power Saving Mode";
    private static QUESTION_WIFI = "Change Wifi";
    private static QUESTION_SHOW_CONNECTED_DEVICES = "Get Connected Devices";
    private static QUESTION_SHOW_CONNECTED_DEVICES_DETAILS = "Get Connected Devices With full Information";
    private static QUESTION_INSTALL_APK = "Install Apk on Device";
    private static QUESTION_UN_INSTALL_APK = "UnInstall Apk on Device";
    private static QUESTION_REBOOT = "Reboot Device";

    public static onExecuteGeneralOptionsCommands() {
        const questions = this.getCommandsQuestions();
        TapperCommandsManager.onAskCommandQuestions(questions)
            .then((selectedCommand) => {
                if (selectedCommand) {
                    this.onExecuteGeneralCommandSubmissionQuestion(selectedCommand);
                }
            })
            .catch((error) => console.error(error))
    }

    private static onExecuteGeneralCommandSubmissionQuestion(command: CommandQuestionEntity<AndroidGeneralSettingsKey>) {
        if (command.inputQuestion) {
            const question = this.getQuestionNameByKey(command.inputQuestion)
            TapperCommandsManager.onAskStringInputQuestion(question)
                .then((answer) => {
                    this.onExecuteCommand(command, answer);
                });
        } else {
            this.onExecuteCommand(command, "")
        }

    }

    private static getQuestionNameByKey(key: string): string {
        if (key === TapperGeneralOptionsCommandsManager.QUESTION_ENABLED_DISABLED) {
            return "Do you want To Enable or Disable the Feature ? (y, n)";
        } else if (key === TapperGeneralOptionsCommandsManager.QUESTION_INSTALL_BY_PATH) {
            return "Insert The Full Path of the Apk File ?";
        } else if (key === TapperGeneralOptionsCommandsManager.QUESTION_UN_INSTALL_BY_PACKAGE_NAME) {
            return "Write the Package Name That want to Uninstall from the Device ?";
        } else {
            return "";
        }
    }

    public static onExecuteCommand(command: CommandQuestionEntity<AndroidGeneralSettingsKey>, inputOption: string) {
        if (inputOption && command.inputQuestion && command.inputQuestion === TapperGeneralOptionsCommandsManager.QUESTION_ENABLED_DISABLED) {
            if (inputOption.toLowerCase() !== "y" && inputOption.toLowerCase() !== "n") {
                console.log("Answer Should be y,n Only")
                return
            }
        }

        if (command.isDirectCommand) {
            const commandToExecute = new TapperCommandQueryBuilder()
                .setGeneralSettingsKey(command.command)
                .getQuery();

            TapperCommandExecutionManager.onExecuteCommandString(commandToExecute);
        } else {
            const commandToExecute = new TapperCommandQueryBuilder()
                .setShellCommand()
                .setSettings()
                .put()
                .setGlobal()
                .setGeneralSettingsKey(command.command);

            if (inputOption.toLowerCase() === 'y') {
                if (command.command == AndroidGeneralSettingsKey.ToggleDarkMode) {
                    commandToExecute.setEnabledByNumbersNextLevel(true)
                } else {
                    commandToExecute.setEnabledByNumbers(true)
                }
            } else {
                if (command.command == AndroidGeneralSettingsKey.ToggleDarkMode) {
                    commandToExecute.setEnabledByNumbersNextLevel(false)
                } else {
                    commandToExecute.setEnabledByNumbers(false)
                }
            }

            TapperCommandExecutionManager.onExecuteCommandString(commandToExecute.getQuery());
        }
    }

    private static getCommandsQuestions(): Array<CommandQuestionEntity<AndroidGeneralSettingsKey>> {
        return [
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_TOGGLE_DARK_MODE,
                command: AndroidGeneralSettingsKey.ToggleDarkMode,
                inputQuestion: TapperGeneralOptionsCommandsManager.QUESTION_ENABLED_DISABLED,
                isDirectCommand: false
            },
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_POWER_SAVING_MODE,
                command: AndroidGeneralSettingsKey.PowerSavingMode,
                inputQuestion: TapperGeneralOptionsCommandsManager.QUESTION_ENABLED_DISABLED,
                isDirectCommand: false
            },
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_WIFI,
                command: AndroidGeneralSettingsKey.ToggleWifi,
                inputQuestion: TapperGeneralOptionsCommandsManager.QUESTION_ENABLED_DISABLED,
                isDirectCommand: false
            },
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_SHOW_CONNECTED_DEVICES,
                command: AndroidGeneralSettingsKey.Devices,
                inputQuestion: undefined,
                isDirectCommand: true
            },
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_SHOW_CONNECTED_DEVICES_DETAILS,
                command: AndroidGeneralSettingsKey.DetailedDevices,
                inputQuestion: undefined,
                isDirectCommand: true
            },
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_INSTALL_APK,
                command: AndroidGeneralSettingsKey.InstallApk,
                inputQuestion: TapperGeneralOptionsCommandsManager.QUESTION_INSTALL_BY_PATH,
                isDirectCommand: false
            },
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_UN_INSTALL_APK,
                command: AndroidGeneralSettingsKey.UnInstallApk,
                inputQuestion: TapperGeneralOptionsCommandsManager.QUESTION_UN_INSTALL_BY_PACKAGE_NAME,
                isDirectCommand: false
            },
            {
                name: TapperGeneralOptionsCommandsManager.QUESTION_REBOOT,
                command: AndroidGeneralSettingsKey.Reboot,
                inputQuestion: undefined,
                isDirectCommand: true
            }
        ];
    }

    public static getAvailableCommands(): Array<string> {
        return [
            "",
            "Enable / Disable Dark Mode",
            "Enable / Disable WIFI",
            "Enable / Disable Power Saving Mode",
            "Get Connected Devices",
            "Get Connected Devices With Full Information",
            "Install Apk By Path",
            "Uninstall Apk By Package Name",
            "Reboot Device",
            "",
        ];
    }
}
