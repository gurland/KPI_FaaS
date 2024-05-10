/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./common";
import { BriefFunction } from "./function_service";

export const protobufPackage = "faas";

export interface ApiGatewayTriggerConfiguration {
  function: BriefFunction | undefined;
  name: string;
}

export interface DetailedAPIGatewayTrigger {
  triggerId: number;
  name: string;
  url: string;
}

export interface DeleteAPIGatewayTriggerRequest {
  triggerId: number;
}

function createBaseApiGatewayTriggerConfiguration(): ApiGatewayTriggerConfiguration {
  return { function: undefined, name: "" };
}

export const ApiGatewayTriggerConfiguration = {
  encode(message: ApiGatewayTriggerConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.function !== undefined) {
      BriefFunction.encode(message.function, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiGatewayTriggerConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiGatewayTriggerConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.function = BriefFunction.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApiGatewayTriggerConfiguration {
    return {
      function: isSet(object.function) ? BriefFunction.fromJSON(object.function) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: ApiGatewayTriggerConfiguration): unknown {
    const obj: any = {};
    if (message.function !== undefined) {
      obj.function = BriefFunction.toJSON(message.function);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<ApiGatewayTriggerConfiguration>): ApiGatewayTriggerConfiguration {
    return ApiGatewayTriggerConfiguration.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ApiGatewayTriggerConfiguration>): ApiGatewayTriggerConfiguration {
    const message = createBaseApiGatewayTriggerConfiguration();
    message.function = (object.function !== undefined && object.function !== null)
      ? BriefFunction.fromPartial(object.function)
      : undefined;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseDetailedAPIGatewayTrigger(): DetailedAPIGatewayTrigger {
  return { triggerId: 0, name: "", url: "" };
}

export const DetailedAPIGatewayTrigger = {
  encode(message: DetailedAPIGatewayTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.triggerId !== 0) {
      writer.uint32(8).uint32(message.triggerId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetailedAPIGatewayTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetailedAPIGatewayTrigger();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.triggerId = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetailedAPIGatewayTrigger {
    return {
      triggerId: isSet(object.triggerId) ? globalThis.Number(object.triggerId) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : "",
    };
  },

  toJSON(message: DetailedAPIGatewayTrigger): unknown {
    const obj: any = {};
    if (message.triggerId !== 0) {
      obj.triggerId = Math.round(message.triggerId);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create(base?: DeepPartial<DetailedAPIGatewayTrigger>): DetailedAPIGatewayTrigger {
    return DetailedAPIGatewayTrigger.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DetailedAPIGatewayTrigger>): DetailedAPIGatewayTrigger {
    const message = createBaseDetailedAPIGatewayTrigger();
    message.triggerId = object.triggerId ?? 0;
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseDeleteAPIGatewayTriggerRequest(): DeleteAPIGatewayTriggerRequest {
  return { triggerId: 0 };
}

export const DeleteAPIGatewayTriggerRequest = {
  encode(message: DeleteAPIGatewayTriggerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.triggerId !== 0) {
      writer.uint32(8).uint32(message.triggerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteAPIGatewayTriggerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteAPIGatewayTriggerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.triggerId = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteAPIGatewayTriggerRequest {
    return { triggerId: isSet(object.triggerId) ? globalThis.Number(object.triggerId) : 0 };
  },

  toJSON(message: DeleteAPIGatewayTriggerRequest): unknown {
    const obj: any = {};
    if (message.triggerId !== 0) {
      obj.triggerId = Math.round(message.triggerId);
    }
    return obj;
  },

  create(base?: DeepPartial<DeleteAPIGatewayTriggerRequest>): DeleteAPIGatewayTriggerRequest {
    return DeleteAPIGatewayTriggerRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DeleteAPIGatewayTriggerRequest>): DeleteAPIGatewayTriggerRequest {
    const message = createBaseDeleteAPIGatewayTriggerRequest();
    message.triggerId = object.triggerId ?? 0;
    return message;
  },
};

export type APIGatewayServiceDefinition = typeof APIGatewayServiceDefinition;
export const APIGatewayServiceDefinition = {
  name: "APIGatewayService",
  fullName: "faas.APIGatewayService",
  methods: {
    createAPIGatewayTrigger: {
      name: "CreateAPIGatewayTrigger",
      requestType: ApiGatewayTriggerConfiguration,
      requestStream: false,
      responseType: DetailedAPIGatewayTrigger,
      responseStream: false,
      options: {},
    },
    deleteApiGatewayTrigger: {
      name: "DeleteApiGatewayTrigger",
      requestType: DeleteAPIGatewayTriggerRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface APIGatewayServiceImplementation<CallContextExt = {}> {
  createAPIGatewayTrigger(
    request: ApiGatewayTriggerConfiguration,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DetailedAPIGatewayTrigger>>;
  deleteApiGatewayTrigger(
    request: DeleteAPIGatewayTriggerRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Empty>>;
}

export interface APIGatewayServiceClient<CallOptionsExt = {}> {
  createAPIGatewayTrigger(
    request: DeepPartial<ApiGatewayTriggerConfiguration>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DetailedAPIGatewayTrigger>;
  deleteApiGatewayTrigger(
    request: DeepPartial<DeleteAPIGatewayTriggerRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
