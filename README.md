# Global headers insomnia plugin

Set up your global http headers in one place and this plugin will take care of setting it for each requests. This plugin won't override any headers you set on the request.

[npm](https://www.npmjs.com/package/global-headers-insomnia)


## Usage

add all headers to the environment with key `GLOBAL_HEADERS`.

```
{
    "GLOBAL_HEADERS": {
        "Accept": "application/json",
        "Authorization": "Bearer <token>",
        "Content-Type": "multipart/form-data"
    }
}
```

### **Enable or disable global headers for specific requests or request folders  via the menu drop down**

![Enable or disable global headers menu screenshot](https://raw.githubusercontent.com/AnvarNazar/insomnia-plugin-global-headers/master/cover.png)