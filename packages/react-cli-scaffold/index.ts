import * as prompt from "@clack/prompts";
import fs from "node:fs/promises";
import path from "node:path";
import color from "picocolors";

type ModulePath = {
  name: string;
  basePath: string;
  componentsDirPath: string;
  servicesDirPath: string;
  hooksDirPath: string;
};

const peeps = {
  greeting: color.bgBlack(color.cyan(" (・_・)ノ ")),
  hmmOk: color.bgBlack(color.yellow(` ┐(シ)┌ `)),
  bye: color.bgBlack(color.green(` \\(^-^)/ `)),
};

function toKebabCase(str: string = ""): string {
  if (!str) return "";

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, "-")
    .toLowerCase();
}

function toPascalCase(str: string = ""): string {
  if (!str) return "";

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
    .replace(/[^A-Za-z0-9]+/g, "$")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}$${b}`)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
}

function toCamelCase(str: string = ""): string {
  if (!str) return "";

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
    .replace(/[^A-Za-z0-9]+/g, "$")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}$${b}`)
    .toLowerCase()
    .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase())
    .replace(/^[A-Z]/g, (m) => m.toLowerCase());
}

function toSnakeCase(str: string = ""): string {
  if (!str) return "";

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, "_")
    .toLowerCase();
}

const getModuleSubPaths = async (rootPath = "./src", modulePath = "/modules") => {
  const dirData = await fs.readdir(path.join(rootPath, modulePath), { withFileTypes: true });

  const SHARED_MODULE_PATH: ModulePath = {
    basePath: path.join(rootPath, "/shared"),
    name: "shared",
    componentsDirPath: path.join(rootPath, "/shared/components/common"),
    servicesDirPath: path.join(rootPath, "/shared/services"),
    hooksDirPath: path.join(rootPath, "/shared/hooks"),
  };

  const paths: ModulePath[] = [SHARED_MODULE_PATH];

  dirData.forEach((file) => {
    if (file.isDirectory()) {
      paths.push({
        basePath: path.join(rootPath, modulePath, file.name),
        name: file.name,
        componentsDirPath: path.join(rootPath, modulePath, file.name, "/components"),
        servicesDirPath: path.join(rootPath, modulePath, file.name, "/services"),
        hooksDirPath: path.join(rootPath, modulePath, file.name, "/hooks"),
      });
    }
  });

  return paths;
};

const getModuleSubPathsByName = async (moduleName: string, rootPath = "./src", modulePath = "/modules") => {
  const modules = await getModuleSubPaths(rootPath, modulePath);
  const moduleFound = modules.find((path) => path.name === moduleName);

  if (!moduleFound) {
    throw new Error(`Module ${moduleName} not found`);
  }

  return moduleFound;
};

const padding = (str?: string, length = 1, char = " ") => {
  if (length <= 0) return str;

  return char.repeat(length) + str + char.repeat(length);
};

const createComponentBoilerplate = (componentName: string, componentsDirPath: string) => {
  const kebabCaseComponentName = toKebabCase(componentName);
  const pascalCaseComponentName = toPascalCase(componentName);

  const componentPath = path.join(componentsDirPath, kebabCaseComponentName);
  const componentFilePath = path.join(componentPath, `${kebabCaseComponentName}.tsx`);
  const barrelFilePath = path.join(componentPath, "index.ts");
  const testsFilePath = path.join(componentPath, `${kebabCaseComponentName}.test.tsx`);

  const componentTemplate = `type ${pascalCaseComponentName}Props = {};

export function ${pascalCaseComponentName}(props: ${pascalCaseComponentName}Props) {
  return <div data-testid="${kebabCaseComponentName}">${pascalCaseComponentName}</div>;
}
`;

  const barrelTemplate = `export { ${pascalCaseComponentName} } from './${kebabCaseComponentName}';  
`;

  const testTemplate = `import { screen } from "@testing-library/react";
import { renderWithProviders } from "@tests/utils/render-with-providers";
import { describe, test } from "vitest";
import { ${pascalCaseComponentName} } from "./${kebabCaseComponentName}";

describe("${pascalCaseComponentName}", () => {
  test("renders", ({ expect }) => {
    renderWithProviders(<${pascalCaseComponentName} />);
    expect(screen.getByTestId("${kebabCaseComponentName}")).toBeInTheDocument();
  });
});
`;

  return {
    componentPath,
    componentFilePath,
    barrelFilePath,
    testsFilePath,
    componentTemplate,
    barrelTemplate,
    testTemplate,
  };
};

const createServiceBoilerplate = (serviceName: string, servicesDirPath: string) => {
  const kebabCaseServiceName = toKebabCase(serviceName);
  const pascalCaseServiceName = toPascalCase(serviceName);
  const camelCaseServiceName = toCamelCase(serviceName);

  const serviceFilePath = path.join(servicesDirPath, `${kebabCaseServiceName}.ts`);

  const serviceParamType = `${pascalCaseServiceName}Params`;
  const serviceReturnType = `${pascalCaseServiceName}Return`;

  const serviceTemplate = `export type ${serviceParamType} = {};
export type ${serviceReturnType} = { message: string };

export async function ${camelCaseServiceName}(params?: ${serviceParamType}): Promise<${serviceReturnType}> {
  return { message: "string" };
}
`;

  return {
    serviceFilePath,
    serviceTemplate,
    serviceParamType,
    serviceReturnType,
  };
};

