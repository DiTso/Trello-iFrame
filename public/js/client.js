/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var SIGMA_ICON = 'https://cdn.glitch.com/380a7bed-fba7-4128-9418-b75f0d1d7492%2Fsigma_final.svg?1495405328591';

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: './images/icon.svg',
      text: 'Open iFrame',
      callback: function(t) {
        return t.get('board', 'shared', 'iframe')
        .then(function(iframe){
          return t.popup({
            title: 'Trello iFrames',
            items: function(t, options) {
              return [
                {
                  text: Number.isNaN(parseFloat(options.search))  ? (options.search ? `Set iFrame URL.` : `close iFrame`) : `Set iFrame height.`,
                  callback: function(t) {
                    if (options.search) {
                      if (Number.isNaN(parseFloat(options.search))) {
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
              placeholder: 'Enter URL (or desired height)',
            }
          });
        });
      }
    }];
  },
});