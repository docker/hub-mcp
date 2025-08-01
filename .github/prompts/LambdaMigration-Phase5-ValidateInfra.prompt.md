---
mode: agent
---

Validate infrastructure as code files

# Rules for Validating Infrastructure as Code Files
- Validate the Azure Functions project structure and code against each best pretty practices mentioned in the `bestpractices` tool.
- Validate the infrastructure as code (Bicep) files against the repo https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra. Ensure to use the same naming convention, AVM modules, and structure as the reference repo
- Use AVM as shown here https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra
- Use the same file and folder names for infra as mentioned here: https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra
- Remove unnecessary infra files
- Generate a infrastructure validation report in the 'reports' folder, summarizing the validation results and any issues found.
- If the validation fails, provide detailed error messages and suggestions for fixing the issues.
- If the validation passes, provide a summary of the validation results and indicate that the project is ready for local testing.
- Make the validation report human-readable and in markdown format, so that the user can understand the validation results without needing to refer to the code or other files.
- Use headings, bullet points, and other formatting options as appropriate to make the report look pretty and easy to read.
- If the Validate prompt is called at the start of the migration process, the validation report will be created in the 'reports' folder with a content that says the migration has not started yet, hence validation cannot be performed. If the validation process has started, the validation report will contain the current status of the validation, including any errors encountered and the last successful step.
- Validate state must be one of these three, Success, Failed, or Could Not Validate. Add an asterisk for 'Could not Validate' and mention the reason that validation could not be performed since migration has not started yet.
- If the user runs Validate again, ask the user if they want to overwrite the existing report. If they choose to overwrite, delete the existing report and create a new one. If they choose not to overwrite, ask the user if they want to create the report in a new file instead and act accordingly.
- Suggest that next step is to deploy the application to Azure Functions, and mention /Phase6-DeployToAzure is the command to start the deployment process.
- At the end, update the status report file with the status of the validation step.
