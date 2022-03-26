import axios from 'axios'
import { Transform, Writable } from 'stream'
const url = 'http://localhost:3000'

async function get(){
  const response = await axios({
    url,
    method: 'GET',
    responseType:'stream'
  })

  return response.data
}

const stream = await get()

stream
  .pipe(
    new Transform({
      transform(chunk, encoded, callback){
        const item = JSON.parse(chunk)
        const myNumer = /\d+/.exec(item.name)[0]
        let name = item.name

        if(myNumer % 2 === 0) name += ' é par'
        else name += ' é ímpar'

        item.name = name


        callback(null, JSON.stringify(item))
      }
    })
  )
  .pipe(
    new Writable({
      write(chunk, encoded, callback){
        console.log(` Já chegou a isso`, chunk.toString())
        callback()
      }
    })
  )