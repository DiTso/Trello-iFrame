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
          title: 'iFrames for Trello',
          url: 'board-button-popup.html'
        });
      }
    }];
  },
});