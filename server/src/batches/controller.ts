import {
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get,
  Body, Patch, Put
} from 'routing-controllers'
import User from '../users/entity'
import { Batch, Student, Evaluation} from './entities'
// import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
import { Validate } from 'class-validator'
import {io} from '../index'
import * as request from 'superagent'

const randomColor = () => {
  const randomNumber = function getRandomInt(max) {
Math.floor(Math.random() * Math.floor(max));
  }
}


@JsonController()
export  class BatchController {

  @Post('/batch')
@HttpCode(201)
createGame(
  @Body() batch: Batch,
  
) {
  
  return batch.save()
}


  // @Authorized()
  // @Post('/batch')
  // @HttpCode(201)
  // async createBatch(
  //   @CurrentUser() user: User,
  //   @Body() 
  //   entity: Batch
  // ) {
  //   console.log(entity.number)
  //   await Batch.create().save()

  //   await Student.create({
      
      
  //    }).save()

  //   const batch = await Batch.findOneById(entity.id)

  //   io.emit('action', {
  //     type: 'ADD_GAME',
  //     payload: batch
  //   })

  //   return batch
  // }

  

  //@Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  // @Patch('/games/:id([0-9]+)')
  // async updateGame(
  //   @CurrentUser() user: User,
  //   @Param('id') batchId: number,
  //   @Body() update: Number 
  // ) {
  //   const batch = await Batch.findOneById(batchId)
  //   if (!batch) throw new NotFoundError(`Batch does not exist`)

  //   const student = await Student.findOne( {batchId} )

  //   if (!player) throw new ForbiddenError(`You are not part of this game`)
  //   if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
  //   if (player.symbol !== game.turn) throw new BadRequestError(`It's not your turn`)
  //   if (!isValidTransition(player.symbol, game.board, update.board)) {
  //     throw new BadRequestError(`Invalid move`)
  //   }

  //   console.log('2')

  //   const winner = calculateWinner(update.board)
  //   if (winner) {
  //     game.winner = winner
  //     game.status = 'finished'
  //   }
  //   else if (finished(update.board)) {
  //     game.status = 'finished'
  //   }
  //   else {
  //     game.turn = player.symbol === 'x' ? 'o' : 'x'
  //   }
  //   game.board = update.board
  //   await game.save()

  //   console.log('3')

  //   io.emit('action', {
  //     type: 'UPDATE_GAME',
  //     payload: game
  //   })

  //   return game
  // }

 @Authorized()
 @Get('/batches/:id([0-9]+)')
  getBatch(
   @Param('id') batchid: number
   ) {
    let studentsBatch = Student.find( {batch: batchid} ) 

    return studentsBatch 
   }
@Authorized()
@Get('/batches')
getBatches() {
return Batch.find()
   }

   //@Authorized()
   @Get('/batches/:id([0-9]+)/random')
    async askQuestion(
     @Param('id') batchid: number
     ) {
      let studentsBatch = await Student.find( {batch: batchid} ) 
  
      return studentsBatch.filter(student =>{if (student.averageColor) {return student}}) 

     }



// @Get('/quizquestions/:id([0-9]+)')
//     @HttpCode(201)
//     async getQuizQuestions(
//         @Param('id') quizRequestId: number
//     ) {
        
//         let quizQuestion = Question.find( {quiz: quizRequestId} ) 

//         return quizQuestion 
// //     }


  // @Post('/students')
  // @HttpCode(201)
  // async addStudent(
  //   @CurrentUser() user: User,
  //   @Body() student: Student
    
  // ) {
    
    

    
    

  //   const student = await Student.create({

  //   }).save()
  //   console.log(student)

    

  //   return student
  // }
}

@JsonController()
export  class StudentController {
  @Authorized()
  @Post('/students')
  @HttpCode(201)
  async createGame(
    @Body() student: Student,
    
  ) {
    
      return student.save()
    

    
    
  }

  
  @Put('/students/:id')
async updatePage(
  @Param('id') id: number,
  @Body() update: Student
) {
  const student = await Student.findOneById(id)
  console.log('hello',student)
  if (!student) throw new BadRequestError('Cannot find student')

  return update.save()
}


  
}

@JsonController()
export  class EvaluationController {
  //@Authorized()
  @Post('/evaluations/:id')
  @HttpCode(201)
  async createEvaluation(
    @Body() evaluation: Evaluation,
    @Param('id') studentId:number 
    
  ) { 
     evaluation.save()

     const student = await Student.findOneById(evaluation.studentId)
     if(student){

      student.averageColor = evaluation.color
      return student.save()

     }
     else { throw new BadRequestError('Cannot find student')}
    
    
    // const student = await Student.findOneById(evaluation.studentId)
    // console.log('hello',student)
    // if(student){
    //   student.evaluations ++;
    //   student.totalScore += calculateScore(evaluation.color)
    //   student.averageColor = calculateAverageColor(student.evaluations, student.averageColor)

    //    request
    //   .put(`http://localhost:4000/students/${studentId}`)
    //   .send({student})
    //   .then(response => {console.log(response)})

      
      
      
  }

    // async updatePage(
    //   @Param('id') id: number,
    //   @Body() update: Student
    // ) {
    //   console.log('hello')
    //   const student = await Student.findOneById(id)
    //   console.log('hello',student)
    //   if (!student) throw new BadRequestError('Cannot find student')
    
    //   return update.save()
    // }


  }

      
      
      
      
      
      
  
    

    
    // return io.emit('action', {
    //   type: 'UPDATE_BATCH',
    //   payload: await Batch.findOneById(student.batch)
    // })

  

