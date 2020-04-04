"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var flex_layout_1 = require("@angular/flex-layout");
var virtual_keyboard_directive_1 = require("./virtual-keyboard.directive");
var virtual_keyboard_component_1 = require("./virtual-keyboard.component");
var virtual_keyboard_key_component_1 = require("./virtual-keyboard-key.component");
var virtual_keyboard_service_1 = require("./virtual-keyboard.service");
var i0 = require("@angular/core");
var NgVirtualKeyboardModule = /** @class */ (function () {
    function NgVirtualKeyboardModule() {
    }
    NgVirtualKeyboardModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgVirtualKeyboardModule });
    NgVirtualKeyboardModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgVirtualKeyboardModule_Factory(t) { return new (t || NgVirtualKeyboardModule)(); }, providers: [
            virtual_keyboard_service_1.VirtualKeyboardService,
        ], imports: [[
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
            ]] });
    return NgVirtualKeyboardModule;
}());
exports.NgVirtualKeyboardModule = NgVirtualKeyboardModule;
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgVirtualKeyboardModule, { declarations: [virtual_keyboard_directive_1.NgVirtualKeyboardDirective,
        virtual_keyboard_component_1.VirtualKeyboardComponent,
        virtual_keyboard_key_component_1.VirtualKeyboardKeyComponent], imports: [common_1.CommonModule,
        forms_1.FormsModule,
        forms_1.ReactiveFormsModule,
        flex_layout_1.FlexLayoutModule,
        button_1.MatButtonModule,
        dialog_1.MatDialogModule,
        icon_1.MatIconModule,
        input_1.MatInputModule], exports: [virtual_keyboard_directive_1.NgVirtualKeyboardDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgVirtualKeyboardModule, [{
        type: core_1.NgModule,
        args: [{
                declarations: [
                    virtual_keyboard_directive_1.NgVirtualKeyboardDirective,
                    virtual_keyboard_component_1.VirtualKeyboardComponent,
                    virtual_keyboard_key_component_1.VirtualKeyboardKeyComponent,
                ],
                providers: [
                    virtual_keyboard_service_1.VirtualKeyboardService,
                ],
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    forms_1.ReactiveFormsModule,
                    flex_layout_1.FlexLayoutModule,
                    button_1.MatButtonModule,
                    dialog_1.MatDialogModule,
                    icon_1.MatIconModule,
                    input_1.MatInputModule,
                ],
                entryComponents: [
                    virtual_keyboard_component_1.VirtualKeyboardComponent,
                ],
                exports: [
                    virtual_keyboard_directive_1.NgVirtualKeyboardDirective,
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=virtual-keyboard.module.js.map