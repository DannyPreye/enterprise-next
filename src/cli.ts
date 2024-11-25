#!/usr/bin/env node
import { Command } from "commander";
import { generateProject, generateComponent, generatePage } from "./generators.js";


const program = new Command();



program
    .name("enterprise-nextjs-template")
    .description("Generate an opinionated Next.js 14 project")
    .version("1.0.0");

program
    .command("new <project-name>")
    .description("Create a new Next.js project")
    .action(async (projectName) =>
    {
        await generateProject(projectName);
    });

const generateCommand = program
    .command("generate")
    .description("Generate components or pages");

generateCommand
    .command("component <name>")
    .alias("generate:component") // Alias for generate:component
    .description("Generate a new component with tests")
    .option("-p, --path <path>", "Path to generate the component")
    .action(async (name, options) =>
    {
        await generateComponent(name, options.path);
    });

generateCommand
    .command("page <route>")
    .alias("generate:page") // Alias for generate:page
    .description("Generate a new page with tests")
    .action(async (route) =>
    {
        await generatePage(route);
    });


program.parse();
