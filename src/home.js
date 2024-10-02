export const home = (userName = "") => {
  const htmlString = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Document</title>
  </head>
  <body>
    <h1>Home Page</h1>
    <hr />
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/login">login</a></li>
        <li><a href="/register">register</a></li>
      </ul>
    </nav>
    <p>Welcome [user] To my page</p>

    
  </body>
</html>
`;
  return htmlString.replace("[user]", userName);
};
