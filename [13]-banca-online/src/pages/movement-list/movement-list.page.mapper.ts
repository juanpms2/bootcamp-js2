import * as apiModel from "./api";
import * as viewModel from "./movement-list.vm";

const mapMovementFromApiToVm = (
    movement: apiModel.Movement
): viewModel.MovementVm => ({
    ...movement,
    transaction: new Date(movement.transaction),
    realTransaction: new Date(movement.realTransaction),
});

export const mapMovementListFromApiToVm = (
    movementList: apiModel.Movement[]
): viewModel.MovementVm[] => movementList.map(mapMovementFromApiToVm);
