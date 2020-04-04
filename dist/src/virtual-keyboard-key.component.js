"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var layouts_1 = require("./layouts");
var i0 = require("@angular/core");
var i1 = require("@angular/material/button");
var i2 = require("@angular/flex-layout/flex");
var i3 = require("@angular/common");
var i4 = require("@angular/material/icon");
function VirtualKeyboardKeyComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r9.keyValue);
} }
function VirtualKeyboardKeyComponent_span_2_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r11.icon);
} }
function VirtualKeyboardKeyComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtemplate(1, VirtualKeyboardKeyComponent_span_2_mat_icon_1_Template, 2, 1, "mat-icon", 1);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r10.icon);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r10.text, " ");
} }
var VirtualKeyboardKeyComponent = /** @class */ (function () {
    /**
     * Constructor of the class.
     */
    function VirtualKeyboardKeyComponent() {
        this.keyPress = new core_1.EventEmitter();
        this.special = false;
        this.spacer = false;
    }
    /**
     * On init life cycle hook, within this we'll initialize following properties:
     *  - special
     *  - keyValue
     *  - flexValue
     */
    VirtualKeyboardKeyComponent.prototype.ngOnInit = function () {
        var multiplier = 1;
        var fix = 0;
        if (this.key.length > 1) {
            this.spacer = layouts_1.isSpacer(this.key);
            this.special = layouts_1.isSpecial(this.key);
            var matches = /^(\w+)(:(\d+(\.\d+)?))?$/g.exec(this.key);
            this.keyValue = matches[1];
            if (matches[3]) {
                multiplier = parseFloat(matches[3]);
                fix = (multiplier - 1) * 4;
            }
        }
        else {
            this.keyValue = this.key;
        }
        if (this.special) {
            if (layouts_1.specialKeyIcons.hasOwnProperty(this.keyValue)) {
                this.icon = layouts_1.specialKeyIcons[this.keyValue];
            }
            else if (layouts_1.specialKeyTexts.hasOwnProperty(this.keyValue)) {
                this.text = layouts_1.specialKeyTexts[this.keyValue];
            }
        }
        this.flexValue = multiplier * 64 + fix + "px";
    };
    /**
     * Method to check if key is disabled or not.
     *
     * @returns {boolean}
     */
    VirtualKeyboardKeyComponent.prototype.isDisabled = function () {
        if (this.spacer) {
            return true;
        }
        else if (this.disabled && layouts_1.notDisabledSpecialKeys.indexOf(this.keyValue) !== -1) {
            return false;
        }
        else {
            return this.disabled;
        }
    };
    /**
     * Method to handle actual "key" press from virtual keyboard.
     *  1) Key is "Special", process special key event
     *  2) Key is "Normal", append this key value to input
     */
    VirtualKeyboardKeyComponent.prototype.onKeyPress = function () {
        this.keyPress.emit({ special: this.special, keyValue: this.keyValue, key: this.key });
    };
    VirtualKeyboardKeyComponent.ɵfac = function VirtualKeyboardKeyComponent_Factory(t) { return new (t || VirtualKeyboardKeyComponent)(); };
    VirtualKeyboardKeyComponent.ɵcmp = i0.ɵɵdefineComponent({ type: VirtualKeyboardKeyComponent, selectors: [["virtual-keyboard-key"]], inputs: { key: "key", disabled: "disabled" }, outputs: { keyPress: "keyPress" }, decls: 3, vars: 6, consts: [["mat-raised-button", "", "color", "primary", 3, "fxFlex", "disabled", "click"], [4, "ngIf"]], template: function VirtualKeyboardKeyComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "button", 0);
            i0.ɵɵlistener("click", function VirtualKeyboardKeyComponent_Template_button_click_0_listener() { return ctx.onKeyPress(); });
            i0.ɵɵtemplate(1, VirtualKeyboardKeyComponent_span_1_Template, 2, 1, "span", 1);
            i0.ɵɵtemplate(2, VirtualKeyboardKeyComponent_span_2_Template, 3, 2, "span", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("spacer", ctx.spacer);
            i0.ɵɵpropertyInterpolate("fxFlex", ctx.flexValue);
            i0.ɵɵproperty("disabled", ctx.isDisabled());
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.special);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.special);
        } }, directives: [i1.MatButton, i2.DefaultFlexDirective, i3.NgIf, i4.MatIcon], styles: [".mat-button[_ngcontent-%COMP%], .mat-icon-button[_ngcontent-%COMP%], .mat-raised-button[_ngcontent-%COMP%] {\n      min-width: 64px;\n      min-height: 64px;\n      padding: 0;\n      margin: 2px;\n      font-size: 32px;\n      line-height: 32px;\n    }\n    \n    .mat-button.spacer[_ngcontent-%COMP%], .mat-icon-button.spacer[_ngcontent-%COMP%], .mat-raised-button.spacer[_ngcontent-%COMP%] {\n      background-color: transparent;\n    }"] });
    return VirtualKeyboardKeyComponent;
}());
exports.VirtualKeyboardKeyComponent = VirtualKeyboardKeyComponent;
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(VirtualKeyboardKeyComponent, [{
        type: core_1.Component,
        args: [{
                selector: 'virtual-keyboard-key',
                template: "\n    <button\n      mat-raised-button\n      color=\"primary\"\n      fxFlex=\"{{ flexValue }}\"\n      [class.spacer]=\"spacer\"\n      [disabled]=\"isDisabled()\"\n      (click)=\"onKeyPress()\"\n    >\n      <span *ngIf=\"!special\">{{ keyValue }}</span>\n    \n      <span *ngIf=\"special\">\n        <mat-icon *ngIf=\"icon\">{{ icon }}</mat-icon>\n    \n        {{ text }}\n      </span>\n    </button>\n  ",
                styles: ["\n    .mat-button,\n    .mat-icon-button,\n    .mat-raised-button {\n      min-width: 64px;\n      min-height: 64px;\n      padding: 0;\n      margin: 2px;\n      font-size: 32px;\n      line-height: 32px;\n    }\n    \n    .mat-button.spacer,\n    .mat-icon-button.spacer,\n    .mat-raised-button.spacer {\n      background-color: transparent;\n    }\n  "]
            }]
    }], function () { return []; }, { key: [{
            type: core_1.Input
        }], disabled: [{
            type: core_1.Input
        }], keyPress: [{
            type: core_1.Output
        }] }); })();
//# sourceMappingURL=virtual-keyboard-key.component.js.map