const createTanstackQueryHookBoilerplate = (
  serviceName: string,
  moduleName: string,
  hooksDirPath: string,
  serviceBoilerplate: ReturnType<typeof createServiceBoilerplate>,
) => {
  const hooksBaseDirPath = hooksDirPath;
  const queryFnName = toCamelCase(serviceName);
  const queryFnHookBaseName = serviceName.startsWith("get-") ? serviceName.replace("get-", "") : serviceName;
  const queryFnHookName = "use" + toPascalCase(queryFnHookBaseName) + "Query";
  const queryFnHookFileName = toKebabCase(queryFnHookName);
  const queryKeyName = toSnakeCase(serviceName).toUpperCase() + "_QUERY_KEY";
  const queryFnHookFilePath = path.join(hooksBaseDirPath, `${queryFnHookFileName}.ts`);

  const queryFileTemplateQueryHook = `import { type ${serviceBoilerplate.serviceParamType}, ${queryFnName} } from "@/modules/${moduleName}/services/${serviceName}";
import { useQuery } from "@tanstack/react-query";

export const ${queryKeyName} = "${queryKeyName}";

export function ${queryFnHookName}(params?: ${serviceBoilerplate.serviceParamType}) {
  return useQuery({
    queryKey: [${queryKeyName}, params],
    queryFn: () => ${queryFnName}(params)
  });
}
`;

  return {
    hooksBaseDirPath,
    queryFnName,
    queryFnHookName,
    queryFnHookFileName,
    queryKeyName,
    queryFnHookFilePath,
    queryFileTemplateQueryHook,
  };
};

const createTanstackMutationHookBoilerplate = (serviceName: string, moduleName: string, hooksDirPath: string) => {
  const mutationFnName = toCamelCase(serviceName);
  const mutationFnHookName = "use" + toPascalCase(mutationFnName) + "Mutation";
  const mutationFnHookFileName = toKebabCase(mutationFnHookName);
  const mutationFnHookFilePath = path.join(hooksDirPath, `${mutationFnHookFileName}.ts`);

  const singleMutationFileTemplateMutationHook = `import { ${mutationFnName} } from "@/modules/${moduleName}/services/${serviceName}";
import { useMutation } from "@tanstack/react-query";

export function ${mutationFnHookName}() {
  return useMutation({
    mutationFn: ${mutationFnName},
  });
}
`;

  return {
    mutationFnName,
    mutationFnHookName,
    mutationFnHookFileName,
    mutationFnHookFilePath,
    singleMutationFileTemplateMutationHook,
  };
};

const ACTIONS = {
  createComponent: "createComponent",
  createService: "createService",
};

const SERVICE_INTEGRATIONS = {
  tanstackQuery: "tanstackQuery",
  tanstackMutation: "tanstackMutation",
  none: "none",
};

