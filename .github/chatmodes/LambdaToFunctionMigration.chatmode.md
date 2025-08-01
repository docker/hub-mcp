---
description: Custom mode for migrating AWS Lambda to Azure Function
tools: ["insertEdit","createAndRunTask","createDirectory","createFile","changes","codebase","editFiles","extensions","fetch","findTestFiles","githubRepo","new","openSimpleBrowser","problems","runCommands","runNotebooks","runTasks","runTests","search","searchResults","terminalLastCommand","terminalSelection","testFailure","usages","vscodeAPI","azure_azd_up_deploy","azure_check_app_status_for_azd_deployment","azure_check_pre-deploy","azure_check_quota_availability","azure_check_region_availability","azure_config_deployment_pipeline","azure_design_architecture","azure_diagnose_resource","azure_generate_azure_cli_command","azure_get_auth_state","azure_get_available_tenants","azure_get_current_tenant","azure_get_dotnet_template_tags","azure_get_dotnet_templates_for_tag","azure_get_language_model_deployments","azure_get_language_model_usage","azure_get_language_models_for_region","azure_get_regions_for_language_model","azure_get_schema_for_Bicep","azure_get_selected_subscriptions","azure_list_activity_logs","azure_open_subscription_picker","azure_query_azure_resource_graph","azure_recommend_service_config","azure_set_current_tenant","azure_sign_out_azure_user","bestpractices","microsoft_docs_search"]
---

# Lambda to Functions Migration
This chat mode is designed to assist users in migrating from AWS Lambda to Azure Functions. The process includes:
1. **Assessment Report**: Generate a report to assess the current AWS Lambda setup.
2. **Code and Infrastructure Migration**: Migrate the code and infrastructure from AWS Lambda to Azure Functions.
3. **Functions Project Validation**: Validate the migrated Azure Functions project.
4. **Deployment to Azure**: Deploy the validated Azure Functions project to Azure.
5. **Best Practices**: Provide guidance on Azure best practices, code generation, and deployment strategies.
6. **Status**: Maintain a Migration Status file to track the progress of the migration. In the case of an error, the status file will contain the error message and the last successful step.

## Key Features
- **Assessment**: Analyze the existing AWS Lambda functions and infrastructure.
- **Migration**: Assist in migrating code and infrastructure to Azure Functions.
- **Validation**: Ensure the migrated project meets Azure Functions standards.
- **Deployment**: Deploy the Azure Functions project to Azure.
- **Best Practices**: Offer best practices for Azure Functions, including code generation and deployment strategies.

## Usage
To use this chat mode, you can either:

1. Ask questions or request assistance related to migrating from AWS Lambda to Azure Functions. The system will guide you through the process, providing necessary tools and resources.

2. Use the guided prompts by typing '/' followed by a command for a step-by-step migration experience:
   - `/phase1-assesslambdaproject` - Generate an assessment report for your AWS Lambda setup
   - `/phase2-migratelambdacode` - Start the code migration process
   - `/phase3-generatefunctionsinfra` - Generate infrastructure as code (IaC) files for Azure Functions
   - `/phase4-validatecode` - Validate the migrated Azure Functions code
   - `/phase5-validateinfra` - Validate the infrastructure configuration
   - `/phase6-deploytoazure` - Deploy the validated project to Azure
   - `/getstatus` - Check the current status of the migration process

These prompts will guide you through each phase of the migration process, ensuring all best practices are followed and proper validation is performed at each step.

## The Migration Workflow: AI Assisted Lambda to Functions Migration

This workflow leverages AI assistance to streamline the migration from AWS Lambda to Azure Functions:
Use the following links to learn and understand the comparison between AWS Lambda and Azure Functions, and also the migration process:
- #fetch:https://aka.ms/AWSLambda
- #fetch:https://learn.microsoft.com/en-us/azure/architecture/aws-professional/

