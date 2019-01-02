import { interfaces } from "inversify";
import { StreamData } from "./stream-data";
import { Logger } from "../util/logger";
import { Stream } from "./stream";
import { StreamingSource } from "./streaming-source";
import { WebsocketServer } from "../core/websocket-server";

export const StreamFactory = (context: interfaces.Context) =>
    (streamData: StreamData) => {
        const logger = context.container.get<Logger>("Logger");
        const websocketService = context.container.get<WebsocketServer>("WebsocketServer");
        const streamingSourceFactory = context.container.get<(deviceId: string) => StreamingSource>("StreamingSourceFactory");

        return new Stream(logger, websocketService, streamingSourceFactory, streamData);
    };
