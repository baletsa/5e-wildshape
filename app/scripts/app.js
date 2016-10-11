//var $ = require('jquery');

var LMI = {
  common: {
    init: function() {


      //Create a Monster Stat Block
      function monsterList(cr) {
        var currentLvl = $('#currentLvl').val();
        if (currentLvl < 2) {
          $('#monList').html('<div class="error">You cannot Wild Shape yet</div>');
        } else if (currentLvl > 20) {
          $('#monList').html('<div class="error">The maximum level is 20</div>)');
        } else {
          $.ajax({
            type: "get",
            url: "beast_data/beasts.xml",
            dataType: "xml",
            success: function(xml) {
              var monList = '';
              i = 0;
              var items = $(xml).find("monster").filter(function() {
                if (currentLvl >= 2 && currentLvl < 4) {
                  return $('cr', this).text() === cr && $('swim', this).text() === "" && $('fly', this).text() === "";
                } else if (currentLvl >= 4 && currentLvl < 8) {
                  return $('cr', this).text() === cr && $('fly', this).text() === "";
                } else {
                  return $('cr', this).text() === cr;
                }
              });
              items.each(function(index, item) {
                icons = '';
                if ($(item).find("swim").text() !== '') { icons += '<svg><use xlink:href="images/icons.svg#icon-swim" /></svg>'; }
                if ($(item).find("fly").text() !== '') { icons += '<svg><use xlink:href="images/icons.svg#icon-fly" /></svg>'; }
                if ($(item).find("climb").text() !== '') { icons += '<svg><use xlink:href="images/icons.svg#icon-climb" /></svg>'; }
                if ($(item).find("burrow").text() !== '') { icons += '<svg><use xlink:href="images/icons.svg#icon-burrow" /></svg>'; }

                //monList += '<li class="beast"><h3>' + $(item).find("name").text() + '</h3><div><svg><use xlink:href="images/icons.svg#icon-paw" /></svg>' + icons + '</div></li>';
                monList += '<li class="beast"><h3>' + $(item).find("name").text() + '</h3><div>' + icons + '</div></li>';
                i++;
              });
              $('.cr-group[data-cr="' + cr + '"]').find('ul').html(monList);
              $('.cr-group[data-cr="' + cr + '"]').find('span').html(i);

            },
            error: function(xhr, status) {
              console.log(status); //handle error here
            }
          });
        }
      }

      function addMonsters(list) {
        $.each(list, function(i, val) {
          html = '<div class="cr-group" data-cr="' + val + '">' +
            '<div class="cr-header">' +
            '<h2>CR ' + val + '</h2>' +
            '<span></span>' +
            '</div>' +
            '<ul></ul>' +
            '</div>';
          $('#monList').prepend(html);
          monsterList(val);
        });
        //$('div.cr-group').eq(0).find('ul').slideDown();
      }

      //Get CR array based on level and circle
      function monsterLvl(level, moon) {
        var preList;
        var crList;
        if (moon === true) {
          if (level >= 2 && level < 6) {
            crList = ['0', '1/8', '1/4', '1/2', '1'];
          } else {
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
        } else {
          if (level >= 2 && level < 4) {
            crList = ['0', '1/8', '1/4'];
          } else if (level >= 4 && level < 8) {
            crList = ['0', '1/8', '1/4', '1/2'];
          } else {
            crList = ['0', '1/8', '1/4', '1/2', '1'];
          }
        }
        //console.log(crList);
        addMonsters(crList);
      }

      //Create a Monster Stat Block
      function monsterBlock(name) {
        $.ajax({
          type: "get",
          url: "beast_data/beasts.xml",
          dataType: "xml",
          success: function(xml) {
            var items = $(xml).find("monster").filter(function() {
              return $('name', this).text() === name;
            });
            statBlock =
              '<h2>' + $(items).find('size').text() + '  ' + $(items).find('type').text() + '  ' + $(items).find('alignment').text() + '</h2>' +
              '<div class="top-stats">' +
              '<p><span>AC:</span> ' + $(items).find('ac').text() + ' </p>' +
              '<p><span>HP:</span> ' + $(items).find('hp').text() + ' </p>' +
              '<p>' +
              '<span>Speed:</span>' + $(items).find('speed').text() + ', ';
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
              $(item).find('trait').each(function(i) {
                statBlock += '<h4><span>' + $(this).find('trait-name').text() + ': </span>';
                $(this).find('text').each(function() {
                  statBlock += $.text(this) + '<br>';
                });
                statBlock += '</h4>';
              });
              statBlock += '<h3 class="actions">Actions</h3>';
              $(item).find('action').each(function(i) {
                statBlock += '<h4><span>' + $(this).find('action-name').text() + ': </span>';
                $(this).find('text').each(function() {
                  text = $.text(this).replace('Melee Weapon Attack:', '<i>Melee Weapon Attack:</i>').replace('Hit:', '<i>Hit:</i>');
                  statBlock += text + '<br>';
                });
                statBlock += '</h4>';
              });
              $(item).find('reaction').each(function(i) {
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
                statBlock += '<a href="#" class="spell-pop">' + capitalize(spells[i]) + '</a>, ';
              }
              statBlock += '</h4>';
            }
            $('#beastModal .modal-header').find('h1').html($(items).find('name').text());
            $('.beast-body').html(statBlock);
          },
          error: function(xhr, status) {
            console.log(status); //handle error here
          }
        });
      }



      var moonCircle = ($('.moon-circle').hasClass('active')) ? true : false;
      var currentLvl = $('#currentLvl').val();

      monsterLvl(currentLvl, moonCircle);

      //Show/Collapse Beast Lists
      $('body').on('click', '.cr-header', function() {
        $('.cr-group ul').slideUp();
        if ($(this).next('ul').is(':hidden')) {
          $(this).next('ul').slideDown();
        }
      });
      //Show Beast Block
      $(document).on("click", ".beast", function() {
        var beastName = $(this).find('h3').text();
        monsterBlock(beastName);
        $('#beastModal').css('display', 'flex').animate({
          'opacity': '1'
        }, 200);
      });
      //Hide Beast Block
      $(document).on("click", "#modalClose", function() {
        $('#beastModal').animate({
          'opacity': '0'
        }, 200, function() {
          $('#beastModal').css('display', 'none');
        });
      });
      //Select/Deselect Circle of the Moon
      $('.moon-circle').click(function() {
        $('.moon-circle').toggleClass('active');
        var moonCircle = ($('.moon-circle').hasClass('active')) ? true : false;
        var currentLvl = $('#currentLvl').val();
        $('#monList').html('');
        monsterLvl(currentLvl, moonCircle);
      });
      //Adjust Level
      $("#currentLvl").change(function() {
        var moonCircle = ($('.moon-circle').hasClass('active')) ? true : false;
        var currentLvl = $('#currentLvl').val();
        $('#monList').html('');
        monsterLvl(currentLvl, moonCircle);
      });

    }
  }
};

var LMIModules = {
  fire: function(func, funcname, args) {

    var ns = LMI;

    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && ns[func] && typeof ns[func][funcname] === 'function') {
      ns[func][funcname](args);
    }
  },

  loadEvents: function() {
    //fire common functions first
    LMIModules.fire('common');

    //find modules to load based on data attributes
    var moduleTrigger = $('[data-module]');

    if (moduleTrigger.length) {

      var moduleNames = [];
      var modules = [];

      //find the names of each trigger
      moduleTrigger.each(function() {
        names = $(this).data("module").split(' ');
        for (var i = 0; i < names.length; i++) {
          moduleNames.push(names[i]);
        }
      });

      //sort out duplicates
      for (var i = 0; i < moduleNames.length; i++) {
        if (($.inArray(moduleNames[i], modules)) === -1) {
          modules.push(moduleNames[i]);
        }
      }

      //load function based on data attribute value as names
      $.each(modules, function(i, classnm) {
        LMIModules.fire(classnm);
      });
    }
  }
};

$(document).ready(LMIModules.loadEvents);
