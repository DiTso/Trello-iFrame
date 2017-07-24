/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var SIGMA_ICON = 'https://cdn.glitch.com/380a7bed-fba7-4128-9418-b75f0d1d7492%2Fsigma_final.svg?1495405328591';

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return t.get('board', 'shared', 'iframe')
    .then(function(iframe){
      if (iframe) {
        t.boardBar({
          url: iframe.url ? iframe.url : '',
          height: iframe.height ? iframe.height : 500
        });
      }
      return [{
        icon: './images/icon.svg',
        text: 'iFrame',
        callback: function(t) {
            return t.popup({
              title: 'Trello iFrame',
              items: function(t, options) {
                return [
                  {
                    text: Number.isNaN(parseFloat(options.search))  ? (options.search ? `Set iFrame.` : `Close iFrame.`) : `Set iFrame height.`,
                    callback: function(t) {
                      if (options.search) {
                        if (Number.isNaN(parseFloat(options.search))) {
                          var a = document.createElement('a');
                          a.href = options.search;
                          console.log(window.location.host);
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
                            }).then(function(){t.closePopup});
                          });
                        } else {
                          if (iframe.url) {
                            return t.set('board', 'shared', 'iframe', {
                              url: iframe && iframe.url ? iframe.url : '',
                              height: options.search
                            })
                            .then(function(){
                              return t.boardBar({
                                height: options.search
                              }).then(function(){t.closePopup});
                            });
                          }
                        }
                      } else {
                        t.closeBoardBar();
                      }
                      return t.closePopup();
                    }
                  }
                ];
              },
              search: {
                text: iframe && iframe.url ? iframe.url : null,
                placeholder: 'Enter URL, search query, or desired height.',
              }
            });
        }
      }];
    });
  },
});