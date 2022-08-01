'use strict';

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'brain.png',
    title: 'Pay Attention!',
    message: 'You need to pay attention to your work',
    buttons: [
      { title: 'Fine.' }
    ],
    priority: 0
  });
});

const changeImage = () => {
  console.log("Background running");
  chrome.action.onClicked.addListener(buttonClicked);
  function buttonClicked(tab) {
    let msg = {
      txt: "Hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
  }
}

const handleChange = data => {
  // document.getElementById('score').innerHTML = data
  // console.log(data)
  
  if (data > 8700) {
    chrome.action.setBadgeText({ text: "HIGH" });
    const rand = Math.random();
    console.log(rand)
    if (rand < 0.80) {
      console.log("nothing happens")
    }
    else if (rand > 0.80 && rand < 0.92) {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'brain.png',
        title: 'Pay Attention!',
        message: 'You need to pay attention to your work',
        buttons: [
          { title: 'Fine.' }
        ],
        priority: 0
      });
    }
    else if (rand > 0.92 && rand < 0.98) {
      changeImage()
    }
    else if (rand > 0.98 && rand < 0.988) {
      chrome.tabs.create({ url: "https://donate.conservative.ca/en/poilievre/" })
    }
    else if (rand > 0.988 && rand < 0.99) {
      chrome.tabs.create({ url: "https://reddit.com/r/MLPLounge" })
    }
    // else if (rand > 0.99) {
    //   chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {let tabId = tabs[0].id})
    //   chrome.tabs.remove(tabId);
    // };
    }
  else if (data > 8200 && data < 8700) {
    chrome.action.setBadgeText({ text: "" });
  }
  else if (data < 8200) {
    chrome.action.setBadgeText({ text: "LOW" });
    console.log("Too low")
  }
}


chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    handleChange(request.data)
    sendResponse({ data: request })
  }
);

chrome.notifications.onButtonClicked.addListener(async () => {
  const item = await chrome.storage.sync.get(['minutes']);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create({ delayInMinutes: item.minutes });
});
