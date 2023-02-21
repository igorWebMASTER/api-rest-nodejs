import { FastifyReply, FastifyRequest } from "fastify"

export async function checkSessionIdExist(){
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const sessionId =  request.cookies.sessionId
    
      if(!sessionId){
        return reply.status(401).send({
          error: 'You must be logged in to access this resource'
        })
      }
    }
}