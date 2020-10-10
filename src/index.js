const $ = require('jquery');

window.addEventListener('DOMContentLoaded', () => {

  var filter = [];

  // Create a Monster Stat Block
  function monsterList(cr) {

    const monsterWrapper = $('#monList'),
      currentLvl = $('#currentLvl').val();

    var monList, icons;
      
    if (currentLvl < 2) {
      monsterWrapper.html('<div class="error">You cannot Wild Shape yet</div>');
    }
    else if (currentLvl > 20) {
      monsterWrapper.html('<div class="error">The maximum level is 20</div>)');
    }
    else {
      $.ajax({
        type: 'GET',
        url: '/beast-data/data.json',
        dataType: 'json',
        success: function(json) {
          monList = '';
          var i = 0;

          var items = json.creatures.filter(beast => {
            if (currentLvl >= 2 && currentLvl < 4) {
              return beast.cr === cr && beast.swim === null && beast.fly === null;
            }
            else if (currentLvl >= 4 && currentLvl < 8) {
              return beast.cr === cr && beast.fly === null;
            }
            else {
              return beast.cr === cr;
            }
          });

          if (filter.includes('burrow')) {
            items = items.filter(beast => {
              return beast.burrow !== null;
            });
          }

          if (filter.includes('climb')) {
            items = items.filter(beast => {
              return beast.climb !== null;
            });
          }

          if (filter.includes('swim')) {
            items = items.filter(beast => {
              return beast.swim !== null;
            });
          }

          if (filter.includes('fly')) {
            items = items.filter(beast => {
              return beast.fly !== null;
            });
          }

          if (!filter.includes('dinosaur')) {
            items = items.filter(beast => {
              return beast.subtype !== 'dinosaur';
            });
          }

          if (!filter.includes('exotic')) {
            items = items.filter(beast => {
              return beast.subtype !== 'exotic';
            });
          }

          items.forEach(beast => {
            icons = '';
            if (beast.swim !== null) {
              icons += '<span class="icons__icon"><svg class="icons__icon-image"><use xlink:href="#icon-swim" /></svg><span class="icons__icon-text">swim</span></span>';
            }
            if (beast.fly !== null) {
              icons += '<span class="icons__icon"><svg class="icons__icon-image"><use xlink:href="#icon-fly" /></svg><span class="icons__icon-text">fly</span></span>';
            }
            if (beast.climb !== null) {
              icons += '<span class="icons__icon"><svg class="icons__icon-image"><use xlink:href="#icon-climb" /></svg><span class="icons__icon-text">climb</span></span>';
            }
            if (beast.burrow !== null) {
              icons += '<span class="icons__icon"><svg class="icons__icon-image"><use xlink:href="#icon-burrow" /></svg><span class="icons__icon-text">burrow</span></span>';
            }

            monList += '<li class="beast"><h3 class="beast__name">' + beast.name + '</h3><div class="icons">' + icons + '</div></li>';
            i++;
          });
          $('.cr-group[data-cr="' + cr + '"]').find('.cr-creature-list').html(monList);
          $('.cr-group[data-cr="' + cr + '"]').find('.cr-rating').html(i);

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
        '<h2 class="cr-title">CR ' + val + '</h2>' +
        '<span class="cr-rating"></span>' +
        '</div>' +
        '<ul class="cr-creature-list"></ul>' +
        '</div>';
      $('#monList').prepend(html);
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

    if (localStorage.getItem('dinosaur-content') === 'true' && !filter.includes('dinosaur')) {
      document.querySelector('#dinosaur-content').checked= true;
      filter.push('dinosaur');
    }

    if (localStorage.getItem('exotic-content') === 'true' && !filter.includes('exotic')) {
      document.querySelector('#exotic-content').checked = true;
      filter.push('exotic');
    }

    if (moon === true) {
      if (level >= 2 && level < 6) {
        crList = ['0', '1/8', '1/4', '1/2', '1'];
      }
      else {
        preList = ['0', '1/8', '1/4', '1/2', '1'];
        crList = [];

        for (let i = 6; i <= level; i++) {
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
    addMonsters(crList);
  }

  // Create a Monster Stat Block
  function monsterBlock(name) {

    var statBlock;

    $.ajax({
      type: 'get',
      url: '/beast-data/data.json',
      dataType: 'json',
      success: function(json) {
        var creature = json.creatures.filter(beast => {
          return beast.name === name;
        });

        creature = creature[0];

        statBlock =
          `<h2>${creature.size} ${creature.type} ${creature.alignment}</h2>` +
          '<div class="top-stats">' +
          `<p><span>AC:</span> ${creature.ac}</p>` +
          `<p><span>HP:</span> ${creature.hp}</p>` +
          '<p>' +
          '<span>Speed:</span>';
        if (creature.speed !== null) {
          statBlock += creature.speed + ', ';
        }
        if (creature.swim !== null) {
          statBlock += 'Swim ' + creature.swim + ', ';
        }
        if (creature.fly !== null) {
          statBlock += 'Fly ' + creature.fly + ', ';
        }
        if (creature.burrow !== null) {
          statBlock += 'Burrow ' + creature.burrow  + ', ';
        }
        if (creature.climb !== null) {
          statBlock += 'Climb ' + creature.climb;
        }
        statBlock += '</p>' +
          '</div>' +
          '<ul class="ability-section">' +
          '<li><span>STR</span> ' + creature.str + ' (' + Math.floor((creature.str - 10) / 2) + ')</li>' +
          '<li><span>DEX</span> ' + creature.dex + ' (' + Math.floor((creature.dex - 10) / 2) + ')</li>' +
          '<li><span>CON</span> ' + creature.con + ' (' + Math.floor((creature.con - 10) / 2) + ')</li>' +
          '<li><span>INT</span> ' + creature.int + ' (' + Math.floor((creature.int - 10) / 2) + ')</li>' +
          '<li><span>WIS</span> ' + creature.wis + ' (' + Math.floor((creature.wis - 10) / 2) + ')</li>' +
          '<li><span>CHA</span> ' + creature.cha + ' (' + Math.floor((creature.cha - 10) / 2) + ')</li>' +
          '</ul>' +
          '<div class="mid-stats">';
        if (creature.vulnerable !== null) {
          statBlock += '<div class="stat-group"><span>Vulnerable: </span> ' + creature.vulnerable + ' </div>';
        }
        if (creature.immune !== null) {
          statBlock += '<div class="stat-group"><span>Damage Immunities: </span> ' + creature.immune + ' </div>';
        }
        if (creature.conditionImmune !== null) {
          statBlock += '<div class="stat-group"><span>Conditional Immunities: </span> ' + creature.conditionImmune + ' </div>';
        }
        if (creature.senses !== null) {
          statBlock += '<div class="stat-group"><span>Senses: </span> ' + creature.senses + ' </div>';
        }
        if (creature.languages !== null) {
          statBlock += '<div class="stat-group"><span>Languages: </span> ' + creature.languages + ' </div>';
        }
        statBlock += '<div class="stat-group"><span>CR: </span> ' + creature.cr + '</div>' + '</div>' + '<div class="traits-stats">';
        
        if (creature.trait && creature.trait.length > 0) {
          creature.trait.forEach(trait => {
            statBlock += '<div class="stat-group"><span>' + trait['trait-name'] + ': </span>';
            statBlock += trait.text + '<br>';
            statBlock += '</div>';
          });
        }

        statBlock += '<h3 class="actions">Actions</h3>';
        
        if (creature.action && creature.action.length > 0) {
          creature.action.forEach(action => {
            statBlock += '<div class="stat-group"><span>' + action['action-name'] + ': </span>';

            if (Array.isArray(action.text)) {
              action.text.forEach(line => {
                statBlock += line.replace('Melee Weapon Attack:', '<i>Melee Weapon Attack:</i>').replace('Hit:', '<i>Hit:</i>') + '<br>';
              });
            } 
            else {
              statBlock += action.text.replace('Melee Weapon Attack:', '<i>Melee Weapon Attack:</i>').replace('Hit:', '<i>Hit:</i>');
            }
            
            statBlock += '</div>';
          });
        }

        if (creature.reaction && creature.reaction.length > 0) {
          creature.reaction.forEach(reaction => {
            statBlock += '<div class="stat-group"><span>' + reaction['reaction-name'] + ': </span>';
            statBlock += reaction.text + '<br>';
            statBlock += '</div>';
          });
        }

        if (creature.spells.length > 0) {
          statBlock += '<div class="stat-group"><span>Spells</span> ';
          var spells = creature.spells.split(', ');
          for (let i = 0; i < spells.length; i++) {
            statBlock += '<a href="#" class="spell-pop">' + spells[i].toUpperCase() + '</a>, ';
          }
          statBlock += '</div>';
        }
        $('#beastModal .modal-header').find('h1').html(creature.name);
        $('.beast-body').html(statBlock);
      },
      error: function() {
        // console.log(status); // handle error here
      },
    });
  }

  function populateStorage() {

    const moonCircle = ($('.moon-circle-toggle').hasClass('moon-circle-toggle--active')) ? true : false, 
      dinosaurContent = document.querySelector('#dinosaur-content').checked ? true : false,
      exoticContent = document.querySelector('#exotic-content').checked ? true : false,
      lvl = $('#currentLvl').val();

    localStorage.setItem('cLevel', lvl);
    localStorage.setItem('cMoon', moonCircle);

    localStorage.setItem('dinosaur-content', dinosaurContent);
    localStorage.setItem('exotic-content', exoticContent);

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
    $('body').css('overflow', 'hidden');
  });
  // Hide Beast Block
  $(document).on('click', '#modalClose', function() {
    $('#beastModal').animate({
      'opacity': '0',
    }, 200, function() {
      $('#beastModal').css('display', 'none');
      $('body').css('overflow', 'visible');
    });
  });
  // Open/Close Filter
  $('.filter-toggle').click(function() {
    $('.filter-toggle').toggleClass('filter-toggle--active');
    $('.filter').slideToggle();
  });
  // Select/Deselect Circle of the Moon
  $('.moon-circle-toggle').click(function() {
    $('.moon-circle-toggle').toggleClass('moon-circle-toggle--active');
    $('#monList').html('');
    populateStorage();
  });
  // Adjust level
  $('#currentLvl').change(function() {
    $('#monList').html('');
    populateStorage();
  });
  // Add filters

  $('.filter__input-group input').click(function() {
    
    const inputs = document.querySelectorAll('.filter__input-group input');

    inputs.forEach(input => {
      if (!input.checked) {
        filter = filter.filter(item => item !== input.value);
      }
      else if (input.checked && filter.includes(input.value)) {
        return;
      }
      else {
        filter.push(input.value);
      }
    });
   
    $('#monList').html('');
    populateStorage();
  });
});