import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export interface Configuration {
  port: number;
  secret: string;
  dataSource: {
    url: string;
    username: string;
    password: string;
  };
  nodeMailer: {
    host: string;
    port: number;
    username: string;
    password: string;
  }
}

export enum RuntimeProfile {
  default = 'default',
  test = 'test',
  override = 'override',
  alpha = 'alpha',
  sandbox = 'sandbox',
  beta = 'beta',
  production = 'production',
}

export type Profile = RuntimeProfile;

const overrideConfigExist: boolean = fs.existsSync(
  path.resolve('config/config.override.yaml'),
);

let profile: Profile =
  (process.env.profile as Profile) || RuntimeProfile.default;

if (overrideConfigExist) {
  profile = RuntimeProfile.override;
}

export let config: Configuration;

try {
  console.log(`Runtime profile: ${profile}`);
  config = yaml.safeLoad(
    fs.readFileSync(path.resolve(`config/config.${profile}.yaml`), 'utf-8'),
  ) as Configuration;
} catch (e) {
  throw e;
}

export default config;
