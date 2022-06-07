#!/usr/bin/env node

/*eslint no-undef: "error"*/
import chalk from 'chalk';
// Grab provided args.
const[,, ...args] = process.argv;

import mdLinks from './index.js';
const noPath = `\nNo ingreso ninguna ruta, para ver la lista de comandos disponibles ingrese: ${chalk.red.bold('md-links --help')}`;
const help = `\n${chalk.cyanBright.bold('md-links <path-to-file>')}: analiza el archivo Markdown e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay 
dentro del link, esta opción no valida si las URLs responden ok o no. Adicionalmente puede añadir las siguientes opciones:
\n${chalk.cyanBright.bold('--validate')}: se hace una petición HTTP para averiguar si el link funciona o no y retorna la información.
\n${chalk.cyanBright.bold('--stats')}:  retorna un texto con el número total(Total) de links encontrados y el número de links únicos(Unique).
\n${chalk.cyanBright.bold('--stats --validate')}: retorna un texto con el número total(Total) de links encontrados, el número de links únicos(Unique) y el número de links rotos(Broken).`;

const wrongOptions = `\nNo ingreso un comando valido, para ver la lista de comandos disponibles ingrese: ${chalk.red.bold('md-links --help')}`;

if(args.length === 0) {
  console.log(`\n¯\\_(ツ)_/¯\n${noPath}`);
}
if(args.length === 1 && args[0] === '--help') {
  console.log(help);
}
if(args.length === 1 && args[0] !== '--help') {
  mdLinks(args[0])
    .then((result) => {
      result.forEach((e) => {
        console.log(`\nhref: ${chalk.cyanBright.bold(e.href)} \ntext: ${chalk.cyanBright.bold(e.text)} \nfile: ${chalk.cyanBright.bold(e.file)}`); 
        
      }); 
    }) 
    .catch((error) => {
      console.log(error);
    });
}
if(args.length === 2 && args[1] === '--validate' ) {
  mdLinks(args[0],{ validate: true })
    .then((result) => {
      result.forEach((e) => {
        if(e.ok=== 'Ok'){
          console.log(`\nhref: ${chalk.cyanBright.bold(e.href)} \ntext: ${chalk.cyanBright.bold(e.text)} \nfile: ${chalk.cyanBright.bold(e.file)} \nstatus: ${chalk.yellowBright.bold(e.status)} \nok: ${chalk.yellowBright.bold(e.ok)}`); 
        } else{
          console.log(`\nhref: ${chalk.cyanBright.bold(e.href)} \ntext: ${chalk.cyanBright.bold(e.text)} \nfile: ${chalk.cyanBright.bold(e.file)} \nstatus: ${chalk.redBright.bold(e.status)} \nok: ${chalk.redBright.bold(e.ok)}`); 
        }
      }); 
    }) 
    .catch((error) => {
      console.log(error);
    });
}
if(args.length === 2 && args[1] === '--stats' ) {
  mdLinks(args[0],{ validate: true })
    .then((result) => {
      const jsonObject = result.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      const stats = `\nTotal: ${chalk.green.bold(result.length)} \nUnique: ${chalk.green.bold(uniqueArray.length)}`;
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
      const jsonObject = result.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      const statsAndValidate = `\nTotal: ${chalk.green.bold(result.length)} \nUnique: ${chalk.green.bold(uniqueArray.length)} \nBroken: ${chalk.redBright.bold(linkBroken)}`;
      console.log(statsAndValidate);     
    }) 
    .catch((error) => {
      console.log(error);
    });
}
if(args.length > 1 && args[1] !== '--stats' && args[1] !== '--validate'){
  console.log(`\n¯\\_(ツ)_/¯\n${wrongOptions}`);
} else if(args.length === 3 && args[2] !== '--validate' ){
  console.log(`\n¯\\_(ツ)_/¯\n${wrongOptions}`);
}