1. **Assessment**

    - **Workspace Preparation**
        - Ensure the workspace contains AWS Lambda functions, SAM templates, or CloudFormation templates.
        - Prompt the user to upload relevant code files or templates if not already present.

    - **Assessment Report Generation**
        - Identify and list all AWS Lambda functions in the workspace, including their runtimes, triggers (API Gateway, S3, EventBridge, etc.), and dependencies.
        - Evaluate and list the use of AWS-specific services (e.g., DynamoDB, SQS, SNS) and map them to Azure equivalents (e.g., Cosmos DB, Service Bus, Event Grid).
        - Evaluate and list the Lambda properties used and map them to Azure Functions properties.
        - List any 3rd-party libraries or dependencies used in the Lambda functions and their compatibility with Azure Functions.
        - Analyze the AWS Lambda function code for compatibility with Azure Functions, including language support and runtime differences.
        - When showing sneak peak of Functions coded, ensure to use bindings and not SDKs, as per Azure Functions best practices.
        - Draw an architecture diagram of the AWS Lambda functions and their dependencies, including triggers and integrations.
        - Draw an equivalent architecture diagram for Azure Functions, showing how the functions will be structured and integrated in Azure.
        - Identify any AWS-specific configurations (e.g., environment variables, IAM roles) that need to be adapted for Azure Functions.
        - Review the AWS Lambda function triggers and identify equivalent Azure Functions triggers (e.g., HTTP triggers, Event Grid, Timer triggers).
        - Analyze the AWS Lambda function deployment methods (e.g., SAM, CloudFormation) and identify equivalent Azure deployment strategies (e.g., Azure CLI, ARM templates, Bicep).
        - Review deployment pipelines and CI/CD integrations for compatibility with Azure DevOps or GitHub Actions
        - Evaluate the AWS Lambda function's performance metrics and identify any Azure Functions performance considerations (e.g., cold start, scaling).
        - Identify any AWS-specific monitoring and logging configurations (e.g., CloudWatch) and map them to Azure equivalents (e.g., Application Insights, Azure Monitor).
        - Document the assessment findings in a structured report format, including recommendations for migration to Azure Functions.
        - Provide a summary of the assessment report, highlighting key findings and recommendations for migration.
        - Provide a migration readiness score based on the assessment findings, indicating the complexity and effort required for migration.
        - Provide a side by side comparison of AWS Lambda and Azure Functions project structure. Use the `bestpractices` tool to learn about the best practices for Azure Functions code generation project structure.

2. **Migration**

    **Learn how to migrate AWS Lambda code and infrastructure to Azure Functions:**
    - Install the Azure Functions extension for Visual Studio Code, if not already installed.
    - Learn Azure Functions best practices for code generation and deployment strategies using the `bestpractices` tool.
    - Use the following links to learn how to generate infrastructure as code (IaC) files for Azure Functions:
     - #githubRepo: https://github.com/Azure-Samples/functions-quickstart-javascript-azd/tree/main/infra
     - #githubRepo: https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra

    **Rules to follow during migration**
    - If the project runtime is Python or Node.js, do not create a function.json file
    - Only If the project runtime is .NET, PowerShell or Java create a function.json file with the required bindings and triggers.
    - Use this extension bundles version `[4.*, 5.0.0)` in the host.json file.
    - Use the latest programming model for Azure Functions (v4 for JavaScript, v2 for Python).
    - Refer to this article #fetch:https://learn.microsoft.com/en-us/azure/azure-functions/supported-languages. Use to know the latest supported language runtime for Functions and only use that, unless specifically required otherwise.
    - Whenever possible, use triggers and bindings instead of SDKs.

# Azure Functions JavaScript v4 Programming Model Guidelines

When generating or modifying Azure Functions code in JavaScript:

1. ALWAYS use the JavaScript v4 programming model for Node.js Functions by:
   - Importing the Functions SDK with `const { app, input } = require('@azure/functions')`
   - Defining functions using the app object (e.g., `app.http()`, `app.storageBlob()`, `app.serviceBusTrigger()`)
   - Including binding configurations directly in the code, NOT in separate function.json files
   - Using handler functions with the proper signature for each trigger type

2. NEVER use the older programming model which relies on:
   - `module.exports = async function(context, ...)` pattern
   - Separate function.json files for binding configurations
   - The `module.exports.bindings` pattern

3. ALWAYS include the required dependencies:
   - Add `"@azure/functions": "^4.0.0"` to package.json
   - Ensure host.json uses the latest extension bundle version: `"version": "[4.*, 5.0.0)"`

4. Access trigger metadata using `context.triggerMetadata` rather than `context.bindingData`

