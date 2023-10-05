import * as apiModel from "./api";
import * as viewModel from "./movement-list.vm";

const mapMovementFromApiToVm = (
    movement: apiModel.Movement
): viewModel.Movement => ({
    ...movement,
    transaction: new Date(movement.transaction),
    realTransaction: new Date(movement.realTransaction),
});

export const mapListAccountMovementFromApiToVm = (
    movementList: apiModel.Movement[],
    account: apiModel.Account
): viewModel.ListAccountMovementsVm => ({
    accountName: account.name,
    iban: account.iban,
    balance: account.balance,
    movementList: movementList.map(movement => mapMovementFromApiToVm(movement))
});
