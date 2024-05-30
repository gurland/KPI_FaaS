import datetime

from grpclib import GRPCError, Status
from sqlalchemy.orm import Session

from .contracts.faas import AgentServiceBase, InvokeFunctionRequest, InvocationResult


class AuthService(AgentServiceBase):
    async def invoke_function(
            self,
            request: InvokeFunctionRequest
    ) -> InvocationResult:
        request