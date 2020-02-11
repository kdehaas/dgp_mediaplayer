(function() {

  // boolean to check if player
  var play = true;

  var video = document.getElementById("video");
  var mp4_source = document.getElementById("src_mp4");
  var lists = document.getElementById("list");

  // buttons
  var playpause = document.getElementById("playpause_btn");
  var playpause_txt = document.getElementById("playpause_txt");
  var back = document.getElementById("back_btn");
  var close = document.getElementById("close_btn");

  var play_btn = document.getElementById("play_btn");
  var pause_btn = document.getElementById("pause_btn");

  // path to video directory
  var video_path = "video"

  // [Title, Filename]
  var items = [
                  // Bouw
                  [
                      ["Bouw & vastgoed", "bouw_vastgoed"],

                      [
                        /*
                          ["MorgenWonen 1", "morgenwonen"],
                          ["MorgenWonen 2", "morgenwonen_bouw_montageproces"],
                          ["NieuwWonen 1", "nieuwwonen"],
                          ["NieuwWonen 2", "ried"],
                          ["BouwHub", "bouwhub"],

                          ["Finch buildings & DGV", "finch_buildings_de_groot_vroomshoop"],
                          ["HOMIJ the Edge", "homij_tepb"],
                          ["HOMIJ DLS", "homij_dls"],
                          ["ONE Dubotechniek", "one_dubotechniek"],
                          ["ZuiverWonen", "zuiver_wonen"]
                        */
                      ]

                  ],
                  // Infra
                  [
                      ["Infrastructuur", "infrastructuur"],
                      [
                          ["Asset Insight", "asset_insight"],
                          ["Digitaal ontwerpen bij VWICC", "digitaal_ontwerp_vwicc"],
                          /*
                          ["Drones VolkerRail", "drone_beelden_volkerrail"],
                          ["FloWithDGlow SNI", "flowwithdglowr_kralingsebos"],
                          ["HERA KWS", "hera_kws_infra"],
                          ["Drones AdB", "inzet_drones_aveco_de_bondt"],
                          ["Weginnovaties KWS", "kws_konwebcity_konwebright_zonneweg"],
                          ["Materialenpaspoort AdB", "materialenpaspoort_aveco_de_bondt"],
                          ["PlasticRoad KWS", "plastic_road_kws"],
                          ["Quickscan AdB", "quickscan_aveco_de_bondt"],
                          ["DusDuurzaam VHB", "van_hattum_en_blankevoort_dus_duurzaam"],
                          ["VanDeBouwplaats VHB", "vandebouwplaats_vhb"],
                          ["Greenwall KWS", "van_kessel_greenwall"],
                          ["Beter Benutten Vialis", "vialis_beter_benutten_ivri"],
                          ["Schwung Vialis", "vialis_schwung"],
                          ["Tunnel Cal. Scenario Vialis", "vialis_tunnel_calamiteitenscenario"],
                          ["Verkeer.nu Vialis", "vialis_verkeer_nu"],
                          ["Verkeerplaza Vialis", "vialis_verkeerplaza_gotru"],
                          ["Energietransitie VSH", "vsh_energietransitie"],
                          ["D.A.T. VolkerRail", "filmpje_dat"],
                          ["Flexmonitoring VolkerRail", "flexmonitoring_bedrijfsfilm"],
                          ["Sherloc VolkerRail", "volkerRail_sherloc_ned_final"],
                          ["Dyn. laserscannen VolkerRail", "schiphol_demo"],
                          */
                      ]
                  ],
                  // Telecom
                  [
                      ["Energie & telecom", "energie_telecom"],
                      [
                        /*
                          ["MAPXACT", "maxpact"],
                          ["VW iCity 1", "volkerwessels_icity_main"],
  						            ["VW iCity 2", "volkerwessels_icity_mobility"]
                          */
                      ]
                  ]
              ];

  var list_items = document.getElementById("list_items");
  var video_items = document.getElementById("video_items");

  var iindex = 0;
  var lindex = 0;

  for(var i = 0; i < items.length; i++) {

      var li = document.createElement("li");

      li.setAttribute("class", "item");
      li.setAttribute("id", "item" + i);

      var img = document.createElement("img");
      img.setAttribute("src", "images/" + items[i][0][1] + ".png");
      li.appendChild(img);

      var span = document.createElement("span");
      span.innerHTML = items[i][0][0];
      li.appendChild(span);

      var sub_video_items = document.createElement("ul");
      sub_video_items.setAttribute("class", items[i][0][1] + "_items");
      sub_video_items.setAttribute("id", items[i][0][1] + "_items");


      for(var l = 0; l < items[i][1].length; l++) {

          var vli = document.createElement("li");

          // set item
          vli.setAttribute("class", "video");
          vli.setAttribute("id", "video" + l);

          // set image
          var img = document.createElement("img");
          img.setAttribute("src", "images/" + items[i][0][1] + "/" + items[i][1][l][1] + ".jpg");
          vli.appendChild(img);

          // set title
          var span = document.createElement("span");
          span.innerHTML = items[i][1][l][0];
          vli.appendChild(span);

          // indexes
          vli.iindex = i;
          vli.lindex = l;

          vli.addEventListener("click", function (e) {

              iindex = this.iindex;
              lindex = this.lindex;

              var video_id = items[iindex][1][lindex][1];

              // set source
              mp4_source.src = video_path + "/" + items[iindex][0][1] + "/" + video_id + ".mp4";

              // load video
              video.load();

              lists.style.display = "none";

          });

          sub_video_items.appendChild(vli);
      }

      video_items.appendChild(sub_video_items);

      li.index = i;
      li.addEventListener("click", function (e) {

          var index = this.index;

          for(var z = 0; z < items.length; z++) {
              var current_items = document.getElementById(items[z][0][1] + "_items");
              current_items.style.display = "none";
          }

          var current_item = document.getElementById(items[index][0][1] + "_items");

          current_item.style.display = "inline-block";

          back.style.display = "inline-block";
          list_items.style.display = "none";
          video_items.style.display = "inline-block";

      });

      list_items.appendChild(li);

  }

  playpause.addEventListener("click", function () {

      if(play == true) {
          video.pause();
          play = false;

          play_btn.style.display = "inline-block";
          pause_btn.style.display = "none";

          playpause_txt.innerHTML = "Play";

      } else {
          video.play();
          play = true;

          play_btn.style.display = "none";
          pause_btn.style.display = "inline-block";

          playpause_txt.innerHTML = "Pause";

      }
  });

  back.addEventListener("click", function () {
      back.style.display = "none";
      list_items.style.display = "inline-block";
      video_items.style.display = "none";

      //clearInterval(interval);
  });

  // show list
  video.addEventListener("click", function () {
      lists.style.display = "inline-block";
  });

  // hide list
  close.addEventListener("click", function() {

      lists.style.display = "none";

  });

  function randomizer(itms) {

      var list_items = itms;
      // random company item
      var rand_item = Math.floor(Math.random() * (list_items.length - 1));
      // random video item
      var rand_video_item = Math.floor(Math.random() * (list_items[rand_item][1].length - 1));

      // select video from array
      return items[rand_item][1][rand_video_item][1];
  }

  // random video item function
  video.addEventListener('ended', function() {

      console.log("-------");
      console.log("search for next video");

      var video_id = randomizer(items);

      // set video source
      mp4_source.src = video_path + "/" + video_id + ".mp4";

      // load video
      video.load();

  }, false);

})();
