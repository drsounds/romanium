function changeBackground(image) {
  var animation = anime.timeline();
  animation.add({
      targets: '#scene',
      opacity: {
        value: 0,
      },
      duration: 3000,
      easing: 'linear'
    });
  animation.add({
      targets: '#scene',
      opacity: {
        value: 1,
      },
      duration: 3000,
      easing: 'linear'
    });
   setTimeout(function () {
     document.querySelector('a-sky').setAttribute('src', '#' + image);
   }, 3000)
}

var scenes = [
  'orphanage_office',
  'sleep_with_mother',
  'spaceship',
  'sleep_in_own_bed',
  'flag_slide',
];
window.addEventListener('load', function () {
  setTimeout(function () {
    var animation = anime.timeline();
    animation.add({
      targets: '#space',
      opacity: {
        value: 0,
      },
      duration: 3000,
      easing: 'linear'
    });
    setTimeout(function () {
      
      
      scenes.map(function (scene, i) {
        setTimeout(function () {
          changeBackground(scene);
        }, 10000 * (i));
      });
    }, 3000);
  }, 18000);
});