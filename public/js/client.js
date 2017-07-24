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
            var newCost = parseFloat(options.search).toFixed(2)
            return [
              {
                text: !Number.isNaN(parseFloat(options.search)) ? `Set Cost to ${newCost}` : `(Close iFrame)`,
                callback: function(t) {
                  if (newCost != 'NaN') {
                    t.set('board','shared','costs',newCosts);
                  }
                  return t.closePopup();
                }
              }
            ];
          },
          search: {
            placeholder: 'Enter Cost',
            empty: 'Error',
            searching: 'Processing...'
          }
        });
      }
    }];
  },
});