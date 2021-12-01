//Crear un servidor con node
const http = require('http');

//crear const url
const url = require('url');

//importar modulo file system
const fs = require('fs');

//almacenar en una constante los parametros recibidos en la consulta
http
  .createServer((req, res) => {
    const params = url.parse(req.url, true).query
    const fileName = params.archivo
    const fileContent = params.contenido
    const newFileName = params.nuevoNombre

    if (req.url.includes('/crear')) {
      fs.writeFile(`${fileName}`, fileContent, () => {
        res.write('Archivo creado con éxito!')
        res.end()
      })
    } else if (req.url.includes('/leer')) {
      fs.readFile(`${fileName}`, 'utf8', (err, data) => {
        if (err) {
          res.write('No se encuentra o no existe archivo.');
          res.end()
          return
        }
        res.write(data)
        res.end()
      })
    } else if (req.url.includes('/renombrar')) {
      const fileName = params.nombre
      // console.log(newFileName);
      fs.rename(`${fileName}`, `${newFileName}`, (err, data) => {
        if (err) {
          console.log(params);
          // console.log(req.url);
          res.write('No se ha podido renombrar el archivo.');
          res.end()
          return
        }
        res.write('Archivo renombrado con éxito.')
        res.end()
      })
    } else if (req.url.includes('/eliminar')) {
      fs.unlink(`${fileName}`, (err) => {
        if (err) {
          res.write('Error. Archivo no eliminado.');
          res.end()
          return
        }
        res.write('Archivo eliminado con éxito.')
        res.end()
      })
    }


  })
  .listen(8080, () => {
    console.log('Escuchando el puerto 8080')
  })