import { exec } from 'child_process';

export class AdbValidationManager {

    // @ts-ignore
    static async checkAdbInstallation(): Promise<boolean> {
        const command = 'adb version';

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing adb command:', error.message);
                return Promise.reject(error);
            }

            if (stderr) {
                console.error();
                return Promise.reject(Error(`adb command returned an error: ${stderr}`));
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