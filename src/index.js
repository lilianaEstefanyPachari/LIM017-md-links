import { checkAndConvertPathToAbsolute, checkPathExist, isDirOrFile, isFileMd, searchMdFilesInDir, getLinksOfEachFile, getValidateInfo} from './md-links.js';

import chalk from 'chalk';
// Rutas
const pathAbsoluteDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba`;
const pathAbsoluteEmptyDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links//directorio_prueba/dirVacio`;
const pathAbsoluteFile = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md`;
const pathRelativeDir = '../directorio_prueba';
const fakePath = '/etc/passwd';
const pathFile = '../directorio_prueba/data.md';
const pathAbsoluteFileTxt = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/archivo1.txt`;

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
      }
      if(isDirOrFile(absolutePath) === 'es un directorio'){
        const foundFiles = searchMdFilesInDir(absolutePath);
        fileArray.push(foundFiles);
      }
      const linksOfEachFile = getLinksOfEachFile(fileArray.flat());
      if(linksOfEachFile.length === 0){
        resolve(chalk.white('No es un archivo Markdow o no se encontraron links'));
      }
      if(option && option.validate === true) {
        resolve(getValidateInfo(linksOfEachFile));
      }
      else{
        resolve(linksOfEachFile);
      }

    }
    else {
      reject(`\nNo ingreso una ruta valida, para ver la lista de comandos disponibles ingrese ${chalk.red.bold('md-links --help')}`);
    }       
  });
};

export default mdLinks;

// mdLinks(pathAbsoluteDir, { validate: true })
// .then((result) => {
//  console.log(result)
// }) 
// .catch((error) => {
//     console.log(error)
// })
/*
{
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },

    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"]
    }
}





{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "airbnb-base"
  ],
  "parserOptions": {
    "ecmaVersion":"latest",
    "sourceType": "module"
  },
  "plugins": ["jest"],
  "rules": {
    "linebreak-style": 0,
    "prefer-destructuring": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
}

*/