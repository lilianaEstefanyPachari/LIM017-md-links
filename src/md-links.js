// import { unlinkSync } from 'fs';
import path from 'path';
import { existsSync, lstatSync, readdirSync, readFileSync  } from 'fs';



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
//console.log(isFileMd(txtPath));
//console.log(isFileMd(pathFile));

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
const fullRegExp = /\[([^)@]+)?\]\(https?:([^()]*)\)/g;
const textRegExp = /\[([^)@]+)?\]/g;
const linkRegExp = /\(https?:([^()]*)\)/g;

//[{ href, text, file }, ...]

export const getLinksOfEachFile = (arrayFiles) => {
  let matchesLinksForFile = [];
  arrayFiles.forEach((md) => {
    const resultReadFile = readFileMd(md);
    const resultMatchLinkInFile = resultReadFile.match(fullRegExp);
    if(resultMatchLinkInFile !== null){
    //matchesLinksForFile.push({[md]:[...resultMatchLinkInFile]})
      for(let link of resultMatchLinkInFile){
        // const objForEachLink = {};
        // objForEachLink.href = link.match(linkRegExp).toString();
        // objForEachLink.text = link.match(textRegExp).toString();
        // objForEachLink.file = md;
        const objForEachLink = {
          href: link.match(linkRegExp).toString().slice(1,-1),
          text: link.match(textRegExp).toString().slice(1,-1),
          file: md
        };
      matchesLinksForFile.push(objForEachLink)
    }    
   }
 });
 return matchesLinksForFile //un array con objetos de todos los links
};











/*
export const getLinksOfEachFile = (arrayFiles) => {
  let matchesLinksForFile = [];
  arrayFiles.forEach((md) => {
    const resultReadFile = readFileMd(md);
    const resultMatchLinkInFile = resultReadFile.match(fullRegExp);
    if(resultMatchLinkInFile !== null){
     matchesLinksForFile.push({[md]:[...resultMatchLinkInFile]})
    }
  })
  return matchesLinksForFile //un array con objetos donde key es el archivo.md y el value un array con todos los links
};
*/

// const arrayOfMdFiles = searchMdFilesInDir(pathAbsoluteDir);
// console.log(getLinksOfEachFile(arrayOfMdFiles));

//  console.log(matchesLink[0]);
//  const myk =  Object.keys(matchesLinksForFile[0])[0]
//  console.log(myk);