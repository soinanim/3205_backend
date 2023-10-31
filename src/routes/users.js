"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const parsedusers = JSON.parse(fs_1.default.readFileSync('users.json').toString());
    let result;
    result = parsedusers.filter((user) => user.email === req.query.email || user.number === req.query.number);
    try {
        return res.send(result);
    }
    catch (err) {
        console.error('c', err);
        res.sendStatus(500);
    }
});
exports.default = router;
