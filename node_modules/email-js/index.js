'use strict'

/**
 * Source
 * https://github.com/WebKit/webkit/blob/4226b9741095267eccf15899533703c050477190/Source/WebCore/html/EmailInputType.cpp
 *
 * Copyright (C) 2009 Michelangelo De Simone <micdesim@gmail.com>
 * Copyright (C) 2010 Google Inc. All rights reserved.
 *
 * @type {RegExp}
 */
const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) => regex.test(email)

/**
 *
 * Returns the local part of the email.
 *
 * @param {string} email
 * @returns {string}
 */
const getLocalPart = (email) => email.split('@')[0]

/**
 * Returns the domain part of the email.
 *
 * @param {string} email
 * @returns {string}
 */
const getDomainPart = (email) => email.split('@')[1]

module.exports = { isValidEmail, getDomainPart, getLocalPart }
