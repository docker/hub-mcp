---
mode: agent
---

Generate Infrastructure as Code Files

# Create Bicep files for the Azure Functions project, following the structure and naming conventions
Reference the best practices tool for Azure Functions infrastructure and deployment here `bestpractices`
Refer to the repos below to  generate Infrastructure files.
1. https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra
2. https://github.com/Azure-Samples/functions-quickstart-javascript-azd/tree/main/infra

- Use AVM as shown here https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra
- Use the same file names, folder names and structure for infrastructure files as mentioned here: https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra
- Use the Flex Consumption plan(FC1) for Azure Functions as shown in the reference repository.
- Update the migration report in the 'reports' folder. This report should summarize the infrastructure generation process, including any issues encountered and the steps taken to resolve them.
- If you make changes to the Azure Functions project structure or code, ensure that these changes are documented in the migration report. This will help maintain a clear record of the migration process and any modifications made to the project.
- Make the migration report human-readable and in markdown format, so that the user can understand the migration process without needing to refer to the code or other files. Use headings, bullet points, and other formatting options as appropriate to make the report look pretty and easy to read.
- Suggest that next step is to validate the migrated Azure Functions project, and mention /Phase4-ValidateCode is the command to start the code validation process.
- At the end, update the status report file with the status of the migration step.
