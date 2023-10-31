import { Router, Request, Response } from 'express';
import { User } from '../models/user';
import fs from 'fs';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const parsedusers: User[] = JSON.parse(
    fs.readFileSync('users.json').toString()
  );

  let result: User[];

  result = parsedusers.filter(
    (user) => user.email === req.query.email || user.number === req.query.number
  );

  try {
    return res.send(result);
  } catch (err) {
    console.error('c', err);
    res.sendStatus(500);
  }
});

export default router;
