/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Logs, Value } from "./common";
import { DetailedFunction } from "./function_service";
import { BriefRuntime } from "./runtime_service";

export const protobufPackage = "faas";

export interface InvokeFunctionRequest {
  function: DetailedFunction | undefined;
  runtime: BriefRuntime | undefined;
  triggerContext: Value | undefined;
}

export interface InvocationResult {
  returnedValue: Value | undefined;
  logLines: Logs | undefined;
}

function createBaseInvokeFunctionRequest(): InvokeFunctionRequest {
  return { function: undefined, runtime: undefined, triggerContext: undefined };
}

export const InvokeFunctionRequest = {
  encode(message: InvokeFunctionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.function !== undefined) {
      DetailedFunction.encode(message.function, writer.uint32(10).fork()).ldelim();
    }
    if (message.runtime !== undefined) {
      BriefRuntime.encode(message.runtime, writer.uint32(18).fork()).ldelim();
    }
    if (message.triggerContext !== undefined) {
      Value.encode(message.triggerContext, writer.uint32(26).fork()).ldelim();
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

          message.triggerContext = Value.decode(reader, reader.uint32());
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
      triggerContext: isSet(object.triggerContext) ? Value.fromJSON(object.triggerContext) : undefined,
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
    if (message.triggerContext !== undefined) {
      obj.triggerContext = Value.toJSON(message.triggerContext);
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
    message.triggerContext = (object.triggerContext !== undefined && object.triggerContext !== null)
      ? Value.fromPartial(object.triggerContext)
      : undefined;
    return message;
  },
};

function createBaseInvocationResult(): InvocationResult {
  return { returnedValue: undefined, logLines: undefined };
}

export const InvocationResult = {
  encode(message: InvocationResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.returnedValue !== undefined) {
      Value.encode(message.returnedValue, writer.uint32(10).fork()).ldelim();
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

          message.returnedValue = Value.decode(reader, reader.uint32());
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
      returnedValue: isSet(object.returnedValue) ? Value.fromJSON(object.returnedValue) : undefined,
      logLines: isSet(object.logLines) ? Logs.fromJSON(object.logLines) : undefined,
    };
  },

  toJSON(message: InvocationResult): unknown {
    const obj: any = {};
    if (message.returnedValue !== undefined) {
      obj.returnedValue = Value.toJSON(message.returnedValue);
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
    message.returnedValue = (object.returnedValue !== undefined && object.returnedValue !== null)
      ? Value.fromPartial(object.returnedValue)
      : undefined;
    message.logLines = (object.logLines !== undefined && object.logLines !== null)
      ? Logs.fromPartial(object.logLines)
      : undefined;
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
  },
} as const;

export interface LoadBalancerServiceImplementation<CallContextExt = {}> {
  invokeFunction(
    request: InvokeFunctionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvocationResult>>;
}

export interface LoadBalancerServiceClient<CallOptionsExt = {}> {
  invokeFunction(
    request: DeepPartial<InvokeFunctionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvocationResult>;
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
