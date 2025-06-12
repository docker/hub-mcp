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
  constructor(protected config: ResourceConfig) {
    this.tools = new Map();
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
}
