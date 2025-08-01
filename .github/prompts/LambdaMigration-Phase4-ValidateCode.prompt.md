---
mode: agent
---

Validate the migration

# Rules for Validation of Migration
- Validate the Azure Functions project structure and code against each best practices mentioned in the `bestpractices` tool
- Generate a validation report in the 'reports' folder, summarizing the validation results and any issues found.
- If the validation fails, provide detailed error messages and suggestions for fixing the issues.
- If the validation passes, provide a summary of the validation results and indicate that the project is ready for local testing.
- Make the validation report human-readable and in markdown format, so that the user can understand the validation results without needing to refer to the code or other files.
- Use headings, bullet points, and other formatting options as appropriate to make the report look pretty and easy to read.
- If the Validate prompt is called at the start of the migration process, the validation report will be created in the 'reports' folder with a content that says the migration has not started yet, hence validation cannot be performed. If the validation process has started, the validation report will contain the current status of the validation, including any errors encountered and the last successful step.
- Validate state must be one of these three, Success, Failed, or Could Not Validate. Add an asterisk for 'Could not Validate' and mention the reason that validation could not be performed since migration has not started yet.
- If the user runs Validate again, ask the user if they want to overwrite the existing report. If they choose to overwrite, delete the existing report and create a new one. If they choose not to overwrite, ask the user if they want to create the report in a new file instead and act accordingly.
- Suggest that next step is to validate the previously generated infrastructure, and mention /Phase5-ValidateInfra is the command to start the infrastructure validation process.
- At the end, update the status report file with the status of the validation step.
