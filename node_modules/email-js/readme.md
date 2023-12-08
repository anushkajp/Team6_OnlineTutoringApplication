# email-js
[![Build Status](https://travis-ci.org/bash/email-js.svg?branch=master)](https://travis-ci.org/bash/email-js) 
[![npm version](https://badge.fury.io/js/email-js.svg)](https://badge.fury.io/js/email-js)
[![Coverage Status](https://coveralls.io/repos/bash/email-js/badge.svg?branch=master&service=github)](https://coveralls.io/github/bash/email-js?branch=master)
[![Inline docs](http://inch-ci.org/github/bash/email-js.svg?branch=master&style=shields)](http://inch-ci.org/github/bash/email-js)

> Version 1.x can be found here: https://github.com/bash/email-js/tree/v1.4.0  
> `npm install --save email-js@1`

## Installation

```bash
npm install --save email-js
```

## Usage

```javascript
const { isValidEmail, getDomainPart, getLocalPart } = require('email-js');

console.log(isValidEmail('robot@example.com')); // => true
console.log(getDomainPart('robot@example.com')); // => example.com
console.log(getLocalPart('robot@example.com')); // => robot
```

## API

### isValidEmail(email: ```string```) =\> ```boolean```
Returns true if the email is valid.
The address is validated on by the same regex used by Webkit.

```js
isValidEmail('root@localhost') // => true
```


### getDomainPart(email: ```string```) =\> ```string```
Returns the domain part of the email.

```js
getDomainPart('root@localhost') // => 'localhost'
```

### getLocalPart(email: ```string```) =\> ```string```
Returns the local part of the email.

```js
getLocalPart('root@localhost') // => 'root'
```