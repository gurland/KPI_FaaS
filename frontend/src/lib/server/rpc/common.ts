/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "faas";

/** Used to specify empty request/response rpc types */
export interface Empty {
}

/** Used to pass logs from services/functions in a singular response */
export interface Logs {
  logLines: string[];
}

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
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

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<Empty>): Empty {
    return Empty.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<Empty>): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseLogs(): Logs {
  return { logLines: [] };
}

export const Logs = {
  encode(message: Logs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.logLines) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Logs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.logLines.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Logs {
    return {
      logLines: globalThis.Array.isArray(object?.logLines) ? object.logLines.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: Logs): unknown {
    const obj: any = {};
    if (message.logLines?.length) {
      obj.logLines = message.logLines;
    }
    return obj;
  },

  create(base?: DeepPartial<Logs>): Logs {
    return Logs.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Logs>): Logs {
    const message = createBaseLogs();
    message.logLines = object.logLines?.map((e) => e) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
