import fs from 'fs';

import { Context } from '../boot';
import Settings from '../types/Settings';
import default_settings from '../../config/default_settings';

export default async function settings_read(ctx: Context): Promise<Settings> {
  try {
    ctx.log.debug(`ops:settings_read`);
    const settings = JSON.parse(fs.readFileSync(ctx.paths.settings, 'utf8'));
    // Merge over the defaults so that keys missing from an older settings.json
    // (e.g. the hub endpoints, or any future default) fall back to their default
    // value instead of becoming undefined. Mirrors settings_check's merge.
    return { ...default_settings, ...settings };
  } catch (error) {
    ctx.log.warn(`Failed to read settings`);
    return default_settings;
  }
}
