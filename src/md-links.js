// import { unlinkSync } from 'fs';
import path from 'path';
import { existsSync, lstatSync, readdirSync, readFileSync  } from 'fs';
import fetch from './lib.js';



//rutas de prueba
const pathAbsoluteDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba`;
const pathAbsoluteFile = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md`;
const pathRelativeDir = './directorio_prueba';
const pathFile = './directorio_prueba/data.md';
const fakePath = '/etc/passwd';
const pathAbsoluteFileTxt = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/archivo1.txt`;
const txtPath = './directorio_prueba/archivo1.txt';

//funcion que verifica si el path existe *****************************************************************
export const checkPathExist = (pathAbsolute) => existsSync(pathAbsolute) ? 'La ruta existe.' : 'La ruta no existe.';
//console.log(checkPathExist(fakePath));

//funcion que verifica si el path es relativo o absoluto y convierte a ruta absoluta *********************
export const checkAndConvertPathToAbsolute = (pathToCheck) => path.isAbsolute(pathToCheck) ? pathToCheck : path.resolve(pathToCheck); 
//console.log(checkAndConvertPathToAbsolute(pathFile))


// funcion que verifica si es un archivo o un directorio ******************************************************
export const isDirOrFile = (path) => {
    const stat = lstatSync(path);
    if (stat.isDirectory()){
        return 'es un directorio';
    }
    else if(stat.isFile()){
        return 'es un archivo';
    }
}
//console.log(isDirOrFile(pathAbsoluteDir));

//probando try y catch
// export const isDir = (path) => {
//     try {
//         const stat = lstatSync(path);
//         return stat.isDirectory();
//     } catch (e) {
//         // lstatSync throws an error if path doesn't exist
//         return 'error wtf';
//     }
// }

// funcion para ver si el archivo tiene extension .md ***********************************************************
export const isFileMd = (filePath) => path.extname(filePath) === '.md' ? true : false;

// funcion para ver el contenido de un directorio ***************************************************************
export const readContentOfDir = (pathDir) => readdirSync(pathDir,'utf8');
//console.log(readContentOfDir(pathAbsoluteDir))

// funcion que recopila los archivos .md y si el path es un directorio se aplica recursividad********************
let arrayOfFilesInDir = [];
export const searchMdFilesInDir = (pathDir) => {
    const arrayOfContentDir = readContentOfDir(pathDir);
    arrayOfContentDir.forEach(element => {
      if(isFileMd(element)){
        const absPathOfMdFile = path.join(pathDir, element);
        arrayOfFilesInDir.push(absPathOfMdFile);
      }
      const absPathOfElement = path.join(pathDir, element);
      if(isDirOrFile(absPathOfElement) === 'es un directorio') {
        searchMdFilesInDir(absPathOfElement);
      } 
    });
    return arrayOfFilesInDir;
  }

//console.log(searchMdFilesInDir(pathAbsoluteDir));

//funcion para leer el contenido de un archivo .md***************************************************************
export const readFileMd = (mdPath) => readFileSync(mdPath,'utf8') //return string
//console.log(readFileMd(pathAbsoluteFile));

// funcion que recopila los links encontrados en cada archivo .md ************************************************
const fullRegExp = /\[([^)@]+)?\]\(https?:([^()]*)\)/gi;
const textRegExp = /\[([^)@]+)?\]/gi;
const linkRegExp = /\(https?:([^()]*)\)/gi;

export const getLinksOfEachFile = (arrayFiles) => {
  let matchesLinksForFile = [];
  arrayFiles.forEach((md) => {
    const resultReadFile = readFileMd(md);
    const resultMatchLinkInFile = resultReadFile.match(fullRegExp);
    if(resultMatchLinkInFile !== null){
    //matchesLinksForFile.push({[md]:[...resultMatchLinkInFile]})
      for(let link of resultMatchLinkInFile){
        const objForEachLink = {
          href: link.match(linkRegExp).toString().slice(1,-1),
          text: link.match(textRegExp).toString().slice(1,-1).slice(0,50),
          file: md
        };
      matchesLinksForFile.push(objForEachLink)
    }    
   }
 });
 return matchesLinksForFile //un array con objetos de todos los links
};

// funcion que hace validacion de status de los links encontrados ************************************************
export const getValidateInfo = (arrayOfLinksToValidate) => {
   const arrValidate = arrayOfLinksToValidate.map((obj) => {
    return fetch(obj.href)
      .then((response) => {
        obj.status = response.status;
        obj.ok = response.status === 200 ? 'Ok' : 'Fail';
        return obj;}
      )
      .catch(error => console.log(`¡error de fetch! ${error.message}`))
     })
     
  return Promise.all(arrValidate)
  // .then(values => {console.log(values)});
};

// getValidateInfo([
//     {
//       href: 'https://github.com/workshopper/learnyounod',
//       text: 'learnyounode',
//       file: 'C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba\\data.md'
//     },
//     {
//       href: 'https://github.com/workshopper/how-to-npm',
//       text: 'how-to-npm',
//       file: 'C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba\\data.md'
//     }
//   ])
//  .then(values => {console.log(values)});


//practica process argv
//console.log(process.argv)
//desestructuracion
// const [ , , ...argumento] = process.argv;
// console.log(argumento[0], argumento[1])
// const [, saludo] = argumento.split('=')
// console.log(saludo)
