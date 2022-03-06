import * as ModuleAlias from 'module-alias';
import * as path from 'path';

ModuleAlias.addAliases({ '#': path.resolve(__dirname, '..', '..', 'shared') });
