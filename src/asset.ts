import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types";

export type AssetConfig = {
  name: string;
  host: string;
  auth?: {
    type: "bearer" | "pat";
    token?: string;
    username?: string;
  };
};

export class Asset implements Asset {
  protected tools: Map<string, Tool>;
  protected tokens: Map<string, string>;
  constructor(protected config: AssetConfig) {
    this.tools = new Map();
    this.tokens = new Map();
  }
  RegisterTools(): void {
    throw new Error("Method not implemented.");
  }

  protected async authFetch<T>(
    url: string,
    options: RequestInit
  ): Promise<T | null> {
    const headers = options.headers || {
      "Content-Type": "application/json",
    };
    const token = await this.authenticate();
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }
    try {
      return (await response.json()) as T;
    } catch (err) {
      console.warn(`Response is not JSON: ${await response.text()}. ${err}`);
      return null as T;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async callAPI<T>(
    url: string,
    options: RequestInit,
    outMsg?: string,
    errMsg?: string
  ): Promise<CallToolResult>;
  protected async callAPI(
    url: string,
    options: RequestInit,
    outMsg?: string,
    errMsg?: string
  ): Promise<CallToolResult>;
  protected async callAPI<T = unknown>(
    url: string,
    options: RequestInit,
    outMsg?: string,
    errMsg?: string
  ): Promise<CallToolResult> {
    try {
      const response = await this.authFetch<T>(url, options);
      if (outMsg?.includes(":response")) {
        outMsg = outMsg.replace(":response", JSON.stringify(response));
      }
      
      const result: CallToolResult = {
        content: [
          {
            type: "text",
            text: outMsg || "Success",
          },
        ],
      };

      // If T is specified (not 'any'), include structuredContent
      if (response !== null && typeof response === 'object') {
        result.structuredContent = response as { [x: string]: unknown };
      }

      return result;
    } catch (error) {
      console.error(`Error calling API '${url}': ${error}`);
      return {
        content: [{ type: "text", text: errMsg || "Error" }],
        structuredContent: {},
        isError: true,
      };
    }
  }

  protected async authenticate(): Promise<string> {
    // Add authentication
    if (this.config.auth) {
      console.error(`Authenticating with ${this.config.auth.type}`);
      switch (this.config.auth.type) {
        case "bearer":
          if (this.config.auth.token) {
            return this.config.auth.token;
          }
          break;
        case "pat":
          if (!this.tokens.get(this.config.auth.username!)) {
            this.tokens.set(
              this.config.auth.username!,
              await this.authenticatePAT(this.config.auth.username!)
            );
          }
          return this.tokens.get(this.config.auth.username!)!;
        default:
          throw new Error(`Unsupported auth type: ${this.config.auth.type}`);
      }
    }
    return "";
  }

  protected async authenticatePAT(username: string): Promise<string> {
    if (username === "") {
      throw new Error("PAT auth: Username is empty");
    }
    console.error(`Authenticating PAT for ${username}`);
    const url = `https://hub.docker.com/v2/users/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: this.config.auth?.token,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to authenticate PAT for ${username}: ${response.status} ${response.statusText}`
      );
    }
    const data = (await response.json()) as {
      token: string;
      refresh_token: string;
    };
    return data.token;
  }
}
