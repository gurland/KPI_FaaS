# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: auth_service.proto, common.proto, crontab_trigger_service.proto, function_service.proto, load_balancer_service.proto, runtime_service.proto
# plugin: python-betterproto
# This file has been @generated

from dataclasses import dataclass
from typing import (
    TYPE_CHECKING,
    AsyncIterator,
    Dict,
    List,
    Optional,
)

import betterproto
import grpclib
from betterproto.grpc.grpclib_server import ServiceBase


if TYPE_CHECKING:
    import grpclib.server
    from betterproto.grpc.grpclib_client import MetadataLike
    from grpclib.metadata import Deadline


class NullValue(betterproto.Enum):
    """
    `NullValue` is a singleton enumeration to represent the null value for the
    `Value` type union. The JSON representation for `NullValue` is JSON `null`.
    """

    NULL_VALUE = 0
    """Null value."""


class UserRole(betterproto.Enum):
    USER = 0
    ADMIN = 1


@dataclass(eq=False, repr=False)
class Empty(betterproto.Message):
    """Used to specify empty request/response rpc types"""

    pass


@dataclass(eq=False, repr=False)
class Struct(betterproto.Message):
    """
    `Struct` represents a structured data value, consisting of fields which map
    to dynamically typed values. In some languages, `Struct` might be supported
    by a native representation. For example, in scripting languages like JS a
    struct is represented as an object. The details of that representation are
    described together with the proto support for the language. The JSON
    representation for `Struct` is JSON object.
    """

    fields: Dict[str, "Value"] = betterproto.map_field(
        1, betterproto.TYPE_STRING, betterproto.TYPE_MESSAGE
    )
    """Unordered map of dynamically typed values."""


@dataclass(eq=False, repr=False)
class Value(betterproto.Message):
    """
    `Value` represents a dynamically typed value which can be either null, a
    number, a string, a boolean, a recursive struct value, or a list of values.
    A producer of value is expected to set one of these variants. Absence of
    any variant indicates an error. The JSON representation for `Value` is JSON
    value.
    """

    null_value: "NullValue" = betterproto.enum_field(1, group="kind")
    """Represents a null value."""

    number_value: float = betterproto.double_field(2, group="kind")
    """Represents a double value."""

    string_value: str = betterproto.string_field(3, group="kind")
    """Represents a string value."""

    bool_value: bool = betterproto.bool_field(4, group="kind")
    """Represents a boolean value."""

    struct_value: "Struct" = betterproto.message_field(5, group="kind")
    """Represents a structured value."""

    list_value: "ListValue" = betterproto.message_field(6, group="kind")
    """Represents a repeated `Value`."""


@dataclass(eq=False, repr=False)
class ListValue(betterproto.Message):
    """
    `ListValue` is a wrapper around a repeated field of values. The JSON
    representation for `ListValue` is JSON array.
    """

    values: List["Value"] = betterproto.message_field(1)
    """Repeated field of dynamically typed values."""


@dataclass(eq=False, repr=False)
class FunctionConfiguration(betterproto.Message):
    function_name: str = betterproto.string_field(1)
    runtime_tag: int = betterproto.uint32_field(2)
    code: str = betterproto.string_field(3)


@dataclass(eq=False, repr=False)
class DetailedFunction(betterproto.Message):
    function_id: int = betterproto.uint32_field(1)
    runtime_tag: int = betterproto.uint32_field(2)
    function_name: str = betterproto.string_field(3)
    code: str = betterproto.string_field(4)


@dataclass(eq=False, repr=False)
class BriefFunction(betterproto.Message):
    function_id: int = betterproto.uint32_field(1)
    runtime_tag: int = betterproto.uint32_field(2)
    function_name: str = betterproto.string_field(3)


@dataclass(eq=False, repr=False)
class RuntimeConfiguration(betterproto.Message):
    tag: str = betterproto.string_field(1)
    dockerfile: str = betterproto.string_field(2)


@dataclass(eq=False, repr=False)
class BriefRuntime(betterproto.Message):
    tag: str = betterproto.string_field(1)
    registry_url: str = betterproto.string_field(2)


