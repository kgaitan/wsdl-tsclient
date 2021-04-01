#!/usr/bin/env node
import yargs from "yargs";
import path from "path";
import { Logger } from "./utils/logger";
import { parseAndGenerate, Options } from "./index";
import packageJson from "../package.json";

const conf = yargs(process.argv.slice(2))
    .version(packageJson.version)
    .usage("wsdl-tsclient [options] [path]")
    .example("", "wsdl-tsclient file.wsdl -o ./generated/")
    .example("", "wsdl-tsclient ./res/**/*.wsdl -o ./generated/")
    .demandOption(["o"])
    .option("o", {
        type: "string",
        description: "Output directory"
    })
    .option("version", {
        alias: "v",
        type: "boolean"
    })
    .option("emitDefinitionsOnly", {
        type: "boolean",
        description: "Generate only Definitions"
    })
    .option("modelNamePreffix", {
        type: "string",
        description: "Prefix for generated interface names"
    })
    .option("modelNameSuffix", {
        type: "string",
        description: "Suffix for generated interface names"
    })
    .option("quiet", {
        type: "boolean",
        description: "Suppress logs"
    })
    .option("verbose", {
        type: "boolean",
        description: "Print verbose logs"
    })
    .option("no-color", {
        type: "boolean",
        description: "Logs without colors"
    })
    .argv;

// Logger section

if (conf["no-color"]) {
    Logger.colors = false;
}

if (conf.verbose) {
    Logger.isDebug = true;
}

if (conf.quiet) {
    Logger.isDebug = false;
    Logger.isInfo = false;
    Logger.isError = false;
}

// Options override section

const options: Partial<Options> = {};

if (conf.emitDefinitionsOnly) {
    options.emitDefinitionsOnly = true;
}

if (conf.modelNamePrefix) {
    options.modelNamePreffix = conf.modelNamePreffix;
}

if (conf.modelNameSuffix) {
    options.modelNameSuffix = conf.modelNameSuffix;
}

//

if (conf._ === undefined || conf._.length === 0) {
    Logger.error("No WSDL files found");
    Logger.debug(`Path: ${conf._}`);
    process.exit(1);
}

(async function () {
    if (conf.o === undefined || conf.o.length === 0) {
        Logger.error("You forget to pass path to Output directory -o");
        process.exit(1);
    } else {
        const outDir = path.resolve(conf.o);

        let errorOccured = false;
        const matches = conf._ as string[];

        if (matches.length > 1) {
            Logger.debug(matches.map((m) => path.resolve(m)).join("\n"));
            Logger.log(`Found ${matches.length} wsdl files`);
        }
        for (const match of matches) {
            const wsdlPath = path.resolve(match);
            const wsdlName = path.basename(wsdlPath);
            Logger.log(`Generating soap client from "${wsdlName}"`);
            try {
                await parseAndGenerate(wsdlPath, path.join(outDir), options);
            } catch (err) {
                Logger.error(`Error occured while generating client "${wsdlName}"`);
                Logger.error(`\t${err}`);
                errorOccured = true;
            }
        }
        if (errorOccured) {
            process.exit(1);
        }
    }
})();
