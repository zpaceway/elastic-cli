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
    const parsedOptions = {
        internalProviderProxyPort: parseInt(options.internalProviderProxyPort),
        minimumAvailability: parseInt(options.minimumAvailability),
        providersProxyHost: options.providersProxyHost,
        providersProxyPort: parseInt(options.providersProxyPort),
    };
    console.log("Starting proxy with the following options:", parsedOptions);
    const proxy = (0, elastic_tools_1.createProxy)(parsedOptions);
    proxy.listen(parsedOptions);
});
program
    .command("tunnel")
    .option("-cport, --clientsProxyPort <number>", "set the tunnel host", "53505")
    .option("-pport, --providersProxyPort <number>", "set the tunnel port", "53506")
    .action((options) => {
    const parsedOptions = {
        clientsProxyPort: parseInt(options.clientsProxyPort),
        providersProxyPort: parseInt(options.providersProxyPort),
    };
    console.log("Starting tunnel with the following options:", parsedOptions);
    const tunnel = (0, elastic_tools_1.createTunnel)();
    tunnel.listen(parsedOptions);
});
program.parse(process.argv);
