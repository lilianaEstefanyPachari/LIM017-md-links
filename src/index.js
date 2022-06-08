import { checkAndConvertPathToAbsolute, checkPathExist, isDirOrFile, isFileMd, searchMdFilesInDir, getLinksOfEachFile, getValidateInfo} from './md-links.js';

// import chalk from 'chalk';
// Rutas
/*
const pathAbsoluteDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba`;
const pathAbsoluteEmptyDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links//directorio_prueba/dirVacio`;
const pathAbsoluteFile = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md`;
const pathRelativeDir = '../directorio_prueba';
const fakePath = '/etc/passwd';
const pathFile = '../directorio_prueba/data.md';
const pathAbsoluteFileTxt = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/archivo1.txt`;
*/

const mdLinks = (path,option) => {
  return new Promise((resolve,reject) => {
    if(checkPathExist(path) === 'La ruta existe.') {
      let fileArray = [];
      //console.log(chalk.white('la ruta existe'));
      const absolutePath = checkAndConvertPathToAbsolute(path);
      if(isDirOrFile(absolutePath) === 'es un archivo'){
        if(isFileMd(absolutePath)){
          fileArray.push(absolutePath);
        }
        // else{
        //   reject('\n¯\\_(ツ)_/¯ \nNo es un archivo Markdow');
        // }
      }
      if(isDirOrFile(absolutePath) === 'es un directorio'){
        const foundFiles = searchMdFilesInDir(absolutePath);
        fileArray.push(foundFiles);
      }
      const linksOfEachFile = getLinksOfEachFile(fileArray.flat());
      if(linksOfEachFile.length === 0){
        reject('No es un archivo Markdow o no se encontraron links');
      }
      if(option && option.validate === true) {
        resolve(getValidateInfo(linksOfEachFile));
      }
      else{
        resolve(linksOfEachFile);
      }

    }
    else {
      reject(`\n¯\\_(ツ)_/¯ \nNo ingreso una ruta valida, para ver la lista de comandos disponibles ingrese 'md-links --help'`);
    }       
  });
};

export default mdLinks;
