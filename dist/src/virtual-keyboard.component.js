"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var layouts_1 = require("./layouts");
var virtual_keyboard_service_1 = require("./virtual-keyboard.service");
var i0 = require("@angular/core");
var i1 = require("@angular/material/dialog");
var i2 = require("./virtual-keyboard.service");
var i3 = require("@angular/flex-layout/flex");
var i4 = require("@angular/material/form-field");
var i5 = require("@angular/material/button");
var i6 = require("@angular/material/icon");
var i7 = require("@angular/material/input");
var i8 = require("@angular/forms");
var i9 = require("@angular/common");
var i10 = require("./virtual-keyboard-key.component");
var _c0 = ["keyboardInput"];
function VirtualKeyboardComponent_div_8_virtual_keyboard_key_1_Template(rf, ctx) { if (rf & 1) {
    var _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "virtual-keyboard-key", 8);
    i0.ɵɵlistener("keyPress", function VirtualKeyboardComponent_div_8_virtual_keyboard_key_1_Template_virtual_keyboard_key_keyPress_0_listener($event) { i0.ɵɵrestoreView(_r8); var ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.keyPress($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var key_r5 = ctx.$implicit;
    var keyIndex_r6 = ctx.index;
    var ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("key", key_r5)("disabled", ctx_r4.disabled);
    i0.ɵɵattribute("data-index", keyIndex_r6);
} }
function VirtualKeyboardComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtemplate(1, VirtualKeyboardComponent_div_8_virtual_keyboard_key_1_Template, 1, 3, "virtual-keyboard-key", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var row_r2 = ctx.$implicit;
    var rowIndex_r3 = ctx.index;
    i0.ɵɵattribute("data-index", rowIndex_r3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r2);
} }
var VirtualKeyboardComponent = /** @class */ (function () {
    /**
     * Constructor of the class.
     *
     * @param {MatDialogRef<VirtualKeyboardComponent>} dialogRef
     * @param {VirtualKeyboardService}                 virtualKeyboardService
     */
    function VirtualKeyboardComponent(dialogRef, virtualKeyboardService) {
        this.dialogRef = dialogRef;
        this.virtualKeyboardService = virtualKeyboardService;
        this.shift = false;
    }
    /**
     * Helper method to set cursor in input to correct place.
     *
     * @param {HTMLInputElement|HTMLTextAreaElement}  input
     * @param {number}                                start
     * @param {number}                                end
     */
    VirtualKeyboardComponent.setSelectionRange = function (input, start, end) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(start, end);
        }
        else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    };
    /**
     * On init life cycle hook, this will do following:
     *  1) Set focus to virtual keyboard input field
     *  2) Subscribe to following
     *    2.1) Shift key, this is needed in keyboard event dispatches
     *    2.2) CapsLock key, this will change keyboard layout
     *    2.3) Caret position in virtual keyboard input
     *  3) Reset of possible previously tracked caret position
     */
    VirtualKeyboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.keyboardInput.nativeElement.focus();
        }, 0);
        this.virtualKeyboardService.shift$.subscribe(function (shift) {
            _this.shift = shift;
        });
        this.virtualKeyboardService.capsLock$.subscribe(function (capsLock) {
            _this.layout = layouts_1.keyboardCapsLockLayout(_this.layout, capsLock);
        });
        this.virtualKeyboardService.caretPosition$.subscribe(function (caretPosition) {
            _this.caretPosition = caretPosition;
            setTimeout(function () {
                VirtualKeyboardComponent.setSelectionRange(_this.keyboardInput.nativeElement, caretPosition, caretPosition);
            }, 0);
        });
        if (this.inputElement.nativeElement.value.length) {
            this.virtualKeyboardService.setCaretPosition(this.inputElement.nativeElement.value.length);
        }
        this.maxLength = this.inputElement.nativeElement.maxLength > 0 ? this.inputElement.nativeElement.maxLength : '';
        this.checkDisabled();
    };
    /**
     * On destroy life cycle hook, in this we want to reset virtual keyboard service states on following:
     *  - Shift
     *  - CapsLock
     */
    VirtualKeyboardComponent.prototype.ngOnDestroy = function () {
        this.virtualKeyboardService.reset();
    };
    /**
     * Method to close virtual keyboard dialog
     */
    VirtualKeyboardComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    /**
     * Method to update caret position. This is called on click event in virtual keyboard input element.
     */
    VirtualKeyboardComponent.prototype.updateCaretPosition = function () {
        this.virtualKeyboardService.setCaretPosition(this.keyboardInput.nativeElement.selectionStart);
    };
    /**
     * Method to handle actual "key" press from virtual keyboard.
     *  1) Key is "Special", process special key event
     *  2) Key is "Normal"
     *    - Append this key value to input
     *    - Dispatch DOM events to input element
     *    - Toggle Shift key if it's pressed
     *
     * @param {KeyPressInterface} event
     */
    VirtualKeyboardComponent.prototype.keyPress = function (event) {
        if (event.special) {
            this.handleSpecialKey(event);
        }
        else {
            this.handleNormalKey(event.keyValue);
            this.dispatchEvents(event);
            // Toggle shift if it's activated
            if (this.shift) {
                this.virtualKeyboardService.toggleShift();
            }
        }
        this.checkDisabled();
    };
    /**
     * Method to check is virtual keyboard input is disabled.
     */
    VirtualKeyboardComponent.prototype.checkDisabled = function () {
        var maxLength = this.inputElement.nativeElement.maxLength;
        var valueLength = this.inputElement.nativeElement.value.length;
        this.disabled = maxLength > 0 && valueLength >= maxLength;
    };
    /**
     * Method to handle "normal" key press event, this will add specified character to input value.
     *
     * @param {string}  keyValue
     */
    VirtualKeyboardComponent.prototype.handleNormalKey = function (keyValue) {
        var value = '';
        // We have caret position, so attach character to specified position
        if (!isNaN(this.caretPosition)) {
            value = [
                this.inputElement.nativeElement.value.slice(0, this.caretPosition),
                keyValue,
                this.inputElement.nativeElement.value.slice(this.caretPosition)
            ].join('');
            // Update caret position
            this.virtualKeyboardService.setCaretPosition(this.caretPosition + 1);
        }
        else {
            value = "" + this.inputElement.nativeElement.value + keyValue;
        }
        // And finally set new value to input
        this.inputElement.nativeElement.value = value;
    };
    /**
     * Method to handle "Special" key press events.
     *  1) Enter
     *  2) Escape, close virtual keyboard
     *  3) Backspace, remove last character from input value
     *  4) CapsLock, toggle current layout state
     *  6) Shift, toggle current layout state
     *  5) SpaceBar
     */
    VirtualKeyboardComponent.prototype.handleSpecialKey = function (event) {
        switch (event.keyValue) {
            case 'Enter':
                this.close();
                break;
            case 'Escape':
                this.close();
                break;
            case 'Backspace':
                var currentValue = this.inputElement.nativeElement.value;
                // We have a caret position, so we need to remove char from that position
                if (!isNaN(this.caretPosition)) {
                    // And current position must > 0
                    if (this.caretPosition > 0) {
                        var start = currentValue.slice(0, this.caretPosition - 1);
                        var end = currentValue.slice(this.caretPosition);
                        this.inputElement.nativeElement.value = "" + start + end;
                        // Update caret position
                        this.virtualKeyboardService.setCaretPosition(this.caretPosition - 1);
                    }
                }
                else {
                    this.inputElement.nativeElement.value = currentValue.substring(0, currentValue.length - 1);
                }
                // Set focus to keyboard input
                this.keyboardInput.nativeElement.focus();
                break;
            case 'CapsLock':
                this.virtualKeyboardService.toggleCapsLock();
                break;
            case 'Shift':
                this.virtualKeyboardService.toggleShift();
                break;
            case 'SpaceBar':
                this.handleNormalKey(' ');
                break;
        }
    };
    /**
     * Method to dispatch necessary keyboard events to current input element.
     *
     * @see https://w3c.github.io/uievents/tools/key-event-viewer.html
     *
     * @param {KeyPressInterface} event
     */
    VirtualKeyboardComponent.prototype.dispatchEvents = function (event) {
        var eventInit = {
            bubbles: true,
            cancelable: true,
            shiftKey: this.shift,
            key: event.keyValue,
            code: "Key" + event.keyValue.toUpperCase() + "}",
            location: 0
        };
        // Simulate all needed events on base element
        this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', eventInit));
        this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keypress', eventInit));
        this.inputElement.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
        this.inputElement.nativeElement.dispatchEvent(new KeyboardEvent('keyup', eventInit));
        // And set focus to input
        this.keyboardInput.nativeElement.focus();
    };
    VirtualKeyboardComponent.ɵfac = function VirtualKeyboardComponent_Factory(t) { return new (t || VirtualKeyboardComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef), i0.ɵɵdirectiveInject(i2.VirtualKeyboardService)); };
    VirtualKeyboardComponent.ɵcmp = i0.ɵɵdefineComponent({ type: VirtualKeyboardComponent, selectors: [["virtual-keyboard"]], viewQuery: function VirtualKeyboardComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.keyboardInput = _t.first);
        } }, decls: 9, vars: 5, consts: [[1, "container"], ["fxLayout", "column"], ["color", "primary", "mat-button", "", "mat-mini-fab", "", 1, "close", 3, "click"], ["matInput", "", 3, "type", "ngModel", "placeholder", "maxLength", "click", "ngModelChange"], ["keyboardInput", ""], ["fxLayout", "row", "fxLayoutAlign", "center center", 4, "ngFor", "ngForOf"], ["fxLayout", "row", "fxLayoutAlign", "center center"], [3, "key", "disabled", "keyPress", 4, "ngFor", "ngForOf"], [3, "key", "disabled", "keyPress"]], template: function VirtualKeyboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵelementStart(2, "mat-form-field");
            i0.ɵɵelementStart(3, "button", 2);
            i0.ɵɵlistener("click", function VirtualKeyboardComponent_Template_button_click_3_listener() { return ctx.close(); });
            i0.ɵɵelementStart(4, "mat-icon");
            i0.ɵɵtext(5, "check");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "input", 3, 4);
            i0.ɵɵlistener("click", function VirtualKeyboardComponent_Template_input_click_6_listener() { return ctx.updateCaretPosition(); })("ngModelChange", function VirtualKeyboardComponent_Template_input_ngModelChange_6_listener($event) { return ctx.inputElement.nativeElement.value = $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, VirtualKeyboardComponent_div_8_Template, 2, 2, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵpropertyInterpolate("type", ctx.type);
            i0.ɵɵpropertyInterpolate("placeholder", ctx.placeholder);
            i0.ɵɵproperty("ngModel", ctx.inputElement.nativeElement.value)("maxLength", ctx.maxLength);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.layout);
        } }, directives: [i3.DefaultLayoutDirective, i4.MatFormField, i5.MatButton, i6.MatIcon, i7.MatInput, i8.DefaultValueAccessor, i8.NgControlStatus, i8.NgModel, i9.NgForOf, i3.DefaultLayoutAlignDirective, i10.VirtualKeyboardKeyComponent], styles: [".close[_ngcontent-%COMP%] {\n      position: relative;\n      float: right;\n      top: -16px;\n      right: 0;\n      margin-bottom: -40px;\n    }\n  \n    .mat-input-container[_ngcontent-%COMP%] {\n      margin: -16px 0;\n      font-size: 32px;\n    }\n  \n    .mat-input-element[_ngcontent-%COMP%]:disabled {\n      color: currentColor;\n    }\n\n    [_nghost-%COMP%]     .mat-input-placeholder {\n      top: 10px !important;\n      font-size: 24px !important;\n    }"] });
    return VirtualKeyboardComponent;
}());
exports.VirtualKeyboardComponent = VirtualKeyboardComponent;
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(VirtualKeyboardComponent, [{
        type: core_1.Component,
        args: [{
                selector: 'virtual-keyboard',
                template: "\n    <div class=\"container\">\n      <div fxLayout=\"column\">\n        <mat-form-field>\n          <button class=\"close\" color=\"primary\" mat-button mat-mini-fab\n            (click)=\"close()\"\n          >\n            <mat-icon>check</mat-icon>\n          </button>\n    \n          <input type=\"{{type}}\"\n            matInput\n            #keyboardInput\n            (click)=\"updateCaretPosition()\"\n            [(ngModel)]=\"inputElement.nativeElement.value\" placeholder=\"{{ placeholder }}\"\n            [maxLength]=\"maxLength\"\n          />\n        </mat-form-field>\n    \n        <div fxLayout=\"row\" fxLayoutAlign=\"center center\"\n          *ngFor=\"let row of layout; let rowIndex = index\"\n          [attr.data-index]=\"rowIndex\"\n        >\n          <virtual-keyboard-key\n            *ngFor=\"let key of row; let keyIndex = index\"\n            [key]=\"key\"\n            [disabled]=\"disabled\"\n            [attr.data-index]=\"keyIndex\"\n            (keyPress)=\"keyPress($event)\"\n          ></virtual-keyboard-key>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    .close {\n      position: relative;\n      float: right;\n      top: -16px;\n      right: 0;\n      margin-bottom: -40px;\n    }\n  \n    .mat-input-container {\n      margin: -16px 0;\n      font-size: 32px;\n    }\n  \n    .mat-input-element:disabled {\n      color: currentColor;\n    }\n\n    :host /deep/ .mat-input-placeholder {\n      top: 10px !important;\n      font-size: 24px !important;\n    }\n  "]
            }]
    }], function () { return [{ type: i1.MatDialogRef }, { type: i2.VirtualKeyboardService }]; }, { keyboardInput: [{
            type: core_1.ViewChild,
            args: ['keyboardInput']
        }] }); })();
//# sourceMappingURL=virtual-keyboard.component.js.map