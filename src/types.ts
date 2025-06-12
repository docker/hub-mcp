import { Tool } from "@modelcontextprotocol/sdk/types.js";
export type ResourceConfig = {
  name: string;
  host: string;
  specPath?: string;
  auth?: {
    type: "bearer" | "pat";
    token?: string;
    username?: string;
  };
};
export interface MCPResource {
  RegisterTools(): void;
  ExecuteTool(toolName: string, args: any): Promise<any>;
  GetTools(): Tool[];
  GetToolsCount(): number;
  GetTool(toolName: string): Tool | undefined;
}

export class Resource implements MCPResource {
  protected tools: Map<string, Tool>;
  protected tokens: Map<string, string>;
  constructor(protected config: ResourceConfig) {
    this.tools = new Map();
    this.tokens = new Map();
  }
  RegisterTools(): void {
    throw new Error("Method not implemented.");
  }
  ExecuteTool(toolName: string, args: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  GetTools(): Tool[] {
    return Array.from(this.tools.values());
  }
  GetToolsCount(): number {
    return this.tools.size;
  }
  GetTool(toolName: string): Tool | undefined {
    return this.tools.get(toolName);
  }

  protected async authenticate(headers: Record<string, string>) {
    // Add authentication
    if (this.config.auth) {
      console.error(`Authenticating with ${this.config.auth.type}`);
      switch (this.config.auth.type) {
        case "bearer":
          if (this.config.auth.token) {
            headers["Authorization"] = `Bearer ${this.config.auth.token}`;
          }
          break;
        case "pat":
          let token = this.tokens.get(this.config.auth.username!);
          if (!token) {
            token = await this.authenticatePAT(this.config.auth.username!);
            this.tokens.set(this.config.auth.username!, token);
          }
          headers["Authorization"] = `Bearer ${token}`;
          break;
      }
    }
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
