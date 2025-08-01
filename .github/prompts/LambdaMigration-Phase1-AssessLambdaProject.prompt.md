---
mode: agent
---

Assess this AWS Lambda workspace.

# Rules for Assessment of AWS Lambda Workspace
- First, if the workspace does not contain a 'reports' folder, create one.
- Then, assess the workspace and generate a report in the 'reports' folder. The name of the report should be 'aws_lambda_assessment_report.md'.
- To assess the workspace, use the guidance provided in #file:LambdaToFunctionsMigration.chatmode.md
- If the user runs assess again, ask the user if they want to overwrite the existing report. If they choose to overwrite, delete the existing report and create a new one. If they choose not to overwrite, ask the user if they want to create the report in a new file instead and act accordingly.
- Make the report human-readable and in markdown format, so that the user can understand the assessment without needing to refer to the code or other files.
- Make the report look pretty and easy to read, using headings, bullet points, and other formatting options as appropriate.
- Include date and time at the beginging of the report.
- Suggest that next step is to migrate the application to Azure Functions, and mention /Phase2-MigrateLambdaCode is the command to start the migration process.
- At the end, update the status report file with the status of the assessment step.
