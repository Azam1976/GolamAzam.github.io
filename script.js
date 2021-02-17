var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate
  this.el = el
  this.loopNum = 0
  this.period = parseInt(period, 10) || 2000
  this.txt = ''
  this.tick()
  this.isDeleting = false
}

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length
  var fullTxt = this.toRotate[i]

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

  var that = this
  var delta = 300 - Math.random() * 100

  if (this.isDeleting) {
    delta /= 2
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period
    this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false
    this.loopNum++
    delta = 500
  }

  setTimeout(function () {
    that.tick()
  }, delta)
}

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate')
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate')
    var period = elements[i].getAttribute('data-period')
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period)
    }
  }
  var css = document.createElement('style')
  css.type = 'text/css'
  css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #666 }'
  document.body.appendChild(css)
}
$(document).ready(function () {
  var slide = $('.slide')
  var viewWidth = $(window).width()
  var sliderInner = $('.slider-inner')
  var childrenNo = sliderInner.children().length

  sliderInner.width(viewWidth * childrenNo)

  $(window).resize(function () {
    viewWidth = $(window).width()
  })

  function setWidth() {
    slide.each(function () {
      $(this).width(viewWidth)
      $(this).css('left', viewWidth * $(this).index())
    })
  }

  function setActive(element) {
    var clickedIndex = element.index()

    $('.slider-nav .active').removeClass('active')
    element.addClass('active')

    sliderInner.css(
      'transform',
      'translateX(-' + clickedIndex * viewWidth + 'px) translateZ(0)',
    )

    $('.slider-inner .active').removeClass('active')
    $('.slider-inner .slide').eq(clickedIndex).addClass('active')
  }

  setWidth()

  $('.slider-nav > div').on('click', function () {
    setActive($(this))
  })

  $(window).resize(function () {
    setWidth()
  })

  setTimeout(function () {
    $('.slider').fadeIn(500)
  }, 2000)
})
const year = new Date().getFullYear()
document.querySelector('#year').innerHTML = year
