"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_tools_1 = require("elastic-tools");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command("proxy")
    .option("-iport, --internalProviderProxyPort <number>", "set internal proxy port", "53507")
    .option("-phost, --providersProxyHost <string>", "set the tunnel host", "localhost")
    .option("-pport, --providersProxyPort <number>", "set the tunnel port", "53506")
    .option("-availability, --minimumAvailability <number>", "the minimum pool availability", "10")
    .action((options) => {
    (0, elastic_tools_1.createProxy)({
        internalProviderProxyPort: parseInt(options.internalProviderProxyPort),
        minimumAvailability: parseInt(options.minimumAvailability),
        providersProxyHost: options.providersProxyHost,
        providersProxyPort: parseInt(options.providersProxyHost),
    });
});
program
    .command("tunnel")
    .option("-cport, --clientsProxyPort <number>", "set the tunnel host", "localhost")
    .option("-pport, --providersProxyPort <number>", "set the tunnel port", "53506")
    .action((options) => {
    (0, elastic_tools_1.createTunnel)({
        clientsProxyPort: parseInt(options.clientsProxyPort),
        providersProxyPort: parseInt(options.providersProxyPort),
    });
});
program.parse(process.argv);
