const express = require("express");
const router = express.Router();
const { db, readPath, addUser, addTutor, addStudent,addCourse, addMajor } = require("../../db");
const Tutor = require("../models/tutor")
const Student = require ("../models/student")
const Availability = require("../models/availability")
const Session = require ("../models/session")
const Review = require ("../models/review")

// TUTOR SERVICES


// STUDENT SERVICES

// AVAILABILITY SERVICES

// SESSION SERVICES

// REVIEW SERVICES