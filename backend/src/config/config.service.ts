import * as dotenv from 'dotenv';
import * as fs from 'fs';

class ConfigService {
  private readonly env: { [key: string]: string };

  constructor(envPath?: string | undefined) {
    const envFile = envPath ? envPath : this.getRightEnvFile();
    this.env = dotenv.parse(fs.readFileSync(envFile));
  }

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key] || process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  getRightEnvFile(): string {
    return '.env'
  }
}

const configService = new ConfigService().ensureValues([]);

export { configService };
