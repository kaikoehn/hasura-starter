import { chain } from "@/utils/zeus-util";
import { z } from "zod";
import { procedure, router } from "../trpc";
import { observable } from "@trpc/server/observable";

import { EventEmitter } from "events";
const ee = new EventEmitter();

interface Post {
  name: string;
}

function randomMac() {
  return "00:00:00:00:00:00".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
}

export const appRouter = router({
  onAdd: procedure.subscription(() => {
    // `resolve()` is triggered for each client when they start subscribing `onAdd`
    // return an `observable` with a callback which is triggered immediately
    return observable<Post>((emit) => {
      const onAdd = (data: Post) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on("add", onAdd);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off("add", onAdd);
      };
    });
  }),
  add: procedure.input(z.object({})).mutation(async ({ input }) => {
    const post = { ...input }; /* [..] add to db */
    ee.emit("add", { name: "Test" } as Post);

    chain("mutation")({
      insert_beacon: [
        {
          objects: [
            {
              mac: randomMac(),
            },
          ],
        },
        {
          affected_rows: true,
        },
      ],
    });

    return post;
  }),

  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { beacon } = await chain("query")({
        beacon: [
          {},
          {
            uuid: true,
          },
        ],
      });

      // console.log(beacon);

      return {
        greeting: `hello ${input.text}`,
        beacon,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
