function setScene(scene) {
  var animation = anime.timeline();
  animation.add({
      targets: '#scene',
      opacity: {
        value: 0,
      },
      duration: TRANSITION_LENGTH,
      easing: 'linear'
    });
  animation.add({
      targets: '#scene',
      opacity: {
        value: 1,
      },
      duration: TRANSITION_LENGTH,
      easing: 'linear'
    });
   setTimeout(function () {
     document.querySelector('#scene').setAttribute('src', '#' + scene.id);
     writeText(scene.text);
   }, 3000)
}
function writeText(text, cb) {
  var textElm = document.querySelector('a-text');
  textElm.setAttribute('value', '');
  var buffer = '';
  var i = 0;
  var xs = setInterval(function () {
    if (buffer >= text) {
      clearInterval(xs);
      if (cb instanceof Function) cb();
    }
    var char = text[i];
    if (char)
    buffer += char;
  
    textElm.setAttribute('value', buffer);
    i++;
  }, 100);
}
function writeTextSequence(texts, duration, cb) {
  
  texts.map(function (text, i) {
    setTimeout(function () {
      writeText(text);    
    }, duration * i);
  })
}
var scenes = [
  {
    id: 'orphanage_office',
    text: _('orphanage_office')
  },
  {
    id: 'sleep_with_mother',
    text: _('sleep_with_mother')
    
  },
  {
    id: 'spaceship',
    text: _('spaceship')
  },
  {
    id: 'sleep_in_own_bed',
    text: _('sleep_in_own_bed')
  },
  {
    id: 'flag_slide',
    text: _('flag_slide')
  }
];
function showScenes() {
  var animation = anime.timeline();
    animation.add({
      targets: '#space',
      opacity: {
        value: 0,
      },
      duration: TRANSITION_LENGTH,
      easing: 'linear'
    });
}
function showSpace() {
  var animation = anime.timeline();
    animation.add({
      targets: '#scene',
      opacity: {
        value: 0,
      },
      duration: TRANSITION_LENGTH,
      easing: 'linear'
    }).add({
      targets: '#space',
      opacity: {
        value: 1
      },
      duration: TRANSITION_LENGTH,
      easing: 'linear'
    });
}
var SEQUENCE_START = 18000;
var SLIDESHOW_START = 3000;
var TRANSITION_LENGTH = 3000;
var SCENE_LENGTH = 10000;
window.addEventListener('load', function () {
  writeTextSequence([
    _('intro1'),
    _('intro2')
  ],
  6000);
  setTimeout(function () {
    showScenes();
    setTimeout(function () {
      showSpace();
    }, SLIDESHOW_START + SCENE_LENGTH * scenes.length)
    setTimeout(function () {
      
      
      scenes.map(function (scene, i) {
        setTimeout(function () {
          setScene(scene);
        }, SCENE_LENGTH * (i));
        
      });
    }, SLIDESHOW_START);
  }, SEQUENCE_START);
});