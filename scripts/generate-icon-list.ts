import fs from "fs";
import path from "path";

// Function to extract icon names from remixicon CSS file
function extractIconNames() {
  const dirPath = path.resolve("node_modules/remixicon/icons");
  const folders = fs.readdirSync(dirPath);

  const icons: string[] = [];

  folders.forEach((folder) => {
    const files = fs.readdirSync(path.resolve(dirPath, folder));
    // Copy files to icons folder
    files.forEach((file) => {
      console.log("Copying", file);
      fs.copyFileSync(path.resolve(dirPath, folder, file), path.resolve("assets/icons", file));
      icons.push(file);
    });
  });

  // Regular expression to match icon class names
  //   const iconRegex = /\.ri-([\w-]+):before/g;
  //   const icons: string[] = [];
  //   let match;

  //   // Extract all icon names
  //   while ((match = iconRegex.exec(css)) !== null) {
  //     icons.push(match[1]);
  //   }

  // Sort icons alphabetically
  icons.sort();

  // Generate TypeScript content
  const tsContent = `// This file is auto-generated. Do not edit manually.
  export const remixIcons = ${JSON.stringify(icons, null, 2)} as const;
  `;

  // Write to src directory
  const outputPath = path.resolve("src/remix-icon-names.ts");

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Write the file
  fs.writeFileSync(outputPath, tsContent);

  console.log(`Generated ${icons.length} icons in ${outputPath} & copied ${icons.length} icons to assets/icons`);
}

extractIconNames();
