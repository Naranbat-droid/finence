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
var uiController = (function() {})();
// санхүүтэй ажиллах контроллер
var financeController = (function() {})();
// Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
    var ctrlAddItem = function() {
        // 1. оруулах өгөгдлийн дэлгэцээс олж авна.
        console.log("Дэлгэцээс өгөгдлөө авах хэсэг");
        // 2. олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        // 4. төсвийг тооцоолно.
        // 5. эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    };

    document.querySelector(".add__btn").addEventListener("click", function() {
        ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
        // console.log(event);
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
        // else console.log("Өөр товч дарсан байна: " + event.keyCode);
    });
    // 5753687919
})(uiController, financeController);