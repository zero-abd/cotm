function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" class="eventlink">' + url + '</a>';
    })
}

function hackstring(string) {
    return urlify(string).replace(/#([A-Za-z0-9_-]+)/g, "<a class='hash_tag' href='https://facebook.com/hashtag/$1'>#$1</a>");
}

function hacknnumber(string) {
    return hackstring(string).replace(/01([0-9]{9})/g, "<a class='phone_no' href='tel:+8801$1'>01$1</a>");
}

var events;
fetch('event.json')
    .then(response => response.text())
    .then(data => {
        window.events = JSON.parse(data).reverse();

        for (var i = 0; i < events.length; i++) {
            $('#events').append(`<div class="col-lg-4 col-md-6">
    <div class="event-item mb-30">
        <div class="event-img" style="background: center / cover no-repeat url(image/` + events[i]['image'] + `)">
        </div>
        <div class="event-content">
            <h3 class="event-title">
                <a href="?id=` + events[i]['id'] + `">` + events[i]['name'] + `</a>
            </h3>
            <div class="event-meta">
                <span><i class="far fa-calendar-alt"></i> ` + events[i]['date'] + `</span>
            </div>
            <p class="event-desc">` + events[i]['description'] + `</p>
            <a href="?id=` + events[i]['id'] + `" class="hover-underline-animation eventbtn">Read More</a>
        </div>
    </div>
</div>`)
        }


        function parseURLParams(url) {
            var queryStart = url.indexOf("?") + 1,
                queryEnd = url.indexOf("#") + 1 || url.length + 1,
                query = url.slice(queryStart, queryEnd - 1),
                pairs = query.replace(/\+/g, " ").split("&"),
                parms = {},
                i, n, v, nv;

            if (query === url || query === "") return;

            for (i = 0; i < pairs.length; i++) {
                nv = pairs[i].split("=", 2);
                n = decodeURIComponent(nv[0]);
                v = decodeURIComponent(nv[1]);

                if (!parms.hasOwnProperty(n)) parms[n] = [];
                parms[n].push(nv.length === 2 ? v : null);
            }
            return parms;
        }

        var c = -1;
        try {
            var curid = parseURLParams(window.location.href)['id'];

            for (var i = 0; i < events.length; i++) {
                if (curid == events[i]['id']) {
                    c = i;
                    break;
                }
            }

            if (c == -1) {
                window.location.href = "../events/";
            } else {
                $('#events').hide();
                $('#single-event').show();
                $('.breadcrumb-title').html(events[c]['name']);
                // change background image
                $('head').append("<style>.bd-page-title-bg::before{background: center / cover no-repeat url(image/"+ events[c]['image'] + "); filter: blur(10px); opacity: 0.2}</style>");
                // $('.bd-page-title-bg::before').css({'background': 'center / cover no-repeat url(image/' + events[c]['image'] + ')', 'backdrop-filter': 'blur(10px)'});
                $('#sevent-title').html(events[c]['name']);
                $('#sevent-date').html('<i class="far fa-calendar-alt"></i>' + events[c]['date']);
                $('#sevent-desc').html(hacknnumber(events[c]['description']));
                $('#sevent-image').attr('src', 'image/' + events[c]['image']);
            }

        } catch (err) {

        }
    });