import http from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'crypto'
const PORT = 3000

function* run(){
  for(let index = 0; index <= 1000; index++){
    const data = {
      id: randomUUID(),
      name: `Paulo-${index}`
    }
    yield data
  }
}

function handler(request, response){
  const readable = new Readable({
    read() {
      for(const data of run()){
        console.log(`Sending`, data)
        this.push(JSON.stringify(data) + '\n')
      }
      // stop 
      this.push(null)
    }
  })

  readable
    .pipe(response)
}

http.createServer(handler)
.listen(PORT)
.on('listening', () => console.log(`Server running at ${PORT}`))