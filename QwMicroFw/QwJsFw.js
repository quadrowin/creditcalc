"use strict";

window.QwJsFw = {

    /**
     * Инициализация модулей в пространстве имен
     * @param {object} ns
     */
    addNamespace: function (ns) {
        var self = this;
        setTimeout(function () {
            var names = Object.keys(ns);
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                if ('object' === typeof ns[name]) {
                    self.initModule(ns, name);
                }
            }
        }, 1);
    },

    /**
     * инициализация контроллера по имени
     * @param {object} ns
     * @param {string} name
     */
    initModule: function (ns, name) {
        if ('function' === typeof ns[name].init) {
            ns[name].init();
        }
        this.initModuleBind(ns, name);
    },

    /**
     * Инициализация связей с DOM элементами
     *
     * Объявление событий:
     * bind: [
     *      [
     *          {string} selector,
     *          {string} event,
     *          {string|function} handler,
     *          {boolean} save default behavior [optional] default false
     *      ],
     *
     *      // В следующем примере при сабмите формы будет вызывана функция - 3 элемент массива.
     *      // this - объект модуля.
     *      // Форма отправлена не будет.
     *      [
     *          '.form',
     *          'submit',
     *          function ($form) {}
     *      ],
     *
     *      // Фукнция будет вызвана при клике в любом месте документа,
     *      // после выполнения function(), продолжится обработка события
     *      // стандартным поведением
     *      [
     *          '',
     *          'click',
     *          function ($btn, event) {}, // функция будет вызвана в контексте модуля
     *          true    // сохранить стандартное поведение
     *      ]
     * ]
     *
     * @param {object} ns
     * @param {string} name
     */
    initModuleBind: function (ns, name) {
        var module = ns[name];
        var bind = module.bind;
        if (typeof bind !== "object" || !bind.length || !bind.forEach) {
            return;
        }
        var $body = $('body');
        bind.forEach(function (bind) {
            // bind like ['.form', 'event', 'handlerMethod']
            $body.on(bind[1], bind[0], function(e, d) {
                e = (e || window.event);
                if (!bind[3]) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                if (typeof bind[2] === 'function') {
                    bind[2].call(module, $(this), e, d);
                } else {
                    module[bind[2]]($(this), e, d);
                }
            });
        });
    }

};
