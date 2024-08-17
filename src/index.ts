import { createProxy, createTunnel, createClient } from "elastic-tools";
import { Command } from "commander";

type ToString<T> = { [key in keyof T]: string };
type CreateClientParams = ToString<Parameters<typeof createClient>[0]>;
type CreateProxyParams = ToString<Parameters<typeof createProxy>[0]>;
type CreateTunnelParams = ToString<Parameters<typeof createTunnel>[0]>;

const program = new Command();
program
  .command("proxy")
  .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
  .option(
    "-availability, --minimumAvailability <number>",
    "the minimum pool availability",
    "10"
  )
  .action((options: CreateProxyParams) => {
    const parsedOptions = {
      tunnelHost: options.tunnelHost,
      minimumAvailability: parseInt(options.minimumAvailability),
    };
    console.log("Starting proxy with the following options:", parsedOptions);
    const proxy = createProxy(parsedOptions);
    proxy.listen();
  });

program
  .command("tunnel")
  .option("-ccode, --countryCode <string>", "set the tunnel host", "US")
  .action((options: CreateTunnelParams) => {
    const parsedOptions = {
      countryCode: options.countryCode as Parameters<
        typeof createTunnel
      >[0]["countryCode"],
    };
    console.log("Starting tunnel with the following options:", parsedOptions);
    const tunnel = createTunnel(parsedOptions);
    tunnel.listen();
  });

program
  .command("client")
  .option("-ccode, --countryCode <number>", "set internal proxy port", "US")
  .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
  .action((options: CreateClientParams) => {
    const parsedOptions = {
      countryCode: options.countryCode as Parameters<
        typeof createClient
      >[0]["countryCode"],
      tunnelHost: options.tunnelHost,
    };
    console.log("Starting client with the following options:", parsedOptions);
    const client = createClient(parsedOptions);
    client.listen();
  });

program.parse(process.argv);
