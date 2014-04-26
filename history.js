//
(function() {
  function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}

  var group, history, a, url, newUrl, btn,
      // Hash is the hash right before the git mv commit;
      hash = '24f266b2ca0b139e4d0955e86a7ddd868b0ae557',
      re = /('blob')\s(\w+)/;

  // Only way to do something when github modifies the tree/
  document.addEventListener("DOMSubtreeModified", debounce(function() {setUpBtn();}, 750), false);

  function setUpBtn() {
    group = document.querySelector('.button-group');
    btn = document.querySelector('.button-group .pub-history');
    if (group && !btn) {
      a = document.createElement('a');
      a.innerHTML = "Publisher History";
      a.classList.add('button', 'minibutton', 'pub-history');
      a.addEventListener('click', function(e) {
        // So we need to do is change the URL to have the hash in the tree and fix the path.
        // Ex: blob/qa/docroot/profiles/publisher/modules/custom/logo/logo.module
        //     should get switch to :
        //     commits/24f266b2ca0b139e4d0955e86a7ddd868b0ae557/docroot/profiles/all/modules/custom/logo/logo.module
        url = window.location.href;

        // TODO: replace with simple regex, instead of hard-coding the branch.
        newUrl = url.replace(/blob|qa|master|publisher/g, function(word) {
          var matches = {
            blob: 'commits',
            qa: hash,
            master: hash,
            publisher: 'all'
          }
          return matches[word];
        });
        window.location = newUrl;
      }, false);

      group.appendChild(a);
    }
  }

  setUpBtn();
})();
