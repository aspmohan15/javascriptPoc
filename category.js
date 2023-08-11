let data = [
    {
        image: "https://s7ap1.scene7.com/is/image/adityabirlafashionstage/AE_logo_shop_2x",
        altText: "logo_shop",
        lastModifiedDate: "2023-01-26T13:59:43.072+0000",
        title: "Logo Shop",
        subTitle:
            "A great pair of denim can easily be worn to almost any and all occasions-even to the office.",
        ctaLabel: "READ MORE",
        targetLink: "",
        startDate: "",
        endDate: "",
        startDateValue: "",
        endDateValue: "",
        startTime: "",
        endTime: "",
        lastUpdateDate: "",
    },
    {
        image: "https://s7ap1.scene7.com/is/image/adityabirlafashionstage/AE_pastel_shades_2x",
        altText: "pastel shades",
        lastModifiedDate: "2023-05-26T13:59:59.762+0000",
        title: "Pastel Shades",
        subTitle:
            "A great pair of denim can easily be worn to almost any and all occasions-even to the office.",
        ctaLabel: "READ MORE",
        targetLink: "",
        startDate: "",
        endDate: "",
        startDateValue: "",
        endDateValue: "",
        startTime: "",
        endTime: "",
        lastUpdateDate: "",
    },
    {
        image: "https://s7ap1.scene7.com/is/image/adityabirlafashionstage/AE_denims_2x",
        altText: "denims in all shades",
        lastModifiedDate: "2023-05-26T14:00:23.751+0000",
        title: "Denims In all Shades",
        subTitle:
            "A great pair of denim can easily be worn to almost any and all occasions-even to the office.",
        ctaLabel: "READ MORE",
        targetLink: "",
        startDate: "",
        endDate: "",
        startDateValue: "",
        endDateValue: "",
        startTime: "",
        endTime: "",
        lastUpdateDate: "",
    },
    {
        image: "https://s7ap1.scene7.com/is/image/adityabirlafashionstage/AE_logo_shop_2x",
        altText: "logo_shop",
        lastModifiedDate: "2023-05-26T14:00:38.474+0000",
        title: "Logo Shop",
        subTitle:
            "A great pair of denim can easily be worn to almost any and all occasions-even to the office.",
        ctaLabel: "READ MORE",
        targetLink: "",
        startDate: "",
        endDate: "",
        startDateValue: "",
        endDateValue: "",
        startTime: "",
        endTime: "",
        lastUpdateDate: "",
    },
    {
        image: "https://s7ap1.scene7.com/is/image/adityabirlafashionstage/AE_pastel_shades_2x",
        altText: "pastel shades",
        lastModifiedDate: "2023-08-07T08:25:15.715+0000",
        title: "Pastel Shades",
        subTitle:
            "A great pair of denim can easily be worn to almost any and all occasions-even to the office.",
        ctaLabel: "READ MORE",
        targetLink: "",
        startDate: "",
        endDate: "",
        startDateValue: "",
        endDateValue: "",
        startTime: "",
        endTime: "",
        lastUpdateDate: "",
    },
];

let result = data.sort(
    (a, b) => new Date(b.lastModifiedDate) - new Date(a.lastModifiedDate)
);
console.log(
    result.map((data) => data.lastModifiedDate),
    "lastModifiedDate"
);

function time_ago(time) {
    switch (typeof time) {
        case "number":
            break;
        case "string":
            time = +new Date(time);
            break;
        case "object":
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, "seconds", 1], // 60
        [120, "1 minute ago", "1 minute from now"], // 60*2
        [3600, "minutes", 60], // 60*60, 60
        [7200, "1 hour ago", "1 hour from now"], // 60*60*2
        [86400, "hours", 3600], // 60*60*24, 60*60
        [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
        [604800, "days", 86400], // 60*60*24*7, 60*60*24
        [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
        [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
        [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
        [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
        [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = "ago",
        list_choice = 1;

    if (seconds == 0) {
        return "Just now";
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = "from now";
        list_choice = 2;
    }
    var i = 0,
        format;
    while ((format = time_formats[i++]))
        if (seconds < format[0]) {
            if (typeof format[2] == "string") return format[list_choice];
            else
                return (
                    Math.floor(seconds / format[2]) +
                    " " +
                    format[1] +
                    " " +
                    token
                );
        }
    return time;
}

var startDate = new Date("1918-08-09T13:59:43.072+0000");
var daysDiffrence = new Date() - startDate;
console.log(time_ago(new Date(Date.now() - daysDiffrence)));
