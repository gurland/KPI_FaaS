#!/usr/bin/env python

import json
import os
import subprocess
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

            source = os.path.dirname(__file__)
            asampl_path = os.path.join(source, 'asampl')

            logs = subprocess.check_output(f'{asampl_path} function.asa', shell=True).decode()

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
