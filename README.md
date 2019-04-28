# Vue-CLI MEVN Plugin

> For Vue-CLI v3.x only

Easily Add MEVN (MongoDB, Express, Vue, Node), ES6-ready stack to your Vue-CLI project.

## Installation

Generate a project using vue-cli 3.0

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
# Access to the API at http://localhost:<PORT>
- Enter API PORT

# Database connection URL (local or remote). 
# Must be a valid `mongodb://` URL
- Enter Mongo database url 

# API prefix (default: none). Add a global prefix to your API URLS. 
# Example: /api/v1 -> Access to your API at http://localhost:<PORT>/api/v1
- Enter API prefix
```

Answer the few API & database configuration questions and you're done!  



## What it does

This plugin will add an `api/` folder at the root of your project,
containing a boilerplate to start using Express and MongoDB.

Features:

- *Server*: Express
- *Database*: MongoDB (with Mongoose)
- *Logging*: Morgan
- Environment-specific variables
- ESLint
- Modularized architecture
- Custom Exceptions

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

The API project is built so a module folder contains every files needed to this module:

```bash
|-moduleName
   |-models                     # Module Mongoose schemas/models
   |-moduleName.module.js       # Module entrypoint, defining the routes / HTTP methods association
   |-moduleName.controller.js   # Module controller, dealing with the API logic
   |-moduleName.service.js      # Module service, handling communication with the database
```

#### Add a module

Then, in `app.js`, import and initialize your module inside the `initializeModules()` class method:

```js
// /api/app.js
import { ExampleModule } from './modules/example/example.module';

class AppFactory {
  // ...
	
  initializeModules () {
    this.addModule(
    	'examples',     // Module route mapping
    	ExampleModule   // Module entrypoint
    );
    
    // ... Other modules
  }
}
```

Using the `addModule` instance method, you can map an API base route with your module.

`addModule` takes two parameters: 
- your module name, used as a base route mapping
- your module entrypoint

For example, for the `ExampleModule` above, your module will respond to `http//your-api-url/examples` routes.
If you wish your `ExampleModule` to respond to `/users` routes, just replace the method for this one:

```js
// app.js
this.addModule('users', ExampleModule);
```

To view a functional example, see:
- Module [/generator/template/api/src/modules/example](./generator/template/api/src/modules/example).
- Module initialization [/generator/template/api/src/app.js](./generator/template/api/src/app.js).

