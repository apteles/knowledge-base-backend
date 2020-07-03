export default (middleware) => {
  return (req, res, next) => {
    if (req.user === 'andre.telestp@gmail.com') {
      return middleware(req, res, next);
    }
    return res.status(401).json({ message: 'Operation is not allowed' });
  };
};
