import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PrismaClient } from "./prisma";

const prisma = new PrismaClient();

export const lambdaHandler = async (
  event?: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // logger("HELLO_WORLD");
  let response: APIGatewayProxyResult;
  try {
    console.log("INSIDE HANDLER ###############");
    const user = await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@prisma.io",
      },
    });

    console.log("AFTER SAVING ###############");
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `hello world from function1`,
      }),
    };
  } catch (err: unknown) {
    console.error(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: err instanceof Error ? err.message : "some error happened",
      }),
    };
  }

  return response;
};
