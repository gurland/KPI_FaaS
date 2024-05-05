/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./common";

export const protobufPackage = "faas";

export interface FunctionConfiguration {
  functionName: string;
  runtimeTag: number;
  code: string;
}

export interface DetailedFunction {
  functionId: number;
  runtimeTag: number;
  functionName: string;
  code: string;
}

export interface BriefFunction {
  functionId: number;
  runtimeTag: number;
  functionName: string;
}

function createBaseFunctionConfiguration(): FunctionConfiguration {
  return { functionName: "", runtimeTag: 0, code: "" };
}

export const FunctionConfiguration = {
  encode(message: FunctionConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionName !== "") {
      writer.uint32(10).string(message.functionName);
    }
    if (message.runtimeTag !== 0) {
      writer.uint32(16).uint32(message.runtimeTag);
    }
    if (message.code !== "") {
      writer.uint32(26).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FunctionConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFunctionConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.functionName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.runtimeTag = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FunctionConfiguration {
    return {
      functionName: isSet(object.functionName) ? globalThis.String(object.functionName) : "",
      runtimeTag: isSet(object.runtimeTag) ? globalThis.Number(object.runtimeTag) : 0,
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    };
  },

  toJSON(message: FunctionConfiguration): unknown {
    const obj: any = {};
    if (message.functionName !== "") {
      obj.functionName = message.functionName;
    }
    if (message.runtimeTag !== 0) {
      obj.runtimeTag = Math.round(message.runtimeTag);
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create(base?: DeepPartial<FunctionConfiguration>): FunctionConfiguration {
    return FunctionConfiguration.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FunctionConfiguration>): FunctionConfiguration {
    const message = createBaseFunctionConfiguration();
    message.functionName = object.functionName ?? "";
    message.runtimeTag = object.runtimeTag ?? 0;
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseDetailedFunction(): DetailedFunction {
  return { functionId: 0, runtimeTag: 0, functionName: "", code: "" };
}

export const DetailedFunction = {
  encode(message: DetailedFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionId !== 0) {
      writer.uint32(8).uint32(message.functionId);
    }
    if (message.runtimeTag !== 0) {
      writer.uint32(16).uint32(message.runtimeTag);
    }
    if (message.functionName !== "") {
      writer.uint32(26).string(message.functionName);
    }
    if (message.code !== "") {
      writer.uint32(34).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DetailedFunction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetailedFunction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.functionId = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.runtimeTag = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.functionName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DetailedFunction {
    return {
      functionId: isSet(object.functionId) ? globalThis.Number(object.functionId) : 0,
      runtimeTag: isSet(object.runtimeTag) ? globalThis.Number(object.runtimeTag) : 0,
      functionName: isSet(object.functionName) ? globalThis.String(object.functionName) : "",
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    };
  },

  toJSON(message: DetailedFunction): unknown {
    const obj: any = {};
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.runtimeTag !== 0) {
      obj.runtimeTag = Math.round(message.runtimeTag);
    }
    if (message.functionName !== "") {
      obj.functionName = message.functionName;
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create(base?: DeepPartial<DetailedFunction>): DetailedFunction {
    return DetailedFunction.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DetailedFunction>): DetailedFunction {
    const message = createBaseDetailedFunction();
    message.functionId = object.functionId ?? 0;
    message.runtimeTag = object.runtimeTag ?? 0;
    message.functionName = object.functionName ?? "";
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseBriefFunction(): BriefFunction {
  return { functionId: 0, runtimeTag: 0, functionName: "" };
}

export const BriefFunction = {
  encode(message: BriefFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionId !== 0) {
      writer.uint32(8).uint32(message.functionId);
    }
    if (message.runtimeTag !== 0) {
      writer.uint32(16).uint32(message.runtimeTag);
    }
    if (message.functionName !== "") {
      writer.uint32(26).string(message.functionName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BriefFunction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBriefFunction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.functionId = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.runtimeTag = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.functionName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BriefFunction {
    return {
      functionId: isSet(object.functionId) ? globalThis.Number(object.functionId) : 0,
      runtimeTag: isSet(object.runtimeTag) ? globalThis.Number(object.runtimeTag) : 0,
      functionName: isSet(object.functionName) ? globalThis.String(object.functionName) : "",
    };
  },

  toJSON(message: BriefFunction): unknown {
    const obj: any = {};
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.runtimeTag !== 0) {
      obj.runtimeTag = Math.round(message.runtimeTag);
    }
    if (message.functionName !== "") {
      obj.functionName = message.functionName;
    }
    return obj;
  },

  create(base?: DeepPartial<BriefFunction>): BriefFunction {
    return BriefFunction.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BriefFunction>): BriefFunction {
    const message = createBaseBriefFunction();
    message.functionId = object.functionId ?? 0;
    message.runtimeTag = object.runtimeTag ?? 0;
    message.functionName = object.functionName ?? "";
    return message;
  },
};

export type FunctionServiceDefinition = typeof FunctionServiceDefinition;
export const FunctionServiceDefinition = {
  name: "FunctionService",
  fullName: "faas.FunctionService",
  methods: {
    createFunction: {
      name: "CreateFunction",
      requestType: FunctionConfiguration,
      requestStream: false,
      responseType: DetailedFunction,
      responseStream: false,
      options: {},
    },
    editFunction: {
      name: "EditFunction",
      requestType: FunctionConfiguration,
      requestStream: false,
      responseType: DetailedFunction,
      responseStream: false,
      options: {},
    },
    deleteFunction: {
      name: "DeleteFunction",
      requestType: BriefFunction,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    getFunction: {
      name: "GetFunction",
      requestType: BriefFunction,
      requestStream: false,
      responseType: DetailedFunction,
      responseStream: false,
      options: {},
    },
    getFunctions: {
      name: "GetFunctions",
      requestType: Empty,
      requestStream: false,
      responseType: BriefFunction,
      responseStream: true,
      options: {},
    },
  },
} as const;

export interface FunctionServiceImplementation<CallContextExt = {}> {
  createFunction(
    request: FunctionConfiguration,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DetailedFunction>>;
  editFunction(
    request: FunctionConfiguration,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DetailedFunction>>;
  deleteFunction(request: BriefFunction, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  getFunction(request: BriefFunction, context: CallContext & CallContextExt): Promise<DeepPartial<DetailedFunction>>;
  getFunctions(
    request: Empty,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DeepPartial<BriefFunction>>;
}

export interface FunctionServiceClient<CallOptionsExt = {}> {
  createFunction(
    request: DeepPartial<FunctionConfiguration>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DetailedFunction>;
  editFunction(
    request: DeepPartial<FunctionConfiguration>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DetailedFunction>;
  deleteFunction(request: DeepPartial<BriefFunction>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  getFunction(request: DeepPartial<BriefFunction>, options?: CallOptions & CallOptionsExt): Promise<DetailedFunction>;
  getFunctions(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): AsyncIterable<BriefFunction>;
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
