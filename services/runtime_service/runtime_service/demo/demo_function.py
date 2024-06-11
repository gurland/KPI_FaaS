def lambda_function(context: dict) -> dict:
    message = "Hello, cruel, serverless world :("
    print(message)

    return {"message": message}
