/*
   Copyright 2025 Docker Hub MCP Server authors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { HubMCPServer } from '../server';
import { zodToJsonSchema } from 'zod-to-json-schema';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { program } from 'commander';

const EMPTY_OBJECT_JSON_SCHEMA = {
    type: 'object' as const,
};

program
    .command('check-tools-list')
    .description('Check if the tools list is up to date')
    .action(() => {
        let code = 0;
        const currentToolsList = loadCurrentToolsList();
        const newToolsList = getToolDefinitionList();
        if (compareToolDefinitionList(currentToolsList, newToolsList)) {
            console.log('Tools list is up to date. ✅');
        } else {
            console.log('Tools list is not up to date. ❌');
            code = 1;
        }

        const currentToolsNames = loadCurrentToolsNames();
        const newToolsNames = newToolsList.tools.map((tool) => tool.name);
        if (compareToolNames(currentToolsNames, newToolsNames)) {
            console.log('Tools names are up to date. ✅');
        } else {
            console.log('Tools names are not up to date. ❌');
            code = 1;
        }

        process.exit(code);
    });

program
    .command('update-tools-list')
    .description('Update the tools list')
    .action(() => {
        const newToolsList = getToolDefinitionList();
        saveToolsList(newToolsList);
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
                    description: tool.title, // Use title instead of description to have less noise in the tools list
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

function loadCurrentToolsNames(): string[] {
    const toolsList = fs.readFileSync(path.join(__dirname, '../..', 'tools.txt'), 'utf8');
    return toolsList.split('\n').map((line) => line.split('- name: ')[1].replace(/^"|"$/g, ''));
}

function saveToolsList(toolsList: { tools: Tool[] }) {
    fs.writeFileSync(
        path.join(__dirname, '../..', 'tools.json'),
        JSON.stringify(toolsList, null, 2)
    );

    fs.writeFileSync(
        path.join(__dirname, '../..', 'tools.txt'),
        toolsList.tools.map((tool) => `- name: ${tool.name}`).join('\n')
    );
}

function compareToolDefinitionList(list1: { tools: Tool[] }, list2: { tools: Tool[] }) {
    return _.isEqual(list1.tools, list2.tools);
}

function compareToolNames(list1: string[], list2: string[]) {
    return _.isEqual(list1, list2);
}
