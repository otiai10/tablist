(function(){
  chrome.commands.onCommand.addListener(function(cmd) {
    switch (cmd) {
      case 'open_list': chrome.tabs.create({url:chrome.extension.getURL('dist/html/list.html')}); break;
      default: console.log('Unknown command:', cmd);
    }
  });
})();
