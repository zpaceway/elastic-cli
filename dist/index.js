"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_tools_1 = require("elastic-tools");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command("proxy")
    .option("-user, --username <string>", "set the proxy username", "")
    .option("-pass, --password <string>", "set the proxy password", "")
    .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
    .option("-availability, --minimumAvailability <number>", "the minimum pool availability", "10")
    .action((options) => {
    const parsedOptions = {
        username: options.username,
        password: options.password,
        tunnelHost: options.tunnelHost,
        minimumAvailability: parseInt(options.minimumAvailability),
    };
    console.log("Starting proxy with the following options:", parsedOptions);
    const proxy = (0, elastic_tools_1.createProxy)(parsedOptions);
    proxy.listen();
});
program
    .command("tunnel")
    .option("-user, --username <string>", "set the tunnel username", "")
    .option("-pass, --password <string>", "set the tunnel password", "")
    .action((options) => {
    const parsedOptions = {
        username: options.username,
        password: options.password,
    };
    console.log("Starting tunnel with the following options:", parsedOptions);
    console.log("Starting elastic tunnel");
    const tunnel = (0, elastic_tools_1.createTunnel)(parsedOptions);
    tunnel.listen();
});
program
    .command("client")
    .option("-user, --username <string>", "set the client username", "")
    .option("-pass, --password <string>", "set the client password", "")
    .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
    .option("-ccode, --countryCode <number>", "set internal proxy port", "US")
    .action((options) => {
    const parsedOptions = {
        username: options.username,
        password: options.password,
        countryCode: options.countryCode,
        tunnelHost: options.tunnelHost,
    };
    console.log("Starting client with the following options:", parsedOptions);
    const client = (0, elastic_tools_1.createClient)(parsedOptions);
    client.listen();
});
program.parse(process.argv);
