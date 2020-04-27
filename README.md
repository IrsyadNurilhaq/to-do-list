# Gojek JavaScript SDK

Gojek JavaScript SDK provide bi-directional communication between Gojek App and
Gojek Webview.

It exposes native app's API with JavaScript binding in a cross-platform way.

## Getting Started

You could check the files under `examples` directory to get an intuitive sense
of how to get started with Gojek JavaScript SDK.

If you're building a traditional website, then you could add a `<script>`
link to SDK's bundle file:

`stewie.min.js`
```html
<script src="https://goplatform.gojekapi.com/js-sdk/0.1.0/stewie.min.js"></script>
```

All Gojek native APIs are defined under `window.gojek` object in browser.

## Features

### sendEvent

```typescript
/**
 * send an event to mobile bridge
 *
 * @param eventName - name of the event
 * @param eventValue - event value should be an JavaScript object
 */
function sendEvent(eventName: string, eventValue: any): void
```

`sendEvent` will send an event key-value pair to Gojek app via JavaScript
bridge. It could be used to track analytics like payment, transactions, page
statistics, etc.

Both `eventName` and `eventValue` are highly customisable. Basically, `eventName` is just a string, it could be `3pp_product_detail_viewed`.

`eventValue` is just a JSON object, for example, for
`3pp_product_detail_clicked` event, `eventValue` could be:

```javascript
const eventValue = {
  productID: "18301238",
  productName: "iPhone X",
  price: "400",
  currency: "USD"
}
```

Note that, **The data size limit for `eventValue` is 512 bytes**. In current
version of implementation, this function will be called in a fire-and-forget
way. There's no callback feature in this version of SDK.

So overall, the code snippet for `sendEvent` could be:

```javascript
const eventName = "3pp_product_detailed_clicked"

const eventValue = {
  productID: "18301238",
  productName: "iPhone X",
  price: "400",
  currency: "USD"
}

// fire and forget, right now no callback support
sendEvent(eventName, eventValue);
```

Check [examples/sendEvent](./examples/sendEvent/index.html) for a runnable
example for `sendEvent`. Note that this page must be opened inside Gojek
webview.

### getGojekAppInfo

```typescript
const enum OS_TYPES {
  IOS = "iOS",
  ANDROID = "Android",
  UNKNOWN = "unknown"
}

type GojekAppInfo = {
  platform: OS_TYPES;
  appVersion: string;
  sdkVersion: string;
};

/**
 * Async function to return information about Gojek App, will include three
 * fields:
 * - `platform` - "Android"` or `"iOS"`
 * - `appVersion` - current version of Gojek App
 * - `sdkVersion` - current version of Gojek JavaScript SDK
 */
async function getGojekAppInfo(): Promise<GojekAppInfo>
```

`getGojekAppInfo()` will return a promise that resolves to a `GojekAppInfo`
object which contains necessary information about Gojek SDK runtime. Right now
it has three fields:
- `platform`: `"Android"`, `"iOS"` or `"unknown"`
- `appVersion`: version of Gojek app, since we're rolling out features
  progressively, we may need to check whether one feature is available for a
  specific version
- `sdkVersion`: version of Gojek JavaScript SDK

This function will return a promise since the native app will return and set
`appVersion` by a callback function.

Client side could call this function and resolve the promise manually:

```typescript
const p = getGojekAppInfo();
p.then(gojekAppInfo => {
  // store `gojekAppInfo` to somewhere
  // `gojekAppInfo` could be something like:
  // {
  //  platform: "Android",
  //  appVersion: "3.4.5",
  //  sdkVersion: "0.1.0"
  // }
})
```

Or we can call this function with `await`:

```javascript
const gojekAppInfo = await window.gojek.getGojekAppInfo();
```

Here is a artifacted example snippet for `getGojekAppInfo()`:

```javascript
const gojekAppInfo = await window.gojek.getGojekAppInfo();

// `gojekAppInfo` could be something like:
// {
//  platform: "Android",
//  appVersion: "3.4.5",
//  sdkVersion: "0.1.0"
// }

switch (gojekAppInfo.platfrom) {
  case "Android":
    console.log("We're in Gojek Android Webview");
    break;
  case "iOS":
    console.log("We're in Gojek iOS Webview");
    break;
  case "unknown":
    console.log("We're lost somewhere");
    break;
}
```

You could then decide what to do based on `gojekAppInfo`.

Check [examples/platform](./examples/platform/index.html) for a runnable
example for `sendEvent`. Note that this page must be opened inside Gojek
webview.

## Test on Gojek webview

As aforementioned, HTML page under [examples/](./examples/) must be opend inside
Gojek webview. Here's a step by step guide about how to open a URL with Gojek
webview.

First, you need to launch a local http server, you could use Python, Node.js or
any other tools available. We list two ways in Python and Node.js.

For Python 2, you could use `python -m SimpleHTTPServer` to launch a http
server locally.

For Python 3, you could use `python -m http.server` to launch a http server
locally.

For Node.js, you could use [serve](https://www.npmjs.com/package/serve) by
`npx serve`.

Once you launched a http server at the root level of this tutorial project, say
your local http server address is `http://localhost:5000`, and you want to test
code for [examples/platform](./examples/platform/index.html), you could open this
page in Gojek webview with the following URL format:

```
gojek://gocore/third_party_web?url= http://localhost:5000/examples/platform/index.html
```

In general, if you want to test a URL inside Gojek webview, you could transform
the url to Gojek deeplink format:

```
gojek://gocore/third_party_web?url={url}
```

And then paste the transformed URL to a browser, the browser will lead you to
Gojek webview.

Besides, you could also open the deeplink URL with command line tools on both
Android and iOS:
- For iOS, you could use `xcrun simctl openurl booted "gojek://..."`.
- For Android, you could use `adb shell am start -a android.intent.action.VIEW -d 'gojek://...'`.
