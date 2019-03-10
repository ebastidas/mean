# A Starter MEAN.JS with JTW authentication

This repo is based on a fork of MEAN.JS: https://github.com/mleanos/mean/tree/feature/JWT-Auth-Lib, which uses JWT tokens instead of session authentication (used in the original MEAN.JS implementation). We need JWT to easily allow external calls to our API (CORS is also enable by default in this repo).

For the original specifications of MEAN.JS (http://meanjs.org/), See below the for the original README file, or go to https://github.com/meanjs/mean.

## How to run locally

* Clone the repo

    ```bash
    $ git clone https://github.com/ebastidas/mean-jwt.git mean-jwt
    ```

* Install node modules

    ```bash
    $ cd mean-jwt
    $ npm install
    ```

* Change/check the line of the file `package.json`:

    * When running locally (development):
        `"start": "gulp",`

    or:

    * When deploying in Bluemix (Note: Bluemix doesn't support gulp -because it tries to open a second port to listen for changes in the code-, but locally we can use it):

        `"start": "node server.js",`

* Run your application using npm:

    ```bash
    $ npm start
    ```
    or

    ```bash
    $ gulp
    ```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)


# How to create new modules:

How to create a new "agencies" module

## Duplicate a new module folder

Duplicate the folder modules/articles to a new one named modules/NEW_MODULE_NAME_IN_PLURAL

  `cp -r modules/articles modules/agencies`

## Replace all old_module words inside files
Replace all words inside files in the folder "modules/NEW_MODULE_NAME_IN_PLURAL", ej. "modules/agencies" (Note: distinguish between lower case and upper case):

On OSX:
  `grep -rli 'old_word' * | xargs -I@ sed -i '' 's/old_word/new_word/g' @`

On Linux:
  `grep -rli 'old_word' * | xargs -i@ sed -i 's/old_word/new_word/g' @`

1. Find (match case) and replace all the words "OLD_MODULE_NAME_IN_PLURAL" (ej: Articles) to "NEW_MODULE_NAME_IN_PLURAL" (ej: Agencies) (Check if found 120 matches in 21 files)

On OSX:
  `grep -rli 'Articles' * | xargs -I@ sed -i '' 's/Articles/Agencies/g' @`


2. Find (match case) and replace all the words "OLD_MODULE_NAME_IN_PLURAL" (ej: articles) to "NEW_MODULE_NAME_IN_PLURAL" (ej: agencies) (Check if found 156 matches in 23 files)

On OSX:
  `grep -rli 'articles' * | xargs -I@ sed -i '' 's/articles/agencies/g' @`


3. Find (match case) and replace all the words "OLD_MODULE_NAME_IN_SINGULAR" (ej: Article) to "NEW_MODULE_NAME_IN_SINGULAR" (ej: Agency) (Check if found 111 matches in 16 files)

On OSX:
  `grep -rli 'Article' * | xargs -I@ sed -i '' 's/Article/Agency/g' @`


4. Find (match case) and replace all the words "OLD_MODULE_NAME_IN_SINGULAR" (ej: article) to "NEW_MODULE_NAME_IN_SINGULAR" (ej: agency) (Check if found 356 matches in 22 files)

On OSX:
  `grep -rli 'article' * | xargs -I@ sed -i '' 's/article/agency/g' @`


## Rename all files (all files are lower case)

1. Go to the new renamed folder

      `cd modules/agencies`

      Check the files that are going to be renamed with the "-n" flag (Mac or Linux), ej:

      `$ find . -iname "*articles*" -exec rename -n 's/articles/agencies/' {} ";"`

      Note: `rename` has to be installed. If not install: `brew install rename`

2. Rename all files with the word "articles" to "NEW_MODULE_NAME_IN_PLURAL, ej: agencies". Use the following command (Mac or Linux):

      `$ find . -iname "*OLD_MODULE_NAME_IN_PLURAL*" -exec rename 's/OLD_MODULE_NAME_IN_PLURAL/NEW_MODULE_NAME_IN_PLURAL/' {} ";"`

    ej.

      `$ find . -iname "*articles*" -exec rename 's/articles/agencies/' {} ";"`

3. Rename all files with the word "article" to "NEW_MODULE_NAME_IN_SINGULAR, ej: agency". Use the following command (Mac or Linux):

      `$ find . -iname "*OLD_MODULE_NAME_IN_SINGULAR*" -exec rename 's/OLD_MODULE_NAME_IN_PLURAL/NEW_MODULE_NAME_IN_PLURAL/' {} ";"`

    ej.

      `$ find . -iname "*article*" -exec rename 's/article/agency/' {} ";"`


# Deploying To Cloud Foundry

There are 2 options:

* With the Cloudfoundry (cf) command line interface (CLI). Check https://github.com/IBM-Bluemix/docs/blob/master/starters/install_cli.md
* Using IBM Bluemix Toolchains / Delivery Pipelines.

## Deploying To Cloud Foundry (with the command line interface)

Cloud Foundry is an open source platform-as-a-service (PaaS).  The MEANJS project
can easily be deployed to any Cloud Foundry instance.  The easiest way to deploy the
MEANJS project to Cloud Foundry is to use a public hosted instance.  The two most popular
instances are [Pivotal Web Services](https://run.pivotal.io/) and
[IBM Bluemix](https://bluemix.net).  Both provide free trials and support pay-as-you-go models
for hosting applications in the cloud.  After you have an account follow the below steps to deploy MEANJS.

* Install the [Cloud Foundry command line tools](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).
* Now you need to log into Cloud Foundry from the Cloud Foundry command line.
   *  If you are using IBM Bluemix run `$ cf login -a api.ng.bluemix.net`.
   *  If you are using Pivotal Web Services run `$ cf login -a api.run.pivotal.io`.
* Create a Mongo DB service (only the first time deployment)
   *  If DB name change from `mean-mongo` to `ANOTHER_DB_NAME`, change this new name into the files:    
        `manifest.yml`,
        `config/env/cloud-foundry.js`.
   *  If you are using IBM Bluemix run `$ cf create-service mongodb 100 mean-mongo`
   *  If you are using Pivotal Web Services run `$ cf create-service mlab sandbox mean-mongo`
* Clone the GitHub repo for MEANJS if you have not already done so   
   * `$ git clone -b A_starter https://github.com/ebastidas/mean-jwt.git && cd mean-jwt`
* Run `$ npm install`
* Run the Grunt Build task to build the optimized JavaScript and CSS files
   * `$ grunt build`
* Deploy MEANJS to Cloud Foundry
   * `$ cf push APP_NAME`

After `cf push` completes you will see the URL to your running MEANJS application
(your URL will be different).

     requested state: started
     instances: 1/1
     usage: 128M x 1 instances
     urls: mean-humbler-frappa.mybluemix.net

Open your browser and go to that URL and your should see your MEANJS app running!

##  Deploying To Cloud Foundry (Using IBM Bluemix Toolchains)

* Connect a new MongoDB service (only the first time deployment):
  *  If DB name change from `mean-mongo` to `ANOTHER_DB_NAME`, change this new name into the files:    
      `manifest.yml`,
      `config/env/cloud-foundry.js`.
* In the Toolchain/Pipeline, add Build Stage:
   * Use build type "Grunt",
   * Connect a git(hub) repo and a branch,
   * Add the script found in the file .bluemix/pipeline.yml, as the script of the Build stage:

       ```bash
       #!/bin/bash
       # Set Node version to 0.12
       export PATH=/opt/IBM/node-v0.12/bin:$PATH
       # Install RVM, Ruby, and SASS
       # Needed when running grunt build
       gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
       curl -sSL https://get.rvm.io | bash -s stable --ruby --gems=sass
       # Start RVM
       source /home/pipeline/.rvm/scripts/rvm
       # Build MEANJS
       npm install
       grunt build
       ```

   * Check "Run stage after a new commit to git repo"

* In the Toolchain/Pipeline, add the Deployment Stage (with the default settings: "`cf push`")

* Only when deploying the code in Bluemix, change the line of the file `package.json`:

    `"start": "gulp",`

    to:

    `"start": "node server.js",`

    * Note: Bluemix doesn't support gulp -because it tries to open a second port to listen for changes in the code-, but locally we can use it.


## Seed initial admin user

The first time to upload/deploy, we need to seed the first users (admin, and user). 2 options for this:

* Change the pacakge.json file and run the start command like this:
    `"start": "MONGO_SEED=true node server.js"`
* Redeploy app.
* Change back to the original pacakge.json file and run the start command like this:
    `"start": "node server.js"`
* Redeploy app (skip this step if deployed using CLI).


##  (Automatic) Deployment MEANJS To IBM Bluemix
IBM Bluemix is a Cloud Foundry based PaaS.  By clicking the button below you can signup for Bluemix and deploy
a working copy of MEANJS to the cloud without having to do the steps above.

DEPLOY TO BRANCH "A_starter":

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https%3A%2F%2Fgithub.com%2Febastidas%2Fmean-jwt&branch=A_starter)

Button URL: https://bluemix.net/deploy?repository=https%3A%2F%2Fgithub.com%2Febastidas%2Fmean-jwt&branch=A_starter


After the deployment is finished you will be left with a copy of the MEANJS code in your own private Git repo
in Bluemix complete with a pre-configured build and deploy pipeline.  Just clone the Git repo, make your changes, and
commit them back.  Once your changes are committed, the build and deploy pipeline will run automatically deploying
your changes to Bluemix.




------
------
------
------
------
------
------
------

[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/meanjs/mean?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/meanjs/mean.svg?branch=master)](https://travis-ci.org/meanjs/mean)
[![Dependencies Status](https://david-dm.org/meanjs/mean.svg)](https://david-dm.org/meanjs/mean)
[![Coverage Status](https://coveralls.io/repos/meanjs/mean/badge.svg?branch=master&service=github)](https://coveralls.io/github/meanjs/mean?branch=master)

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

## Downloading MEAN.JS
There are several ways you can get the MEAN.JS boilerplate:

### Cloning The GitHub Repository
The recommended way to get MEAN.js is to use git to directly clone the MEAN.JS repository:

```bash
$ git clone https://github.com/meanjs/mean.git meanjs
```

This will clone the latest version of the MEAN.JS repository to a **meanjs** folder.

### Downloading The Repository Zip File
Another way to use the MEAN.JS boilerplate is to download a zip copy from the [master branch on GitHub](https://github.com/meanjs/mean/archive/master.zip). You can also do this using the `wget` command:

```bash
$ wget https://github.com/meanjs/mean/archive/master.zip -O meanjs.zip; unzip meanjs.zip; rm meanjs.zip
```

Don't forget to rename **mean-master** after your project name.

### Yo Generator
Another way would be to use the [Official Yo Generator](http://meanjs.org/generator.html), which generates a copy of the MEAN.JS 0.4.x boilerplate and supplies an application generator to ease your daily development cycles.

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEAN application.

The boilerplate comes pre-bundled with a `package.json` and `bower.json` files that contain the list of modules you need to start your application.

To install the dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* When the npm packages install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application
* To update these packages later on, just run `npm update`

## Running Your Application

Run your application using npm:

```bash
$ npm start
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

Explore `config/env/development.js` for development environment configuration options.

### Running in Production mode
To run your application with *production* environment configuration, execute grunt as follows:

```bash
$ npm run start:prod
```

Explore `config/env/production.js` for production environment configuration options.

### Running with User Seed
To have default account(s) seeded at runtime:

In Development:
```bash
MONGO_SEED=true npm start
```
It will try to seed the users 'user' and 'admin'. If one of the user already exists, it will display an error message on the console. Just grab the passwords from the console.

In Production:
```bash
MONGO_SEED=true npm start:prod
```
This will seed the admin user one time if the user does not already exist. You have to copy the password from the console and save it.

### Running with TLS (SSL)
Application will start by default with secure configuration (SSL mode) turned on and listen on port 8443.
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:

```bash
$ npm run generate-ssl-certs
```

Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.

Finally, execute prod task `npm run start:prod`
* enable/disable SSL mode in production environment change the `secure` option in `config/env/production.js`


## Testing Your Application
You can run the full test suite included with MEAN.JS with the test task:

```bash
$ npm test
```
This will run both the server-side tests (located in the `app/tests/` directory) and the client-side tests (located in the `public/modules/*/tests/`).

To execute only the server tests, run the test:server task:

```bash
$ npm run test:server
```

To execute only the server tests and run again only changed tests, run the test:server:watch task:

```bash
$ npm run test:server:watch
```

And to run only the client tests, run the test:client task:

```bash
$ npm run test:client
```

## Running your application with Gulp

The MEAN.JS project integrates Gulp as build tools and task automation.

We have wrapped Gulp tasks with npm scripts so that regardless of the build tool running the project is transparent to you.

To use Gulp directly, you need to first install it globally:

```bash
$ npm install gulp -g
```

Then start the development environment with:

```bash
$ gulp
```

To run your application with *production* environment configuration, execute gulp as follows:

```bash
$ gulp prod
```

It is also possible to run any Gulp tasks using npm's run command and therefore use locally installed version of gulp, for example: `npm run gulp eslint`

## Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

* Local development and testing with compose:
```bash
$ docker-compose up
```

* Local development and testing with just Docker:
```bash
$ docker build -t mean .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 3000:3000 --link db:db_1 mean
$
```

* To enable live reload, forward port 35729 and mount /app and /public as volumes:
```bash
$ docker run -p 3000:3000 -p 35729:35729 -v /Users/mdl/workspace/mean-stack/mean/public:/home/mean/public -v /Users/mdl/workspace/mean-stack/mean/app:/home/mean/app --link db:db_1 mean
```

### Production deploy with Docker

* Production deployment with compose:
```bash
$ docker-compose -f docker-compose-production.yml up -d
```

* Production deployment with just Docker:
```bash
$ docker build -t mean -f Dockerfile-production .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 3000:3000 --link db:db_1 mean
```

## Getting Started With MEAN.JS
You have your application running, but there is a lot of stuff to understand. We recommend you go over the [Official Documentation](http://meanjs.org/docs.html).
In the docs we'll try to explain both general concepts of MEAN components and give you some guidelines to help you improve your development process. We tried covering as many aspects as possible, and will keep it updated by your request. You can also help us develop and improve the documentation by checking out the *gh-pages* branch of this repository.

## Community
* Use the [Official Website](http://meanjs.org) to learn about changes and the roadmap.
* Join #meanjs on freenode.
* Discuss it in the new [Google Group](https://groups.google.com/d/forum/meanjs)
* Ping us on [Twitter](http://twitter.com/meanjsorg) and [Facebook](http://facebook.com/meanjs)

## Contributing
We welcome pull requests from the community! Just be sure to read the [contributing](https://github.com/meanjs/mean/blob/master/CONTRIBUTING.md) doc to get started.

## Credits
Inspired by the great work of [Madhusudhan Srinivasa](https://github.com/madhums/)
The MEAN name was coined by [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and).

## License
[The MIT License](LICENSE.md)
