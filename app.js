// //////////////// Lesson 62   //////////////////
// // var uiController = (function() {
// //     var y = 12;
// //     x = 33;
// //     console.log("hello");
// // })();

// var uiController = (function() {
//     var x = 10;

//     // add нууцлагдсан
//     function add(y) {
//         return x + y;
//     }

//     return {
//         publicAdd: function(a) {
//             a = add(a);
//             console.log("Боловсруулсан утга: " + a);
//         },
//     };
// })();

// var financeController = (function() {})();

// var appController = (function(uiController, financeController) {
//     // uiController.add(50);      add nuutslagdsan buyu ingej duudsan ued ajillahgui
//     uiController.publicAdd(50);
// })(uiController, financeController);

// var hunController = function() {
//     // data encapsulation

//     // private data
//     var bodol = "Javascript tolgoi erguulmeer ym... ";

//     function tsusGuih() {}
//     // private function
//     function huchiltorogchiigAgaaraasSorjTsusruuOruulah() {}

//     return {
//         yrih: function() {
//             bodol = "Javascript bol lag";
//             huchiltorogchiigAgaaraasSorjTsusruuOruulah();
//             tsusGuih();

//             console.log("hi");
//         },
//     };
// };

// //////////////// Lesson 63   //////////////////
// дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        },
    };
})();

// санхүүтэй ажиллах контроллер
var financeController = (function() {
    // private function
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // private data
    var data = {
        items: {
            inc: [],
            exp: [],
        },

        totals: {
            inc: 0,
            exp: 0,
        },
    };

    return {
        addItem: function(type, desc, val) {
            var item, id;

            if (data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if (type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);
        },

        seeData: function() {
            return data;
        },
    };
})();
// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {
        // 1. оруулах өгөгдлийн дэлгэцээс олж авна.
        var input = uiController.getInput();
        // console.log(uiController.getInput());

        // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        financeController.addItem(input.type, input.description, input.value);
        // 3. олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        // 4. төсвийг тооцоолно.
        // 5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    };

    var setupEventListeners = function() {
        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click", function() {
            ctrlAddItem();
        });

        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
            // else console.log("Өөр товч дарсан байна: " + event.keyCode);
        });
    };

    return {
        init: function() {
            console.log("application started....");
            setupEventListeners();
        },
    };
})(uiController, financeController);

appController.init();

// var Income = function(id, description, value) {
//     this.id = id;
//     this.description = description;
//     this.value = value;
// };

// var Expense = function(id, description, value) {
//     this.id = id;
//     this.description = description;
//     this.value = value;
// };

// var i1 = new Income(1, "tsalin", 250000);
// var i2 = new Income(2, "sugalaa", 20000);

// console.log(i1);
// console.log(i2);

// var incomes = [];

// incomes.push(i1);
// incomes.push(i2);

// console.log(incomes);
// console.log(incomes[1].description);