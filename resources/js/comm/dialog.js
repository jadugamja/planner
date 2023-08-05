// CUSTOM CONFIRM/ALERT
const POPUP = {
    timer: 500,
    open: function(t, msg) {
        
        POPUP.close();
        // var 
    },
    close: function() {
        
    }, 
    confirm: function (txt, callback) {
        if (txt == null || txt.trim() == "") {
            console.warn("confirm message is empty.");
            return;
        } else if (callback == null || typeof callback != 'function') {
            console.warn("callback is null or not function.");
            return;
        } else {
            $(".type-confirm .btn_ok").on("click", function () {
                $(this).unbind("click");
                callback(true);
                POPUP.close(this);
            });
            this.open("type-confirm", txt);
        }
    }
}
