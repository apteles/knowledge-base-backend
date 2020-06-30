class HelloController {
  index(req, res) {
    res.json({ message: 'hello world' });
  }
}

export default new HelloController();
