/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "faas";

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 * The JSON representation for `NullValue` is JSON `null`.
 */
export enum NullValue {
  /** NULL_VALUE - Null value. */
  NULL_VALUE = 0,
  UNRECOGNIZED = -1,
}

export function nullValueFromJSON(object: any): NullValue {
  switch (object) {
    case 0:
    case "NULL_VALUE":
      return NullValue.NULL_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NullValue.UNRECOGNIZED;
  }
}

export function nullValueToJSON(object: NullValue): string {
  switch (object) {
    case NullValue.NULL_VALUE:
      return "NULL_VALUE";
    case NullValue.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Used to specify empty request/response rpc types */
export interface Empty {
}

/** Used to pass logs from services/functions in a singular response */
export interface Logs {
  logLines: string[];
}

/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 */
export interface Struct {
  /** Unordered map of dynamically typed values. */
  fields: { [key: string]: Value };
}

export interface Struct_FieldsEntry {
  key: string;
  value: Value | undefined;
}

/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 */
export interface Value {
  /** Represents a null value. */
  nullValue?:
    | NullValue
    | undefined;
  /** Represents a double value. */
  numberValue?:
    | number
    | undefined;
  /** Represents a string value. */
  stringValue?:
    | string
    | undefined;
  /** Represents a boolean value. */
  boolValue?:
    | boolean
    | undefined;
  /** Represents a structured value. */
  structValue?:
    | Struct
    | undefined;
  /** Represents a repeated `Value`. */
  listValue?: ListValue | undefined;
}

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values: Value[];
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

function createBaseStruct(): Struct {
  return { fields: {} };
}

export const Struct = {
  encode(message: Struct, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.fields).forEach(([key, value]) => {
      Struct_FieldsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Struct {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStruct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = Struct_FieldsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.fields[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Struct {
    return {
      fields: isObject(object.fields)
        ? Object.entries(object.fields).reduce<{ [key: string]: Value }>((acc, [key, value]) => {
          acc[key] = Value.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Struct): unknown {
    const obj: any = {};
    if (message.fields) {
      const entries = Object.entries(message.fields);
      if (entries.length > 0) {
        obj.fields = {};
        entries.forEach(([k, v]) => {
          obj.fields[k] = Value.toJSON(v);
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<Struct>): Struct {
    return Struct.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Struct>): Struct {
    const message = createBaseStruct();
    message.fields = Object.entries(object.fields ?? {}).reduce<{ [key: string]: Value }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Value.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseStruct_FieldsEntry(): Struct_FieldsEntry {
  return { key: "", value: undefined };
}

export const Struct_FieldsEntry = {
  encode(message: Struct_FieldsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Struct_FieldsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStruct_FieldsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Value.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Struct_FieldsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Struct_FieldsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Value.toJSON(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<Struct_FieldsEntry>): Struct_FieldsEntry {
    return Struct_FieldsEntry.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Struct_FieldsEntry>): Struct_FieldsEntry {
    const message = createBaseStruct_FieldsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Value.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseValue(): Value {
  return {
    nullValue: undefined,
    numberValue: undefined,
    stringValue: undefined,
    boolValue: undefined,
    structValue: undefined,
    listValue: undefined,
  };
}

export const Value = {
  encode(message: Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nullValue !== undefined) {
      writer.uint32(8).int32(message.nullValue);
    }
    if (message.numberValue !== undefined) {
      writer.uint32(17).double(message.numberValue);
    }
    if (message.stringValue !== undefined) {
      writer.uint32(26).string(message.stringValue);
    }
    if (message.boolValue !== undefined) {
      writer.uint32(32).bool(message.boolValue);
    }
    if (message.structValue !== undefined) {
      Struct.encode(message.structValue, writer.uint32(42).fork()).ldelim();
    }
    if (message.listValue !== undefined) {
      ListValue.encode(message.listValue, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Value {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nullValue = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.numberValue = reader.double();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.stringValue = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.boolValue = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.structValue = Struct.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.listValue = ListValue.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Value {
    return {
      nullValue: isSet(object.nullValue) ? nullValueFromJSON(object.nullValue) : undefined,
      numberValue: isSet(object.numberValue) ? globalThis.Number(object.numberValue) : undefined,
      stringValue: isSet(object.stringValue) ? globalThis.String(object.stringValue) : undefined,
      boolValue: isSet(object.boolValue) ? globalThis.Boolean(object.boolValue) : undefined,
      structValue: isSet(object.structValue) ? Struct.fromJSON(object.structValue) : undefined,
      listValue: isSet(object.listValue) ? ListValue.fromJSON(object.listValue) : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    if (message.nullValue !== undefined) {
      obj.nullValue = nullValueToJSON(message.nullValue);
    }
    if (message.numberValue !== undefined) {
      obj.numberValue = message.numberValue;
    }
    if (message.stringValue !== undefined) {
      obj.stringValue = message.stringValue;
    }
    if (message.boolValue !== undefined) {
      obj.boolValue = message.boolValue;
    }
    if (message.structValue !== undefined) {
      obj.structValue = Struct.toJSON(message.structValue);
    }
    if (message.listValue !== undefined) {
      obj.listValue = ListValue.toJSON(message.listValue);
    }
    return obj;
  },

  create(base?: DeepPartial<Value>): Value {
    return Value.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Value>): Value {
    const message = createBaseValue();
    message.nullValue = object.nullValue ?? undefined;
    message.numberValue = object.numberValue ?? undefined;
    message.stringValue = object.stringValue ?? undefined;
    message.boolValue = object.boolValue ?? undefined;
    message.structValue = (object.structValue !== undefined && object.structValue !== null)
      ? Struct.fromPartial(object.structValue)
      : undefined;
    message.listValue = (object.listValue !== undefined && object.listValue !== null)
      ? ListValue.fromPartial(object.listValue)
      : undefined;
    return message;
  },
};

function createBaseListValue(): ListValue {
  return { values: [] };
}

export const ListValue = {
  encode(message: ListValue, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.values) {
      Value.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListValue {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.values.push(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ListValue {
    return { values: globalThis.Array.isArray(object?.values) ? object.values.map((e: any) => Value.fromJSON(e)) : [] };
  },

  toJSON(message: ListValue): unknown {
    const obj: any = {};
    if (message.values?.length) {
      obj.values = message.values.map((e) => Value.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ListValue>): ListValue {
    return ListValue.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListValue>): ListValue {
    const message = createBaseListValue();
    message.values = object.values?.map((e) => Value.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
