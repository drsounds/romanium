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
    if (scene.text instanceof Array) {
      writeTextSequence(scene.text)
    } else {
     writeText(scene.text);
    }
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
      setTimeout(function () {
        if (cb instanceof Function) cb();
      }, 2000);
    }
    var char = text[i];
    if (char)
    buffer += char;
  
    textElm.setAttribute('value', buffer);
    i++;
  }, 100);
}
function writeTextSequence(texts, duration, cb) {

  var i = 0;  
  function at () {
    var text = texts[i];
    writeText(text, at);    
    i++; 
    if (i == texts.length - 1) {
      setTimeout(function () {
        cb();
      }, 1000);
    }
  };
  at();
}
var scenes = [
  {
    id: 'orphanage_office',
    text: _('orphanage_office'),
    duration: 5000
  },
  {
    id: 'sleep_with_mother',
    text: _('sleep_with_mother'),
    duration: 5000
    
  },
  {
    id: 'spaceship',
    text: _('spaceship'),
    duration: 5000
  },
  {
    id: 'sleep_in_own_bed',
    text: _('sleep_in_own_bed'),
    duration: 5000
  },
  {
    id: 'flag_slide',
    text: _('flag_slide'),
    duration: 5000
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
var SEQUENCE_START = 38000;
var SLIDESHOW_START = 3000;
var TRANSITION_LENGTH = 3000;
var SCENE_LENGTH = 10000;
window.addEventListener('load', function () {
  writeTextSequence([
    1,2,3,4,5,6,7,8,9,10
  ].map(function (i) {
    return _('intro' + i);
  }),
  2000);
  var f = 0;
  var sphere = document.querySelector('#sphere');
  setInterval(function () {
    if (f == 3) {
      f = 0;
    }
    sphere.setAttribute('src', '#sphere' + f + '');
    f++;
  }, 300);
  setTimeout(function () {
    showScenes();
    setTimeout(function () {
      showSpace();
    }, SLIDESHOW_START + SCENE_LENGTH * scenes.length)
    setTimeout(function () {
      
      var l = 0;
      scenes.map(function (scene, i) {
        setTimeout(function () {
          setScene(scene);
          l += (scene.duration) * (i) 
        }, SCENE_LENGTH * (i));
        
      });
    }, SLIDESHOW_START);
  }, SEQUENCE_START);
});