/* eslint-disable no-param-reassign, no-underscore-dangle */
import { computed, makeObservable, observable } from "mobx";
import Services from "../../Services";
import SnackbarStore from "@/UI/Snackbar/ViewModel";
import TableViewModelTemplate from "@/utils/tableViewModelTemplate";
import { PrizeEditAddType } from "@/modules/Seasons/modules/Prizes/modules/EditAdd/Model";
import PrizeType from "@/modules/Seasons/modules/Prizes/modules/Main/Model";

class Store extends TableViewModelTemplate<PrizeType[], PrizeEditAddType> {
  private _info: PrizeType | null = null;

  constructor() {
    super(Services);
    makeObservable(this, {
      _info: observable,
      info: computed,
      _rows: observable,
      rows: computed,
    } as any);
  }

  get info(): PrizeType | null {
    return this._info;
  }

  openPopup(data: PrizeType): void {
    this._info = data;
  }

  closePopup(): void {
    this._info = null;
  }

  async startRiffle(body: any): Promise<void> {
    await Services.startRiffle(body)
      .then(() => {
        SnackbarStore.onOpen("Розыгрыш был запущен");
        this._info!.has_active_raffle = true;
        this.closePopup();
      })
      .catch((err) => {
        SnackbarStore.onOpenError(err);
      });
  }
}

export default new Store();
