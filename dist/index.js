"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_tools_1 = require("elastic-tools");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command("proxy")
    .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
    .option("-availability, --minimumAvailability <number>", "the minimum pool availability", "10")
    .action((options) => {
    const parsedOptions = {
        tunnelHost: options.tunnelHost,
        minimumAvailability: parseInt(options.minimumAvailability),
    };
    console.log("Starting proxy with the following options:", parsedOptions);
    const proxy = (0, elastic_tools_1.createProxy)(parsedOptions);
    proxy.listen();
});
program
    .command("tunnel")
    .option("-ccode, --countryCode <string>", "set the tunnel host", "US")
    .action((options) => {
    const parsedOptions = {
        countryCode: options.countryCode,
    };
    console.log("Starting tunnel with the following options:", parsedOptions);
    const tunnel = (0, elastic_tools_1.createTunnel)(parsedOptions);
    tunnel.listen();
});
program
    .command("client")
    .option("-ccode, --countryCode <number>", "set internal proxy port", "US")
    .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
    .action((options) => {
    const parsedOptions = {
        countryCode: options.countryCode,
        tunnelHost: options.tunnelHost,
    };
    console.log("Starting client with the following options:", parsedOptions);
    const client = (0, elastic_tools_1.createClient)(parsedOptions);
    client.listen();
});
program.parse(process.argv);