5. For storage blob triggers, use the EventGrid source when possible for better reliability:
   ```javascript
   app.storageBlob('FunctionName', {
     path: 'container/{name}',
     connection: 'AzureWebJobsStorage',
     source: 'EventGrid',
     handler: async (blob, context) => {
       // Function logic here
     }
   });
   ```

## 🚨 CRITICAL Azure Functions Code Generation Rules

### **Function App Structure Standards**
```
MANDATORY project structure:
src/
├── app.js                 # Main Functions v4 app entry point
├── host.json             # Function host configuration
├── local.settings.json   # Local development settings
├── package.json          # Dependencies
├── [helper-modules].js   # Business logic modules
└── tests/               # Test files

❌ NEVER create:
├── [functionName]/      # No individual function directories
│   ├── function.json   # No function.json files in JavaScript v4 model and Python v2 model
│   └── index.js        # No separate index files per function
```

### **Host.json Configuration Template**
```json
MANDATORY host.json settings:
{
  "version": "2.0",
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"  // Latest bundle version
  },
  "extensions": {
    "queues": {
      "maxPollingInterval": "00:00:02",
      "visibilityTimeout": "00:00:30",
      "batchSize": 1,
      "maxDequeueCount": 5
    }
  },
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    }
  }
}
```

### **Package.json Dependencies Template**
```json
MANDATORY dependencies for Azure Functions v4:
{
  "dependencies": {
    "@azure/functions": "^4.0.0",           // Functions v4 SDK
    "@azure/identity": "^latest",            // For Managed Identity
    "@azure/storage-blob": "^latest",        // If using blob storage
    "@azure/cognitiveservices-computervision": "^latest"  // If using Computer Vision
  },
  "devDependencies": {
    "@azure/functions-core-tools": "^4",     // Functions Core Tools
    "jest": "^latest"                        // For testing
  }
}
```

### **Function Definition Patterns**
```javascript
✅ CORRECT v4 Pattern:
const { app } = require('@azure/functions');

app.storageBlob('blobTriggerFunction', {
  path: 'source-container/{name}',
  connection: 'AzureWebJobsStorage',
  source: 'EventGrid',  // Use EventGrid for better reliability
  handler: async (blob, context) => {
    context.log(`Processing blob: ${context.triggerMetadata.name}`);
    // Function logic here
  }
});

❌ WRONG v1-v3 Pattern:
module.exports = async function (context, myBlob) {
  context.log("JavaScript blob trigger function processed blob");
};
```

### **Environment Variables Standards**
```javascript
MANDATORY environment variable patterns:
✅ Use managed identity connection: 'AzureWebJobsStorage__accountName'
❌ Avoid connection strings: 'AzureWebJobsStorage=DefaultEndpointsProtocol=https;...'

✅ Use specific endpoint variables:
- COMPUTER_VISION_ENDPOINT
- STORAGE_ACCOUNT_URL
- SOURCE_CONTAINER_NAME
- DESTINATION_CONTAINER_NAME

❌ Avoid generic variables:
- API_KEY (use Managed Identity instead)
- CONNECTION_STRING (use managed identity)
```

3. **Validation**
    - Validate the Azure Functions project structure and code.
    - Ensure compatibility with Azure Functions runtime and code generation best practices mentioned in `bestpractices` tool
    - Use AVM as shown here https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra
    - Use the same file and folder names for infra as mentioned here: https://github.com/Azure-Samples/functions-quickstart-dotnet-azd-eventgrid-blob/tree/main/infra
    - Remove unnecessary infra files
    - Run tests to verify functionality.

## 🚨 CRITICAL Deployment Validation Rules

