import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { HubMCPServer } from '..';
import { zodToJsonSchema } from 'zod-to-json-schema';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { program } from 'commander';

const EMPTY_OBJECT_JSON_SCHEMA = {
    type: 'object' as const,
};

program
    .name('check-tools-list')
    .description('Check if the tools list is up to date')
    .action(() => {
        const currentToolsList = loadCurrentToolsList();
        const newToolsList = getToolDefinitionList();
        if (compareToolDefinitionList(currentToolsList, newToolsList)) {
            console.log('Tools list is up to date');
        } else {
            console.log('Tools list is not up to date');
        }
    });


program.parse();

function getToolDefinitionList(): { tools: Tool[] } {
    const server = new HubMCPServer();
    const tools = server.GetAssets().reduce(
        (acc, asset) => {
            const tools = asset.ListTools();
            tools.forEach((tool, name) => {
                const toolDefinition: Tool = {
                    name,
                    title: tool.title,
                    description: tool.description,
                    inputSchema: tool.inputSchema
                        ? (zodToJsonSchema(tool.inputSchema, {
                              strictUnions: true,
                          }) as Tool['inputSchema'])
                        : EMPTY_OBJECT_JSON_SCHEMA,
                    annotations: tool.annotations,
                };

                if (tool.outputSchema) {
                    toolDefinition.outputSchema = zodToJsonSchema(tool.outputSchema, {
                        strictUnions: true,
                    }) as Tool['outputSchema'];
                }

                acc.tools.push(toolDefinition);
            });
            return acc;
        },
        { tools: [] } as { tools: Tool[] }
    );
    return tools;
}

function loadCurrentToolsList(): { tools: Tool[] } {
    const toolsList = fs.readFileSync(path.join(__dirname, '../..', 'tools.json'), 'utf8');
    return JSON.parse(toolsList);
}

function compareToolDefinitionList(list1: { tools: Tool[] }, list2: { tools: Tool[] }) {
    return _.isEqual(list1.tools, list2.tools);
}
