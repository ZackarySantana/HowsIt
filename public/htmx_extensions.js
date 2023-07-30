(function () {
    function ResetElement(ele) {
        if (ele.tagName === "input" || ele.tagName === "textarea") {
            ele.value = ele.defaultValue;
        }

        if (ele.tagName === "form") {
            ele.reset();
        }
    }

    htmx.defineExtension("reset-on-success", {
        onEvent: function ResetOnSuccess(name, event) {
            console.log("TESTING 1");
            if (name !== "htmx:beforeSwap" || event.detail.isError) {
                return;
            }
            console.log("TESTING 2");

            const ele = event.detail.requestConfig.elt;
            if (
                !ele.closest("[hx-reset-on-success]") &&
                !ele.closest("[data-hx-reset-on-success]")
            ) {
                return;
            }
            console.log("TESTING 3");

            ResetElement(ele.toLowerCase());
        },
    });
})();
