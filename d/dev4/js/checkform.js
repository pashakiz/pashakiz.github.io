//запрет на ввод букв в поле телефона
$(document).ready(function(){
    $('.onlynumers').ForceNumericOnly();
});


function checkForm(obj){
    var return_value = true;
    // регулярное вырожение, для проверки телефона
    var reg_phone = /[0-9]+/i;
    // регулярное вырожение, для проверки отправителя
    var reg_sender = /[a-z]+/i;
    // заносим значение поля телефон в переменную phone
    var phone = obj.phone.value;
    // заносим значение поля отправитель в переменную sender
    var sender = obj.name.value;
    // объявляем переменную куда будет заносится текст сообщения
    var error_msg = "Не корректно заполнины поля:\n";
    
    //проверка поля отправитель
    if(reg_sender.exec(sender) == null && sender ==""){
        error_msg += "<Имя>\n";
        return_value = false;
    }
    //проверка поля телефон
    if(reg_phone.exec(phone) == null){
        error_msg += "<E-mail>\n";
        return_value = false;
    }
    //проверка на наличие ошибок, если возникла ошибка ввыводим текст сообщения
    if(!return_value)
        alert(error_msg);
		
    return return_value;
    }


jQuery.fn.ForceNumericOnly =
function()
{
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // Разрешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
            return (
                key == 8 || 
                key == 9 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};