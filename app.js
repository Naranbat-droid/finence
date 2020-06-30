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
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expeseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value),
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        },

        clearFields: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputDescription + "," + DOMstrings.inputValue
            );

            // convert List to array
            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el, index, array) {
                el.value = "";
            });

            fieldsArr[0].focus();

            // for (var i = 0; i < fieldsArr.length; i++) {
            //     fieldsArr[i].value = '';
            // }
        },

        tusuviigUzuuleh: function(tusuv) {
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent =
                tusuv.totalInc;
            document.querySelector(DOMstrings.expeseLabel).textContent =
                tusuv.totalExp;
            if (tusuv.huvi !== 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent =
                    tusuv.huvi + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent =
                    tusuv.huvi;
            }
        },

        addListItem: function(item, type) {
            // орлого зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ
            var html, list;
            if (type === "inc") {
                list = DOMstrings.incomeList;
                html =
                    '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList;
                html =
                    '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">%%a%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // тэр HTML дотроо орлого зарлагын утгыг утгуудыг REPLACE ашиглаж өөрчилж өгнө.
            html = html.replace("%id%", item.id);
            html = html.replace("$$DESCRIPTION$$", item.description);
            html = html.replace("$$VALUE$$", item.value);

            // Бэлтгэсэн HTML ээ DOM руу хийж өгнө.
            document.querySelector(list).insertAdjacentHTML("beforeend", html);
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

    var calculateTotal = function(type) {
        var sum = 0;
        data.items[type].forEach(function(el) {
            sum = sum + el.value;
        });

        data.totals[type] = sum;
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

        tusuv: 0,

        huvi: 0,
    };

    return {
        tusuvTootsooloh: function() {
            // Нийт орлогын нийлбэрийг тооцоолно.
            calculateTotal("inc");

            // Нийт зарлагын нийлбэрийг тооцоолно.
            calculateTotal("exp");

            // төсвийг шинээр тооцоолно.
            data.tusuv = data.totals.inc - data.totals.exp;

            // орлого зарлагын хувийг тооцоолно.
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        },

        tusviigAvah: function() {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
            };
        },

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
            return item;
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

        if (input.description !== "" && input.value !== "") {
            // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
            var item = financeController.addItem(
                input.type,
                input.description,
                input.value
            );
            // 3. олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
            uiController.addListItem(item, input.type);
            uiController.clearFields();

            // 4. төсвийг тооцоолно.
            financeController.tusuvTootsooloh();

            // 5. эцсийн үлдэгдэл,
            var tusuv = financeController.tusviigAvah();

            // 6.  Төсвийн тооцоог дэлгэцэнд гаргана.
            uiController.tusuviigUzuuleh(tusuv);
        }
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
            uiController.tusuviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0,
            });
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