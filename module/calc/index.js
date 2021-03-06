window.cc.module_calc_index = {

    SOURCE_TYPE_CREDIT_SUM: 'credit-sum',
    SOURCE_TYPE_PURCHASE_COST: 'purchase-cost',

    PAYMENT_TYPE_AN: 'an',
    PAYMENT_TYPE_DIF: 'dif',

    TIME_INTERVAL_TYPE_MONTH: 'month',
    TIME_INTERVAL_TYPE_YEAR: 'year',

    /**
     * @type {number}
     */
    autoCalcTimeout: 0,

    /**
     * @type {number}
     */
    btnRecoverTimeout: 0,

    bind: [

        ['.form-cc-calculator', 'submit', function ($form) {
            $('.btn-cc-calculate').removeClass('btn-primary');
            this.recalculate($form);
        }],

        ['.cc-source-type a', 'click', function ($a) {
            if ($a.hasClass('active')) {
                return;
            }
            var $block = $a.closest('.nav');
            $block.find('.active').removeClass('active');
            $a.addClass('active');
            this.setFormLinkValue($a, 'sourceType', 'data-source-type');
        }, true],

        ['.cc-payment-type a', 'click', function ($a) {
            if ($a.hasClass('active')) {
                return;
            }
            var $block = $a.closest('.nav');
            $block.find('.active').removeClass('active');
            $a.addClass('active');
            $('.block-cc-result').find('.month-pay, .month-pay-first, .month-pay-last').text('---,--');
            this.setFormLinkValue($a, 'paymentType', 'data-payment-type');
        }, true],

        ['.сс-time-interval-type a', 'click', function ($a) {
            if ($a.hasClass('active')) {
                return;
            }
            var $block = $a.closest('.input-group');
            $block.find('.active').removeClass('active');
            $a.addClass('active');
            $block.find('.active-item-title').text($a.text());
            this.setFormLinkValue($a, 'timeIntervalType', 'data-time-interval-type');
        }, true],

        ['.form-cc-calculator .cc-input-val', 'input', function ($inp) {
            if (this.autoCalcTimeout) {
                clearTimeout(this.autoCalcTimeout);
            }
            var self = this;
            this.autoCalcTimeout = setTimeout(function () {
                self.autoCalcTimeout = 0;
                self.recalculate($inp.closest('form'));
            }, 200);
        }],

        ['.btn-cc-make-this-link', 'click', function ($btn) {
            var $block = $btn.closest('.this-link-block');
            $block.addClass('forming');
            var params = cc.module_calc_saver.formToString($('.form-cc-calculator'));
            var $input = $block.find('[name=this-calc-link]');
            $input.val(location.protocol + '//' + location.host + '?jp=' + encodeURIComponent(params));
            $block.addClass('formed').removeClass('forming');
            $input.focus();
            $input.select();
        }],

        ['.btn-cc-copy-this-link', 'click', function ($btn) {
            var $block = $btn.closest('.this-link-block');
            var $input = $block.find('[name=this-calc-link]');
            $input.focus();
            $input.select();
            document.execCommand('copy');
        }]

    ],

    init: function () {
        var self = this;
        var $form = $('.form-cc-calculator');

        var jp = this.getUrlParameterByName('jp', undefined);
        if (jp) {
            cc.module_calc_saver.formFromString($form, jp);
        }

        setTimeout(function () {
            $('.btn-cc-calculate').removeClass('btn-primary');
            self.recalculate($form);
        }, 1);
    },

    /**
     *
     * @param {Date} d
     * @returns {*}
     */
    formatDate: function (d) {
        return d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();
    },

    /**
     *
     * @param {number} x
     * @returns {string}
     */
    formatFloat: function (x) {
        var parts = x.toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join(',');
    },

    /**
     *
     * @param {string} name
     * @param {string|undefined} url
     * @returns {*}
     */
    getUrlParameterByName: function (name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

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
     * http://www.banki.ru/wikibank/annuitetnyie_plateji_po_kreditu/
     *
     * Формула аннуитетного платежа:
     * 1. Ежемесячный аннуитетный платеж:
     *      A = K*S,
     * где:
     * A — ежемесячный аннуитетный платеж,
     * K — коэффициент аннуитета,
     * S — сумма кредита.
     * 2. Коэффициент аннуитета:
     *      K=i*(1+i)^n/((1+i)^n-1),
     * где:
     * K — коэффициент аннуитета,
     * i — месячная процентная ставка по кредиту (= годовая ставка/12 месяцев),
     * n — количество периодов, в течение которых выплачивается кредит.
     *
     * @param {jQuery} $form
     */
    recalculate: function ($form) {
        var self = this;
        if (this.autoCalcTimeout) {
            clearTimeout(this.autoCalcTimeout);
            this.autoCalcTimeout = 0;
        }

        $('.this-link-block').removeClass('formed forming');
        var credit_sum = this.parseFormValueFloat($form, '[name=credit_sum]');
        var result_total_cost = 0;
        if (this.SOURCE_TYPE_PURCHASE_COST === $form.data('sourceType')) {
            var full_cost = this.parseFormValueFloat($form, '[name=full_cost]');
            var first_pay = this.parseFormValueFloat($form, '[name=first_pay]');
            credit_sum = full_cost - first_pay;
            result_total_cost = first_pay;
        }

        var year_percent = this.parseFormValueFloat($form, '[name=year_percent]');
        var credit_months = this.parseFormValueFloat($form, '[name=credit_months]');
        if (credit_months < 1) {
            credit_months = 1;
        }
        if (this.TIME_INTERVAL_TYPE_YEAR === $form.data('timeIntervalType')) {
            credit_months *= 12;
        }
        var month_percent = year_percent / 12;
        var mpf = month_percent / 100;

        var payment_type = $form.data('paymentType');
        var $result_block = $('.block-cc-result');
        $result_block.data('paymentType', payment_type);
        $result_block.attr('data-payment-type', payment_type);

        var $month_pay;
        if (this.PAYMENT_TYPE_DIF === payment_type) {
            // Дифференцированная схема

            // Ежемесячный платёж на i-м месяце вычисляется по формуле:
            //      s_i = f + p_i, где
            // f = c / N - сумма в счёт погашения основного долга (одна и та же каждый месяц)
            // с - сумма кредита
            // N - срок кредита (месяцев)
            var f = credit_sum / credit_months;
            // p_i - проценты, начисленные за пользование кредитом на i-м месяце.
            //      p_i = (c - f * (i - 1)) * p / 1200
            // p - годовая процентная ставка.
            var month_payment_first = credit_sum * year_percent / 1200 + f;
            var $month_pay_first = $result_block.find('.month-pay-first');
            $month_pay_first.fadeOut(200, function () {
                $month_pay_first.text(self.formatFloat(month_payment_first));
            });

            var month_payment_last = (credit_sum - f * (credit_months - 1)) * year_percent / 1200 + f;
            var $month_payment_last = $result_block.find('.month-pay-last');
            $month_payment_last.fadeOut(200, function () {
                $month_payment_last.text(self.formatFloat(month_payment_last));
            });

            $month_pay = $month_pay_first.add($month_payment_last);

            result_total_cost = (month_payment_first + month_payment_last) * 0.5 * credit_months;
        } else {
            // Аннуитетная схема
            // Коэффициент аннуитета = K = i*(1+i)^n/((1+i)^n-1),
            var month_factor = mpf * Math.pow(1 + mpf, credit_months) / (Math.pow(1 + mpf, credit_months) - 1);
            var month_payment = month_factor * credit_sum;
            result_total_cost += month_payment * credit_months;
            $month_pay = $result_block.find('.month-pay');
            $month_pay.fadeOut(200, function () {
                $month_pay.text(self.formatFloat(month_payment));
            });
        }
        // $month_pay.stop(true, false);

        $month_pay.fadeIn(200);

        var now = new Date();
        var finish_date = new Date(now.setMonth(now.getMonth() + credit_months));
        $result_block.find('.finish-date').text(this.formatDate(finish_date));

        $result_block.find('.total-payment').text(this.formatFloat(result_total_cost));
        $result_block.find('.above-payment').text(this.formatFloat(result_total_cost - credit_sum));

        var $calc_btn = $('.btn-cc-calculate');
        if (!$calc_btn.hasClass('btn-primary')) {
            if (this.btnRecoverTimeout) {
                clearTimeout(this.btnRecoverTimeout);
            }
            this.btnRecoverTimeout = setTimeout(function () {
                $('.btn-cc-calculate').addClass('btn-primary');
            }, 100);
        }
    },

    setFormLinkValue: function ($a, dataName, attributeName) {
        var $form = $a.closest('form');
        var val = $a.data(dataName);
        $form.data(dataName, val);
        $form.attr(attributeName, val);
        this.recalculate($form);
    }

};
