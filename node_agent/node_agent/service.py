import docker


from .contracts.faas import AgentServiceBase, InvokeFunctionRequest, InvocationResult, Logs

import io
import json
import sys


def call_function_from_string(code: str, context: dict) -> dict:
    old_stdout, sys.stdout = sys.stdout, io.StringIO()

    function_globals, function_locals = {}, {}
    exec(code, function_globals, function_locals)

    function_result = function_locals["lambda_function"](context)

    stdout_content = sys.stdout.getvalue()
    sys.stdout = old_stdout

    return {
        "result": function_result,
        "logs": stdout_content.splitlines()
    }


class AgentService(AgentServiceBase):
    async def invoke_function(
            self,
            request: InvokeFunctionRequest
    ) -> InvocationResult:
        client = docker.from_env()
        client.login(
            username=None, password=None, email=None,
            registry="localhost:5555"
        )
        container = client.containers.run(request.runtime.tag, detach=True, ports={'9999/tcp': 9999})
        # try:
        #     client = Client(("localhost", 9999))
        #     context = json.loads(request.json_trigger_context)
        #     client.send(
        #         {
        #             "code": request.function.code,
        #             "context": context
        #         }
        #     )
        #
        #     result = client.recv()
        #
        # finally:
        #     container.stop()
        #     container.remove()
        #     client.close()

        result = call_function_from_string(request.function.code, json.loads(request.json_trigger_context))

        return InvocationResult(
            json=json.dumps(result.get("result", {})),
            log_lines=Logs(
                log_lines=result.get("logs", ["1", "2"])
            )
        )
