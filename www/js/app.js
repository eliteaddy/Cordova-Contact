// Dom7
var $$ = Dom7;

// Init App
var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Contact App',
  // App id
  id: 'com.eliteaddy.contactapp',

  theme: 'ios',
  //materialRipple: true,
  actions: {
    backdrop: false,
  },
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },

  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },

  animatePages: true,

  methods: {
    cordovaReady: function () {
      StatusBar.backgroundColorByHexString("#1e2c53ab");
      var option = new ContactFindOptions();
      option.multiple = true;
      //$$('.item-link').on('click', app.methods.callNumbers);
      navigator.contactsPhoneNumbers.list(app.methods.onResolveSuccess, app.methods.onErrors)
    },

    onResolveSuccess: function (contacts) {
      console.log(contacts.length + ' contacts found');
      for(var i = 0; i < contacts.length; i++) {
        console.log(contacts[i].id + " - " + contacts[i].displayName);
        for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
          
           var phone = contacts[i].phoneNumbers[j];
           var me = phone.number.split(" ").join("").split("-").join("");
           var title = $$('<div class="item-title">').html(contacts[i].displayName);
           //var titlerw = $$('<div class="item-title-row">').append(title);
           var lisst = $$("<div class='item-after num"+[j]+"'>").html(me);
           //var icon = $$('<i class="material-icons">').html('contacts');
           //var media = $$('<div class="item-media">').append(icon);
           var mores = $$('<div class="item-inner">').append(title).append(lisst);
           var morer = $$("<a class='item-link item-content callr"+[j]+"' onclick='app.methods.callNumbers("+ me +")'>").append(mores);
           var more = $$('<li class="tester">').append(morer);
           $$('#lister').append(more);
           console.log("==> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber+ ")");
        }
     }
    },

    callNumbers: function(number){
      console.log("called");
      console.log(number);
      window.plugins.CallNumber.callNumber(app.methods.oncallSuccess, app.methods.onErrors, number, true);
    },

    oncallSuccess: function(result){
      console.log("Success: "+ result);
    },

    onErrors: function (msg) {
      app.dialog.alert("Failed because: " + msg);
    },


  },

  routes: routes,

  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },

});

var mainView = app.views.create('.view-main');

$$(document).on('deviceready', app.methods.cordovaReady);