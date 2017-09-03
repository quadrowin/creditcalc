cc.module_saver = {

    pack: function (obj) {
        return JSON.stringify(obj);
    },

    unpack: function (str) {
        return JSON.parse(str);
    }

};