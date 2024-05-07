/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Logs } from "./common";
import { DetailedFunction } from "./function_service";
import { BriefRuntime } from "./runtime_service";

export const protobufPackage = "faas";

export interface InvokeFunctionRequest {
  function: DetailedFunction | undefined;
  runtime: BriefRuntime | undefined;
  jsonTriggerContext: string;
}

export interface InvocationResult {
  json: string;
  logLines: Logs | undefined;
}

export interface RegisterNodeRequest {
  ip: string;
}

export interface NodeConfiguration {
}

function createBaseInvokeFunctionRequest(): InvokeFunctionRequest {
  return { function: undefined, runtime: undefined, jsonTriggerContext: "" };
}

export const InvokeFunctionRequest = {
  encode(message: InvokeFunctionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.function !== undefined) {
      DetailedFunction.encode(message.function, writer.uint32(10).fork()).ldelim();
    }
    if (message.runtime !== undefined) {
      BriefRuntime.encode(message.runtime, writer.uint32(18).fork()).ldelim();
    }
    if (message.jsonTriggerContext !== "") {
      writer.uint32(26).string(message.jsonTriggerContext);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvokeFunctionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvokeFunctionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.function = DetailedFunction.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.runtime = BriefRuntime.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jsonTriggerContext = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InvokeFunctionRequest {
    return {
      function: isSet(object.function) ? DetailedFunction.fromJSON(object.function) : undefined,
      runtime: isSet(object.runtime) ? BriefRuntime.fromJSON(object.runtime) : undefined,
      jsonTriggerContext: isSet(object.jsonTriggerContext) ? globalThis.String(object.jsonTriggerContext) : "",
    };
  },

  toJSON(message: InvokeFunctionRequest): unknown {
    const obj: any = {};
    if (message.function !== undefined) {
      obj.function = DetailedFunction.toJSON(message.function);
    }
    if (message.runtime !== undefined) {
      obj.runtime = BriefRuntime.toJSON(message.runtime);
    }
    if (message.jsonTriggerContext !== "") {
      obj.jsonTriggerContext = message.jsonTriggerContext;
    }
    return obj;
  },

  create(base?: DeepPartial<InvokeFunctionRequest>): InvokeFunctionRequest {
    return InvokeFunctionRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InvokeFunctionRequest>): InvokeFunctionRequest {
    const message = createBaseInvokeFunctionRequest();
    message.function = (object.function !== undefined && object.function !== null)
      ? DetailedFunction.fromPartial(object.function)
      : undefined;
    message.runtime = (object.runtime !== undefined && object.runtime !== null)
      ? BriefRuntime.fromPartial(object.runtime)
      : undefined;
    message.jsonTriggerContext = object.jsonTriggerContext ?? "";
    return message;
  },
};

function createBaseInvocationResult(): InvocationResult {
  return { json: "", logLines: undefined };
}

export const InvocationResult = {
  encode(message: InvocationResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.json !== "") {
      writer.uint32(10).string(message.json);
    }
    if (message.logLines !== undefined) {
      Logs.encode(message.logLines, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvocationResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvocationResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.json = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.logLines = Logs.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InvocationResult {
    return {
      json: isSet(object.json) ? globalThis.String(object.json) : "",
      logLines: isSet(object.logLines) ? Logs.fromJSON(object.logLines) : undefined,
    };
  },

  toJSON(message: InvocationResult): unknown {
    const obj: any = {};
    if (message.json !== "") {
      obj.json = message.json;
    }
    if (message.logLines !== undefined) {
      obj.logLines = Logs.toJSON(message.logLines);
    }
    return obj;
  },

  create(base?: DeepPartial<InvocationResult>): InvocationResult {
    return InvocationResult.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InvocationResult>): InvocationResult {
    const message = createBaseInvocationResult();
    message.json = object.json ?? "";
    message.logLines = (object.logLines !== undefined && object.logLines !== null)
      ? Logs.fromPartial(object.logLines)
      : undefined;
    return message;
  },
};

function createBaseRegisterNodeRequest(): RegisterNodeRequest {
  return { ip: "" };
}

export const RegisterNodeRequest = {
  encode(message: RegisterNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ip !== "") {
      writer.uint32(10).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterNodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ip = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RegisterNodeRequest {
    return { ip: isSet(object.ip) ? globalThis.String(object.ip) : "" };
  },

  toJSON(message: RegisterNodeRequest): unknown {
    const obj: any = {};
    if (message.ip !== "") {
      obj.ip = message.ip;
    }
    return obj;
  },

  create(base?: DeepPartial<RegisterNodeRequest>): RegisterNodeRequest {
    return RegisterNodeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RegisterNodeRequest>): RegisterNodeRequest {
    const message = createBaseRegisterNodeRequest();
    message.ip = object.ip ?? "";
    return message;
  },
};

function createBaseNodeConfiguration(): NodeConfiguration {
  return {};
}

export const NodeConfiguration = {
  encode(_: NodeConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): NodeConfiguration {
    return {};
  },

  toJSON(_: NodeConfiguration): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<NodeConfiguration>): NodeConfiguration {
    return NodeConfiguration.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<NodeConfiguration>): NodeConfiguration {
    const message = createBaseNodeConfiguration();
    return message;
  },
};

export type LoadBalancerServiceDefinition = typeof LoadBalancerServiceDefinition;
export const LoadBalancerServiceDefinition = {
  name: "LoadBalancerService",
  fullName: "faas.LoadBalancerService",
  methods: {
    invokeFunction: {
      name: "InvokeFunction",
      requestType: InvokeFunctionRequest,
      requestStream: false,
      responseType: InvocationResult,
      responseStream: false,
      options: {},
    },
    registerNode: {
      name: "RegisterNode",
      requestType: RegisterNodeRequest,
      requestStream: false,
      responseType: NodeConfiguration,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface LoadBalancerServiceImplementation<CallContextExt = {}> {
  invokeFunction(
    request: InvokeFunctionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvocationResult>>;
  registerNode(
    request: RegisterNodeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeConfiguration>>;
}

export interface LoadBalancerServiceClient<CallOptionsExt = {}> {
  invokeFunction(
    request: DeepPartial<InvokeFunctionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvocationResult>;
  registerNode(
    request: DeepPartial<RegisterNodeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeConfiguration>;
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
