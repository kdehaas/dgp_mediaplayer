(function () {

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
    var video_path = "images"

    var list_items = document.getElementById("list_items");
    var video_items = document.getElementById("video_items");

    $.post("/.?folder=images",
        JSON.stringify("images"),
        function (data, status) {
            var folders = JSON.parse(data)

            for (var i = 0; i < folders.length; i++) {
                var folder = folders[i];
                var folderid = folderIdFromName(folder);

                var li = document.createElement("li");

                li.setAttribute("class", "item");
                li.setAttribute("id", "item" + i);

                var img = document.createElement("img");
                img.setAttribute("src", "images/" + folder + ".png");
                img.width = "100";
                img.height = "100";
                li.appendChild(img);

                var span = document.createElement("span");
                span.innerHTML = folder;
                li.appendChild(span);
                list_items.append(li);

                var sub_video_items = document.createElement("ul");
                sub_video_items.setAttribute("class", folderid + "_items");
                sub_video_items.setAttribute("id", folderid + "_items");

                $.post("/.?folder=" + encodeURIComponent("images/" + folder),
                    JSON.stringify({ 'folder': "images/" + folder }),
                    function (data, status) {
                        var files = JSON.parse(data)
                        // console.log("This is the returned data:");
                        // console.log(files);

                        for (var l = 0; l < files.length; l++) {
                            var file = files[l];
                            var vli = document.createElement("li");

                            // set item
                            vli.setAttribute("class", "video");
                            vli.setAttribute("id", "video" + l);

                            // set image
                            var img = document.createElement("img");
                            img.setAttribute("src", "images/" + folder + "/" + file + ".png");
                            vli.appendChild(img);

                            // set title
                            var span = document.createElement("span");
                            span.innerHTML = file;
                            vli.appendChild(span);

                            // indexes
                            vli.iindex = i;
                            vli.lindex = l;

                            vli.addEventListener("click", function (e) {

                                iindex = this.iindex;
                                lindex = this.lindex;

                                // set source
                                mp4_source.src = video_path + "/" + folder + "/" + file + ".mp4";

                                // load video
                                video.load();

                                lists.style.display = "none";

                            });
                            sub_video_items.appendChild(vli);
                        }
                        video_items.appendChild(sub_video_items);

                        li.index = i;


                    }, "text");

                li.addEventListener("click", function (e) {
                    for (var z = 0; z < folders.length; z++) {
                        var current_items = document.getElementById(folderIdFromName(folders[z]) + "_items");
                        if (current_items != null) {
                            current_items.style.display = "none";
                        }
                    }

                    var current_item = document.getElementById(folderIdFromName(folder) + "_items");
                    if (current_item != null) {
                        current_item.style.display = "inline-block";
                    }
                    back.style.display = "inline-block";
                    list_items.style.display = "none";
                    video_items.style.display = "inline-block";

                });
            }
        }, "text");


    playpause.addEventListener("click", function () {

        if (play == true) {
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
    close.addEventListener("click", function () {

        lists.style.display = "none";

    });

    function folderIdFromName(name) {
        try {
            var badthings = [' ', '&'];
            var result = name;
            for (var i = 0; i < badthings.length; i++) {
                result = result.replaceAll(badthings[i], "_");
            }
            return result;
        } catch{
            return name;
        }
    }

    String.prototype.replaceAll = function (find, replace) {
        try {
            var str = this;
            return str.replace(new RegExp(find, 'g'), replace);
        } catch {
            return str;
        }
    };

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
    video.addEventListener('ended', function () {

        console.log("-------");
        console.log("search for next video");

        var video_id = randomizer(items);

        // set video source
        mp4_source.src = video_path + "/" + video_id + ".mp4";

        // load video
        video.load();

    }, false);

})();
