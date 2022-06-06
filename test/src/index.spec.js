import mdLinks from '../../src/index';
jest.mock('../../src/lib.js');

const pathAbsoluteFile = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md`;
const pathAbsoluteDir = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/Sub_directorio/tercer_directorio`;
const pathAbsoluteFileTxt = `C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/archivo1.txt`;

describe('mdLinks testing', () => {
  it('Devuelve un array de objetos por cada link',(done) => {
    mdLinks(pathAbsoluteFile)
      .then((res) => {
        expect(res).toStrictEqual(
          [
            {
              href: 'https://github.com/workshopper/learnyounode',
              text: 'learnyounode',
              file: 'C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md'
            },
            {
              href: 'https://github.com/workshopper/how-to-npm',
              text: 'how-to-npm',
              file: 'C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md'
            },
            {
              href: 'https://github.com/stevekane/promise-it-wont-hurt',
              text: 'promise-it-wont-hurt',
              file: 'C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md'
            }
          ]
        );
        done();
      });

    mdLinks(pathAbsoluteFile, { validate: true })
      .then((res) => {
        expect(res).toStrictEqual(
          [
            {
              href: 'https://github.com/workshopper/learnyounode',
              text: 'learnyounode',
              file: 'C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md',
              status: 200,
              ok: 'Ok'
            },
            {
              href: 'https://github.com/workshopper/how-to-npm',
              text: 'how-to-npm',
              file: 'C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md',
              status: 200,
              ok: 'Ok'
            },
            {
              href: 'https://github.com/stevekane/promise-it-wont-hurt',
              text: 'promise-it-wont-hurt',
              file: 'C:/Users/USUARIO/Desktop/proyectosLab/LIM017-md-links/directorio_prueba/data.md',
              status: 200,
              ok: 'Ok'
            }
          ]
        );
        done();
      });

    mdLinks(pathAbsoluteDir)
      .then((res) => {
        expect(res).toStrictEqual(
          [
            {
              href: 'https://opensource.microsoft.com/codeofconduct/faq/',
              text: 'Microsoft Code of Conduct FAQ Microsoft Code of Co',
              file: 'C:\\Users\\USUARIO\\Desktop\\proyectosLab\\LIM017-md-links\\directorio_prueba\\Sub_directorio\\tercer_directorio\\data3.md'
            }
          ]
        );
      });
    mdLinks(pathAbsoluteFileTxt)
      .then((res) => {
        expect(res).toStrictEqual('No es un archivo Markdow o no se encontraron links');
      });



  });
} );