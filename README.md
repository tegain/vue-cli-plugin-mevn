# Vue-CLI MEVN Plugin

> For Vue-CLI v3.x only

Easily Add MEVN (MongoDB, Express, Vue, Node), ES6-ready stack to your Vue-CLI project.

## Installation

Generate a project using vue-cli 3.0 (or use your current Vue-CLI project)

```bash
vue create my-app

cd my-app
```

Add the plugin to your project

```bash
vue add mevn
```

You'll then have to configure your API and database access with a few questions:

```bash
# API Port (default: 5000). 
# Access the API at http://localhost:<PORT>
- Enter API PORT

# Database connection URL (local or remote). 
# Must be a valid `mongodb://` URL
- Enter Mongo database url 

# API prefix (default: none). Add a global prefix to your API routes. 
# Example: /api/v1 -> Access the API at http://localhost:<PORT>/api/v1
- Enter API prefix
```

Answer the few questions and you're done!  

## What it does

This plugin will add an `api/` folder at the root of your project,
containing a boilerplate to start using Express and MongoDB.

Features:

- *Server*: Express - [docs](https://expressjs.com)
- *Database*: MongoDB (with Mongoose - [docs](https://mongoosejs.com/docs/))
- *Logging*: Morgan - [docs](https://github.com/expressjs/morgan)
- Environment-specific variables
- ESLint
- Modularized architecture
- Custom, preformatted Exceptions

### Folders structure

```bash
api
 |-src
   |-config           # Global variables & environments configuration
   |-database         # Database connection
   |-modules          # Actual API modules
   |-services         # Application services (LoggerService, etc.)
   |-utils            # Util methods
   |---exceptions     # Custom exceptions
 |-.babelrc 
 |-.env.development   # Dev-specific variables
 |-.env.production    # Production-specific variables
 |-.eslintrc.js
 |-.gitignore
 |-package.json
src (your Vue project)
 |-...
```

## Start the API

You can start the API by running the following NPM command:

```bash
# Production build
npm run start

# Development build with Nodemon watching for your changes
npm run start:dev
```

Adding this plugin will also add 2 NPM commands to your Vue project's `package.json`,
so you can start the API directly from your project root:
- `api:start`
- `api:start:dev`

## Modules

### Architecture

The API project is built so a module folder contains every files needed to this module:

```bash
|-moduleName
   |-models                     # Module Mongoose schemas/models
   |-moduleName.module.js       # Module entrypoint, defining the routes / HTTP methods association
   |-moduleName.controller.js   # Module controller, dealing with the API logic
   |-moduleName.service.js      # Module service, handling communication with the database
```

### (How-to) Create a module

In the `/api/modules` folder, create a new folder with the name of your module.
We'll create a **Users** module, so the folders architecture will look like this:

```bash
|-api
  |-src
    |-modules
      |-users
         |-models
           |-user.model.js
         |-users.module.js
         |-users.controller.js
         |-users.service.js
      |- ... other modules
```

#### Creating the module entrypoint

```js
// users.module.js
import express from 'express';
import { UsersController } from './users.controller';

export const UsersModule = express.Router();

UsersModule.get('/', UsersController.findAll);
UsersModule.post('/', UsersController.addUser);
```

#### Creating the module controller

```js
// users.controller.js
import { UsersService } from './users.service';

export class UsersController {
	// Return all users
	static async findAll (req, res) {
		const users = await UsersService.findAll();
		return res.status(200).json(users);
	}
	
	// Add a new user
	static async addUser (req, res) {
		const user = await UsersService.addOne(req.body);
		return res.status(201).json(user);
	}
}
```

#### Creating the module service (aka actually dealing with the database)

```js
// users.service.js
import { UserModel } from './models/user.model';
import { NotFoundException } from "../../utils/exceptions";

export class UsersService {
	static async findAll () {
		return await ExampleModel.find().exec();
	}

	static async findById (id) {
		const document = await ExampleModel.findById(id);
		if (!document) throw new NotFoundException();
		return document;
	}

	static async addOne (data) {
		return await ExampleModel.create(data);
	}
}
```

### (How-to) Add a module to the API

Then, in `app.js`, import and initialize your module inside the `initializeModules()` class method:

```js
// /api/app.js
import { UsersModule } from './modules/users/users.module';

class AppFactory {
  // ...
	
  initializeModules () {
    this.addModule(
    	'users',     // Module route mapping
    	UsersModule   // Module entrypoint
    );
    
    // ... Other modules
  }
}
```

Using the `addModule` instance method, you can map an API base route with your module.

`addModule` takes two parameters: 
- your module name, used as a route mapping
- your module entrypoint

For example, for the `UsersModule` above, your module will respond to `http://localhost:<PORT><PREFIX>/users` routes.

To view a functional example, see:
- Module [/generator/template/api/src/modules/example](./generator/template/api/src/modules/example).
- Module initialization [/generator/template/api/src/app.js](./generator/template/api/src/app.js).
