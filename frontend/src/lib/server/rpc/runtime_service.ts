/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty, Logs } from "./common";

export const protobufPackage = "faas";

export interface RuntimeConfiguration {
  tag: string;
  dockerfile: string;
  invokerScript: string;
  syntax: string;
  functionExample: string;
}

export interface BriefRuntime {
  tag: string;
  registryUrl: string;
}

export interface GetRuntimeDetailsRequest {
  tag: string;
}

export interface DetailedRuntime {
  tag: string;
  registryUrl: string;
  dockerfile: string;
  invokerScript: string;
  syntax: string;
  functionExample: string;
}

export interface UpdatedRuntimeResponse {
  runtime: DetailedRuntime | undefined;
  logs: Logs | undefined;
}

function createBaseRuntimeConfiguration(): RuntimeConfiguration {
  return { tag: "", dockerfile: "", invokerScript: "", syntax: "", functionExample: "" };
}

export const RuntimeConfiguration = {
  encode(message: RuntimeConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.dockerfile !== "") {
      writer.uint32(18).string(message.dockerfile);
    }
    if (message.invokerScript !== "") {
      writer.uint32(26).string(message.invokerScript);
    }
    if (message.syntax !== "") {
      writer.uint32(34).string(message.syntax);
    }
    if (message.functionExample !== "") {
      writer.uint32(42).string(message.functionExample);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RuntimeConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRuntimeConfiguration();
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

          message.invokerScript = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.syntax = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.functionExample = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RuntimeConfiguration {
    return {
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      dockerfile: isSet(object.dockerfile) ? globalThis.String(object.dockerfile) : "",
      invokerScript: isSet(object.invokerScript) ? globalThis.String(object.invokerScript) : "",
      syntax: isSet(object.syntax) ? globalThis.String(object.syntax) : "",
      functionExample: isSet(object.functionExample) ? globalThis.String(object.functionExample) : "",
    };
  },

  toJSON(message: RuntimeConfiguration): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.dockerfile !== "") {
      obj.dockerfile = message.dockerfile;
    }
    if (message.invokerScript !== "") {
      obj.invokerScript = message.invokerScript;
    }
    if (message.syntax !== "") {
      obj.syntax = message.syntax;
    }
    if (message.functionExample !== "") {
      obj.functionExample = message.functionExample;
    }
    return obj;
  },

  create(base?: DeepPartial<RuntimeConfiguration>): RuntimeConfiguration {
    return RuntimeConfiguration.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RuntimeConfiguration>): RuntimeConfiguration {
    const message = createBaseRuntimeConfiguration();
    message.tag = object.tag ?? "";
    message.dockerfile = object.dockerfile ?? "";
    message.invokerScript = object.invokerScript ?? "";
    message.syntax = object.syntax ?? "";
    message.functionExample = object.functionExample ?? "";
    return message;
  },
};

function createBaseBriefRuntime(): BriefRuntime {
  return { tag: "", registryUrl: "" };
}

