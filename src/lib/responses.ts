import { base64encode } from "@/lib/crypto";

export class Response {
  static get Success() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      success: true,
      message: "Success",
      timestamp,
      id,
    };
  }

  static get InternalError() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      success: false,
      message: "Internal server error",
      timestamp,
      id,
    };
  }

  static get InvalidBody() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      success: false,
      message: "Invalid request body",
      timestamp,
      id,
    };
  }

  static get InvalidHeaders() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      success: false,
      message: "Invalid request headers",
      timestamp,
      id,
    };
  }

  static get InvalidAuthorization() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      success: false,
      message: "Invalid request authorization token",
      timestamp,
      id,
    };
  }

  static get InvalidQuery() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      success: false,
      message: "Invalid request query",
      timestamp,
      id,
    };
  }

  static get MethodNotAllowed() {
    const id = base64encode(Math.random().toString());
    const timestamp = Date.now();

    return {
      success: false,
      message: "Method not allowed",
      timestamp,
      id,
    };
  }
}
