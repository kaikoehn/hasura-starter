import { useContext, useEffect, useReducer, useRef, useState } from "react";
import {
  Chain,
  Subscription,
  Zeus,
  Selector,
  InputType,
  GraphQLTypes,
} from "@acode-mapper/common/zeus";
import { createClient } from "graphql-ws";
import { createTRPCProxyClient, createWSClient, wsLink } from "@trpc/client";
import { AppRouter } from "@/server/routers/_app";

const headers = {
  [`Content-Type`]: "application/json",
  [`x-hasura-admin-secret`]: `nhost-admin-secret`,
};
export const chain = Chain("http://localhost:1337/v1/graphql", {
  headers: headers,
});

const beaconSelector = Selector("beacon")({
  uuid: true,
  mac: true,
});
const gql = Zeus("subscription", {
  beacon: [{}, beaconSelector],
});
type Beacon = InputType<GraphQLTypes["beacon"], typeof beaconSelector>;

export function useTestHasuraGqlSubscription() {
  const [beacons, setBeacons] = useState([] as Beacon[]);

  useEffect(() => {
    console.log("render!");
    const client = createClient({
      url: "ws://localhost:8080/v1/graphql",
      connectionParams: {
        headers,
      },
    });
    // Subscribe to new messages
    client.subscribe(
      {
        query: gql,
      },
      {
        error() {},
        complete() {},
        next({ data }) {
          setBeacons(data!.beacon as Beacon[]);
        },
      }
    );

    return () => {
      client.dispose();
    };
  }, []);

  return { beacons };
}

export function useTrpcSubscription() {
  const context = useRef({
    client: undefined as undefined | ReturnType<typeof generateClient>,
  });

  useEffect(() => {
    // create persistent WebSocket connection
    const wsClient = createWSClient({
      url: `ws://localhost:3001`,
    });

    // configure TRPCClient to use WebSockets transport
    const client = generateClient(wsClient);
    context.current.client = client;

    // client.onAdd.subscribe({});

    return () => wsClient.close();
  }, []);

  return context.current;
}
function generateClient(wsClient: any) {
  return createTRPCProxyClient<AppRouter>({
    links: [
      wsLink({
        client: wsClient,
      }),
    ],
  });
}
