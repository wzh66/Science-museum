app.directive('ngDialog', [function () {
    return {
        restrict: 'E',
        templateUrl: 'modules/dialog/dialog.html',
        link: function (scope, element, attrs) {
            scope.$root.dialog = {
                show: false,
                title: '',
                body: '',
                btnTxt: '',
                open: function (show, title, body, btnTxt, confirm, cancel) {
                    this.show = show;
                    this.title = title;
                    this.body = body;
                    this.btnTxt = btnTxt;
                    if (confirm) {
                        this._confirm = confirm;
                    }
                    if (cancel) {
                        this._cnacel = cancel;
                    }
                },
                close: function () {
                    this.show = false;
                },
                confirm: function () {
                    this.show = false;
                    if (this._confirm) {
                        this._confirm();
                    }
                },
                cancel: function () {
                    this.show = false;
                    if (this._cnacel) {
                        this._cnacel();
                    }
                }
            };
        }
    };
}]);
