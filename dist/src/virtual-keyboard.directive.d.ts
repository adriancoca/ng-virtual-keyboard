import { ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeyboardLayout } from './layouts';
import * as i0 from "@angular/core";
export declare class NgVirtualKeyboardDirective {
    private element;
    private dialog;
    private opened;
    private focus;
    layout: KeyboardLayout | string;
    placeholder: string;
    type: string;
    onWindowBlur(): void;
    onWindowFocus(): void;
    onFocus(): void;
    onClick(): void;
    /**
     * Constructor of the class.
     *
     * @param {ElementRef}  element
     * @param {MatDialog}    dialog
     */
    constructor(element: ElementRef, dialog: MatDialog);
    /**
     * Method to open virtual keyboard
     */
    private openKeyboard;
    /**
     * Getter for used keyboard layout.
     *
     * @returns {KeyboardLayout}
     */
    private getLayout;
    /**
     * Getter for used placeholder for virtual keyboard input field.
     *
     * @returns {string}
     */
    private getPlaceHolder;
    /**
     * Getter for used type for virtual keyboard input field.
     *
     * @return {string}
     */
    private getType;
    static ɵfac: i0.ɵɵFactoryDef<NgVirtualKeyboardDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<NgVirtualKeyboardDirective, "[ng-virtual-keyboard]", never, { "layout": "ng-virtual-keyboard-layout"; "placeholder": "ng-virtual-keyboard-placeholder"; "type": "ng-virtual-keyboard-type"; }, {}, never>;
}
