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
        var ticket = $(this).data('ticket');
        console.log( questions[getTicket(ticket)[0]].text );
        //load all questions
        //show first question -> next -> next...
        //show result -> return to all tickets
    });

    $('.exam-prompt-btn').on('click', function(){
        $('.exam-prompt__info').slideToggle();
    });

    //button to up
    $('#gotop').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 800);
    });
});