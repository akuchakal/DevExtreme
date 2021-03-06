import Overlay from "../../overlay";
import { TooltipStrategyBase } from './tooltipStrategyBase';
import $ from "../../../core/renderer";
import { getWindow } from "../../../core/utils/window";

const SLIDE_PANEL_CLASS_NAME = "dx-scheduler-overlay-panel";

const animationConfig = {
    show: {
        type: "slide",
        duration: 300,
        from: { position: { my: 'top', at: 'bottom', of: getWindow() } },
        to: { position: { my: 'center', at: 'center', of: getWindow() } }
    },
    hide: {
        type: "slide",
        duration: 300,
        to: { position: { my: 'top', at: 'bottom', of: getWindow() } },
        from: { position: { my: 'center', at: 'center', of: getWindow() } }
    }
};

const positionConfig = {
    my: "bottom",
    at: "bottom"
};

export class MobileTooltipStrategy extends TooltipStrategyBase {
    _onListItemClick(e) {
        super._onListItemClick(e);
        this.scheduler.showAppointmentPopup(e.itemData.data, false, e.itemData.currentData);
    }

    _shouldUseTarget() {
        return false;
    }

    _createTooltip(target, list) {
        const $overlay = $("<div>").addClass(SLIDE_PANEL_CLASS_NAME).appendTo(this.scheduler.$element());
        return this.scheduler._createComponent($overlay, Overlay, {
            shading: false,
            position: positionConfig,
            animation: animationConfig,
            target: this.scheduler.$element(),
            container: this.scheduler.$element(),
            closeOnOutsideClick: true,
            width: "100%",
            height: "100%",
            contentTemplate: () => list.$element()
        });
    }
}
