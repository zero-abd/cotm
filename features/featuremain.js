function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" class="featurelink">' + url + '</a>';
    })
}

function hackstring(string) {
    return urlify(string).replace(/#([A-Za-z0-9_-]+)/g, "<a class='hash_tag' href='https://facebook.com/hashtag/$1'>#$1</a>");
}

function hacknnumber(string) {
    return hackstring(string).replace(/01([0-9]{9})/g, "<a class='phone_no' href='tel:+8801$1'>01$1</a>");
}

var features;
fetch('feature.json')
    .then(response => response.text())
    .then(data => {
        window.features = JSON.parse(data).reverse();

        for (var i = 0; i < features.length; i++) {
            $('#features').append(`<div class="col-lg-4 col-md-6">
    <div class="feature-item mb-30">
        <div class="feature-img" style="background: center / cover no-repeat url(image/` + features[i]['image'] + `)">
        </div>
        <div class="feature-content">
            <h3 class="feature-title">
                <a href="?id=` + features[i]['id'] + `">` + features[i]['name'] + `</a>
            </h3>
            <p class="feature-desc">` + features[i]['description'] + `</p>
            <a href="?id=` + features[i]['id'] + `" class="hover-underline-animation featurebtn">Read More</a>
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

            for (var i = 0; i < features.length; i++) {
                if (curid == features[i]['id']) {
                    c = i;
                    break;
                }
            }

            if (c == -1) {
                window.location.href = "../features/";
            } else {
                $('#features').hide();
                $('#single-feature').show();
                $('.breadcrumb-title').html(features[c]['name']);
                // change background image
                $('head').append("<style>.bd-page-title-bg::before{background: center / cover no-repeat url(image/"+ features[c]['image'] + "); filter: blur(10px); opacity: 0.2}</style>");
                // $('.bd-page-title-bg::before').css({'background': 'center / cover no-repeat url(image/' + features[c]['image'] + ')', 'backdrop-filter': 'blur(10px)'});
                $('#sfeature-title').html(features[c]['name']);
                $('#sfeature-desc').html(hacknnumber(features[c]['description']));
                $('#sfeature-image').attr('src', 'image/' + features[c]['image']);
            }

        } catch (err) {

        }
    });