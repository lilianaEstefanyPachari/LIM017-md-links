import { checkPathExist, checkAndConvertPathToAbsolute, isDirOrFile, isFileMd, readContentOfDir, searchMdFilesInDir, readFileMd } from '../../src/md-links';

const testRelativeDir = './directorio_prueba';
const testAbsoluteDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba`;
const testAbsoluteFile = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md`;
const txtPath = './directorio_prueba/archivo1.txt';
const fakePath = '/etc/passwd';

describe('checkPathExist testing', () => {
  it('verifica si el path existe',() => {
    expect(checkPathExist(testRelativeDir)).toBe('La ruta existe.');
    expect(checkPathExist(fakePath)).toBe('La ruta no existe.');
  });
} );

describe('checkPathIsAbsolute testing', () => {
  it('convierte una ruta relativa a ruta absoluta',() => {
    expect(checkAndConvertPathToAbsolute(testRelativeDir)).toBe('C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba');
  });
} );

describe('isDirOrFile testing', () => {
  it('verifica si el path es un archivo o un directorio',() => {
    expect(isDirOrFile(testAbsoluteDir)).toBe('es un directorio');
    expect(isDirOrFile(testAbsoluteFile)).toBe('es un archivo');
  });
} );

describe('isFileMd testing', () => {
  it('verifica si el archivo tiene extension .md',() => {
    expect(isFileMd(testAbsoluteFile)).toBe(true);
    expect(isFileMd(txtPath)).toBe(false);
  });
});

describe('readContentOfDir testing', () => {
  it('lee el contenido de un directorio',() => {
    const contentOfDir = ['archivo1.txt', 'data.md', 'dirVacio', 'MDarchivo.md', 'Sub_directorio'];
    expect(readContentOfDir(testAbsoluteDir)).toEqual(contentOfDir);
  });
} );

describe('searchMdFilesInDir testing', () => {
  it('recopila los archivos .md en un directorio',() => {
    const mdFiles = [
      'C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba\\data.md', 
      'C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba\\MDarchivo.md', 
      'C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba\\Sub_directorio\\data2.md', 
      'C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba\\Sub_directorio\\tercer_directorio\\data3.md'
    ];
    expect(searchMdFilesInDir(testAbsoluteDir)).toEqual(mdFiles);
  });
} );

// describe('readFileMd testing', () => {
//     fit('lee el contenido de un archivo',() => {
//         const contentOfDir = `hola liliana soy el archivo data.md
// ### Tutoriales / NodeSchool workshoppers
// * [learnyounode](https://github.com/workshopper/learnyounode)
// * [how-to-npm](https://github.com/workshopper/how-to-npm)
// * [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)`;
//         expect(readFileMd(testAbsoluteFile)).toEqual(contentOfDir)
//     })
// } );

