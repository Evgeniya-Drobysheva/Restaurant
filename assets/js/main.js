(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

  // Parallax
    const scene = $('#scene').get(0);
    const parallaxInstance = new Parallax(scene);

  // Swiper
    const mySwiper = new Swiper ('.swiper-container', {
      loop : true,
      spaceBetween : 200,
      stopOnLastSlide : false,
      autoplay : {
          delay: 2000
      }
    });

  // Validate
    $('.button-form').on('click', function(e) {
      e.preventDefault();
      $(this).parent('form').submit();
    })
    
    $.validator.addMethod('regex', function(value, element, regexp){
      let regExsp = new RegExp(regexp);
      return this.optional(element) || regExsp.test(value)
    },'Please check your input');

    function valEl(el) {
      el.validate({
        rules: {
          firstName: {
            required: true,
            regex : "[A-Za-z]{1,32}"   
          },
          phoneNumber: {
            digits : true,
            required: true,
            minlength: 10,
            maxlength: 11,
            regex: "[0-9]+"
          }, 
          email: {
            regex: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
            required: true
          }, 
          messages: {
            firstName: {
              required: 'Field is required',
              regex: 'Enter your name properly'
            },
            phoneNumber: {
              required: 'Field is required',
              regex: 'Enter your phone number properly'
            }, 
            email: {
              required: 'Field is required',
              regex: 'Enter your phone email properly'
            }
           
        }
      },
      submitHandler: function(form) {
        $('#preloader-active').fadeIn();
        let $form = $(form);
        let $formId = $(form).attr('id');
        switch($formId) {
          case 'form-book':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function() {
              console.log('Succses');
            })
            .fail(function() {
              console.log('Fail');
            })
            .always(function() {
              setTimeout (function() {
                $form.trigger('reset');
              },1000);
              setTimeout (function() {
                $('#preloader-active').fadeOut();
              }, 1400);
            });
          break;
          case 'modal-form':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function() {
              console.log('Succses');
            })
            .fail(function() {
              console.log('Fail');
            })
            .always(function() {
              setTimeout (function() {
                $form.trigger('reset');
              }, 1000);
              setTimeout( function() {
                $('#preloader-active').fadeOut();
              }, 1400);
            });
              break;    
        }
        return false;
      }
    }) 
  };

  $('.form-val').each(function() {
    valEl($(this));
  });

  // Modal
  $('.header-btn').on('click', function() {
    $('.wrapper-modal').fadeIn();
  })

  $('.form-book').on('click', function() {
    $('.wrapper-modal').fadeOut();
  })

  $('.overlay').on('click', function() {
    $('.wrapper-modal').fadeOut();
  })

  $('.form-book').children().on('click', function (e) {
    e.stopPropagation();
  });

  // Tabs
  $('.nav-item').on('click', function (e) {
    e.preventDefault();
    let currTab = $(this).index();
    $('.nav-item').removeClass('active');
    $(this).addClass('active');

    $('.tab-pane').removeClass('show active');
    $('.tab-pane').eq(currTab).addClass('show active');
  });

  // Hamburger 

  $('.mobile_menu').on('click',function(){
    $('.main-menu').toggleClass('d-none');
  })

})(jQuery);

