window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Ventas mensuales",
            fontColor: "#24303C",
        },
        data: [{
            // Change type to column "doughnut", "line", "splineArea", etc.
            type: "splineArea",
            dataPoints: [{
                    label: "Enero",
                    y: 5,
                },
                {
                    label: "Febrero",
                    y: 7,
                },
                {
                    label: "Marzo",
                    y: 4,
                },
                {
                    label: "Abril",
                    y: 10,
                }, {
                    label: "Mayo",
                    y: 15,
                },
                {
                    label: "Junio",
                    y: 25,
                },
                {
                    label: "Julio",
                    y: 22,
                },
                {
                    label: "Agosto",
                    y: 30,
                },
                {
                    label: "Septiembre",
                    y: 28,
                },
                {
                    label: "Octubre",
                    y: 20,
                },
                {
                    label: "Noviembre",
                    y: 19,
                },
                {
                    label: "Diciembre",
                    y: 35,
                },
            ],
        }, ],
    });
    chart.render();
};

// var salesData = {
//     labels: [
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//     ],
//     datasets: [{
//             label: "Front",
//             fillColor: "rgba(247, 80, 90, 0.0)",
//             strokeColor: "#F7505A",
//             pointColor: "#F7505A",
//             pointStrokeColor: "rgba(0,0,0,0.2)",
//             pointHighlightStroke: "rgba(225,225,225,0.75)",
//             data: [3400, 3000, 2500, 4500, 2500, 3400, 3000],
//         },
//         {
//             label: "Middle",
//             fillColor: "rgba(255, 172, 100, 0.0)",
//             strokeColor: "rgba(255, 172, 100, 1)",
//             pointColor: "rgba(255, 172, 100, 1)",
//             pointStrokeColor: "rgba(0,0,0,0.2)",
//             pointHighlightStroke: "rgba(225,225,225,0.75)",
//             data: [1900, 1700, 2100, 3600, 2200, 2500, 2000],
//         },
//         {
//             label: "Back",
//             fillColor: "rgba(19, 71, 34, 0.0)",
//             strokeColor: "rgba(88, 188, 116, 1)",
//             pointColor: "rgba(88, 188, 116, 1)",
//             pointStrokeColor: "rgba(0,0,0,0.2)",
//             pointHighlightStroke: "rgba(225,225,225,0.75)",
//             data: [1000, 1400, 1100, 2600, 2000, 900, 1400],
//         },
//     ],
// };
// var ctx = document.getElementById("salesData").getContext("2d");
// window.myLineChart = new Chart(ctx).Line(salesData, {
//     pointDotRadius: 6,
//     pointDotStrokeWidth: 2,
//     datasetStrokeWidth: 3,
//     scaleShowVerticalLines: false,
//     scaleGridLineWidth: 2,
//     scaleShowGridLines: true,
//     scaleGridLineColor: "rgba(225, 255, 255, 0.015)",
//     scaleOverride: true,
//     scaleSteps: 9,
//     scaleStepWidth: 500,
//     scaleStartValue: 0,

//     responsive: true,
// });

var creditSales = new ProgressBar.Circle("#creditSales", {
    color: "#F7505A",
    strokeWidth: 5,
    trailWidth: 3,
    duration: 1000,
    text: {
        value: "0%",
    },
    step: function (state, bar) {
        bar.setText((bar.value() * 100).toFixed(0) + "%");
    },
});
var channelSales = new ProgressBar.Circle("#channelSales", {
    color: "#e88e3c",
    strokeWidth: 5,
    trailWidth: 3,
    duration: 1000,
    text: {
        value: "0%",
    },
    step: function (state, bar) {
        bar.setText((bar.value() * 100).toFixed(0) + "%");
    },
});
var directSales = new ProgressBar.Circle("#directSales", {
    color: "#2bab51",
    strokeWidth: 5,
    trailWidth: 3,
    duration: 1000,
    text: {
        value: "0%",
    },
    step: function (state, bar) {
        bar.setText((bar.value() * 100).toFixed(0) + "%");
    },
});
creditSales.animate(0.8);
channelSales.animate(0.64);
directSales.animate(0.34);

function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

function readURLTwo(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap2').hide();

            $('.file-upload-image2').attr('src', e.target.result);
            $('.file-upload-content2').show();

            $('.image-title2').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUploadTwo();
    }
}

function removeUploadTwo() {
    $('.file-upload-input2').replaceWith($('.file-upload-input2').clone());
    $('.file-upload-content2').hide();
    $('.image-upload-wrap2').show();
}
$('.image-upload-wrap2').bind('dragover', function () {
    $('.image-upload-wrap2').addClass('image-dropping');
});
$('.image-upload-wrap2').bind('dragleave', function () {
    $('.image-upload-wrap2').removeClass('image-dropping');
});