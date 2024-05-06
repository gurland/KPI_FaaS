/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./common";

export const protobufPackage = "faas";

export interface FunctionConfiguration {
  functionName: string;
  runtimeTag: string;
  code: string;
}

export interface DetailedFunction {
  functionId: number;
  runtimeTag: string;
  functionName: string;
  code: string;
}

export interface BriefFunction {
  functionId: number;
  runtimeTag: string;
  functionName: string;
}

export interface ChangeFunctionCodeRequest {
  functionId: number;
  code: string;
}

export interface ChangeFunctionRuntimeRequest {
  functionId: number;
  runtimeTag: string;
}

function createBaseFunctionConfiguration(): FunctionConfiguration {
  return { functionName: "", runtimeTag: "", code: "" };
}

export const FunctionConfiguration = {
  encode(message: FunctionConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionName !== "") {
      writer.uint32(10).string(message.functionName);
    }
    if (message.runtimeTag !== "") {
      writer.uint32(18).string(message.runtimeTag);
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
          if (tag !== 18) {
            break;
          }

          message.runtimeTag = reader.string();
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
      runtimeTag: isSet(object.runtimeTag) ? globalThis.String(object.runtimeTag) : "",
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    };
  },

  toJSON(message: FunctionConfiguration): unknown {
    const obj: any = {};
    if (message.functionName !== "") {
      obj.functionName = message.functionName;
    }
    if (message.runtimeTag !== "") {
      obj.runtimeTag = message.runtimeTag;
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
    message.runtimeTag = object.runtimeTag ?? "";
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseDetailedFunction(): DetailedFunction {
  return { functionId: 0, runtimeTag: "", functionName: "", code: "" };
}

export const DetailedFunction = {
  encode(message: DetailedFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionId !== 0) {
      writer.uint32(8).uint32(message.functionId);
    }
    if (message.runtimeTag !== "") {
      writer.uint32(18).string(message.runtimeTag);
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
          if (tag !== 18) {
            break;
          }

          message.runtimeTag = reader.string();
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
      runtimeTag: isSet(object.runtimeTag) ? globalThis.String(object.runtimeTag) : "",
      functionName: isSet(object.functionName) ? globalThis.String(object.functionName) : "",
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    };
  },

  toJSON(message: DetailedFunction): unknown {
    const obj: any = {};
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.runtimeTag !== "") {
      obj.runtimeTag = message.runtimeTag;
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
    message.runtimeTag = object.runtimeTag ?? "";
    message.functionName = object.functionName ?? "";
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseBriefFunction(): BriefFunction {
  return { functionId: 0, runtimeTag: "", functionName: "" };
}

export const BriefFunction = {
  encode(message: BriefFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionId !== 0) {
      writer.uint32(8).uint32(message.functionId);
    }
    if (message.runtimeTag !== "") {
      writer.uint32(18).string(message.runtimeTag);
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
          if (tag !== 18) {
            break;
          }

          message.runtimeTag = reader.string();
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
      runtimeTag: isSet(object.runtimeTag) ? globalThis.String(object.runtimeTag) : "",
      functionName: isSet(object.functionName) ? globalThis.String(object.functionName) : "",
    };
  },

  toJSON(message: BriefFunction): unknown {
    const obj: any = {};
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.runtimeTag !== "") {
      obj.runtimeTag = message.runtimeTag;
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
    message.runtimeTag = object.runtimeTag ?? "";
    message.functionName = object.functionName ?? "";
    return message;
  },
};

function createBaseChangeFunctionCodeRequest(): ChangeFunctionCodeRequest {
  return { functionId: 0, code: "" };
}

export const ChangeFunctionCodeRequest = {
  encode(message: ChangeFunctionCodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionId !== 0) {
      writer.uint32(8).uint32(message.functionId);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeFunctionCodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeFunctionCodeRequest();
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
          if (tag !== 18) {
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

  fromJSON(object: any): ChangeFunctionCodeRequest {
    return {
      functionId: isSet(object.functionId) ? globalThis.Number(object.functionId) : 0,
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    };
  },

  toJSON(message: ChangeFunctionCodeRequest): unknown {
    const obj: any = {};
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create(base?: DeepPartial<ChangeFunctionCodeRequest>): ChangeFunctionCodeRequest {
    return ChangeFunctionCodeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ChangeFunctionCodeRequest>): ChangeFunctionCodeRequest {
    const message = createBaseChangeFunctionCodeRequest();
    message.functionId = object.functionId ?? 0;
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseChangeFunctionRuntimeRequest(): ChangeFunctionRuntimeRequest {
  return { functionId: 0, runtimeTag: "" };
}

export const ChangeFunctionRuntimeRequest = {
  encode(message: ChangeFunctionRuntimeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.functionId !== 0) {
      writer.uint32(8).uint32(message.functionId);
    }
    if (message.runtimeTag !== "") {
      writer.uint32(18).string(message.runtimeTag);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeFunctionRuntimeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeFunctionRuntimeRequest();
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
          if (tag !== 18) {
            break;
          }

          message.runtimeTag = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeFunctionRuntimeRequest {
    return {
      functionId: isSet(object.functionId) ? globalThis.Number(object.functionId) : 0,
      runtimeTag: isSet(object.runtimeTag) ? globalThis.String(object.runtimeTag) : "",
    };
  },

  toJSON(message: ChangeFunctionRuntimeRequest): unknown {
    const obj: any = {};
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.runtimeTag !== "") {
      obj.runtimeTag = message.runtimeTag;
    }
    return obj;
  },

  create(base?: DeepPartial<ChangeFunctionRuntimeRequest>): ChangeFunctionRuntimeRequest {
    return ChangeFunctionRuntimeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ChangeFunctionRuntimeRequest>): ChangeFunctionRuntimeRequest {
    const message = createBaseChangeFunctionRuntimeRequest();
    message.functionId = object.functionId ?? 0;
    message.runtimeTag = object.runtimeTag ?? "";
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
    changeFunctionCode: {
      name: "ChangeFunctionCode",
      requestType: ChangeFunctionCodeRequest,
      requestStream: false,
      responseType: DetailedFunction,
      responseStream: false,
      options: {},
    },
    changeFunctionRuntime: {
      name: "ChangeFunctionRuntime",
      requestType: ChangeFunctionRuntimeRequest,
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
  changeFunctionCode(
    request: ChangeFunctionCodeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DetailedFunction>>;
  changeFunctionRuntime(
    request: ChangeFunctionRuntimeRequest,
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
  changeFunctionCode(
    request: DeepPartial<ChangeFunctionCodeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DetailedFunction>;
  changeFunctionRuntime(
    request: DeepPartial<ChangeFunctionRuntimeRequest>,
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
