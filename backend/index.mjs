export const handler = async (event) => {
  try {
    const method = event.requestContext?.http?.method || "UNKNOWN";

    if (method === "OPTIONS") {
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: ""
      };
    }

    if (method !== "POST") {
      return jsonResponse(405, {
        message: "Method not allowed. Use POST."
      });
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const name = (body.name || "").trim();

    const message = name
      ? `Hello, ${name}. This message came from AWS Lambda.`
      : "Hello from AWS Lambda backend.";

    return jsonResponse(200, {
      success: true,
      message
    });
  } catch (error) {
    return jsonResponse(500, {
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "application/json"
  };
}

function jsonResponse(statusCode, data) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify(data)
  };
}