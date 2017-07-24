/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var open = false;

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return t.get('board', 'shared', 'iframe')
    .then(function(iframe){
      return [{
        icon: './images/icon.svg',
        text: 'iFrame',
        callback: function(t) {
            return t.popup({
              title: 'Trello iFrame',
              items: function(t, options) {
                var text;
                if (options.search && !Number.isNaN(parseFloat(options.search))) {
                  text = 'Set iFrame height.'
                } else {
                  if (options.search){
                    text = 'set iFrame.'
                    var a = document.createElement('a');
                    a.href = options.search;
                    if (a.host == window.location.host) {
                      text = 'DuckDuckGo Search for \''+ options.search +'\'';
                    } else {
                      text = 'Set iFrame to ' + options.search.substr(0, 10) + '...';
                    }
                  } else {
                    text = iframe && iframe.url ? 'Load last URL.' : 'Close iFrame.';
                  }
                }
                var buttons = [];
                if (text) {
                  buttons.push({
                    text: text,
                    callback: function(t) {
                      if (options.search) {
                        if (Number.isNaN(parseFloat(options.search))) {
                          var a = document.createElement('a');
                          a.href = options.search;
                          if (a.host == window.location.host) {
                            a.href = 'https://duckduckgo.com/?q=' + encodeURIComponent(options.search);
                          }
                          return t.set('board', 'shared', 'iframe', {
                            url: a.href,
                            height: iframe && iframe.height ? iframe.height: 500
                          })
                          .then(function(){
                            return t.boardBar({
                              url: a.href,
                              height: iframe && iframe.height ? iframe.height : 500
                            }).then(function(){
                              open = true;
                              t.closePopup
                            });
                          });
                        } else {
                          console.log('iframe resize');
                          if (iframe.url) {
                            t.set('board', 'shared', 'iframe', {
                              url: iframe && iframe.url ? iframe.url : '',
                              height: options.search
                            })
                            .then(function(){
                              return t.boardBar({
                                height: options.search
                              }).then(function(){
                                open = true;
                                t.closePopup();
                              });
                            });
                          }
                        }
                      } else {
                        if (iframe && iframe.url) {
                          t.boardBar({
                            url: iframe.url
                          }).then(function() {
                            open = true;
                            t.closePopup();                          
                          });
                        }
                      }
                      return t.closePopup();
                    }
                  });
                }
                if (iframe.open) {
                  buttons.push({
                    text: 'Close iFrame.',
                    callback: function(t) {
                      open = false;
                      t.closePopup();
                    }
                  });
                }
                return buttons;
              },
              search: {
                placeholder: iframe && iframe.url ? iframe.url : 'Enter URL, search query, or desired height.',
              }
            });
        }
      }];
    });
  },
});