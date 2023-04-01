import { getRandomColor } from '../../utils/user-color';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const color = getRandomColor();
  res.status(200).json({ color });
}