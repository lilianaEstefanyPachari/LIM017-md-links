#!/usr/bin/env node
/*global process*/
/*eslint no-undef: "error"*/
import chalk from 'chalk';
// Grab provided args.
const[,, ...args] = process.argv;

import mdLinks from './index.js';
const noPath = `\nNo ingreso ninguna ruta, para ver la lista de comandos disponibles ingrese: ${chalk.red.bold('md-links --help')}`;
const help = `\nIngrese la ruta a analizar con el comando ${chalk.cyanBright.bold('md-links <path-to-file>')}  \nTambién puede ingresar las opciones de: ${chalk.cyanBright.bold('--stats')}, ${chalk.cyanBright.bold('--validate')}, o ambas.`;
const wrongOptions = `\nNo ingreso un comando valido, para ver la lista de comandos disponibles ingrese: ${chalk.red.bold('md-links --help')}`;

if(args.length === 0) {
  console.log(noPath);
}
if(args.length === 1 && args[0] === '--help') {
  console.log(help);
}
if(args.length === 1 && args[0] !== '--help') {
  mdLinks(args[0])
    .then((result) => {
      console.log(result);
    }) 
    .catch((error) => {
      console.log(error);
    });
}
if(args.length === 2 && args[1] === '--validate' ) {
  mdLinks(args[0],{ validate: true })
    .then((result) => {
      console.log(result);
    }) 
    .catch((error) => {
      console.log(error);
    });
}
if(args.length === 2 && args[1] === '--stats' ) {
  mdLinks(args[0],{ validate: true })
    .then((result) => {
      const stats = `\nTotal: ${chalk.green.bold(result.length)} \nUnique: ${chalk.green.bold(result.length)}`;
      console.log(stats);
    }) 
    .catch((error) => {
      console.log(error);
    });
}
if(args.length === 3 && args[1] === '--stats'&& args[2] === '--validate' ) {
  mdLinks(args[0],{ validate: true })
    .then((result) => {
      let linkBroken = 0;
      result.forEach((e) => {
        if(e.ok === 'Fail'){
          linkBroken += 1;
        }
      }); 
      const statsAndValidate = `\nTotal: ${chalk.green.bold(result.length)} \nUnique: ${chalk.green.bold(result.length)} \nBroken: ${chalk.redBright.bold(linkBroken)}`;
      console.log(statsAndValidate);                    
    }) 
    .catch((error) => {
      console.log(error);
    });
}
if(args.length > 1 && args[1] !== '--stats' && args[1] !== '--validate'){
  console.log(wrongOptions);
}

