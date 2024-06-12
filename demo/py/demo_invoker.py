#!/bin/python
import io
import json
import sys
from multiprocessing.connection import Listener


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


if __name__ == '__main__':
    listener = Listener(
        ("0.0.0.0", 9999)
    )

    while conn := listener.accept():
        try:
            data = json.loads(conn.recv())
            code, context = data.get("code"), data.get("context")
            conn.send(
                json.dumps(
                    call_function_from_string(code, context)
                )
            )
            conn.close()

        finally:
            conn.close()

    listener.close()
