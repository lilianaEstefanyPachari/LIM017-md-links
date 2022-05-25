import { checkAndConvertPathToAbsolute, checkPathExist, isDirOrFile, isFileMd, searchMdFilesInDir, getLinksOfEachFile } from './md-links.js';

import chalk from 'chalk';
import cowsay from 'cowsay';
// console.log(chalk.blue('Hello world!'));

// Rutas
const pathAbsoluteDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba`;
const pathAbsoluteEmptyDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links//directorio_prueba/dirVacio`;
const pathAbsoluteFile = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md`;
const pathRelativeDir = '../directorio_prueba';
const fakePath = '/etc/passwd';
const pathFile = '../directorio_prueba/data.md';
const pathAbsoluteFileTxt = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/archivo1.txt`;


const mdLinksV2 = (path,algo) => {
    return new Promise((resolve,reject) => {
        let fileArray = [];
        if(checkPathExist(path) === 'La ruta existe.') {
            console.log(chalk.white('la ruta existe'));
            const absolutePath = checkAndConvertPathToAbsolute(path);
            if(isDirOrFile(
                absolutePath) === 'es un archivo'){
                if(isFileMd(absolutePath)){
                   fileArray.push(absolutePath);
                }
            }
            if(isDirOrFile(absolutePath) === 'es un directorio'){
                const foundFiles = searchMdFilesInDir(absolutePath);
                fileArray.push(foundFiles);
            }
        }
        else {
            // return chalk.bold.red('la ruta no existe');
            reject(new Error (chalk.red('la ruta no existe')));
        }
       // return fileArray.flat()
        const linksOfEachFile = getLinksOfEachFile(fileArray.flat());
        if(linksOfEachFile.length === 0){
            resolve(chalk.white('No es un archivo Markdow o no se encontraron links'));
        }
        resolve(linksOfEachFile);


    });

}

mdLinksV2(pathRelativeDir)
.then((result) => {
 console.log(result)
}) 
.catch((error) => {
    console.log(error)
})

//console.log(mdLinksV2(pathRelativeDir));
//console.log(mdLinksV2(pathAbsoluteEmptyDir));
//console.log(mdLinksV2(pathAbsoluteFile));
//console.log(mdLinksV2(fakePath));







//copia de seguridad
/*
const mdLinksV2 = (path) => {
    let fileArray = [];
    if(checkPathExist(path) === 'La ruta existe.') {
        console.log(chalk.blue('la ruta existe'));
        const absolutePath = checkAndConvertPathToAbsolute(path);
        if(isDirOrFile(absolutePath) === 'es un archivo'){
            if(isFileMd(absolutePath)){
               fileArray.push(absolutePath);
            }
            else{
                return chalk.red('no es .md');
            }
        }
        if(isDirOrFile(absolutePath) === 'es un directorio'){
            const foundFiles = searchMdFilesInDir(absolutePath);
            fileArray.push(foundFiles);
        }
    }
    else {
        // return chalk.bold.red('la ruta no existe');
        return cowsay.say({text: 'la ruta no existe',});
    }
   // return fileArray.flat()
    const linksOfEachFile = getLinksOfEachFile(fileArray.flat());
   // return linksOfEachFile

   return Promise.resolve("holi soy una promesa");
    // return new Promise((resolve,reject) => {

    // });
}

//console.log(mdLinksV2(pathRelativeDir));
//console.log(mdLinksV2(pathAbsoluteFile));
//console.log(mdLinksV2(fakePath));

// consumiendo la promesa
mdLinksV2(pathAbsoluteDir)
.then((res) => {
 console.log(res)
}) 
*/

