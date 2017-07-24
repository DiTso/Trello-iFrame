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
        text: 'Open iFrame',
        callback: function(t) {
            return t.popup({
              title: 'Trello iFrames',
              items: function(t, options) {
                return [
                  {
                    text: Number.isNaN(parseFloat(options.search))  ? (options.search ? `Set iFrame.` : `Close iFrame.`) : `Set iFrame height.`,
                    callback: function(t) {
                      if (options.search) {
                        if (Number.isNaN(parseFloat(options.search))) {
                          var a = document.createElement('a');
                          a.href = options.search;
                          if (!a.host) {
                            a.href = 'https://google.com/search?q='
                          }
                          return t.set('board', 'shared', 'iframe', {
                            url: options.search,
                            height: iframe && iframe.height ? iframe.height: 500
                          })
                          .then(function(){
                            return t.boardBar({
                              url: options.search,
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
                                url: iframe && iframe.url ? iframe.url : '',
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
                placeholder: 'Enter URL, search query, or desired height.',
              }
            });
        }
      }];
    });
  },
});