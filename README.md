exercise-api
============

A set of endpoints to demonstrate 4 use-cases.

Node.js was selected for this project because of its great performance, intuitive environment and as a personal preference for developing projects in the past 3 years.

MongoDB was selected for its simplicity to quickly prototype a small project.

Express.js was chosen as a tool to build the exercise-api for its well structured layout.

Other packages that are used in the app:

	mongoose 	- a schema based solution to model app objects
	Faker		- to make fake data less boring		
	mocha		- a Javascript test framework, a well featured tool for testing
	should		- an assertion library for tests
	sinon		- an excellent framework to create stubs, mocks, and spies for tests
	istanbul	- a test coverage tool to generate a test coverate report


## Prerequisites

	1. Installed node
	2. Installed npm
	3. Installed and running mongodb

## To begin

 1. Clone the app
    
    ```bash
    $ git clone https://github.com/MaxKramnik/exercise-api.git
    ```

 2. Install packages

    ```bash
    $ npm install
    ```

## To run the app
	
  1. Insert test data (again, assuming mongodb is running as localhost, if not, make an appropriate config change in /config/config.js ). You need to run this only once, but if you run it multiple times, it will simply regenerate 100 new user documents in db

  	```bash
    $ make data
    ``` 	

  2. Start the app:

	```
	$ node app
	# or
	$ npm start
	# or
	$ make server
	```



## Access the endpoints    

Assuming the app is running, the app can be tested by simply copy/pasted the links bellow in the browser window:

  1. An account with the credentials **admin** for username and **admin** for password is the user account that would allow to authenticate, it should return a user object:

  [http://localhost:3000/v1/auth?username=admin&password=admin](http://localhost:3000/v1/auth?username=admin&password=admin)

  2. This should return status code 403, permission denied:

  [http://localhost:3000v/auth?username=test1&password=test2](http://localhost:3000v/auth?username=test1&password=test2)

  3. A list of users:

  [http://localhost:3000/v1/list](http://localhost:3000/v1/list)

  4. A list of users, page 4:

  [http://localhost:3000/v1/list/4](http://localhost:3000/v1/list/4)

  5. A list of female users:

  [http://localhost:3000/v1/list?gender=female](http://localhost:3000/v1/list?gender=female)

  6. A list of users sorted by country:

  [http://localhost:3000/v1/list/2?gender=male&groupby=country](http://localhost:3000/v1/list/2?gender=male&groupby=country)

  7. The system health state:
  
  [http://localhost:3000/v1/health](http://localhost:3000/v1/health)

  8. Traverse an existing directory:

  [http://localhost:3000/v1/traverse?directory=/usr/bin](http://localhost:3000/v1/traverse?directory=/usr/bin)

  9. Try to traverse a non existing directory:

  [http://localhost:3000/v1/traverse?directory=/something](http://localhost:3000/v1/traverse?directory=/something)

Or use cUrl with any of those links in the terminal, like an example below:

```bash
$ curl -i -X GET http://localhost:3000/v1/list?gender=female
``` 

## Versioning

All endpoints start with /v1, in order to provide a flexible way to change the endpoints without breaking the current application that may still consume the older version. To create a new version of the endpoint, the developer will add /v2 (and so on) for a new version of the code to the endpoint.


## To run tests
  
  ```bash
  $ make test
  ``` 

## To run test coverage
  * A couple of methods are skipped for unit test, because they were not used directly by the endpoints, only to populate records

  ```bash
  $ make test-cov
  ``` 


