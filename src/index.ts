import { createProxy, createTunnel, createClient } from "elastic-tools";
import { Command } from "commander";

type ToString<T> = { [key in keyof T]: string };
type CreateClientParams = ToString<Parameters<typeof createClient>[0]>;
type CreateTunnelParams = ToString<Parameters<typeof createTunnel>[0]>;
type CreateProxyParams = ToString<Parameters<typeof createProxy>[0]>;

const program = new Command();

program
  .command("proxy")
  .option("-user, --username <string>", "set the proxy username", "")
  .option("-pass, --password <string>", "set the proxy password", "")
  .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
  .option(
    "-availability, --minimumAvailability <number>",
    "the minimum pool availability",
    "10"
  )
  .action((options: CreateProxyParams) => {
    const parsedOptions = {
      username: options.username,
      password: options.password,
      tunnelHost: options.tunnelHost,
      minimumAvailability: parseInt(options.minimumAvailability),
    };
    console.log("Starting proxy with the following options:", parsedOptions);
    const proxy = createProxy(parsedOptions);
    proxy.listen();
  });

program
  .command("tunnel")
  .option("-user, --username <string>", "set the tunnel username", "")
  .option("-pass, --password <string>", "set the tunnel password", "")
  .action((options: CreateTunnelParams) => {
    const parsedOptions = {
      username: options.username,
      password: options.password,
    };
    console.log("Starting tunnel with the following options:", parsedOptions);
    console.log("Starting elastic tunnel");
    const tunnel = createTunnel(parsedOptions);
    tunnel.listen();
  });

program
  .command("client")
  .option("-user, --username <string>", "set the client username", "")
  .option("-pass, --password <string>", "set the client password", "")
  .option("-thost, --tunnelHost <string>", "set the tunnel host", "localhost")
  .option("-ccode, --countryCode <number>", "set internal proxy port", "US")
  .action((options: CreateClientParams) => {
    const parsedOptions = {
      username: options.username,
      password: options.password,
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
