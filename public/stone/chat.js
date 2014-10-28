$(document).ready(function() {
    // try your js

    // normalize event tab-stat, we hack something here couse the flot re-draw event is any some bugs for this case
    $('#tab-stat > a[data-toggle="tab"]').on('shown', function(){
        if(sessionStorage.mode == 4){ // this hack only for mode side-only
            $('body,html').animate({
                scrollTop: 0
            }, 'slow');
        }
    });

    // peity chart
    $("span[data-chart=peity-bar]").peity("bar");

    // Input tags with select2
    $('input[name=reseiver]').select2({
        tags:[]
    });

    // uniform
    $('[data-form=uniform]').uniform();

    // wysihtml5
    $('[data-form=wysihtml5]').wysihtml5()
    toolbar = $('[data-form=wysihtml5]').prev();
    btn = toolbar.find('.btn');

    $.each(btn, function(k, v){
        $(v).addClass('btn-mini')
    });

    // Server stat circular by knob
    $("input[data-chart=knob]").knob();

    // system stat flot
    d1 = [ ['jan', 231], ['feb', 243], ['mar', 323], ['apr', 352], ['maj', 354], ['jun', 467], ['jul', 429] ];
    d2 = [ ['jan', 87], ['feb', 67], ['mar', 96], ['apr', 105], ['maj', 98], ['jun', 53], ['jul', 87] ];
    d3 = [ ['jan', 34], ['feb', 27], ['mar', 46], ['apr', 65], ['maj', 47], ['jun', 79], ['jul', 95] ];

    var visitor = $("#visitor-stat"),
    order = $("#order-stat"),
    user = $("#user-stat"),

    data_visitor = [{
            data: d1,
            color: '#00A600'
        }],
    data_order = [{
            data: d2,
            color: '#2E8DEF'
        }],
    data_user = [{
            data: d3,
            color: '#DC572E'
        }],


    options_lines = {
        series: {
            lines: {
                show: true,
                fill: true
            },
            points: {
                show: true
            },
            hoverable: true
        },
        grid: {
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#CDCDCD',
            hoverable: true
        },
        legend: {
            show: false
        },
        xaxis: {
            mode: "categories",
            tickLength: 0
        },
        yaxis: {
            autoscaleMargin: 2
        }

    };

    // render stat flot
    $.plot(visitor, data_visitor, options_lines);
    $.plot(order, data_order, options_lines);
    $.plot(user, data_user, options_lines);

    // tootips chart
    function showTooltip(x, y, contents) {
        $('<div id="tooltip" class="bg-black corner-all color-white">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '0px',
            padding: '2px 10px 2px 10px',
            opacity: 0.9,
            'font-size' : '11px'
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $('#visitor-stat, #order-stat, #user-stat').bind("plothover", function (event, pos, item) {

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);
                label = item.series.xaxis.ticks[item.datapoint[0]].label;

                showTooltip(item.pageX, item.pageY,
                label + " = " + y);
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;            
        }

    });
    // end tootips chart


    // Schedule Calendar
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var calendar = $('#schedule').fullCalendar({
        header: {
            left: 'title',
            center: '',
            right: 'prev,next today,month,basicWeek,basicDay'
        },
        events: [
            {
                title: 'Start a project',
                start: new Date(y, m, 1)
            },
            {
                title: 'interview and data collection',
                start: new Date(y, m, 3),
                end: new Date(y, m, 7)
            },
            {
                title: 'Creating design interface',
                start: new Date(y, m, 9),
                end: new Date(y, m, 12)
            },
            {
                title: 'Meeting',
                start: new Date(y, m, 19, 10, 30),
                allDay: false
            },
            {
                title: 'Meeting',
                start: new Date(y, m, 28, 10, 30),
                allDay: false
            },
            {
                title: 'Date',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false
            }
        ]
    });
    // end Schedule Calendar
});