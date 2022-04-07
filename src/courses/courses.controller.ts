import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res, Patch, Delete } from '@nestjs/common';
import { response, Response } from 'express';
import { CourseService } from 'src/course/course.service';
import { v4 as uuidV4 } from 'uuid'

type UserProps = {

  name: string
  description: string
  email: string
  admin: boolean
  id?: string
}

@Controller('courses')
export class CoursesController {

  constructor(private readonly courseService: CourseService) { }

  @Post('/list/create')

  create(@Res() response: Response, @Body('courseProps') courseProps: UserProps): Response {

    try {

      this.courseService.create(courseProps)
      return response.status(201).send("Are created")
    }
    catch (exception) {

      return response.status(400).json(exception)
    }

  }

  @Get('/listAll')
  //Referenciar uma Route Get;
  findAll(@Res() response: Response): Response {

    try {
      const findAll = this.courseService.findAll()
      return response.status(201).json(findAll)
    }
    catch (exception) {

      return response.status(400).json(exception)
    }

  }

  @Patch(':id')
  updateProps(@Param('id') id: string, @Body('props') props, @Res() response: Response): Response {

    try {

      const updateFunc = this.courseService.turnAdmin(id)
      return response.status(201).send("The profile are updated")
    }
    catch (exception) {

      return response.status(400).json(exception)
    }

    // const infoProps = { ...props }
    //Desestruturação de um Objeto
  }

  @Delete(':id')
  remove(@Param() id: string, @Res() response: Response): Response {

    const userId = id

    try {

      const removeFunc = this.courseService.remove(userId)
      return response.status(201).send("The profile are removed")
    }
    catch (exception) {

      return response.status(400).json(exception)
    }
  }
}

