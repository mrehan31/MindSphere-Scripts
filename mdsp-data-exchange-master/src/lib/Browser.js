function getCookies(tenant, username, password) {
  return new Promise(function(resolve, reject) {
    const remote = require("electron").remote;
    const BrowserWindow = remote.BrowserWindow;
    //Generate URL and Relevant Data
    let target_tenant = tenant;
    let asset_manager_link = tenant + "-assetmanager";
    let host = "eu1.mindsphere.io";
    let target_username = username;
    let target_password = password;
    const login_url = "https://" + target_tenant + "." + host;
    const asset_url = "https://" + asset_manager_link + "." + host;
    const childWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false
    });
    childWindow.loadURL(login_url);

    childWindow.webContents.once("dom-ready", () => {
      childWindow.webContents
        .executeJavaScript(
          "javascript:document.getElementById('emailAddress').value = '" +
            target_username +
            "';"
        )
        .then(
          childWindow.webContents
            .executeJavaScript(
              "javascript:document.getElementById('passLogin').value = '" +
                target_password +
                "';"
            )
            .then(
              childWindow.webContents
                .executeJavaScript(
                  "javascript:document.getElementById('login-button').click()"
                )
                .then(
                  childWindow.loadURL(asset_url).then(
                    setTimeout(function() {
                      childWindow.webContents.session.cookies
                        .get({})
                        .then(cookies => {
                          resolve({
                            myCookies: cookies,
                            instance_id: childWindow.id
                          });
                          childWindow.webContents.session
                            .clearStorageData()
                            .then(childWindow.close());
                        })
                        .catch(error => {
                          reject(error);
                        });
                    }, 10000)
                  )
                )
            )
        );
    });
  });
}
function Create_Cookie(myCookie, tenant) {
  return new Promise(function(resolve, reject) {
    let cookie_string = "";
    let token_string = "";
    let tenant_url = tenant + "-assetmanager.eu1.mindsphere.io";
    myCookie.forEach(cookie => {
      if (cookie.name == "XSRF-TOKEN" && cookie.domain == tenant_url) {
        token_string = cookie.value;
        cookie_string = cookie_string
          .concat(cookie.name)
          .concat("=")
          .concat(cookie.value)
          .concat("; ");
      } else if (cookie.name == "SESSION" && cookie.domain == tenant_url) {
        cookie_string = cookie_string
          .concat(cookie.name)
          .concat("=")
          .concat(cookie.value)
          .concat("; ");
      } else if (
        cookie.name == "REGION-SESSION" &&
        cookie.domain == tenant_url
      ) {
        cookie_string = cookie_string
          .concat(cookie.name)
          .concat("=")
          .concat(cookie.value)
          .concat("; ");
      }
    });
    resolve({ cookie_string, token_string });
  });
}

function ValidateJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function Get_All_Assets(myCookie, tenant) {
  var request = require("request");
  let tenant_url =
    "https://" +
    tenant +
    "-assetmanager.eu1.mindsphere.io/api/assetmanagement/v3/assets";
  var options = {
    method: "GET",
    url: tenant_url,
    qs: { page: "1", size: "4" },
    headers: {
      cookie: myCookie
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
  });
}

function Import_Asset(myCookie, myToken, tenant) {
  var request = require("request");
  let tenant_url =
    "https://" +
    tenant +
    "-assetmanager.eu1.mindsphere.io/api/assetmanagement/v3/assets";
  var options = {
    method: "POST",
    url: tenant_url,
    headers: {
      accept: "application/hal+json",
      "content-type": "application/json",
      "x-xsrf-token": myToken,
      cookie: myCookie
    },
    body: {
      name: "Millenium Falcon",
      externalId: "SN 123456-123-123456",
      description: "The ship of Han Solo and Chewbacca",
      location: {
        country: "Austria",
        region: "Tyrol",
        locality: "Innsbruck",
        streetAddress: "Industriestraße 21 A/II",
        postalCode: "6020",
        longitude: 53.5125546,
        latitude: 9.9763411
      },
      typeId: "lantech1.Instruction_ALE",
      parentId: "13545d7ba5cf4b7599edcda18eb68571"
    },
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
  });
}

function Import_Aspect(myCookie, myToken, data, tenant) {
  let request = require("request");
  let aspect_id = tenant + "." + data.name;
  let tenant_url =
    "https://" +
    tenant +
    "-assetmanager.eu1.mindsphere.io/api/assetmanagement/v3/aspecttypes/";
  let aspect_url = tenant_url + aspect_id;
  var options = {
    method: "PUT",
    url: aspect_url,
    headers: {
      accept: "application/hal+json",
      "content-type": "application/json",
      "x-xsrf-token": myToken,
      cookie: myCookie
    },
    body: data,
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
  });
}
export {
  getCookies,
  ValidateJSON,
  Create_Cookie,
  Get_All_Assets,
  Import_Asset,
  Import_Aspect
};
