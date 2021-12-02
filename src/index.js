//crear un servidor
const http = require('http');

//crear const url
const url = require('url');

//imporfat file system
const fs = require('fs');

//función obtener fecha formato dd-mm-aaaa
const fechaFormato = (date) => {
  let dia = date.getDate()
  let mes = date.getMonth() + 1
  if (dia < 10) {
    dia = `0${dia}`
  }
  if (mes < 10) {
    mes = `0${mes}`
  }
  return `${dia}/${mes}/${date.getFullYear()}`
}

http.createServer((req, res) => {
    const params = url.parse(req.url, true).query
    if (req.url.includes('/crear')) {
      const {
        archivo,
        contenido
      } = params
      fs.writeFile(archivo, `${fechaFormato(new Date())}\n${contenido}`, 'utf8', (err) => {
        if (err) {
          res.write('Error!')
          res.end()
        } else {
          res.write('Archivo creado con éxito')
          res.end()
        }
      })
    } else if (req.url.includes('/leer')) {
      const {
        archivo
      } = params
      fs.readFile(archivo, (err, data) => {
        if (err) {
          res.write('Error!')
          res.end()
        } else {
          res.write(data)
          res.end()
        }
      })
    } else if (req.url.includes('/renombrar')) {
      const {
        nombre,
        nuevoNombre
      } = params
      fs.rename(nombre, nuevoNombre, (err, data) => {
        if (err) {
          res.write('Error!')
          res.end()
        } else {
          res.write(`Archivo ${nombre} renombrado como ${nuevoNombre} con éxito.`)
          res.end()
        }
      })
    } else if (req.url.includes('/eliminar')) {
      const {
        archivo
      } = params
      fs.unlink(archivo, (err) => {
        if (err) {
          res.write('Error!')
          res.end()
        } else {
          res.write(`Tu solicitud para eliminar el archivo ${archivo} se está procesando`)
          setTimeout(() => {
            res.write('Archivo eliminado con éxito.', () => {
              return res.end()
            })
          }, 3000);
        }
      })
    }
  })
  .listen(8080, () => console.log('Escuchando el puerto 8080 '))