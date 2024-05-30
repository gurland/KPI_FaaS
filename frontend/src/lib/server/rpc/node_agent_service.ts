/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./common";
import { DetailedFunction } from "./function_service";
import { InvocationResult, InvokeFunctionRequest } from "./load_balancer_service";
import { BriefRuntime } from "./runtime_service";

export const protobufPackage = "faas";

export interface LaunchRuntimeRequest {
  runtime: BriefRuntime | undefined;
  function: DetailedFunction | undefined;
}

function createBaseLaunchRuntimeRequest(): LaunchRuntimeRequest {
  return { runtime: undefined, function: undefined };
}

export const LaunchRuntimeRequest = {
  encode(message: LaunchRuntimeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.runtime !== undefined) {
      BriefRuntime.encode(message.runtime, writer.uint32(10).fork()).ldelim();
    }
    if (message.function !== undefined) {
      DetailedFunction.encode(message.function, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LaunchRuntimeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLaunchRuntimeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.runtime = BriefRuntime.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.function = DetailedFunction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LaunchRuntimeRequest {
    return {
      runtime: isSet(object.runtime) ? BriefRuntime.fromJSON(object.runtime) : undefined,
      function: isSet(object.function) ? DetailedFunction.fromJSON(object.function) : undefined,
    };
  },

  toJSON(message: LaunchRuntimeRequest): unknown {
    const obj: any = {};
    if (message.runtime !== undefined) {
      obj.runtime = BriefRuntime.toJSON(message.runtime);
    }
    if (message.function !== undefined) {
      obj.function = DetailedFunction.toJSON(message.function);
    }
    return obj;
  },

  create(base?: DeepPartial<LaunchRuntimeRequest>): LaunchRuntimeRequest {
    return LaunchRuntimeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LaunchRuntimeRequest>): LaunchRuntimeRequest {
    const message = createBaseLaunchRuntimeRequest();
    message.runtime = (object.runtime !== undefined && object.runtime !== null)
      ? BriefRuntime.fromPartial(object.runtime)
      : undefined;
    message.function = (object.function !== undefined && object.function !== null)
      ? DetailedFunction.fromPartial(object.function)
      : undefined;
    return message;
  },
};

export type AgentServiceDefinition = typeof AgentServiceDefinition;
export const AgentServiceDefinition = {
  name: "AgentService",
  fullName: "faas.AgentService",
  methods: {
    launchRuntime: {
      name: "LaunchRuntime",
      requestType: LaunchRuntimeRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    stopRuntime: {
      name: "StopRuntime",
      requestType: BriefRuntime,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
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

export interface AgentServiceImplementation<CallContextExt = {}> {
  launchRuntime(request: LaunchRuntimeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  stopRuntime(request: BriefRuntime, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  invokeFunction(
    request: InvokeFunctionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvocationResult>>;
}

export interface AgentServiceClient<CallOptionsExt = {}> {
  launchRuntime(request: DeepPartial<LaunchRuntimeRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  stopRuntime(request: DeepPartial<BriefRuntime>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
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
