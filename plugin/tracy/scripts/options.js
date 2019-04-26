// Saves options to chrome.storage
const saveOptions = () => {
  const restHost = document.getElementById("rest-host").value;
  const restPort = document.getElementById("rest-port").value;
  //  const autoFill = document.getElementById("auto-fill").checked;
  //  const autoFillPayload = document.getElementById("auto-fill-dropdown").value;
  const apiKey = document.getElementById("api-key").value;
  chrome.storage.local.set(
    {
      restHost: restHost,
      restPort: restPort,
      //    autoFill: autoFill,
      //autoFillPayload: autoFillPayload,
      apiKey: apiKey
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = async () => {
  const settings = await new Promise(r =>
    chrome.storage.local.get(
      {
        restHost: "127.0.0.1",
        restPort: 7777,
        //      autoFill: false,
        //        autoFillPayload: "GEN-XSS",
        apiKey: ""
      },
      settings => r(settings)
    )
  );

  /*  const s = document.getElementById("auto-fill-dropdown");
       replace.getTracerTypes().map(i => {
       const o = document.createElement("option");
       o.text = i[0];
       s.add(o);
       });*/

  //  document.getElementById("auto-fill-dropdown").value =    settings.autoFillPayload;
  document.getElementById("rest-host").value = settings.restHost;
  document.getElementById("rest-port").value = settings.restPort;
  //  document.getElementById("auto-fill").checked = settings.autoFill;
  document.getElementById("api-key").value = settings.apiKey;
};

// Stolen from : https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
const generateUUID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("api-key-refresh").addEventListener("click", () => {
    const uuid = generateUUID();
    document.getElementById("api-key").value = uuid;
    saveOptions();
  });
  document.getElementById("save").addEventListener("click", saveOptions);
  /*  document.getElementById("auto-fill").addEventListener("click", e => {
       document.getElementById("auto-fill-dropdown");
       });*/
  restoreOptions();
});
