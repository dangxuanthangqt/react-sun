const jsonServer = require("json-server");

var cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
var db = router.db;
const middlewares = jsonServer.defaults(true);
const port = 4000;

//server.use(bodyParser.json())
server.use(cors());
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  //console.log(req)
  let array = res.locals.data;
  let brand = array.reduce((total, next) => {
    total[next.brand] = (total[next.brand] || 0) + 1;
    return total;
  }, {});
  brand = Object.entries(brand)
    .sort(([, a], [, b]) => {
      return b - a;
    })
    .reduce((array, [key, value]) => {
      array.push({ [key]: value });
      return array;
    }, []);

  let type = array.reduce((total, next) => {
    total[next.type] = (total[next.type] || 0) + 1;
    return total;
  }, {});
  type = Object.entries(type)
    .sort(([, a], [, b]) => {
      return b - a;
    })
    .reduce((array, [key, value]) => {
      array.push({ [key]: value });
      return array;
    }, []);
  
  let rating = array.reduce((total, next) => {
    total[next.rating] = (total[next.rating] || 0) + 1;
    return total;
  }, {});
  rating = Object.entries(rating)
    .sort(([a,], [b,]) => {
      return b - a;
    })
    .reduce((array, [key, value]) => {
      array.push({ [key]: value });
      return array;
    }, []);
  
  res.jsonp({
    body: res.locals.data,
    length: res.locals.data.length,
    brand,
    type,
    rating
  });
};


server.use(middlewares);
server.use(router);
server.listen(port);
