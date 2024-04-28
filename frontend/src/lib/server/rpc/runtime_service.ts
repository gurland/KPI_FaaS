/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { User } from "./auth_service";
import { Empty } from "./common";

export const protobufPackage = "faas";

export interface CreateRuntimeRequest {
  tag: string;
  dockerfile: string;
  user: User | undefined;
}

export interface Runtime {
  tag: string;
  registryUrl: string;
}

function createBaseCreateRuntimeRequest(): CreateRuntimeRequest {
  return { tag: "", dockerfile: "", user: undefined };
}

export const CreateRuntimeRequest = {
  encode(message: CreateRuntimeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.dockerfile !== "") {
      writer.uint32(18).string(message.dockerfile);
    }
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRuntimeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRuntimeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tag = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dockerfile = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateRuntimeRequest {
    return {
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      dockerfile: isSet(object.dockerfile) ? globalThis.String(object.dockerfile) : "",
      user: isSet(object.user) ? User.fromJSON(object.user) : undefined,
    };
  },

  toJSON(message: CreateRuntimeRequest): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.dockerfile !== "") {
      obj.dockerfile = message.dockerfile;
    }
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },

  create(base?: DeepPartial<CreateRuntimeRequest>): CreateRuntimeRequest {
    return CreateRuntimeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateRuntimeRequest>): CreateRuntimeRequest {
    const message = createBaseCreateRuntimeRequest();
    message.tag = object.tag ?? "";
    message.dockerfile = object.dockerfile ?? "";
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseRuntime(): Runtime {
  return { tag: "", registryUrl: "" };
}

export const Runtime = {
  encode(message: Runtime, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.registryUrl !== "") {
      writer.uint32(18).string(message.registryUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Runtime {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tag = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.registryUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Runtime {
    return {
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      registryUrl: isSet(object.registryUrl) ? globalThis.String(object.registryUrl) : "",
    };
  },

  toJSON(message: Runtime): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.registryUrl !== "") {
      obj.registryUrl = message.registryUrl;
    }
    return obj;
  },

  create(base?: DeepPartial<Runtime>): Runtime {
    return Runtime.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Runtime>): Runtime {
    const message = createBaseRuntime();
    message.tag = object.tag ?? "";
    message.registryUrl = object.registryUrl ?? "";
    return message;
  },
};

export type RuntimeServiceDefinition = typeof RuntimeServiceDefinition;
export const RuntimeServiceDefinition = {
  name: "RuntimeService",
  fullName: "faas.RuntimeService",
  methods: {
    createRuntime: {
      name: "CreateRuntime",
      requestType: CreateRuntimeRequest,
      requestStream: false,
      responseType: Runtime,
      responseStream: false,
      options: {},
    },
    getRuntimeTags: {
      name: "GetRuntimeTags",
      requestType: Empty,
      requestStream: false,
      responseType: Runtime,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface RuntimeServiceImplementation<CallContextExt = {}> {
  createRuntime(request: CreateRuntimeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Runtime>>;
  getRuntimeTags(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DeepPartial<Runtime>>;
}

export interface RuntimeServiceClient<CallOptionsExt = {}> {
  createRuntime(request: DeepPartial<CreateRuntimeRequest>, options?: CallOptions & CallOptionsExt): Promise<Runtime>;
  getRuntimeTags(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): AsyncIterable<Runtime>;
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

export type ServerStreamingMethodResult<Response> = { [Symbol.asyncIterator](): AsyncIterator<Response, void> };