@dataclass(eq=False, repr=False)
class DetailedRuntime(betterproto.Message):
    tag: str = betterproto.string_field(1)
    registry_url: str = betterproto.string_field(2)
    dockerfile: str = betterproto.string_field(3)


@dataclass(eq=False, repr=False)
class Logs(betterproto.Message):
    log_lines: List[str] = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class UpdatedRuntimeResponse(betterproto.Message):
    runtime: "DetailedRuntime" = betterproto.message_field(1)
    logs: "Logs" = betterproto.message_field(2)


@dataclass(eq=False, repr=False)
class InvokeFunctionRequest(betterproto.Message):
    function: "DetailedFunction" = betterproto.message_field(1)
    runtime: "BriefRuntime" = betterproto.message_field(2)
    trigger_context: "Value" = betterproto.message_field(3)


@dataclass(eq=False, repr=False)
class InvocationResult(betterproto.Message):
    returned_value: "Value" = betterproto.message_field(1)


@dataclass(eq=False, repr=False)
class CrontabTriggerConfiguration(betterproto.Message):
    cron_expression: str = betterproto.string_field(1)
    function_id: int = betterproto.uint32_field(2)
    description: str = betterproto.string_field(3)


@dataclass(eq=False, repr=False)
class CrontabTrigger(betterproto.Message):
    trigger_id: int = betterproto.uint32_field(1)
    function_id: int = betterproto.uint32_field(2)
    cron_expression: str = betterproto.string_field(3)
    description: str = betterproto.string_field(4)


@dataclass(eq=False, repr=False)
class User(betterproto.Message):
    user_id: int = betterproto.uint32_field(1)
    username: str = betterproto.string_field(2)
    role: "UserRole" = betterproto.enum_field(3)
    updated_at_timestamp: int = betterproto.uint32_field(4)


@dataclass(eq=False, repr=False)
class UserCredentialsRequest(betterproto.Message):
    username: str = betterproto.string_field(1)
    password: str = betterproto.string_field(2)


@dataclass(eq=False, repr=False)
class VerifyUserRequest(betterproto.Message):
    user_id: int = betterproto.uint32_field(1)


@dataclass(eq=False, repr=False)
class ChangeUserPasswordRequest(betterproto.Message):
    user_id: int = betterproto.uint32_field(1)
    old_password: str = betterproto.string_field(2)
    new_password: str = betterproto.string_field(3)


