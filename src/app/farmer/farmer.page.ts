import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  LoadingController,
  MenuController,
  PopoverController,
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { Farmer } from "../models/farmer.model";
import { FarmerPopoverComponent } from './farmer-popover/farmer-popover.component';
import { FarmerService } from "./farmer.service";

@Component({
  selector: "app-farmer",
  templateUrl: "./farmer.page.html",
  styleUrls: ["./farmer.page.scss"],
})
export class FarmerPage implements OnInit {
  isLoading = true;
  farmersSub: Subscription;
  farmers: Array<Farmer>;
  searchTerm: string = null;

  searched: {} = null;

  constructor(
    private farmerService: FarmerService,
    private menuCtrl: MenuController,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.farmersSub = this.farmerService.Farmers.subscribe(
      (result) => {
        this.farmers = Array.isArray(result) ? [...result] : result;
        this.isLoading = false;
        console.log(this.farmers);
        if (!Array.isArray(this.farmers) || !this.farmers.length) {
            this.farmerService.showToast('No Farmers Registered Yet.');
            this.isLoading = false;
            console.log('State...............');
        }
         console.log(this.isLoading);
      },
      (error) => {
        this.isLoading = false;
        console.log(error.error);
        this.alertCtrl
          .create({
            header: "Service Error!",
            message: "Connection problem: " + error.error.message,
            buttons: [{ text: "Okay" }],
          })
          .then((alertEl) => {
            alertEl.present();
          });
      }
    );
  }

  async presentPopover(event) {
    const popover =  await this.popoverCtrl.create({
      component: FarmerPopoverComponent,
      event
    });

    return await popover.present();

  }

  searchItem($event) {
   
    const searchItems = [... this.farmers];

    // Begin search only if searchTerm is provided
    if (this.searchTerm.trim().length && this.searchTerm !== '') {
      this.farmers = searchItems.filter((farmer) => {
        if ( farmer.Outrower_Name && farmer.Outrower_Name.length > 1 ){
          return ( farmer.Outrower_Name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 );
        }
     });
      return;
    }else{ // Search Term not provide display all items
      this.initializeItems();
    }

  }

  initializeItems() {
    this.farmersSub = this.farmerService.Farmers
    .subscribe(result => {
      console.log(result);
      this.farmers = Array.isArray(result) ? [...result] : result;
    });
  }

  async presentLoader() {
    const loader = await this.loadingCtrl.create({
      message: 'Searching Farmer..',
      showBackdrop: true
    });

    return await loader.present();
  }
}
