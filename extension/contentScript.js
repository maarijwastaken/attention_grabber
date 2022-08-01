console.log("Lets replace")
var allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT),
    // some temp references for performance
    tmptxt,
    tmpnode,
    // compile the RE and cache the replace string, for performance
    theirRE = /their/g,
    replaceValue1 = "they're";
    theyreRE = /they're/g,
    replaceValue2 = "there";
    thereRE = /there/g,
    replaceValue3 = "their";
    becauseRE = /because/g,
    replaceValue4 = "porque";


// iterate through all text nodes
while (allTextNodes.nextNode()) {
    tmpnode = allTextNodes.currentNode;
    tmptxt = tmpnode.nodeValue;
    tmpnode.nodeValue = tmptxt.replace(theirRE, replaceValue1);
    tmpnode.nodeValue = tmptxt.replace(theyreRE, replaceValue2);
    tmpnode.nodeValue = tmptxt.replace(thereRE, replaceValue3);
    tmpnode.nodeValue = tmptxt.replace(becauseRE, replaceValue4);
}


console.log('We are ready to replace the images!');
chrome.runtime.onMessage.addListener(replace);
function replace() {
    let imgs = document.getElementsByTagName('img');
    for (imgElt of imgs) {
        let file = 'Images/nic_cage.png'
        let url = chrome.extension.getURL(file);
        imgElt.src = url;
        console.log(url);
    }
}