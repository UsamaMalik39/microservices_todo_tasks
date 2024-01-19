# TODO APP build with microservice architecture using nestjs

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Todo Application
1. List all Todo Lists. 
2. Each Todo List has multiple Tasks. 
3. Users can create shared Todo Lists to selected members. 
4. Todo must have a title. 
5. Tasks has Title, Description, Due Date/Time, State, Total Time spent 
6. Non authorized users cannot access Todo Lists and tasks (optional). 
7. Only Soft Delete happens on all Todo Lists and tasks. 
8. Tasks will have time spent by multiple members in multiple stretches, i.e. Any member can start work and end work multiple times on the same task. This will constitute to time spent by individual member on each task.  
9. Auto sort tasks in the Todo list. 
10. On Due date/time, notification should be sent to all members of Todo List. (Use email) 

## Running the application with docker-compose
- Configuration - Edit the `.env` file to modifiy application configuration (change on need based)
- Start Application - Execute `./start.sh` from the root of the repository
- Stop Application - Execute `./stop.sh` from the root of the repository

## Launch services for end to end testing (using docker-compose)
- Configuration - Edit the `.env-e2e` file to modifiy application configuration (change on need based)
- Start Application - Execute `./e2e-start.sh` from the root of the repository
- Stop Application - Execute `./e2e-stop.sh` from the root of the repository

## Accessing the API itself and swagger docs for the API
- Once you launch the API it will be accessible on port 8000.
- Swagger docs for the API will be accessible locally via URI "**http://localhost:8000/**"
## Brief architecture overview

This API showcase consists of the following parts:
- API gateway - entry point for all requests.
- User service - responsible for CRUD operations on users and verifying permissions for logged in users.
- Mailer service - responsible for sending out emails.
- TODO service - responsible for CRUD operations on todo application.
- The service interact via **TCP sockets**

I used one DB instance for all microservices to simplify the application design

## Stay in touch

- Author - [Koushik A Makam](https://github.com/KoushikMakam)

## License

Nest is [MIT licensed](LICENSE).

