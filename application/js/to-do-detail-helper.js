$(function(){

    init();

});

function init(){

    //// Sidebar Sliding
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar, #content").toggleClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });


    //// Init datetime picker icon.
    $.fn.datetimepicker.Constructor.Default = $.extend({},
        $.fn.datetimepicker.Constructor.Default,
        { 
            icons: { 
                time: 'fas fa-clock',
                date: 'fas fa-calendar',
                up: 'fas fa-arrow-up',
                down: 'fas fa-arrow-down',
                previous: 'fas fa-arrow-circle-left',
                next: 'fas fa-arrow-circle-right',
                today: 'far fa-calendar-check-o',
                clear: 'fas fa-trash',
                close: 'far fa-times' 
            },
        }
        
    );

    $("#datetimepicker").datetimepicker({
        format: "YYYY-MM-DD HH:mm",
    });



    //// Level signal
    var level = 0;
    $("#level i").click(function(){

        $("#level i").css({"font-weight":400});

        var value = Number($(this).attr("index")) +1;

        if(level === value) return;

        $("#level i").slice(0,value).css({"font-weight":600});
        level = value;
    });

    // init level signal
    var initLevel = Number($("#level").attr("value"));
    $("#level i").slice(0,initLevel).css({"font-weight":600});
    level = initLevel;


    //// Creating time 
    $("#de-created-time").text(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));


    //// Content
    $("#content").val($("#content").attr("data"));


    //// Author 
    $("#author").val($("#author").attr("value"));


};