export const BriefRuntime = {
  encode(message: BriefRuntime, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.registryUrl !== "") {
      writer.uint32(18).string(message.registryUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BriefRuntime {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBriefRuntime();
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

  fromJSON(object: any): BriefRuntime {
    return {
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      registryUrl: isSet(object.registryUrl) ? globalThis.String(object.registryUrl) : "",
    };
  },

  toJSON(message: BriefRuntime): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.registryUrl !== "") {
      obj.registryUrl = message.registryUrl;
    }
    return obj;
  },

  create(base?: DeepPartial<BriefRuntime>): BriefRuntime {
    return BriefRuntime.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BriefRuntime>): BriefRuntime {
    const message = createBaseBriefRuntime();
    message.tag = object.tag ?? "";
    message.registryUrl = object.registryUrl ?? "";
    return message;
  },
};

function createBaseGetRuntimeDetailsRequest(): GetRuntimeDetailsRequest {
  return { tag: "" };
}

export const GetRuntimeDetailsRequest = {
  encode(message: GetRuntimeDetailsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetRuntimeDetailsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetRuntimeDetailsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tag = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetRuntimeDetailsRequest {
    return { tag: isSet(object.tag) ? globalThis.String(object.tag) : "" };
  },

  toJSON(message: GetRuntimeDetailsRequest): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    return obj;
  },

  create(base?: DeepPartial<GetRuntimeDetailsRequest>): GetRuntimeDetailsRequest {
    return GetRuntimeDetailsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetRuntimeDetailsRequest>): GetRuntimeDetailsRequest {
    const message = createBaseGetRuntimeDetailsRequest();
    message.tag = object.tag ?? "";
    return message;
  },
};

function createBaseDetailedRuntime(): DetailedRuntime {
  return { tag: "", registryUrl: "", dockerfile: "", invokerScript: "", syntax: "", functionExample: "" };
}

export const DetailedRuntime = {
  encode(message: DetailedRuntime, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tag !== "") {
      writer.uint32(10).string(message.tag);
    }
    if (message.registryUrl !== "") {
      writer.uint32(18).string(message.registryUrl);
    }
    if (message.dockerfile !== "") {
      writer.uint32(26).string(message.dockerfile);
    }
    if (message.invokerScript !== "") {
      writer.uint32(34).string(message.invokerScript);
    }
    if (message.syntax !== "") {
      writer.uint32(42).string(message.syntax);
    }
    if (message.functionExample !== "") {
      writer.uint32(50).string(message.functionExample);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetailedRuntime {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetailedRuntime();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.dockerfile = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.invokerScript = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.syntax = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.functionExample = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetailedRuntime {
    return {
      tag: isSet(object.tag) ? globalThis.String(object.tag) : "",
      registryUrl: isSet(object.registryUrl) ? globalThis.String(object.registryUrl) : "",
      dockerfile: isSet(object.dockerfile) ? globalThis.String(object.dockerfile) : "",
      invokerScript: isSet(object.invokerScript) ? globalThis.String(object.invokerScript) : "",
      syntax: isSet(object.syntax) ? globalThis.String(object.syntax) : "",
      functionExample: isSet(object.functionExample) ? globalThis.String(object.functionExample) : "",
    };
  },

  toJSON(message: DetailedRuntime): unknown {
    const obj: any = {};
    if (message.tag !== "") {
      obj.tag = message.tag;
    }
    if (message.registryUrl !== "") {
      obj.registryUrl = message.registryUrl;
    }
    if (message.dockerfile !== "") {
      obj.dockerfile = message.dockerfile;
    }
    if (message.invokerScript !== "") {
      obj.invokerScript = message.invokerScript;
    }
    if (message.syntax !== "") {
      obj.syntax = message.syntax;
    }
    if (message.functionExample !== "") {
      obj.functionExample = message.functionExample;
    }
    return obj;
  },

  create(base?: DeepPartial<DetailedRuntime>): DetailedRuntime {
    return DetailedRuntime.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DetailedRuntime>): DetailedRuntime {
    const message = createBaseDetailedRuntime();
    message.tag = object.tag ?? "";
    message.registryUrl = object.registryUrl ?? "";
    message.dockerfile = object.dockerfile ?? "";
    message.invokerScript = object.invokerScript ?? "";
    message.syntax = object.syntax ?? "";
    message.functionExample = object.functionExample ?? "";
    return message;
  },
};

function createBaseUpdatedRuntimeResponse(): UpdatedRuntimeResponse {
  return { runtime: undefined, logs: undefined };
}

export const UpdatedRuntimeResponse = {
  encode(message: UpdatedRuntimeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.runtime !== undefined) {
      DetailedRuntime.encode(message.runtime, writer.uint32(10).fork()).ldelim();
    }
    if (message.logs !== undefined) {
      Logs.encode(message.logs, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatedRuntimeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatedRuntimeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.runtime = DetailedRuntime.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.logs = Logs.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdatedRuntimeResponse {
    return {
      runtime: isSet(object.runtime) ? DetailedRuntime.fromJSON(object.runtime) : undefined,
      logs: isSet(object.logs) ? Logs.fromJSON(object.logs) : undefined,
    };
  },

  toJSON(message: UpdatedRuntimeResponse): unknown {
    const obj: any = {};
    if (message.runtime !== undefined) {
      obj.runtime = DetailedRuntime.toJSON(message.runtime);
    }
    if (message.logs !== undefined) {
      obj.logs = Logs.toJSON(message.logs);
    }
    return obj;
  },

  create(base?: DeepPartial<UpdatedRuntimeResponse>): UpdatedRuntimeResponse {
    return UpdatedRuntimeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UpdatedRuntimeResponse>): UpdatedRuntimeResponse {
    const message = createBaseUpdatedRuntimeResponse();
    message.runtime = (object.runtime !== undefined && object.runtime !== null)
      ? DetailedRuntime.fromPartial(object.runtime)
      : undefined;
    message.logs = (object.logs !== undefined && object.logs !== null) ? Logs.fromPartial(object.logs) : undefined;
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
      requestType: RuntimeConfiguration,
      requestStream: false,
      responseType: UpdatedRuntimeResponse,
      responseStream: false,
      options: {},
    },
    editRuntime: {
      name: "EditRuntime",
      requestType: RuntimeConfiguration,
      requestStream: false,
      responseType: UpdatedRuntimeResponse,
      responseStream: false,
      options: {},
    },
    getRuntimeDetails: {
      name: "GetRuntimeDetails",
      requestType: GetRuntimeDetailsRequest,
      requestStream: false,
      responseType: DetailedRuntime,
      responseStream: false,
      options: {},
    },
    getRuntimeTags: {
      name: "GetRuntimeTags",
      requestType: Empty,
      requestStream: false,
      responseType: DetailedRuntime,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface RuntimeServiceImplementation<CallContextExt = {}> {
  createRuntime(
    request: RuntimeConfiguration,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UpdatedRuntimeResponse>>;
  editRuntime(
    request: RuntimeConfiguration,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UpdatedRuntimeResponse>>;
  getRuntimeDetails(
    request: GetRuntimeDetailsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DetailedRuntime>>;
  getRuntimeTags(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DeepPartial<DetailedRuntime>>;
}

export interface RuntimeServiceClient<CallOptionsExt = {}> {
  createRuntime(
    request: DeepPartial<RuntimeConfiguration>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UpdatedRuntimeResponse>;
  editRuntime(
    request: DeepPartial<RuntimeConfiguration>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UpdatedRuntimeResponse>;
  getRuntimeDetails(
    request: DeepPartial<GetRuntimeDetailsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DetailedRuntime>;
  getRuntimeTags(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): AsyncIterable<DetailedRuntime>;
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