class FunctionServiceStub(betterproto.ServiceStub):
    async def create_function(
        self,
        function_configuration: "FunctionConfiguration",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "DetailedFunction":
        return await self._unary_unary(
            "/faas.FunctionService/CreateFunction",
            function_configuration,
            DetailedFunction,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def edit_function(
        self,
        function_configuration: "FunctionConfiguration",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "DetailedFunction":
        return await self._unary_unary(
            "/faas.FunctionService/EditFunction",
            function_configuration,
            DetailedFunction,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def delete_function(
        self,
        brief_function: "BriefFunction",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "Empty":
        return await self._unary_unary(
            "/faas.FunctionService/DeleteFunction",
            brief_function,
            Empty,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def get_function(
        self,
        brief_function: "BriefFunction",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "DetailedFunction":
        return await self._unary_unary(
            "/faas.FunctionService/GetFunction",
            brief_function,
            DetailedFunction,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def get_functions(
        self,
        empty: "Empty",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> AsyncIterator["BriefFunction"]:
        async for response in self._unary_stream(
            "/faas.FunctionService/GetFunctions",
            empty,
            BriefFunction,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        ):
            yield response


class RuntimeServiceStub(betterproto.ServiceStub):
    async def create_runtime(
        self,
        runtime_configuration: "RuntimeConfiguration",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "UpdatedRuntimeResponse":
        return await self._unary_unary(
            "/faas.RuntimeService/CreateRuntime",
            runtime_configuration,
            UpdatedRuntimeResponse,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def edit_runtime(
        self,
        runtime_configuration: "RuntimeConfiguration",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "UpdatedRuntimeResponse":
        return await self._unary_unary(
            "/faas.RuntimeService/EditRuntime",
            runtime_configuration,
            UpdatedRuntimeResponse,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def delete_runtime(
        self,
        brief_runtime: "BriefRuntime",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "Empty":
        return await self._unary_unary(
            "/faas.RuntimeService/DeleteRuntime",
            brief_runtime,
            Empty,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def get_runtime_details(
        self,
        brief_runtime: "BriefRuntime",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "DetailedRuntime":
        return await self._unary_unary(
            "/faas.RuntimeService/GetRuntimeDetails",
            brief_runtime,
            DetailedRuntime,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def get_runtime_tags(
        self,
        empty: "Empty",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> AsyncIterator["BriefRuntime"]:
        async for response in self._unary_stream(
            "/faas.RuntimeService/GetRuntimeTags",
            empty,
            BriefRuntime,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        ):
            yield response


class LoadBalancerServiceStub(betterproto.ServiceStub):
    async def invoke_function(
        self,
        invoke_function_request: "InvokeFunctionRequest",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "InvocationResult":
        return await self._unary_unary(
            "/faas.LoadBalancerService/InvokeFunction",
            invoke_function_request,
            InvocationResult,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )


class CrontabTriggerServiceStub(betterproto.ServiceStub):
    async def create_crontab_trigger(
        self,
        crontab_trigger_configuration: "CrontabTriggerConfiguration",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "Empty":
        return await self._unary_unary(
            "/faas.CrontabTriggerService/CreateCrontabTrigger",
            crontab_trigger_configuration,
            Empty,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )


class AuthServiceStub(betterproto.ServiceStub):
    async def create_user(
        self,
        user_credentials_request: "UserCredentialsRequest",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "User":
        return await self._unary_unary(
            "/faas.AuthService/CreateUser",
            user_credentials_request,
            User,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def get_user(
        self,
        user_credentials_request: "UserCredentialsRequest",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "User":
        return await self._unary_unary(
            "/faas.AuthService/GetUser",
            user_credentials_request,
            User,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def verify_user(
        self,
        verify_user_request: "VerifyUserRequest",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "User":
        return await self._unary_unary(
            "/faas.AuthService/VerifyUser",
            verify_user_request,
            User,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )

    async def change_user_password(
        self,
        change_user_password_request: "ChangeUserPasswordRequest",
        *,
        timeout: Optional[float] = None,
        deadline: Optional["Deadline"] = None,
        metadata: Optional["MetadataLike"] = None
    ) -> "User":
        return await self._unary_unary(
            "/faas.AuthService/ChangeUserPassword",
            change_user_password_request,
            User,
            timeout=timeout,
            deadline=deadline,
            metadata=metadata,
        )


class FunctionServiceBase(ServiceBase):

    async def create_function(
        self, function_configuration: "FunctionConfiguration"
    ) -> "DetailedFunction":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def edit_function(
        self, function_configuration: "FunctionConfiguration"
    ) -> "DetailedFunction":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def delete_function(self, brief_function: "BriefFunction") -> "Empty":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def get_function(self, brief_function: "BriefFunction") -> "DetailedFunction":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def get_functions(self, empty: "Empty") -> AsyncIterator["BriefFunction"]:
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)
        yield BriefFunction()

    async def __rpc_create_function(
        self, stream: "grpclib.server.Stream[FunctionConfiguration, DetailedFunction]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.create_function(request)
        await stream.send_message(response)

    async def __rpc_edit_function(
        self, stream: "grpclib.server.Stream[FunctionConfiguration, DetailedFunction]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.edit_function(request)
        await stream.send_message(response)

    async def __rpc_delete_function(
        self, stream: "grpclib.server.Stream[BriefFunction, Empty]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.delete_function(request)
        await stream.send_message(response)

    async def __rpc_get_function(
        self, stream: "grpclib.server.Stream[BriefFunction, DetailedFunction]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.get_function(request)
        await stream.send_message(response)

    async def __rpc_get_functions(
        self, stream: "grpclib.server.Stream[Empty, BriefFunction]"
    ) -> None:
        request = await stream.recv_message()
        await self._call_rpc_handler_server_stream(
            self.get_functions,
            stream,
            request,
        )

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        return {
            "/faas.FunctionService/CreateFunction": grpclib.const.Handler(
                self.__rpc_create_function,
                grpclib.const.Cardinality.UNARY_UNARY,
                FunctionConfiguration,
                DetailedFunction,
            ),
            "/faas.FunctionService/EditFunction": grpclib.const.Handler(
                self.__rpc_edit_function,
                grpclib.const.Cardinality.UNARY_UNARY,
                FunctionConfiguration,
                DetailedFunction,
            ),
            "/faas.FunctionService/DeleteFunction": grpclib.const.Handler(
                self.__rpc_delete_function,
                grpclib.const.Cardinality.UNARY_UNARY,
                BriefFunction,
                Empty,
            ),
            "/faas.FunctionService/GetFunction": grpclib.const.Handler(
                self.__rpc_get_function,
                grpclib.const.Cardinality.UNARY_UNARY,
                BriefFunction,
                DetailedFunction,
            ),
            "/faas.FunctionService/GetFunctions": grpclib.const.Handler(
                self.__rpc_get_functions,
                grpclib.const.Cardinality.UNARY_STREAM,
                Empty,
                BriefFunction,
            ),
        }


class RuntimeServiceBase(ServiceBase):

    async def create_runtime(
        self, runtime_configuration: "RuntimeConfiguration"
    ) -> "UpdatedRuntimeResponse":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def edit_runtime(
        self, runtime_configuration: "RuntimeConfiguration"
    ) -> "UpdatedRuntimeResponse":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def delete_runtime(self, brief_runtime: "BriefRuntime") -> "Empty":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def get_runtime_details(
        self, brief_runtime: "BriefRuntime"
    ) -> "DetailedRuntime":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def get_runtime_tags(self, empty: "Empty") -> AsyncIterator["BriefRuntime"]:
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)
        yield BriefRuntime()

    async def __rpc_create_runtime(
        self,
        stream: "grpclib.server.Stream[RuntimeConfiguration, UpdatedRuntimeResponse]",
    ) -> None:
        request = await stream.recv_message()
        response = await self.create_runtime(request)
        await stream.send_message(response)

    async def __rpc_edit_runtime(
        self,
        stream: "grpclib.server.Stream[RuntimeConfiguration, UpdatedRuntimeResponse]",
    ) -> None:
        request = await stream.recv_message()
        response = await self.edit_runtime(request)
        await stream.send_message(response)

    async def __rpc_delete_runtime(
        self, stream: "grpclib.server.Stream[BriefRuntime, Empty]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.delete_runtime(request)
        await stream.send_message(response)

    async def __rpc_get_runtime_details(
        self, stream: "grpclib.server.Stream[BriefRuntime, DetailedRuntime]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.get_runtime_details(request)
        await stream.send_message(response)

    async def __rpc_get_runtime_tags(
        self, stream: "grpclib.server.Stream[Empty, BriefRuntime]"
    ) -> None:
        request = await stream.recv_message()
        await self._call_rpc_handler_server_stream(
            self.get_runtime_tags,
            stream,
            request,
        )

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        return {
            "/faas.RuntimeService/CreateRuntime": grpclib.const.Handler(
                self.__rpc_create_runtime,
                grpclib.const.Cardinality.UNARY_UNARY,
                RuntimeConfiguration,
                UpdatedRuntimeResponse,
            ),
            "/faas.RuntimeService/EditRuntime": grpclib.const.Handler(
                self.__rpc_edit_runtime,
                grpclib.const.Cardinality.UNARY_UNARY,
                RuntimeConfiguration,
                UpdatedRuntimeResponse,
            ),
            "/faas.RuntimeService/DeleteRuntime": grpclib.const.Handler(
                self.__rpc_delete_runtime,
                grpclib.const.Cardinality.UNARY_UNARY,
                BriefRuntime,
                Empty,
            ),
            "/faas.RuntimeService/GetRuntimeDetails": grpclib.const.Handler(
                self.__rpc_get_runtime_details,
                grpclib.const.Cardinality.UNARY_UNARY,
                BriefRuntime,
                DetailedRuntime,
            ),
            "/faas.RuntimeService/GetRuntimeTags": grpclib.const.Handler(
                self.__rpc_get_runtime_tags,
                grpclib.const.Cardinality.UNARY_STREAM,
                Empty,
                BriefRuntime,
            ),
        }


class LoadBalancerServiceBase(ServiceBase):

    async def invoke_function(
        self, invoke_function_request: "InvokeFunctionRequest"
    ) -> "InvocationResult":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def __rpc_invoke_function(
        self, stream: "grpclib.server.Stream[InvokeFunctionRequest, InvocationResult]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.invoke_function(request)
        await stream.send_message(response)

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        return {
            "/faas.LoadBalancerService/InvokeFunction": grpclib.const.Handler(
                self.__rpc_invoke_function,
                grpclib.const.Cardinality.UNARY_UNARY,
                InvokeFunctionRequest,
                InvocationResult,
            ),
        }


class CrontabTriggerServiceBase(ServiceBase):

    async def create_crontab_trigger(
        self, crontab_trigger_configuration: "CrontabTriggerConfiguration"
    ) -> "Empty":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def __rpc_create_crontab_trigger(
        self, stream: "grpclib.server.Stream[CrontabTriggerConfiguration, Empty]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.create_crontab_trigger(request)
        await stream.send_message(response)

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        return {
            "/faas.CrontabTriggerService/CreateCrontabTrigger": grpclib.const.Handler(
                self.__rpc_create_crontab_trigger,
                grpclib.const.Cardinality.UNARY_UNARY,
                CrontabTriggerConfiguration,
                Empty,
            ),
        }


class AuthServiceBase(ServiceBase):

    async def create_user(
        self, user_credentials_request: "UserCredentialsRequest"
    ) -> "User":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def get_user(
        self, user_credentials_request: "UserCredentialsRequest"
    ) -> "User":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def verify_user(self, verify_user_request: "VerifyUserRequest") -> "User":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def change_user_password(
        self, change_user_password_request: "ChangeUserPasswordRequest"
    ) -> "User":
        raise grpclib.GRPCError(grpclib.const.Status.UNIMPLEMENTED)

    async def __rpc_create_user(
        self, stream: "grpclib.server.Stream[UserCredentialsRequest, User]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.create_user(request)
        await stream.send_message(response)

    async def __rpc_get_user(
        self, stream: "grpclib.server.Stream[UserCredentialsRequest, User]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.get_user(request)
        await stream.send_message(response)

    async def __rpc_verify_user(
        self, stream: "grpclib.server.Stream[VerifyUserRequest, User]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.verify_user(request)
        await stream.send_message(response)

    async def __rpc_change_user_password(
        self, stream: "grpclib.server.Stream[ChangeUserPasswordRequest, User]"
    ) -> None:
        request = await stream.recv_message()
        response = await self.change_user_password(request)
        await stream.send_message(response)

    def __mapping__(self) -> Dict[str, grpclib.const.Handler]:
        return {
            "/faas.AuthService/CreateUser": grpclib.const.Handler(
                self.__rpc_create_user,
                grpclib.const.Cardinality.UNARY_UNARY,
                UserCredentialsRequest,
                User,
            ),
            "/faas.AuthService/GetUser": grpclib.const.Handler(
                self.__rpc_get_user,
                grpclib.const.Cardinality.UNARY_UNARY,
                UserCredentialsRequest,
                User,
            ),
            "/faas.AuthService/VerifyUser": grpclib.const.Handler(
                self.__rpc_verify_user,
                grpclib.const.Cardinality.UNARY_UNARY,
                VerifyUserRequest,
                User,
            ),
            "/faas.AuthService/ChangeUserPassword": grpclib.const.Handler(
                self.__rpc_change_user_password,
                grpclib.const.Cardinality.UNARY_UNARY,
                ChangeUserPasswordRequest,
                User,
            ),
        }
