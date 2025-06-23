import { CallToolResult, Tool } from "@modelcontextprotocol/sdk/types";

export type AssetConfig = {
  name: string;
  host: string;
  specPath?: string;
  auth?: {
    type: "bearer" | "pat";
    token?: string;
    username?: string;
  };
};

export interface Asset {
  RegisterTools(): void;
}

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

  protected async authFetch<T>(url: string, options: RequestInit): Promise<T> {
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
    return response.json() as Promise<T>;
  }

  protected async callAPI<T>(
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
      return {
        content: [
          {
            type: "text",
            text: outMsg || "Success",
          },
        ],
        structuredContent: response as { [x: string]: unknown } | undefined,
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: errMsg || "Error" }],
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
        case "pat":
          let token = this.tokens.get(this.config.auth.username!);
          if (!token) {
            token = await this.authenticatePAT(this.config.auth.username!);
            this.tokens.set(this.config.auth.username!, token);
          }
          return token;
      }
    }
    return "";
  }

  protected async authenticatePAT(username: string): Promise<string> {
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
    const data = (await response.json()) as {
      token: string;
      refresh_token: string;
    };
    return data.token;
  }
}
