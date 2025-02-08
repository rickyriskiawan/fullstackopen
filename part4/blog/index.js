const express = require('express');
const app = express();
const cors = require('cors');
const blogRoutes = require('./controllers/blogs');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
