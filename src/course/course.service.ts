import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid'

type CoursePropsUser = {

  name: string
  description: string
  email: string
  admin: boolean
  id?: string
}

@Injectable()
export class CourseService {

  private courses: CoursePropsUser[] = []

  findAll() {

    return this.courses
  }

  create(courseProps: CoursePropsUser) {

    const courseUser = {

      name: courseProps.name,
      description: courseProps.description,
      email: courseProps.email,
      id: uuidV4(),
      admin: false
    }

    return this.courses.push(courseUser)

  }

  remove(user_id: string) {

    const id = user_id
    const verifyIdExists = this.courses.findIndex(indexId => id === indexId.id)

    if (verifyIdExists) {

      return this.courses.splice(verifyIdExists)
    }

    return "Not is possible delete this course user"


  }

  turnAdmin(user_id: string) {

    const id = user_id
    const verifyIdExists = this.courses.find(idIndex => id === idIndex.id)

    if (!verifyIdExists) {

      return "This id User not exists"
    }

    return verifyIdExists.admin = true
  }


}
