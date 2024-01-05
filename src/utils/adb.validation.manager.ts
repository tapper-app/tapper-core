import { exec } from 'child_process';

export class AdbValidationManager {

    // @ts-ignore
    static async checkAdbInstallation(): Promise<boolean> {
        const command = 'adb version';

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return Promise.resolve(false);
            }

            if (stderr) {
                console.log("ADB Commands Error : " + stderr)
                return Promise.resolve(false);
            }

            const adbVersionMatch = stdout.match(/version (\d+\.\d+\.\d+)/);

            if (adbVersionMatch && adbVersionMatch[1]) {
                const adbVersion = adbVersionMatch[1];
                console.log(`ADB Installed on Your Device. Version: ${adbVersion}`);
                return Promise.resolve(true);
            } else {
                console.log('ADB is Not Installed or the version information could not be retrieved.');
                return Promise.resolve(false);
            }
        });
    }

}