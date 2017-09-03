<div class="row">
    <div class="col-md-4 block-cc-column">

        <form class="form-cc-calculator" data-source-type="credit-sum" data-payment-type="an" data-time-interval-type="month" action="javascript:void(0);">

            <label>Исходные данные</label>
            <ul class="nav nav-pills nav-fill pb-2 cc-source-type">
                <li class="nav-item">
                    <a class="nav-link active" href="javascript:void(0);" data-source-type="credit-sum">Сумма кредита</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);" data-source-type="purchase-cost">Стоимость покупки</a>
                </li>
            </ul>

            <div class="form-group field-credit-sum">
                <label>Сумма кредита</label>
                <div class="input-group">
                    <input class="form-control cc-input-val" aria-label="Amount" value="5200000" name="credit_sum" autocomplete="off">
                    <span class="input-group-addon">руб.</span>
                </div>
            </div>

            <div class="form-group field-purchase-cost">
                <label>Полная стоимость</label>
                <div class="input-group">
                    <input class="form-control cc-input-val" aria-label="Amount" value="6800000" name="full_cost" autocomplete="off">
                    <span class="input-group-addon">руб.</span>
                </div>
            </div>

            <div class="form-group field-purchase-cost">
                <label>Первоначальный взнос</label>
                <div class="input-group">
                    <input class="form-control cc-input-val" aria-label="Amount" value="1600000" name="first_pay" autocomplete="off">
                    <span class="input-group-addon">руб.</span>
                </div>
            </div>

            <div class="form-group">
                <label>Процентная ставка</label>
                <div class="input-group">
                    <input class="form-control cc-input-val" aria-label="Percent" value="9.7" name="year_percent" autocomplete="off">
                    <span class="input-group-addon">%</span>
                </div>
            </div>

            <div class="form-group">
                <label>Срок кредита</label>
                <div class="input-group">
                    <input class="form-control cc-input-val" aria-label="Percent" value="200" name="credit_months" autocomplete="off">
                    <div class="input-group-btn сс-time-interval-type">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="active-item-title">Месяцев</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item active" href="javascript:void(0);" data-time-interval-type="month">Месяцев</a>
                            <a class="dropdown-item" href="javascript:void(0);" data-time-interval-type="year">Лет&#160;&#160;&#160;&#160;</a>
                        </div>
                    </div>
                </div>
            </div>

            <label>Вид платежа</label>
            <ul class="nav nav-pills nav-fill pb-2 cc-payment-type">
                <li class="nav-item">
                    <a class="nav-link active" href="javascript:void(0);" data-payment-type="an">Аннуитетный</a>
                    <button type="button" class="btn btn-light" data-toggle="popover" title="Аннуитетный платеж" data-content="Ежемесячные выплаты равны в&#160;течение всего срока кредитования." data-placement="top">?</button>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0);" data-payment-type="dif">Дифференцированный</a>
                    <button type="button" class="btn btn-light" data-toggle="popover" title="Дифференцированный платеж" data-content="Ежемесячные выплаты уменьшаются в&#160;течение всего срока кредитования." data-placement="top">?</button>
                </li>
            </ul>

            <button class="btn btn-lg btn-primary btn-block btn-cc-calculate">
                <span class="fa fa-refresh"></span>
                <span class="ml-2">Пересчитать</span>
            </button>

            <div class="cc-result-an">

            </div>
            <div class="cc-result-dif">

            </div>
        </form>

    </div>
</div>

<div class="row block-cc-result" data-payment-type="an">
    <div class="col-md-4 block-cc-column">
        <table class="table">
            <tbody>
                <tr class="payment-type-an">
                    <td>Ежемесячный платеж</td>
                    <td class="result-val month-pay">35 123,23</td>
                </tr>
                <tr class="payment-type-dif">
                    <td>Первый платеж</td>
                    <td class="result-val month-pay-first">39 876,23</td>
                </tr>
                <tr class="payment-type-dif">
                    <td>Последний платеж</td>
                    <td class="result-val month-pay-last">31 234,23</td>
                </tr>
                <tr>
                    <td>Окончание выплат</td>
                    <td class="result-val finish-date">1.1.2034</td>
                </tr>
                <tr>
                    <td>Полная стоимость кредита</td>
                    <td class="result-val total-payment">5 345 234,34</td>
                </tr>
                <tr>
                    <td>Переплата по кредиту</td>
                    <td class="result-val above-payment">5 345 234,34</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="row mb-4">
    <div class="col-md-4 block-cc-column">


        <?php
        $host = $_SERVER['HTTP_HOST'];
        ?>

        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#this-link" role="tab">Ссылка</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#feedback" role="tab">Обратная связь</a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content mt-1">
            <div class="tab-pane active this-link-block" id="this-link" role="tabpanel">
                <p>Возможно сформировать постоянную ссылку на&#160;этот расчет. Ссылкой можно поделиться или сохранить у&#160;себя, чтобы вернуться к введенным параметрам.</p>
                <div class="control">
                    <button type="button" class="btn btn-lg btn-primary btn-cc-make-this-link">Получить ссылку</button>
                </div>
                <div class="loading">
                    <p>Подготовка...</p>
                </div>
                <div class="result">
                    <p>Постоянная ссылка на этот расчет:</p>
                    <input class="form-control" name="this-calc-link" value="https://<?=$host?>"/>
                    <p><a class="btn-cc-copy-this-link" href="javascript:void(0);">Copy</a></p>
                </div>
            </div>
            <div class="tab-pane" id="feedback" role="tabpanel">
                <p>Автор этой страницы и сама страница не несет никакой ответственности абсолютно ни за что.</p>
                <p>
                    <span>Ваши пожелания и предложения можно оставить в комментариях в этом блоге: </span>
                    <a href="http://quadrowin.blogspot.ru">http://quadrowin.blogspot.ru</a>
                </p>
            </div>

        </div>

    </div>
</div>
