import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../../utils/userHandler';
import { v4 as uuidv4 } from 'uuid';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if(req.cookies.session) {
    res.json(getUser(req.cookies.session));
  } else {
    // Generate a random UUID
    const uuid = uuidv4();

    // Set a cookie named "myCookie" with the random UUID as its value
    res.setHeader('Set-Cookie', `session=${uuid}`);
    res.status(200).json({});
  }
} 
