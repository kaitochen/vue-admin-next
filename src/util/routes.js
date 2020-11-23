import asyncRoutes from "@/router/asyncRoutes";
import curlToParams from "curl-to-params";
const reg = /\/:[A-Za-z]*/g;
export const matchRoutes = role => {
  let len = role.length;
  if (len <= 0) {
    return [];
  }
  const ROUTE_MODE = process.env.VUE_APP_ROUTE;
  let accessRoutes = [];
  console.log(role, ROUTE_MODE);

  switch (ROUTE_MODE) {
    case "NONE":
      accessRoutes = diffRoute(role, asyncRoutes);
      break;
    case "LOCAL":
      accessRoutes = diffRouteLocal(role, asyncRoutes);
      break;
  }
  return accessRoutes;
};
const diffRoute = (source, target) => {
  let _target = matchRoutePath(target);
  let result = source.map(item => {
    try {
      let { children, url, title } = item;
      if (url) {
        let matched = _target
          ? _target.filter(item => {
              return url.match(item.reg);
            })
          : [];
        if (matched.length > 0) {
          let _matched = {};
          if (matched.length > 1) {
            matched.forEach(match => {
              if (match.path === url) {
                _matched = match;
              }
            });
          } else {
            _matched = matched[0];
          }
          if (Array.isArray(children) && children.length > 0) {
            return {
              ..._matched,
              path: url,
              meta: { title: title },
              children: diffRoute(children, _matched.children || null)
            };
          } else {
            return {
              ..._matched,
              meta: { title: title },
              path: url,
              children: null
            };
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
    }
  });
  if (result.length > 0) {
    result = result.filter(item => {
      return item && item.name !== undefined;
    });
  }
  return result;
};
const diffRouteLocal = (source, target) => {
  let common = [
    ...source
      .filter(item => (item.name ? true : false))
      .map(item => {
        item.local = true;
        return item;
      }),
    ...target
  ];
  let routes = {};
  common.forEach(item => {
    const { name, local } = item;
    console.log(item);
    if (!routes[name]) {
      if (local) {
        routes[name] = item;
      }
    } else {
      let children = routes[name]["children"];
      item.children = diffRouteLocal(children, item.children);
      routes[name] = item;
    }
  });
  return Object.values(routes);
};

const matchRoutePath = routes => {
  if (!Array.isArray(routes)) {
    return [];
  }
  return routes.map(item => {
    let matchResult = item.path.match(reg);
    if (matchResult && Array.isArray(matchResult) && matchResult.length > 0) {
      let regStr = item.path;
      matchResult.forEach(str => {
        regStr = regStr.replace(str, "\\/[A-Za-z0-9]*");
      });
      item.reg = new RegExp(regStr, "g");
    } else {
      item.reg = item.path;
    }
    return item;
  });
};

export const matchMenu = role => {
  return role
    .filter(item => {
      return item.hide === "NO";
    })
    .map(item => {
      item.children =
        item.children.length > 0
          ? item.children
              .filter(child => {
                return child.hide === "NO";
              })
              .map(child => {
                return {
                  name: child.name,
                  pageRoute: curlProtocol(child.pageRoute),
                  role: child.role
                };
              })
          : [];
      return item;
    });
};

const curlProtocol = path => {
  if (path.startsWith("route://")) {
    path = path.replace("route://", "curl ");
    let params = curlToParams(path);
    if (params.static) {
      return "/" + params.url;
    } else if (params.dynamic) {
      return "/generate/page/" + params.url;
    } else {
      return params.url;
    }
  } else {
    return "";
  }
};
