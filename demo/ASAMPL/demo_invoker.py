#!/bin/python
import io
import json
import subprocess
import sys
from multiprocessing.connection import Listener


if __name__ == '__main__':
    listener = Listener(
        ("0.0.0.0", 9999)
    )

    while conn := listener.accept():
        try:
            data = json.loads(conn.recv())
            code, context = data.get("code"), data.get("context")

            with open("function.asa", "w") as f:
                f.write(code)

            logs = subprocess.check_output(['asampl', 'function.asa'])

            conn.send(
                json.dumps({
                    "result": {},
                    "logs": logs.splitlines()
                })
            )
            conn.close()

        finally:
            conn.close()

    listener.close()
