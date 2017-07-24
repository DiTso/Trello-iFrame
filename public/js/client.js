/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var SIGMA_ICON = 'https://cdn.glitch.com/380a7bed-fba7-4128-9418-b75f0d1d7492%2Fsigma_final.svg?1495405328591';

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    
    return [{
      icon: './images/icon.svg',
      text: 'Open iFrame',
      callback: function(t) {
        return t.popup({
          title: 'Set Cost...',
          items: function(t, options) {
            return [
              {
                text: Number.isNaN(parseFloat(options.search))  ? (options.search ? `Set iFrame URL.` : `close iFrame`) : `Set iFrame height.`,
                callback: function(t) {
                  if (options.search) {
                    
                  } else {
                    
                  }
                  return options.search ? t.boardBar({
                    url: options.search,
                    height: '50%',
                  }) : t.closeBoardBar();
                  return t.closePopup();
                }
              }
            ];
          },
          search: {
            placeholder: 'Enter URL (or desired height)',
          }
        });
      }
    }];
  },
});