# The Problematic API
###### Based on this [template](https://github.com/AckeeCZ/node-template/tree/96f7d616301e7451df83b96a38a7bed2b372db4b)

_This application allows you to put all your `Problems` away!_

## Quick-start
 - `npm install`
 - `npm start`
 - Visit [`http://localhost:3000/`](http://localhost:3000/)


## API
- Run `npm run docs:start` and visit `http://localhost:8088/` to browse API docs

### Development
 - `npm run start-lr`

## Collaborating
GitHub Issues and Github Project is used for simple kanban-style progress tracking. Check it out [here](https://github.com/tond4/the-problematic-api/projects/1).


## Meeting the Requirements
### Requirements
> 1\. Use [Our project template](https://github.com/AckeeCZ/node-template) to get started. Template's readme should give you more information on how to use it.
- :heavy_check_mark:
> 2\. Authenticate users using Basic access authentication. No need to verify against any database - assume password is always correct. Use username from BA credentials to identify the User.
- :heavy_check_mark: See [authentication middleware](https://github.com/tond4/the-problematic-api/blob/master/src/app/middlewares/basicAuth.ts). Stubby authentication method is asynchronous and ready to be replaced with the real thing.
> 3\. User can create a new Problem. A Problem can be either riddle or math expression - more on that below.
- :heavy_check_mark: See `POST /api/problems/:id/answers` [here](https://github.com/tond4/the-problematic-api/blob/master/docs/api/collections/answers.apib#L5).
 - We treat Answers just as another resource that happens to have extra validation (must be correct) and not have its own CRUD operations.
> 4\. User can update, delete, read and list Problems.
- :heavy_check_mark: See docs for related routes [here](https://github.com/tond4/the-problematic-api/blob/master/docs/api/collections/problems.apib).
> 5\. User can answer a Problem. Only correct answers are accepted.
- :heavy_check_mark: See `POST /api/problems`
> 6\. Modify update, delete operations so that only users who created those Problems can perform this action.
- :heavy_check_mark: Username used for `updateProblem` and `deleteProblem` must exactly match username of the user who created the Problem.
- Username is currently checked directly inside [problem service](https://github.com/tond4/the-problematic-api/blob/6e39f0bd4235dc2f77efa5ca11d55f2a6c2fe8a3/src/app/services/problem.service.ts#L61). This could be improved by moving loading Problem into it's own middleware for all routes that use `/problems/:id`.
> 7\. (_Optional_) Modify Problems List to support filtering by Problem type and by answered / unasnwered for current user
- :heavy_check_mark: 
> 8\. (_Optional_) Modify update/create Problem operations to validate the input data. Reject requests for empty problems and respond accordingly.
- :heavy_check_mark:
- This could be improved by generating JSON Schema directly from API Blueprints `docs/api/schemas` to encourage design-first approach and minimize discrepancies between API docs and reality as the API grows.
> 9\. When completed, send us as link to your git repository or any other share services like GDrive etc.
- If you are reading this, then :heavy_check_mark:

### You must
> - Design API (routes, data model, etc.) and implement accordignly to meet all requirements
- :heavy_check_mark:
> - Use JS / TS
- :heavy_check_mark:
> - Use the provided template
- :heavy_check_mark:
> - Use JSON as transport format
- :heavy_check_mark:
> - Use git as VCS
- :heavy_check_mark:
> - Make sure `npm start` and `npm test` still work
 - :heavy_check_mark:

### You can
 - Modify the template to your liking and change dependencies
 - :white_circle: No major changes done to the template.
> - Use any storage or database you like, you can even use a custom non-persistent storage, however it must provide an asynchronous API for read and write operations. We suggest [SQLite :memory:](https://www.sqlite.org/inmemorydb.html), as it is close to the real thing.
- :heavy_check_mark: Used SQLite:memory.

### You should
> - Test your code
- :heavy_check_mark:
> - Use the REST architecture to your best abilities
- :heavy_check_mark:
> - Use git as if you were collaborating on a project
- :heavy_check_mark: Left merged branches undeleted for better readability. Alsoo see github for [Project kanban](https://github.com/tond4/the-problematic-api/projects/1), 
> - Document your REST API
- :heavy_check_mark: Used API Blueprint as per template.
> - Use appropriate status codes and meaningful responses
- :heavy_check_mark:
> - Make the answer to riddles (constant string) configurable through static application config. Application restart is required to apply new configuration.
- :heavy_check_mark: Universal correct answer to riddles is loaded from [config](https://github.com/tond4/the-problematic-api/blob/master/.env.json#L7).
> - Ignore existing solutions for the expression solver or built in JS functions (like `eval`). We will be impressed by your algorithm. If you can't make it, don't worry, an existing solver is better than none. The solver is also a single non-trivial business logic in the task.
- :heavy_check_mark: Implemented simple interface that allows expression solver modules be simple switched in place via [attribute in configuration](https://github.com/tond4/the-problematic-api/blob/master/.env.json#L8).

>  - (Bonus) Enhance your solver with binary operators `*/`, unary operators `-+` and operator precedence.
- :x: Multiplication, division and operator precedence are supported by custom expression solver. Unary operators are not implemented yet (as of deadline for submitting).

## License
This project is published under [MIT license](./LICENSE).
