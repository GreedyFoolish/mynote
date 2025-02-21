"use strict";

var AxiosError = require("../core/AxiosError");
var utils = require("../utils");

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 */
function CanceledErrorV0281(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
    this.name = "CanceledError";
}

utils.inherits(CanceledErrorV0281, AxiosError, {
    __CANCEL__: true
});

module.exports = CanceledErrorV0281;
