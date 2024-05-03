let path = require('path');
let fs = require('fs');
let chalk = undefined;

let replaceIndexFiles = true;
let processDirectory = path.join(process.cwd(), './src');
let packageFileName = path.join(process.cwd(), './package.json');
let packageDumpFileName = path.join(process.cwd(), './package_orig.json');

try {
  chalk = require('chalk');
} catch (ex) {

}

/***********************
 *  Because of angular-cli's karma-webpack-config,
 *  all modules used via project-root-relative paths
 *  have to be written inside package.json's browser-tag.
 *
 *  This will hopefully be solved in beta.25.
 *
 *  Since then, rewrite the browser tag to have all scripts inside.
 *
 **********************/

let walk = (rootDir, currentDir) => {
  let files = fs.readdirSync(currentDir);
  let result = [];
  files.forEach(file => {
    let absPath = path.join(currentDir, file);
    let stat = fs.statSync(absPath);
    if (stat && stat.isDirectory())
      result = result.concat(walk(rootDir, absPath));
    else {
      if (/\.ts$/.test(path.extname(file))) {
        let relativePath = path.relative(rootDir, absPath);
        relativePath = relativePath.replace(/\\/g, '/');

        if (replaceIndexFiles && path.basename(relativePath, '.ts') == 'index') {
          relativePath = relativePath.replace(/\/index\.ts$/, '');
        }

        result.push(relativePath);
      }
    }
  });

  return result;
};
let processFolder = (rootDir) => {
  let result = {};
  walk(rootDir, rootDir).forEach(file => {
    let moduleName = file.replace(/\.ts$/, '');
    result[moduleName] = './src/' + moduleName;
  });
  return result;
};

let updatePackageFile = (dumpFirst) => {
  let result = processFolder(processDirectory);
  // read contents of current package file
  let packageFile = require(packageFileName);

  if (dumpFirst && fs.existsSync(packageDumpFileName))
    error('Prepare of ' + packageFileName + 'is only allowed after if prepare has not been run since the last revert.');
  if (!dumpFirst && !fs.existsSync(packageDumpFileName))
    error('Updating of ' + packageFileName + 'is only allowed after running prepare initially.');

  if (dumpFirst)
    dumpPackageFile();

  // update browser-field
  packageFile.browser = result;
  // write package file back to disk

  fs.writeFile(packageFileName, JSON.stringify(packageFile, null, 2), function (err) {
    if (err) return error(err);
    log(packageFileName + ' updated successfully');
  });
};

let dumpPackageFile = () => {
  // Dump current package file to prevent git diff recognizing changes
  // Only overwrite, if not already exists => it's possible, that the last
  // prepare has not been reverted already
  if (!fs.exists(packageDumpFileName)) {
    fs.renameSync(packageFileName, packageDumpFileName);
    log('Dumped ' + packageFileName + ' to ' + packageDumpFileName + ' successfully.');
  }
  else error('Dumping of ' + packageFileName + ' failed. Please revert first!');
};

let revertPackageFile = () => {
  if (!fs.existsSync(packageDumpFileName))
    error('Reverting of ' + packageDumpFileName + ' not possible because it does not exist.');

  fs.unlinkSync(packageFileName);
  fs.renameSync(packageDumpFileName, packageFileName);
  log('Reverted ' + packageDumpFileName + ' to ' + packageFileName + ' successfully.');
};

let log = (message) => {
  if (chalk)
    console.log(chalk.green(message));
  else
    console.log(message);
};

let error = (message) => {
  if (chalk)
    console.log(chalk.red(message));
  else
    console.error(message);

  process.exit(1);
};

exports.updatePackageFile = updatePackageFile;
exports.revertPackageFile = revertPackageFile;
