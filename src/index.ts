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
    console.log("Starting proxy with the following options:", options);
    createProxy({
      internalProviderProxyPort: parseInt(options.internalProviderProxyPort),
      minimumAvailability: parseInt(options.minimumAvailability),
      providersProxyHost: options.providersProxyHost,
      providersProxyPort: parseInt(options.providersProxyHost),
    });
  });

program
  .command("tunnel")
  .option(
    "-cport, --clientsProxyPort <number>",
    "set the tunnel host",
    "localhost"
  )
  .option(
    "-pport, --providersProxyPort <number>",
    "set the tunnel port",
    "53506"
  )
  .action((options: CreateTunnelParams) => {
    console.log("Starting tunnel with the following options:", options);
    createTunnel({
      clientsProxyPort: parseInt(options.clientsProxyPort),
      providersProxyPort: parseInt(options.providersProxyPort),
    });
  });

program.parse(process.argv);
