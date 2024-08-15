import { createProxy, createTunnel } from "elastic-tools";
import { Command } from "commander";

type ToString<T> = { [key in keyof T]: string };
type CreateProxyParams = ToString<Parameters<typeof createProxy>[0]>;
type CreateTunnelParams = ToString<Parameters<typeof createTunnel>[0]>;

const program = new Command();
program
  .command("proxy")
  .option(
    "-iport, --internalProviderProxyPort <number>",
    "set internal proxy port",
    "53507"
  )
  .option(
    "-phost, --providersProxyHost <string>",
    "set the tunnel host",
    "localhost"
  )
  .option(
    "-pport, --providersProxyPort <number>",
    "set the tunnel port",
    "53506"
  )
  .option(
    "-availability, --minimumAvailability <number>",
    "the minimum pool availability",
    "10"
  )
  .action((options: CreateProxyParams) => {
    const parsedOptions = {
      internalProviderProxyPort: parseInt(options.internalProviderProxyPort),
      minimumAvailability: parseInt(options.minimumAvailability),
      providersProxyHost: options.providersProxyHost,
      providersProxyPort: parseInt(options.providersProxyPort),
    };
    console.log("Starting proxy with the following options:", parsedOptions);
    createProxy(parsedOptions);
  });

program
  .command("tunnel")
  .option("-cport, --clientsProxyPort <number>", "set the tunnel host", "53505")
  .option(
    "-pport, --providersProxyPort <number>",
    "set the tunnel port",
    "53506"
  )
  .action((options: CreateTunnelParams) => {
    const parsedOptions = {
      clientsProxyPort: parseInt(options.clientsProxyPort),
      providersProxyPort: parseInt(options.providersProxyPort),
    };
    console.log("Starting tunnel with the following options:", parsedOptions);
    createTunnel(parsedOptions);
  });

program.parse(process.argv);
