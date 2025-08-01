---
mode: agent
---

Migrate AWS Lambda code to Azure Functions

# Rules for Migration of AWS Lambda to Azure Functions
- Ensure the Azure Functions extension for VSCode is installed.
- Always start migration by creating a new folder with an intuitive name for the Azure Functions project. Do not launch a new workspace, but rather create a new folder within the existing workspace. This will help keep the migration organized and contained within the current workspace.
- Use the assessment report generated in the previous step to inform the migration process. Assessment report can be found in the 'reports' folder.
- Use the guidance provided in #file:LambdaToFunctionsMigration.chatmode.md to migrate the AWS Lambda code to Azure Functions. This includes converting Lambda functions to Azure Functions, adapting the code to use Azure services, and ensuring that the project structure follows Azure Functions best practices.
- Ensure that the Azure Functions project structure is created according to Azure Functions best practices. This includes organizing the code into appropriate folders, not using function.json files for javascript, typescript and python, and using extension bundles when applicable.
- Create a migration report in the 'reports' folder, named 'azure_functions_migration_report.md'. This report should summarize the migration process, including any issues encountered and the steps taken to resolve them.
- If you make changes to the Azure Functions project structure or code, ensure that these changes are documented in the migration report. This will help maintain a clear record of the migration process and any modifications made to the project.
- Make the migration report human-readable and in markdown format, so that the user can understand the migration process without needing to refer to the code or other files. Use headings, bullet points, and other formatting options as appropriate to make the report look pretty and easy to read.
- Suggest that next step is to generate infrastructure files, and mention /Phase3-GenerateFunctionsInfra is the command to start the infra generation process.
- At the end, update the status report file with the status of the migration step.
