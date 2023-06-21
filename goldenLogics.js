let value = algonomydata.map((_data, index) => {
    let buttonResultData = [];
    if (_data.ctaLabelOne != "" || _data.targetLinkOne != "") {
        let tempBtnObj1 = {
            ctaLabel: _data.ctaLabelOne,
            targetLink: _data.targetLinkOne,
        };
        buttonResultData.push(tempBtnObj1);
    }
    if (_data.ctaLabelTwo != "" || _data.targetLinkTwo != "") {
        let tempBtnObj2 = {
            ctaLabel: _data.ctaLabelTwo,
            targetLink: _data.targetLinkTwo,
        };
        buttonResultData.push(tempBtnObj2);
    }
    if (_data.ctaLabelThree != "" || _data.targetLinkThree != "") {
        let tempBtnObj3 = {
            ctaLabel: _data.ctaLabelThree,
            targetLink: _data.targetLinkThree,
        };
        buttonResultData[index].push(tempBtnObj3);
    }

    console.log(buttonResultData);
});

let obj = {};
for (let i = 0; i < 5; i++) {
    if (!obj[`innerKey${i}`]) {
        obj[`innerKey${i}`] = [];
    }
    obj[`innerKey${i}`] = ["mohan"];
    obj[`innerKey${i}`] = ["k"];

    for (let j = 0; j < 5; j++) {
        if (!obj[`innerKey${i}`][`inn${j}`]) {
            obj[`innerKey${i}`][`inn${j}`] = {};
        }
        obj[`innerKey${i}`][`inn${j}`] = {};
        // for()
    }
}

let buttonResultData = [];
["One", "Two", "Three"].map((value) => {
    if (data[`ctaLabel${value}`] != "" || data[`targetLink${value}`] != "") {
        let temp = {
            ctaLabel: data[`ctaLabel${value}`],
            targetLink: data[`targetLink${value}`],
        };
        button[index].push(temp);
    }
});

Object.entries(data)
    .sort((a, b) => a[1].order - b[1].order)
    .map((data) => {
        console.log(data[0]);
    });

// -------------------------------------------------------EFICIENT CONDITIONAL STATEMENT-----------------------------------
// "Reference"
// https://www.digitalocean.com/community/posts/5-tips-to-write-better-conditionals-in-javascript

function test(fruit, quantity) {
    const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

    // condition 1: fruit must has value
    if (fruit) {
        // condition 2: must be red
        if (redFruits.includes(fruit)) {
            console.log("red");

            // condition 3: must be big quantity
            if (quantity > 10) {
                console.log("big quantity");
            }
        }
    } else {
        throw new Error("No fruit!");
    }
}

/_ return early when invalid conditions found _/;

function test(fruit, quantity) {
    const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

    // condition 1: throw error early
    if (!fruit) throw new Error("No fruit!");

    // condition 2: must be red
    if (redFruits.includes(fruit)) {
        console.log("red");

        // condition 3: must be big quantity
        if (quantity > 10) {
            console.log("big quantity");
        }
    }
}

/_ return early when invalid conditions found _/;

function test(fruit, quantity) {
    const redFruits = ["apple", "strawberry", "cherry", "cranberries"];

    if (!fruit) throw new Error("No fruit!"); // condition 1: throw error early
    if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red

    console.log("red");

    // condition 3: must be big quantity
    if (quantity > 10) {
        console.log("big quantity");
    }
}

// test results
test(null); //  error: No fruits
test("apple"); // print: red
test("apple", 20); // print: red, big quantity

function test({ one, color } = {}, { data, two } = {}) {
    console.log(data);
}

//test results
test(undefined); // unknown
test({ name: "red" }); // unknown
test({ one: "kumae" }, { two: "apple", color: "red", data: "kmkknknk" }); // apple
