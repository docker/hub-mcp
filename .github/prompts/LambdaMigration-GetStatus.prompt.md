---
mode: agent
---

Retrieve status of the migration

**Status tracking**
- When this prompt is called, call out the current status of the migration, and direct the user to the status file for more details. The status file is located in the 'reports' folder and is named 'migration_status.md'.
- If this prompt is called at the start of the migration process, the status file will be created in the 'reports' folder with a content that says the migration has not started yet.
- If the migration process has started, the status file will contain the current status of the migration, including any errors encountered and the last successful step.
- Make the status file human-readable and in markdown format, so that the user can understand the current status of the migration without needing to refer to the code or other files.
- Add checkboxes in the status file to indicate the steps that have been completed, and use a bullet point list to indicate the steps that are yet to be completed. Ensure its easy to read.
