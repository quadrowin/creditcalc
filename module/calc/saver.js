window.cc.module_calc_saver = {

    /**
     * @param {String} val
     * @returns {Number|number}
     */
    parseFloat: function (val) {
        val = String(val || 0);
        val = val.replace(',', '.').replace(/\s/g, '');
        return parseFloat(val) || 0;
    },

    /**
     *
     * @param {jQuery} $form
     * @param {string} selector
     * @returns {Number|number}
     */
    parseFormValueFloat: function ($form, selector) {
        return this.parseFloat($form.find(selector).val());
    },

    /**
     *
     * @param {jQuery} $form
     * @return {string}
     */
    formToString: function ($form) {
        var obj = {
            cs: this.parseFormValueFloat($form, '[name=credit_sum]'),
            st: $form.data('sourceType'),
            fc: this.parseFormValueFloat($form, '[name=full_cost]'),
            fp: this.parseFormValueFloat($form, '[name=first_pay]'),
            yp: this.parseFormValueFloat($form, '[name=year_percent]'),
            pt: $form.data('paymentType'),
            cm: this.parseFormValueFloat($form, '[name=credit_months]'),
            tit: $form.data('timeIntervalType')
        };
        return cc.module_saver.pack(obj);
    },

    formFromString: function ($form, input) {
        var obj = cc.module_saver.unpack(input);
        if ('object' !== typeof obj) {
            return;
        }
        obj.st = obj.st || window.cc.module_calc_index.SOURCE_TYPE_CREDIT_SUM;
        obj.pt = obj.pt || window.cc.module_calc_index.PAYMENT_TYPE_AN;
        obj.tit = obj.tit || window.cc.module_calc_index.TIME_INTERVAL_TYPE_MONTH;

        $form.find('[name=credit_sum]').val(obj.cs);

        $form.attr('data-source-type', obj.st);
        $form.data('sourceType', obj.st);
        $form.find('.cc-source-type a').removeClass('active');
        $form.find('.cc-source-type a[data-source-type=' + encodeURIComponent(obj.st) + ']').addClass('active');

        $form.find('[name=full_cost]').val(obj.fc);
        $form.find('[name=first_pay]').val(obj.fp);
        $form.find('[name=year_percent]').val(obj.yp);

        $form.attr('data-payment-type', obj.pt);
        $form.data('paymentType', obj.pt);
        $form.find('.cc-payment-type a').removeClass('active');
        $form.find('.cc-payment-type a[data-payment-type=' + encodeURIComponent(obj.pt) + ']').addClass('active');

        $form.find('[name=credit_months]').val(obj.cm);

        $form.attr('data-time-interval-type', obj.tit);
        $form.data('timeIntervalType', obj.tit);
        $form.find('.сс-time-interval-type .active').removeClass('active');
        var $tit_a = $form.find('.сс-time-interval-type a[data-time-interval-type=' + encodeURIComponent(obj.tit) + ']');
        $tit_a.addClass('active');
        $form.find('.сс-time-interval-type .active-item-title').text($tit_a.text());

    }

};