const express = require("express");
const MapsController = require("../controllers/maps");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