async function main() {
  console.clear();

  prompt.intro(`${peeps.greeting} Olá pessoa!`);

  const project = await prompt.group(
    {
      action: () => {
        return prompt.select({
          message: "Que ação deseja realizar?",
          initialValue: ACTIONS.createComponent,
          options: [
            {
              value: ACTIONS.createComponent,
              label: "Criar novo componente",
            },
            {
              value: ACTIONS.createService,
              label: "Criar novo serviço",
            },
          ],
        });
      },
      moduleName: async () => {
        const modulePaths = await getModuleSubPaths();

        return prompt.select({
          message: "Selecione um módulo para o seu novo componente:",
          options: modulePaths.map((modulePath) => ({ value: modulePath.name, label: modulePath.name })),
          initialValue: modulePaths[0].name,
        });
      },
      moduleBlockName: ({ results }) => {
        const moduleNameLabel = color.magenta(padding(color.black(results.moduleName)));

        return prompt.text({
          message: `Qual o nome do novo bloco do módulo ${moduleNameLabel}? (esse será o nome do seu componente / serviço)`,
          placeholder: "Ex: my-component",
          initialValue: "my-component",
          defaultValue: "my-component",
          validate: (value) => {
            if (value.length < 3) {
              return "O nome do componente deve ter pelo menos 3 caracteres";
            }

            if (value !== toKebabCase(value)) {
              return "O nome do componente deve estar em kebab-case (Ex: my-component)";
            }
          },
        });
      },
      serviceIntegration: async ({ results }) => {
        if (results.action !== ACTIONS.createService) {
          return null;
        }

        return prompt.select({
          message: "Deseja criar uma integração para o seu serviço?",
          initialValue: SERVICE_INTEGRATIONS.none,
          options: [
            {
              value: SERVICE_INTEGRATIONS.none,
              label: "Não criar integração",
            },
            {
              value: SERVICE_INTEGRATIONS.tanstackQuery,
              label: "useQuery - Criar uma integração para o serviço usando o tanstack query",
            },
            {
              value: SERVICE_INTEGRATIONS.tanstackMutation,
              label: "useMutation - Criar uma integração para o serviço usando o tanstack query",
            },
          ],
        });
      },
      confirm: async ({ results }) => {
        if (typeof results.moduleBlockName !== "string") {
          return false;
        }

        const blockNameValue = toKebabCase(results.moduleBlockName);
        const blockNameLabel = color.bgBlack(color.bgMagenta(padding(results.moduleBlockName)));
        const moduleNameLabel = color.bgBlack(color.bgMagenta(padding(results.moduleName)));

        if (results.action === ACTIONS.createComponent) {
          return prompt.confirm({
            message: `Deseja criar o componente ${blockNameValue} no módulo ${moduleNameLabel}? (${blockNameValue})`,
          });
        }

        if (results.action === ACTIONS.createService) {
          return prompt.confirm({
            message: `Deseja criar o serviço ${blockNameLabel} no módulo ${moduleNameLabel}? (${blockNameValue})`,
          });
        }

        return false;
      },
    },
    {
      onCancel: () => {
        prompt.cancel(`${peeps.hmmOk} Cancelado!`);
        process.exit(0);
      },
    },
  );

  const addComponent = async (input: typeof project) => {
    if (typeof input.moduleBlockName !== "string" || input.action !== ACTIONS.createComponent) {
      throw new Error("Invalid project data");
    }

    const componentName = toKebabCase(input.moduleBlockName);

    const modulePaths = await getModuleSubPathsByName(input.moduleName);

    const componentBaseDirPath = modulePaths.componentsDirPath;

    const componentBoilerplate = createComponentBoilerplate(componentName, componentBaseDirPath);

    await fs.mkdir(componentBoilerplate.componentPath, { recursive: true });
    await fs.writeFile(componentBoilerplate.componentFilePath, componentBoilerplate.componentTemplate);
    await fs.writeFile(componentBoilerplate.barrelFilePath, componentBoilerplate.barrelTemplate);
    await fs.writeFile(componentBoilerplate.testsFilePath, componentBoilerplate.testTemplate);
  };

  const addService = async (input: typeof project) => {
    if (typeof input.moduleBlockName !== "string" || input.action !== ACTIONS.createService) {
      throw new Error("Invalid project data");
    }

    const serviceName = toKebabCase(input.moduleBlockName);

    const modulePaths = await getModuleSubPathsByName(input.moduleName);

    const serviceBaseDirPath = modulePaths.servicesDirPath;

    const serviceBoilerplate = createServiceBoilerplate(serviceName, serviceBaseDirPath);

    const serviceFolderExists = await fs.stat(serviceBaseDirPath).catch(() => false);

    if (!serviceFolderExists) {
      await fs.mkdir(serviceBaseDirPath, { recursive: true });
    }

    await fs.writeFile(serviceBoilerplate.serviceFilePath, serviceBoilerplate.serviceTemplate);

    if (input.serviceIntegration === SERVICE_INTEGRATIONS.none || !input.serviceIntegration) {
      return;
    }

    const hooksFolderExists = await fs.stat(modulePaths.hooksDirPath).catch(() => false);

    if (!hooksFolderExists) {
      await fs.mkdir(modulePaths.hooksDirPath, { recursive: true });
    }

    if (input.serviceIntegration === SERVICE_INTEGRATIONS.tanstackQuery) {
      const tanstackQueryHookBoilerplate = createTanstackQueryHookBoilerplate(
        serviceName,
        input.moduleName,
        modulePaths.hooksDirPath,
        serviceBoilerplate,
      );

      await fs.writeFile(
        tanstackQueryHookBoilerplate.queryFnHookFilePath,
        tanstackQueryHookBoilerplate.queryFileTemplateQueryHook,
      );
    }

    if (input.serviceIntegration === SERVICE_INTEGRATIONS.tanstackMutation) {
      const tanstackMutationHookBoilerplate = createTanstackMutationHookBoilerplate(
        serviceName,
        input.moduleName,
        modulePaths.hooksDirPath,
      );

      await fs.writeFile(
        tanstackMutationHookBoilerplate.mutationFnHookFilePath,
        tanstackMutationHookBoilerplate.singleMutationFileTemplateMutationHook,
      );
    }
  };

  if (project.confirm) {
    const s = prompt.spinner();

    s.start("Criando componente");

    if (project.action === ACTIONS.createComponent) {
      await addComponent(project);
    } else if (project.action === ACTIONS.createService) {
      await addService(project);
    }

    s.stop("Terminado! 🎉");
  }

  prompt.outro(`${peeps.bye} Terminamos por aqui. Até a próxima!`);
}

main().catch(console.error);