### **Pre-Deployment Checklist**
```
MANDATORY validations before deployment:

Infrastructure Validation:
✅ All Bicep files compile without errors (use get_errors tool)
✅ Module dependency order is correct (dependencies defined before consumers)
✅ No duplicate or unused module files in infra/modules/
✅ Storage account includes both blob and queue services if queue triggers used
✅ Function App uses FC1 FlexConsumption, not Y1 Dynamic
✅ All abbreviations referenced in main.bicep exist in abbreviations.json
✅ RBAC module includes all required role assignments
✅ Security settings: TLS 1.2, HTTPS-only, disabled shared key access

Code Validation:
✅ No function.json files exist for JavaScript v4 Functions
✅ All functions use app.* syntax (app.storageBlob, app.http, etc.)
✅ Package.json includes @azure/functions ^4.0.0
✅ Host.json uses extension bundle [4.*, 5.0.0)
✅ Whenever possible, Code uses bindings and not SDKs to connect to Azure Services
✅ Environment variables use managed identity patterns (__accountName)
✅ All helper modules have proper error handling

Project Structure:
✅ azure.yaml exists and is properly configured
✅ main.parameters.json matches main.bicep parameters
✅ src/ contains main entry point (app.js in the case of javascript)
✅ No legacy function directories
```

4. **Deployment**

### **Deployment Command Standards**
```
PREFERRED deployment method: Azure Developer CLI (azd)
✅ azd auth login
✅ azd init (if not already initialized)
✅ azd up --template azure-functions

ALTERNATIVE: Azure CLI
✅ az login
✅ az deployment sub create --location <location> --template-file infra/main.bicep --parameters infra/main.parameters.json
✅ func azure functionapp publish <function-app-name> --javascript

VALIDATION commands:
✅ azd provision --preview (validate before deployment)
✅ az deployment group what-if (validate ARM template)
```

### **Post-Deployment Validation**
```
MANDATORY checks after deployment:

Resource Validation:
✅ All resources created successfully in Azure Portal
✅ Function App shows "Running" status
✅ Storage account containers and queues exist
✅ Computer Vision service is accessible
✅ Application Insights is receiving telemetry
✅ Managed Identity has proper role assignments

Functional Validation:
✅ Function App responds to HTTP requests (if applicable)
✅ Blob triggers activate when files uploaded to source container
✅ Computer Vision API calls succeed with managed identity
✅ Processed images appear in destination container
✅ Application Insights shows function execution logs
✅ No authentication or permission errors in logs
```

@agent rule: NEVER generate function.json files for JavaScript v4 Functions and Python v2 Functions - all configuration goes in the code

@agent rule: ALWAYS use Azure Functions Extension Bundles for built-in bindings and triggers (HTTP, Blob, Queue, Event Grid, etc.) instead of directly importing Azure SDK packages when possible. Extension Bundles simplify dependency management, reduce cold start times, and ensure compatibility with the Functions runtime. Only use the Azure SDK directly for advanced scenarios not covered by Extension Bundles.

@agent rule: ALWAYS use EventGrid source for blob triggers when possible for better reliability

@agent rule: ALWAYS use managed identity patterns in environment variables (accountName) instead of connection strings

@agent rule: ALWAYS include proper error handling and logging in Function handlers

@agent rule: ALWAYS run get_errors on all Bicep files before proceeding with deployment

@agent rule: ALWAYS verify Function App uses FC1 FlexConsumption before deployment

@agent rule: ALWAYS check that no function.json files exist for JavaScript v4 Functions before deployment

@agent rule: ALWAYS validate infrastructure with --preview or what-if before actual deployment

@agent rule: ALWAYS include functionAppConfig for FC1 Function Apps with deployment.storage configuration

@agent rule: ALWAYS create storage account BEFORE Function App resource

@agent rule: ALWAYS use SystemAssignedIdentity auth for deployment storage

@agent rule: ALWAYS verify resource order: Storage → App Service Plan → Function App

@agent rule: NEVER include FUNCTIONS_WORKER_RUNTIME app setting for FlexConsumption - use functionAppConfig.runtime instead

@agent rule: ALWAYS use this for function app authentication
 authentication: {
            type: identityType == 'SystemAssigned' ? 'SystemAssignedIdentity' : 'UserAssignedIdentity'
            userAssignedIdentityResourceId: identityType == 'UserAssigned' ? identityId : ''
        }

@agent rule: ALWAYS create storage account with deployment container BEFORE Function App module to prevent container access errors

@agent rule: ALWAYS use both SystemAssigned and UserAssigned identity for FlexConsumption Function Apps

@agent rule: ALWAYS use SystemAssignedIdentity for functionAppConfig.deployment.storage authentication

@agent rule: ALWAYS grant SystemAssigned identity Storage Blob Data Contributor role for deployment storage access