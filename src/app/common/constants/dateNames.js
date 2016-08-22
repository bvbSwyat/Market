(function() {
    'use strict';

    angular
        .module('ngApp')
        .constant('Months', ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ])
        .constant('Days', ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'])
})();
