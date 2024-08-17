import { createProxy, createTunnel } from "elastic-tools";
import { Command } from "commander";

type ToString<T> = { [key in keyof T]: string };
type CreateProxyParams = ToString<Parameters<typeof createProxy>[0]>;
type CreateTunnelParams = ToString<Parameters<typeof createTunnel>[0]>;

const program = new Command();
program
  .command("proxy")
  .option("-ccode, --countryCode <number>", "set internal proxy port", "53507")
  .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
  .option(
    "-availability, --minimumAvailability <number>",
    "the minimum pool availability",
    "10"
  )
  .action((options: CreateProxyParams) => {
    const parsedOptions = {
      countryCode: options.countryCode as Parameters<
        typeof createProxy
      >[0]["countryCode"],
      tunnelHost: options.tunnelHost,
      minimumAvailability: parseInt(options.minimumAvailability),
    };
    console.log("Starting proxy with the following options:", parsedOptions);
    const proxy = createProxy(parsedOptions);
    proxy.listen();
  });

program
  .command("tunnel")
  .option("-ccode, --countryCode <string>", "set the tunnel host", "53505")
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

program.parse(process.argv);
