// Add event listener to reveal.js slide changes
Reveal.addEventListener('slidechanged', function(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv

    $(event.currentSlide).find('*[data-callout]').each(function (idx, calloutElement) {

        setTimeout(function() {
            $(event.currentSlide)
                .find($(calloutElement).attr('data-callout'))
                .map(function (i, target) {
                    positionCallout(i, target, calloutElement);
                });
        }, 300);
    });
});

function positionCallout(i, target, element) {
    var targetElement = $(target);
    var position = targetElement.offset();
    var calloutElement = $(element);

    if (calloutElement.attr('position-set')) {
        return;
    }

    if (calloutElement.hasClass('position-topright')) {
        position.top = (position.top - calloutElement.outerHeight()) + (targetElement.outerHeight() / 2) - 10;
        position.left += targetElement.width();
    } else if (calloutElement.hasClass('position-left')) {
        position.top += (targetElement.outerHeight() - calloutElement.outerHeight()) / 2;
        position.left -= calloutElement.width() - 10;
    } else if (calloutElement.hasClass('position-right')) {
        position.top += (targetElement.outerHeight() - calloutElement.outerHeight()) / 2;
        position.left += targetElement.width() + 10;
    } else if (calloutElement.hasClass('position-bottom')) {
        position.top = position.top + targetElement.outerHeight() - 5;
        position.left += targetElement.width() / 2;
    } else if (calloutElement.hasClass('position-bottomleft')) {
        position.top = position.top + targetElement.outerHeight();
        position.left -= calloutElement.width();
        position.left += targetElement.width() / 2;
    } else { // position-top
        position.top -= calloutElement.outerHeight();
        position.left += targetElement.width() / 2;
    }

    position.top += parseInt(calloutElement.attr('data-callout-offset-top')) || 0;
    position.left += parseInt(calloutElement.attr('data-callout-offset-left')) || 0;

    if (calloutElement.attr('data-callout-offset-size')) {
        calloutElement.find('.callout-circle, .callout-arrow').each(function (idx, element) {
            var fontSize = parseInt($(element).css("font-size"));

            $(element).css({
                'font-size': fontSize + parseInt(calloutElement.attr('data-callout-offset-size')) + "px"
            });
            calloutElement.attr('data-callout-offset-size', '0');
        });
    }

    //console.log('positionCallout', position, targetElement, calloutElement);

    calloutElement.offset(position);
    calloutElement.attr('position-set', true);
}
