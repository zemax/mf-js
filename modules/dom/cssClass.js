var cssClass = {
    hasClass: function (element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        }
        else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    },

    addClass: function (element, className) {
        if (!cssClass.hasClass(element, className)) {
            if (element.classList) {
                element.classList.add(className);
            }
            else {
                element.className += ' ' + className;
            }
        }
    },

    removeClass: function (element, className) {
        if (cssClass.hasClass(element, className)) {
            if (element.classList) {
                element.classList.remove(className);
            }
            else {
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    }
};

module.exports = cssClass;
