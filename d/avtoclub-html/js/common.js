$(document).ready(function(){

    //tabs
    $('.exam__tab').on('click', function(){
        $('.exam__tab').removeClass('active');
        $(this).addClass('active');
        if ( $(this).hasClass('exam__tab_topics') ) {
            $('.exam__content').removeClass('active');
            $('.exam__content_topics').addClass('active');
        }
        if ( $(this).hasClass('exam__tab_numbers') ) {
            $('.exam__content').removeClass('active');
            $('.exam__content_numbers').addClass('active');
        }
        if ( $(this).hasClass('exam__tab_exam') ) {
            $('.exam__content').removeClass('active');
            $('.exam__content_exam').addClass('active');
        }
    });

    //ticket by number
    $('.btn_ticket').on('click', function(){
        $('.exam__cardstable').hide();
        $('.exam-question').show();
        var ticket = $(this).data('ticket');
        console.log( questions[getTicket(ticket)[0]].text );
        //load all questions
        //show first question -> next -> next...
        //show result -> return to all tickets
    });

    //promt
    $('.exam-prompt-btn').on('click', function(){
        $('.exam-prompt__info').slideToggle();
    });

    //result
    $('#exam-random-start').on('click', function(){
        $('.exam__random').hide();
        $('.exam-result').show();
    });

    //back
    $('#exam-back').on('click', function(){
        $('.exam-result').hide();
        $('.exam__random').show();
    });

    //button to up
    $('#gotop').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 800);
    });
});