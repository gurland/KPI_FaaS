/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "faas";

export enum UserRole {
  USER = 0,
  ADMIN = 1,
  UNRECOGNIZED = -1,
}

export function userRoleFromJSON(object: any): UserRole {
  switch (object) {
    case 0:
    case "USER":
      return UserRole.USER;
    case 1:
    case "ADMIN":
      return UserRole.ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserRole.UNRECOGNIZED;
  }
}

export function userRoleToJSON(object: UserRole): string {
  switch (object) {
    case UserRole.USER:
      return "USER";
    case UserRole.ADMIN:
      return "ADMIN";
    case UserRole.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface User {
  userId: number;
  username: string;
  role: UserRole;
  updatedAtTimestamp: number;
}

export interface UserCredentialsRequest {
  username: string;
  password: string;
}

export interface VerifyUserRequest {
  userId: number;
}

function createBaseUser(): User {
  return { userId: 0, username: "", role: 0, updatedAtTimestamp: 0 };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint32(message.userId);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.role !== 0) {
      writer.uint32(24).int32(message.role);
    }
    if (message.updatedAtTimestamp !== 0) {
      writer.uint32(32).uint32(message.updatedAtTimestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.userId = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.updatedAtTimestamp = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      role: isSet(object.role) ? userRoleFromJSON(object.role) : 0,
      updatedAtTimestamp: isSet(object.updatedAtTimestamp) ? globalThis.Number(object.updatedAtTimestamp) : 0,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.role !== 0) {
      obj.role = userRoleToJSON(message.role);
    }
    if (message.updatedAtTimestamp !== 0) {
      obj.updatedAtTimestamp = Math.round(message.updatedAtTimestamp);
    }
    return obj;
  },

  create(base?: DeepPartial<User>): User {
    return User.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<User>): User {
    const message = createBaseUser();
    message.userId = object.userId ?? 0;
    message.username = object.username ?? "";
    message.role = object.role ?? 0;
    message.updatedAtTimestamp = object.updatedAtTimestamp ?? 0;
    return message;
  },
};

function createBaseUserCredentialsRequest(): UserCredentialsRequest {
  return { username: "", password: "" };
}

export const UserCredentialsRequest = {
  encode(message: UserCredentialsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserCredentialsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserCredentialsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserCredentialsRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: UserCredentialsRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create(base?: DeepPartial<UserCredentialsRequest>): UserCredentialsRequest {
    return UserCredentialsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserCredentialsRequest>): UserCredentialsRequest {
    const message = createBaseUserCredentialsRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseVerifyUserRequest(): VerifyUserRequest {
  return { userId: 0 };
}

export const VerifyUserRequest = {
  encode(message: VerifyUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint32(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerifyUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerifyUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.userId = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerifyUserRequest {
    return { userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0 };
  },

  toJSON(message: VerifyUserRequest): unknown {
    const obj: any = {};
    if (message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },

  create(base?: DeepPartial<VerifyUserRequest>): VerifyUserRequest {
    return VerifyUserRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<VerifyUserRequest>): VerifyUserRequest {
    const message = createBaseVerifyUserRequest();
    message.userId = object.userId ?? 0;
    return message;
  },
};

export type AuthServiceDefinition = typeof AuthServiceDefinition;
export const AuthServiceDefinition = {
  name: "AuthService",
  fullName: "faas.AuthService",
  methods: {
    createUser: {
      name: "CreateUser",
      requestType: UserCredentialsRequest,
      requestStream: false,
      responseType: User,
      responseStream: false,
      options: {},
    },
    getUser: {
      name: "GetUser",
      requestType: UserCredentialsRequest,
      requestStream: false,
      responseType: User,
      responseStream: false,
      options: {},
    },
    verifyUser: {
      name: "VerifyUser",
      requestType: VerifyUserRequest,
      requestStream: false,
      responseType: User,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AuthServiceImplementation<CallContextExt = {}> {
  createUser(request: UserCredentialsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<User>>;
  getUser(request: UserCredentialsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<User>>;
  verifyUser(request: VerifyUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<User>>;
}

export interface AuthServiceClient<CallOptionsExt = {}> {
  createUser(request: DeepPartial<UserCredentialsRequest>, options?: CallOptions & CallOptionsExt): Promise<User>;
  getUser(request: DeepPartial<UserCredentialsRequest>, options?: CallOptions & CallOptionsExt): Promise<User>;
  verifyUser(request: DeepPartial<VerifyUserRequest>, options?: CallOptions & CallOptionsExt): Promise<User>;
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
