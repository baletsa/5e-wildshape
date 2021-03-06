window.addEventListener('DOMContentLoaded', () => {

  var i;

  // Create a Monster Stat Block
  function monsterList(cr) {

    const monsterList = document.querySelector('#monList'),
      currentLvl = document.querySelector('#currentLvl').value;

    var monList, icons;
      
    if (currentLvl < 2) {
      monsterList.innerHtml('<div class="error">You cannot Wild Shape yet</div>');
    }
    else if (currentLvl > 20) {
      monsterList.innerHtml('<div class="error">The maximum level is 20</div>)');
    }
    else {
      $.ajax({
        type: 'GET',
        url: 'beast_data/beasts.json',
        dataType: 'json',
        success: function(json) {
          // console.log(json);
          monList = '';
          i = 0;
          var items = $(json).find('monster').filter(function() {
            if (currentLvl >= 2 && currentLvl < 4) {
              return $('cr', this).text() === cr && $('swim', this).text() === '' && $('fly', this).text() === '';
            }
            else if (currentLvl >= 4 && currentLvl < 8) {
              return $('cr', this).text() === cr && $('fly', this).text() === '';
            }
            else {
              return $('cr', this).text() === cr;
            }
          });
          //console.log(items);
          items.each(function(index, item) {
            icons = '';
            if ($(item).find('swim').text() !== '') {
              icons += '<svg><use xlink:href="images/icons.svg#icon-swim" /></svg>';
            }
            if ($(item).find('fly').text() !== '') {
              icons += '<svg><use xlink:href="images/icons.svg#icon-fly" /></svg>';
            }
            if ($(item).find('climb').text() !== '') {
              icons += '<svg><use xlink:href="images/icons.svg#icon-climb" /></svg>';
            }
            if ($(item).find('burrow').text() !== '') {
              icons += '<svg><use xlink:href="images/icons.svg#icon-burrow" /></svg>';
            }

            // monList += '<li class="beast"><h3>' + $(item).find("name").text() + '</h3><div><svg><use xlink:href="images/icons.svg#icon-paw" /></svg>' + icons + '</div></li>';
            monList += '<li class="beast"><h3>' + $(item).find('name').text() + '</h3><div>' + icons + '</div></li>';
            i++;
          });
          $('.cr-group[data-cr="' + cr + '"]').find('ul').html(monList);
          $('.cr-group[data-cr="' + cr + '"]').find('span').html(i);

        },
        error: function() {
          // console.log(status); // handle error here
        },
      });
    }
  }

  function addMonsters(list) {
    list.forEach(val => {
      var html = '<div class="cr-group" data-cr="' + val + '">' +
        '<div class="cr-header">' +
        '<h2>CR ' + val + '</h2>' +
        '<span></span>' +
        '</div>' +
        '<ul></ul>' +
        '</div>';
      monsterList.insertAdjacentHTML(html, 'afterbegin');
      monsterList(val);
    });
  }

  // Get CR array based on level and circle
  function monsterLvl() {
    var preList,
      crList,
      moon,
      level;

    if (localStorage.getItem('cLevel') !== null) {
      level = parseInt(localStorage.getItem('cLevel'));
      $('#currentLvl').val(level);
    }
    else {
      level = $('#currentLvl').val();
    }

    if (localStorage.getItem('cMoon') === 'true') {
      moon = true;
      $('.moon-circle-toggle').addClass('moon-circle-toggle--active');
    }
    else {
      moon = false;
    }

    if (moon === true) {
      // console.log("moon is true");
      if (level >= 2 && level < 6) {
        crList = ['0', '1/8', '1/4', '1/2', '1'];
      }
      else {
        preList = ['0', '1/8', '1/4', '1/2', '1'];
        crList = [];
        for (i = 6; i <= level; i++) {
          var foo = Math.floor(i / 3);
          preList.push('' + foo + '');
        }
        $.each(preList, function(i, el) {
          if ($.inArray(el, crList) === -1) {
            crList.push(el);
          }
        });
      }
    }
    else {
      // console.log("moon is false");
      if (level >= 2 && level < 4) {
        crList = ['0', '1/8', '1/4'];
      }
      else if (level >= 4 && level < 8) {
        crList = ['0', '1/8', '1/4', '1/2'];
      }
      else {
        crList = ['0', '1/8', '1/4', '1/2', '1'];
      }
    }
    // console.log(crList);
    addMonsters(crList);
  }

  // Create a Monster Stat Block
  function monsterBlock(name) {

    var statBlock,
      text;

    $.ajax({
      type: 'get',
      url: 'beast_data/beasts.json',
      dataType: 'json',
      success: function(json) {
        var items = $(json).find('monster').filter(function() {
          return $('name', this).text() === name;
        });
        statBlock =
          '<h2>' + $(items).find('size').text() + '  ' + $(items).find('type').text() + '  ' + $(items).find('alignment').text() + '</h2>' +
          '<div class="top-stats">' +
          '<p><span>AC:</span> ' + $(items).find('ac').text() + ' </p>' +
          '<p><span>HP:</span> ' + $(items).find('hp').text() + ' </p>' +
          '<p>' +
          '<span>Speed:</span>';
        if ($(items).find('speed').text() !== '') {
          statBlock += $(items).find('speed').text() + ', ';
        }
        if ($(items).find('swim').text() !== '') {
          statBlock += 'Swim ' + $(items).find('swim').text() + ', ';
        }
        if ($(items).find('fly').text() !== '') {
          statBlock += 'Fly ' + $(items).find('fly').text() + ', ';
        }
        if ($(items).find('burrow').text() !== '') {
          statBlock += 'Burrow ' + $(items).find('burrow').text() + ', ';
        }
        if ($(items).find('climb').text() !== '') {
          statBlock += 'Climb ' + $(items).find('climb').text() + ', ';
        }
        statBlock += '</p>' +
          '</div>' +
          '<ul class="ability-section">' +
          '<li><span>STR</span> ' + $(items).find('str').text() + ' (' + Math.floor(($(items).find('str').text() - 10) / 2) + ')</li>' +
          '<li><span>DEX</span> ' + $(items).find('dex').text() + ' (' + Math.floor(($(items).find('dex').text() - 10) / 2) + ')</li>' +
          '<li><span>CON</span> ' + $(items).find('con').text() + ' (' + Math.floor(($(items).find('con').text() - 10) / 2) + ')</li>' +
          '<li><span>WIS</span> ' + $(items).find('wis').text() + ' (' + Math.floor(($(items).find('wis').text() - 10) / 2) + ')</li>' +
          '<li><span>INT</span> ' + $(items).find('int').text() + ' (' + Math.floor(($(items).find('int').text() - 10) / 2) + ')</li>' +
          '<li><span>CHA</span> ' + $(items).find('cha').text() + ' (' + Math.floor(($(items).find('cha').text() - 10) / 2) + ')</li>' +
          '</ul>' +
          '<div class="mid-stats">';
        if ($(items).find('vulnerable').text() !== '') {
          statBlock += '<h4><span>Vulnerable: </span> ' + $(items).find('vulnerable').text() + ' </h4>';
        }
        if ($(items).find('immune').text() !== '') {
          statBlock += '<h4><span>Damage Immunities: </span> ' + $(items).find('immune').text() + ' </h4>';
        }
        if ($(items).find('conditionImmune').text() !== '') {
          statBlock += '<h4><span>Conditional Immunities: </span> ' + $(items).find('conditionImmune').text() + ' </h4>';
        }
        if ($(items).find('senses').text() !== '') {
          statBlock += '<h4><span>Senses: </span> ' + $(items).find('senses').text() + ' </h4>';
        }
        if ($(items).find('languages').text() !== '') {
          statBlock += '<h4><span>Languages: </span> ' + $(items).find('languages').text() + ' </h4>';
        }
        statBlock += '<h4><span>CR: </span> ' + $(items).find('cr').text() + '</h4>' + '</div>' + '<div class="traits-stats">';
        items.each(function(index, item) {
          $(item).find('trait').each(function() {
            statBlock += '<h4><span>' + $(this).find('trait-name').text() + ': </span>';
            $(this).find('text').each(function() {
              statBlock += $.text(this) + '<br>';
            });
            statBlock += '</h4>';
          });
          statBlock += '<h3 class="actions">Actions</h3>';
          $(item).find('action').each(function() {
            statBlock += '<h4><span>' + $(this).find('action-name').text() + ': </span>';
            $(this).find('text').each(function() {
              text = $.text(this).replace('Melee Weapon Attack:', '<i>Melee Weapon Attack:</i>').replace('Hit:', '<i>Hit:</i>');
              statBlock += text + '<br>';
            });
            statBlock += '</h4>';
          });
          $(item).find('reaction').each(function() {
            statBlock += '<h4><span>' + $(this).find('reaction-name').text() + ': </span>';
            $(this).find('text').each(function() {
              statBlock += $.text(this) + '<br>';
            });
            statBlock += '</h4>';
          });
        });
        if ($(items).find('spells').text() !== '') {
          statBlock += '<h4><span>Spells</span> ';
          var spells = $(items).find('spells').text().split(', ');
          for (var i = 0; i < spells.length; i++) {
            statBlock += '<a href="#" class="spell-pop">' + spells[i].toUpperCase() + '</a>, ';
          }
          statBlock += '</h4>';
        }
        $('#beastModal .modal-header').find('h1').html($(items).find('name').text());
        $('.beast-body').html(statBlock);
      },
      error: function() {
        // console.log(status); // handle error here
      },
    });
  }

  function populateStorage() {

    var moonCircle = ($('.moon-circle-toggle').hasClass('moon-circle-toggle--active')) ? true : false;

    var lvl = $('#currentLvl').val();

    localStorage.setItem('cLevel', lvl);
    localStorage.setItem('cMoon', moonCircle);

    monsterLvl();
  }

  monsterLvl();

  // Show/Collapse Beast Lists
  $('body').on('click', '.cr-header', function() {
    $('.cr-group ul').slideUp();
    if ($(this).next('ul').is(':hidden')) {
      $(this).next('ul').slideDown();
    }
  });
  // Show Beast Block
  $(document).on('click', '.beast', function() {
    var beastName = $(this).find('h3').text();
    monsterBlock(beastName);
    $('#beastModal').css('display', 'flex').animate({
      'opacity': '1',
    }, 200);
  });
  // Hide Beast Block
  $(document).on('click', '#modalClose', function() {
    $('#beastModal').animate({
      'opacity': '0',
    }, 200, function() {
      $('#beastModal').css('display', 'none');
    });
  });
  // Select/Deselect Circle of the Moon
  $('.moon-circle-toggle').click(function() {
    $('.moon-circle-toggle').toggleClass('moon-circle-toggle--active');
    $('#monList').html('');
    populateStorage();
  });
  // Adjust Level
  $('#currentLvl').change(function() {
    $('#monList').html('');
    populateStorage();
  });
});
