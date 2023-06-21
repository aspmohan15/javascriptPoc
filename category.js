let data = {
    5: {
        img: "/Icons/PE_logo_white_2.svg",
        dimension: {
            width: 120,
            height: 90,
        },
        background: "#005335",
        order: 1,
    },
    45: {
        img: "/Icons/PE_logo_white_2.svg",
        dimension: {
            width: 120,
            height: 90,
        },
        background: "#005335",
        order: 2,
    },
    2: {
        img: "/Icons/logo_AS.svg",
        dimension: {
            width: 116,
            height: 90,
        },
        background: "#021f50",
        order: 3,
    },
    3: {
        img: "/Icons/logo_LP_black_upper_crest_white.svg",
        dimension: {
            width: 117,
            height: 90,
        },
        background: "linear-gradient(113deg, #333 10%, #000) 110%)",
        order: 4,
    },
    4: {
        img: "/Icons/PE_logo_white_2.svg",
        dimension: {
            width: 120,
            height: 90,
        },
        background: "#005335",
        order: 5,
    },
};

// sortable.sort(function(a, b) {
//     return a[1] - b[1];
// });

// let sorted = Object.entries(data).sort((a, b) => {
//     return a[1].order - b[1].order;
// });

// console.log(sorted);

Object.entries(data)
    .sort((a, b) => a[1].order - b[1].order)
    .map((data) => {
        console.log(data[0]);
    });

// console.log(sorted);

return componentConfig?.brandIconMapping
    ? Object.entries(componentConfig.brandIconMapping)
          ?.sort((a, b) => a[1].order - b[1].order)
          ?.map((shopId, index) => {
              const cardData = data?.find((item) => item.a_shopid == shopId[0]);
              return card(cardData, index, shopId[0]);
          })
    : null;
