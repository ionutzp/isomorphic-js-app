// module.exports = function middleware(router) {
//   var directorRouter = router.directorRouter;

//   return function middleware(req, res, next) {
//     // Attach `this.next` to route handler, for better handling of errors.
//     directorRouter.attach(function() {
//       this.next = next;
//     });

//     // Dispatch the request to the Director router.
//     directorRouter.dispatch(req, res, function (err) {
//       // When a 404, just forward on to next Express middleware.
//       if (err && err.status === 404) {
//         next();
//       }
//     });
//   };
// };

var director = require('director');
var React = require('react');
var isServer = !process.browser;
// var routes = require('./routes');
// // var router = new Router(routes);
var DirectorRouter = isServer ? director.http.Router : director.Router;
var Renderer = require('../renderer');
var routes = function(match) {
  match('/', function(callback) {
    console.log('route - index', callback);
    callback(null, 'index');
  });

  match('/test', function(callback) {
    console.log('route - test', callback);
    callback(null, 'test');
  });
};

function Router(routesFn) {
  if (routesFn == null) throw new Error("Must provide routes.");

  this.directorRouter = new DirectorRouter(this.parseRoutes(routesFn));
  this.renderer = new Renderer();

  if (!isServer) {
    // Kick-off client-side initialization.
    this.start();
  }
}





/**
 * Capture routes as object that can be passed to Director.
 */
Router.prototype.parseRoutes = function(routesFn) {
  var routes = {};

  routesFn(function(pattern, handler) {
    // Server routes are an object, not a function. We just use `get`.
    if (isServer) {
      routes[pattern] = {
        get: this.getRouteHandler(handler)
      };
    } else {
      routes[pattern] = this.getRouteHandler(handler);
    }
  }.bind(this));

  return routes;
};

Router.prototype.getRouteHandler = function(handler) {
  var router = this;

  return function() {
    // `routeContext` has `req` and `res` when on the server (from Director).
    var routeContext = this;
    var params = Array.prototype.slice.call(arguments);
    var handleErr = router.renderer.handleErr.bind(routeContext);
    var handlerContext = {
      req: this.req,
      res: this.res,
    };

    function handleRoute() {
      debugger;
      handler.apply(handlerContext, params.concat(function routeHandler(err, viewPath, data) {
        if (err) return handleErr(err);

        data = data || {};
        // Add `router` property, i.e. so components can do redirects.
        data.router = router;
        // Add `renderer` property to demonstrate which side did the rendering.
        data.renderer = isServer ? 'server' : 'client';
        debugger;
        var component = router.getComponent(viewPath, data);

        router.renderer.render(component, routeContext.req, routeContext.res);
      }));
    }

    try {
      handleRoute();
    } catch (err) {
      handleErr(err);
    }
  };
};

Router.prototype.getComponent = function(viewPath, data) {
  if(isServer){
    var Component = React.createFactory(require(Renderer.viewsDir + '/' + viewPath + '.jsx'));
  }
  else {
    var req = require.context("../components", true, /^.*\.jsx$/);
    var path =  './' + viewPath + '.jsx';
    var module = req(path);
    var Component = React.createFactory(module);
  }
  return Component(data);
};

// /**
//  * Client-side handler to start router.
//  */
Router.prototype.start = function() {
  /**
   * Tell Director to use HTML5 History API (pushState).
   */
  this.directorRouter.configure({
    html5history: true
  });

//   /**
//    * Intercept any links that don't have 'data-pass-thru' and route using
//    * pushState.
//    */
//   document.addEventListener('click', function(e) {
//     var el = e.target;
//     var dataset = el && el.dataset;
//     if (el && el.nodeName === 'A' && (
//         dataset.passThru == null || dataset.passThru === 'false'
//       )) {
//       this.directorRouter.setRoute(el.attributes.href.value);
//       e.preventDefault();
//     }
//   }.bind(this), false);

  /**
   * Kick off routing.
   */
  this.directorRouter.init();
};

/**
 * Client-side method for redirecting.
 */
Router.prototype.setRoute = function(route) {
  this.directorRouter.setRoute(route);
};

var router = new Router(routes);

module.exports = function middleware() {
  var directorRouter = router.directorRouter;
  return function middleware(req, res, next) {
    // console.log('xxx', req, res, next);
    // Attach `this.next` to route handler, for better handling of errors.
    // directorRouter.attach(function() {
    //   this.next = next;
    // });

    // Dispatch the request to the Director router.
    directorRouter.dispatch(req, res, function (err) {
      // When a 404, just forward on to next Express middleware.
      if (err && err.status === 404) {
        next();
      }
    });
  };
};


