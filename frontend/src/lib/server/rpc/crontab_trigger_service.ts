/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./common";

export const protobufPackage = "faas";

export interface CrontabTriggerConfiguration {
  cronExpression: string;
  functionId: number;
  description: string;
}

export interface CrontabTrigger {
  triggerId: number;
  functionId: number;
  cronExpression: string;
  description: string;
}

function createBaseCrontabTriggerConfiguration(): CrontabTriggerConfiguration {
  return { cronExpression: "", functionId: 0, description: "" };
}

export const CrontabTriggerConfiguration = {
  encode(message: CrontabTriggerConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cronExpression !== "") {
      writer.uint32(10).string(message.cronExpression);
    }
    if (message.functionId !== 0) {
      writer.uint32(16).uint32(message.functionId);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CrontabTriggerConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCrontabTriggerConfiguration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cronExpression = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.functionId = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CrontabTriggerConfiguration {
    return {
      cronExpression: isSet(object.cronExpression) ? globalThis.String(object.cronExpression) : "",
      functionId: isSet(object.functionId) ? globalThis.Number(object.functionId) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: CrontabTriggerConfiguration): unknown {
    const obj: any = {};
    if (message.cronExpression !== "") {
      obj.cronExpression = message.cronExpression;
    }
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create(base?: DeepPartial<CrontabTriggerConfiguration>): CrontabTriggerConfiguration {
    return CrontabTriggerConfiguration.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CrontabTriggerConfiguration>): CrontabTriggerConfiguration {
    const message = createBaseCrontabTriggerConfiguration();
    message.cronExpression = object.cronExpression ?? "";
    message.functionId = object.functionId ?? 0;
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseCrontabTrigger(): CrontabTrigger {
  return { triggerId: 0, functionId: 0, cronExpression: "", description: "" };
}

export const CrontabTrigger = {
  encode(message: CrontabTrigger, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.triggerId !== 0) {
      writer.uint32(8).uint32(message.triggerId);
    }
    if (message.functionId !== 0) {
      writer.uint32(16).uint32(message.functionId);
    }
    if (message.cronExpression !== "") {
      writer.uint32(26).string(message.cronExpression);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CrontabTrigger {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCrontabTrigger();
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
          if (tag !== 16) {
            break;
          }

          message.functionId = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cronExpression = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CrontabTrigger {
    return {
      triggerId: isSet(object.triggerId) ? globalThis.Number(object.triggerId) : 0,
      functionId: isSet(object.functionId) ? globalThis.Number(object.functionId) : 0,
      cronExpression: isSet(object.cronExpression) ? globalThis.String(object.cronExpression) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
    };
  },

  toJSON(message: CrontabTrigger): unknown {
    const obj: any = {};
    if (message.triggerId !== 0) {
      obj.triggerId = Math.round(message.triggerId);
    }
    if (message.functionId !== 0) {
      obj.functionId = Math.round(message.functionId);
    }
    if (message.cronExpression !== "") {
      obj.cronExpression = message.cronExpression;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    return obj;
  },

  create(base?: DeepPartial<CrontabTrigger>): CrontabTrigger {
    return CrontabTrigger.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CrontabTrigger>): CrontabTrigger {
    const message = createBaseCrontabTrigger();
    message.triggerId = object.triggerId ?? 0;
    message.functionId = object.functionId ?? 0;
    message.cronExpression = object.cronExpression ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

export type CrontabTriggerServiceDefinition = typeof CrontabTriggerServiceDefinition;
export const CrontabTriggerServiceDefinition = {
  name: "CrontabTriggerService",
  fullName: "faas.CrontabTriggerService",
  methods: {
    createCrontabTrigger: {
      name: "CreateCrontabTrigger",
      requestType: CrontabTriggerConfiguration,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface CrontabTriggerServiceImplementation<CallContextExt = {}> {
  createCrontabTrigger(
    request: CrontabTriggerConfiguration,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Empty>>;
}

export interface CrontabTriggerServiceClient<CallOptionsExt = {}> {
  createCrontabTrigger(
    request: DeepPartial<CrontabTriggerConfiguration>,
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
